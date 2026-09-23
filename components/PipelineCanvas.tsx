"use client";

import { useEffect, useRef } from "react";

/* A live pipeline. Messy input streams in from the left; some of it needs
   handling. Everything passes through one gate, and what comes out the far
   side is clean, ordered and structured. That shape is common to most of the
   systems on this site — retrieval, routing, redaction, extraction — so the
   caption above it cycles rather than naming just one. */

type Particle = {
  x: number;
  y: number;
  ty: number;
  vx: number;
  r: number;
  clean: boolean;
  flagged: boolean;
  scrub: number;
  glyph: boolean;
  seed: number;
};

type RGB = [number, number, number];

const hexToRgb = (hex: string): RGB => {
  const h = hex.trim().replace("#", "");
  const full =
    h.length === 3
      ? h
          .split("")
          .map((c) => c + c)
          .join("")
      : h;
  const n = parseInt(full, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};

const rgba = (c: RGB, a: number) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;

export const PipelineCanvas = () => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let particles: Particle[] = [];
    let lanes: number[] = [];
    let raf = 0;
    let t = 0;
    let visible = true;
    const pointer = { x: -9999, y: -9999, on: false };

    let RAW: RGB = [255, 159, 67];
    let FLAG: RGB = [255, 94, 74];
    let CLEAN: RGB = [104, 214, 198];
    let BG: RGB = [8, 8, 10];
    let additive = true;
    let trail = 0.155;
    let floorA = 0.32;
    let haloA = 0.16;
    let laneA = 0.026;
    let scale = 1;

    const readTheme = () => {
      const cs = getComputedStyle(document.documentElement);
      const v = (name: string, fallback: string) =>
        cs.getPropertyValue(name).trim() || fallback;
      RAW = hexToRgb(v("--accent-vivid", "#ff9f43"));
      FLAG = hexToRgb(v("--flag", "#ff5e4a"));
      CLEAN = hexToRgb(v("--teal", "#68d6c6"));
      BG = hexToRgb(v("--sim-bg", "#08080a"));
      additive = v("--sim-additive", "1") === "1";
      trail = parseFloat(v("--sim-trail", "0.155")) || 0.155;
      floorA = parseFloat(v("--sim-floor", "0.32")) || 0.32;
      haloA = parseFloat(v("--sim-halo", "0.16")) || 0.16;
      laneA = parseFloat(v("--sim-lane", "0.026")) || 0.026;
      scale = parseFloat(v("--sim-scale", "1")) || 1;
      ctx.fillStyle = rgba(BG, 1);
      ctx.fillRect(0, 0, w, h);
    };

    const boundaryX = () => w * (w < 760 ? 0.52 : 0.58);

    const spawn = (p: Particle, initial = false) => {
      const bx = boundaryX();
      p.x = initial ? Math.random() * w : -20 - Math.random() * 180;
      p.y = h * 0.12 + Math.random() * h * 0.76;
      p.vx = 0.35 + Math.random() * 0.95;
      p.r = 0.9 + Math.random() * 2.1;
      p.glyph = Math.random() < 0.16;
      p.flagged = Math.random() < 0.34;
      p.clean = p.x > bx;
      p.scrub = 0;
      p.seed = Math.random() * 1000;
      p.ty = lanes.length ? lanes[Math.floor(Math.random() * lanes.length)] : p.y;
      return p;
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const laneCount = h < 560 ? 5 : 8;
      const top = h * 0.2;
      const span = h * 0.6;
      lanes = Array.from(
        { length: laneCount },
        (_, i) => top + (span / (laneCount - 1)) * i,
      );

      const target = Math.round(Math.min(230, Math.max(70, (w * h) / 7600)));
      particles = Array.from({ length: target }, () => spawn({} as Particle, true));

      readTheme();
    };

    const wash = (cx: number, cy: number, rad: number, c: RGB, a: number) => {
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad);
      g.addColorStop(0, rgba(c, a));
      g.addColorStop(1, rgba(c, 0));
      ctx.fillStyle = g;
      ctx.fillRect(cx - rad, cy - rad, rad * 2, rad * 2);
    };

    const frame = () => {
      raf = requestAnimationFrame(frame);
      if (!visible) return;
      t += 1;

      const bx = boundaryX();
      const breathe = 0.5 + 0.5 * Math.sin(t / 190);
      const blend: GlobalCompositeOperation = additive ? "lighter" : "source-over";

      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = rgba(BG, trail);
      ctx.fillRect(0, 0, w, h);

      if (additive) {
        ctx.globalCompositeOperation = blend;
        wash(bx * 0.42, h * 0.52, Math.max(w, h) * 0.5, RAW, 0.012 + breathe * 0.008);
        wash(
          bx + (w - bx) * 0.55,
          h * 0.48,
          Math.max(w, h) * 0.5,
          CLEAN,
          0.013 + (1 - breathe) * 0.009,
        );
      }

      ctx.globalCompositeOperation = "source-over";
      ctx.lineWidth = additive ? 1 : 1.2;
      lanes.forEach((y, i) => {
        ctx.strokeStyle = rgba(CLEAN, laneA + 0.018 * Math.sin(t / 90 + i));
        ctx.beginPath();
        ctx.moveTo(bx + 14, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      });

      const pulse = 0.28 + 0.16 * Math.sin(t / 34);
      ctx.strokeStyle = rgba(RAW, additive ? pulse : pulse + 0.3);
      ctx.setLineDash([5, 7]);
      ctx.lineDashOffset = -t * 0.35;
      ctx.beginPath();
      ctx.moveTo(bx, h * 0.07);
      ctx.lineTo(bx, h * 0.93);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.globalCompositeOperation = blend;
      const bandGrad = ctx.createLinearGradient(bx - 40, 0, bx + 40, 0);
      bandGrad.addColorStop(0, rgba(RAW, 0));
      bandGrad.addColorStop(0.5, rgba(RAW, (additive ? 0.05 : 0.07) + pulse * 0.05));
      bandGrad.addColorStop(1, rgba(RAW, 0));
      ctx.fillStyle = bandGrad;
      ctx.fillRect(bx - 40, h * 0.07, 80, h * 0.86);

      for (const p of particles) {
        let speed = p.vx;

        if (pointer.on) {
          const dx = p.x - pointer.x;
          const dy = p.y - pointer.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 26000) {
            const k = 1 - d2 / 26000;
            speed += k * 1.5;
            p.y += (dy / (Math.sqrt(d2) + 1)) * k * 0.9;
          }
        }

        p.x += speed;

        if (!p.clean && p.x >= bx) {
          p.clean = true;
          p.scrub = 1;
        }

        if (p.clean) p.y += (p.ty - p.y) * 0.035;
        else p.y += Math.sin((t + p.seed) / 58) * 0.22;

        if (p.scrub > 0) p.scrub = Math.max(0, p.scrub - 0.035);
        if (p.x > w + 30) spawn(p);

        const colour = p.clean ? CLEAN : p.flagged ? FLAG : RAW;
        const near = Math.abs(p.x - bx);
        const warn = !p.clean && p.flagged ? 0.35 + 0.35 * Math.sin((t + p.seed) / 9) : 0;
        const alpha = Math.min(1, floorA + warn + (near < 70 ? 0.3 : 0));

        ctx.globalCompositeOperation = blend;

        if (p.scrub > 0) {
          ctx.strokeStyle = rgba(CLEAN, p.scrub * 0.6);
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(p.x, p.y, (1 - p.scrub) * 16 + 3, 0, Math.PI * 2);
          ctx.stroke();
        }

        const r = p.r * scale;

        ctx.fillStyle = rgba(colour, alpha * haloA);
        ctx.beginPath();
        ctx.arc(p.x, p.y, r * 3.6, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = rgba(colour, alpha);
        if (p.glyph) {
          ctx.fillRect(p.x - r * 1.3, p.y - r * 1.7, r * 2.6, r * 3.4);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.strokeStyle = rgba(colour, alpha * (additive ? 0.28 : 0.45));
        ctx.lineWidth = r * 0.8;
        ctx.beginPath();
        ctx.moveTo(p.x - speed * (additive ? 5 : 13), p.y);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();
      }

      ctx.globalCompositeOperation = "source-over";
    };

    const onPointer = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.on = true;
    };
    const offPointer = () => {
      pointer.on = false;
      pointer.x = pointer.y = -9999;
    };

    resize();

    if (reduce) {
      for (let i = 0; i < 240; i++) {
        const bx = boundaryX();
        for (const p of particles) {
          p.x += p.vx;
          if (!p.clean && p.x >= bx) p.clean = true;
          if (p.clean) p.y += (p.ty - p.y) * 0.035;
          if (p.x > w + 30) spawn(p);
        }
      }
      frame();
      cancelAnimationFrame(raf);
      const onThemeStatic = () => {
        readTheme();
        frame();
        cancelAnimationFrame(raf);
      };
      window.addEventListener("themechange", onThemeStatic);
      return () => window.removeEventListener("themechange", onThemeStatic);
    }

    raf = requestAnimationFrame(frame);

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    const onVisibility = () => {
      if (document.hidden) visible = false;
    };
    const onTheme = () => readTheme();
    const scheme = window.matchMedia("(prefers-color-scheme: dark)");

    window.addEventListener("resize", resize);
    window.addEventListener("themechange", onTheme);
    scheme.addEventListener("change", onTheme);
    document.addEventListener("visibilitychange", onVisibility);
    canvas.addEventListener("pointermove", onPointer);
    canvas.addEventListener("pointerleave", offPointer);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("themechange", onTheme);
      scheme.removeEventListener("change", onTheme);
      document.removeEventListener("visibilitychange", onVisibility);
      canvas.removeEventListener("pointermove", onPointer);
      canvas.removeEventListener("pointerleave", offPointer);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className="absolute inset-0 h-full w-full" />;
};
