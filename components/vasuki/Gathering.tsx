"use client";

import { useEffect, useRef } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import meta from "@/lib/mosaic.json";

/* Acts II and III, one canvas.
   Scrolling drives the assembly: her photographs fly in from everywhere and
   lock into a portrait of her. Once assembled, a lens follows the pointer and
   bulges the real photographs back out of her face. */

const { cols: COLS, rows: ROWS, spriteCols: SC, tile: TILE } = meta;
const STEP = 2;                       // flight grid is coarser than the mosaic
const FC = Math.ceil(COLS / STEP);
const FR = Math.ceil(ROWS / STEP);
const ASSEMBLED = 0.45;               // portrait is whole early, so the lens gets room

const decode = (b64: string) => {
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
};

const rnd = (n: number) => {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

export const Gathering = () => {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const progress = useRef(0);

  const { scrollYProgress } = useScroll({
    target: wrap,
    offset: ["start start", "end end"],
  });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    progress.current = v;
  });

  useEffect(() => {
    const el = canvas.current;
    if (!el) return;
    const ctx = el.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const map = decode(meta.map);

    const mosaic = new Image();
    const sprite = new Image();
    let loaded = 0;
    const done = () => (loaded += 1);
    mosaic.onload = done;
    sprite.onload = done;
    mosaic.src = "/vasuki/mosaic.webp";
    sprite.src = "/vasuki/tiles.webp";

    let w = 0;
    let h = 0;
    let raf = 0;
    let t = 0;
    let idle = 0;
    let lx = 0;
    let ly = 0;
    let tx = 0;
    let ty = 0;
    let lr = 0;
    let lrT = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      el.width = Math.round(w * dpr);
      el.height = Math.round(h * dpr);
      el.style.width = `${w}px`;
      el.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    /* the portrait fits, centred, never cropped */
    const frame = () => {
      const ar = COLS / ROWS;
      const pad = h * 0.09;
      let ch = h - pad * 2;
      let cw = ch * ar;
      const maxW = w * 0.82;
      if (cw > maxW) {
        cw = maxW;
        ch = cw / ar;
      }
      return { x: (w - cw) / 2, y: (h - ch) / 2, cw, ch };
    };

    const restR = () =>
      Math.max(160, Math.min(300, Math.min(w, h) * 0.26));

    const draw = () => {
      raf = requestAnimationFrame(draw);
      if (loaded < 2) return;
      t += 1;
      idle += 1;

      const p = progress.current;
      const { x, y, cw, ch } = frame();
      const cellW = cw / COLS;
      const cellH = ch / ROWS;

      ctx.clearRect(0, 0, w, h);

      // ---- assembly -------------------------------------------------------
      const a = Math.min(1, p / ASSEMBLED);             // 0..1 across the flight
      const solid = Math.max(0, Math.min(1, (p - ASSEMBLED * 0.82) / (ASSEMBLED * 0.32)));

      if (solid < 1) {
        const fw = cellW * STEP;
        const fh = cellH * STEP;
        for (let r = 0; r < FR; r++) {
          for (let c = 0; c < FC; c++) {
            const i = r * FC + c;
            const stagger = rnd(i) * 0.42;              // not everything lands at once
            const u = Math.max(0, Math.min(1, (a - stagger) / (1 - stagger)));
            const e = u * u * (3 - 2 * u);

            const k = map[Math.min(ROWS - 1, r * STEP) * COLS + Math.min(COLS - 1, c * STEP)];
            const ang = rnd(i + 91) * Math.PI * 2;
            const dist = (0.55 + rnd(i + 7) * 1.1) * Math.max(w, h);

            const tgx = x + (c * STEP + STEP / 2) * cellW;
            const tgy = y + (r * STEP + STEP / 2) * cellH;
            const sx0 = w / 2 + Math.cos(ang) * dist;
            const sy0 = h / 2 + Math.sin(ang) * dist;

            const px = sx0 + (tgx - sx0) * e;
            const py = sy0 + (tgy - sy0) * e;
            const rot = (1 - e) * (rnd(i + 33) - 0.5) * 2.4;
            const sc = 1 + (1 - e) * (1.6 + rnd(i + 55) * 2.2);
            const alpha = Math.min(1, e * 2.4) * (1 - solid);
            if (alpha <= 0.01) continue;

            const dw = fw * sc;
            const dh = fh * sc;
            const sx = (k % SC) * TILE;
            const sy = Math.floor(k / SC) * TILE;

            ctx.globalAlpha = alpha;
            if (Math.abs(rot) > 0.002) {
              ctx.save();
              ctx.translate(px, py);
              ctx.rotate(rot);
              ctx.drawImage(sprite, sx, sy, TILE, TILE, -dw / 2, -dh / 2, dw, dh);
              ctx.restore();
            } else {
              ctx.drawImage(sprite, sx, sy, TILE, TILE, px - dw / 2, py - dh / 2, dw, dh);
            }
          }
        }
      }

      // ---- the finished portrait -----------------------------------------
      if (solid > 0) {
        ctx.globalAlpha = solid;
        ctx.drawImage(mosaic, x, y, cw, ch);
      }
      ctx.globalAlpha = 1;

      // ---- the lens, once she is whole ------------------------------------
      if (p < ASSEMBLED * 0.98) {
        lrT = 0;
      } else if (!reduce) {
        if (idle > 220) {
          tx = x + cw * (0.5 + Math.sin(t / 290) * 0.3);
          ty = y + ch * (0.45 + Math.cos(t / 203) * 0.28);
          lrT = restR() * 0.95;
        }
      } else {
        lrT = restR();
      }
      if (lx === 0 && ly === 0) {
        lx = tx = x + cw * 0.5;
        ly = ty = y + ch * 0.45;
      }
      lx += (tx - lx) * 0.08;
      ly += (ty - ly) * 0.08;
      lr += (lrT - lr) * 0.1;

      if (lr > 6) {
        const R = lr;
        const c0 = Math.max(0, Math.floor((lx - R - x) / cellW) - 1);
        const c1 = Math.min(COLS - 1, Math.ceil((lx + R - x) / cellW) + 1);
        const r0 = Math.max(0, Math.floor((ly - R - y) / cellH) - 1);
        const r1 = Math.min(ROWS - 1, Math.ceil((ly + R - y) / cellH) + 1);

        const hits: { d: number; cx: number; cy: number; k: number; e: number }[] = [];
        for (let r = r0; r <= r1; r++) {
          for (let c = c0; c <= c1; c++) {
            const cx = x + (c + 0.5) * cellW;
            const cy = y + (r + 0.5) * cellH;
            const d = Math.hypot(cx - lx, cy - ly);
            if (d > R) continue;
            const u = 1 - d / R;
            hits.push({ d, cx, cy, k: map[r * COLS + c], e: u * u * (3 - 2 * u) });
          }
        }
        hits.sort((m, n) => n.d - m.d);

        for (const q of hits) {
          // a clean reveal: the photographs come back to full colour in place,
          // no magnifying-glass bulge
          const dx = q.cx;
          const dy = q.cy;
          const dw = cellW;
          const dh = cellH;
          ctx.globalAlpha = Math.min(1, q.e * 1.5) * solid;
          ctx.drawImage(
            sprite,
            (q.k % SC) * TILE,
            Math.floor(q.k / SC) * TILE,
            TILE,
            TILE,
            dx - dw / 2,
            dy - dh / 2,
            dw,
            dh,
          );
        }
        ctx.globalAlpha = 1;

        ctx.globalCompositeOperation = "lighter";
        const g = ctx.createRadialGradient(lx, ly, R * 0.25, lx, ly, R * 1.25);
        g.addColorStop(0, `rgba(255,186,120,${0.1 * solid})`);
        g.addColorStop(1, "rgba(255,186,120,0)");
        ctx.fillStyle = g;
        ctx.fillRect(lx - R * 1.3, ly - R * 1.3, R * 2.6, R * 2.6);
        ctx.globalCompositeOperation = "source-over";
      }
    };

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      lrT = progress.current >= ASSEMBLED * 0.98 ? restR() : 0;
      idle = 0;
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <section ref={wrap} className="relative h-[440svh]">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <canvas ref={canvas} aria-hidden className="absolute inset-0" />
        <Beats />
      </div>
    </section>
  );
};

/* Text beats fire on cue during the flight, then the caption stays. */
const Beats = () => {
  const ref = useRef<HTMLDivElement>(null);
  const one = useRef<HTMLParagraphElement>(null);
  const two = useRef<HTMLParagraphElement>(null);
  const cap = useRef<HTMLParagraphElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const band = (a: number, b: number, c: number, d: number) =>
      p < a || p > d ? 0 : p < b ? (p - a) / (b - a) : p > c ? (d - p) / (d - c) : 1;
    if (one.current) one.current.style.opacity = String(band(0.03, 0.09, 0.16, 0.22));
    if (two.current) two.current.style.opacity = String(band(0.24, 0.3, 0.37, 0.43));
    if (cap.current) cap.current.style.opacity = String(band(0.48, 0.54, 1.01, 1.02));
  });

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0">
      <p
        ref={one}
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center font-mono text-[11px] uppercase tracking-[0.42em] opacity-0 sm:text-sm"
        style={{ color: "rgba(255,230,205,0.9)", transition: "opacity 0.1s linear" }}
      >
        fifty-eight moments
      </p>
      <p
        ref={two}
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center font-mono text-[11px] uppercase tracking-[0.42em] opacity-0 sm:text-sm"
        style={{ color: "rgba(255,230,205,0.9)", transition: "opacity 0.1s linear" }}
      >
        one picture
      </p>
      <p
        ref={cap}
        className="absolute inset-x-0 bottom-10 text-center font-mono text-[10px] uppercase leading-relaxed tracking-[0.28em] opacity-0"
        style={{ color: "rgba(255,230,205,0.44)", transition: "opacity 0.1s linear" }}
      >
        {meta.count} photographs · one portrait
        <br />
        <span style={{ color: "rgba(255,230,205,0.3)" }}>move to look closer</span>
      </p>
    </div>
  );
};
