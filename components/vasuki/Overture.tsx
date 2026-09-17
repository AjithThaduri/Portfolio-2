"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { COUNT, tileStyle } from "./sprite";

/* Act I.
   Every photograph she has, hung in a room rather than printed on a page: the
   wall sits in 3D, tiles at different depths, and the whole plane leans with
   her. Tiles keep turning over to show a different memory, so it is never the
   same wall twice. Her name is cut out of it. */

const TILES = 60;

const PhotoWall = () => {
  const reduce = useReducedMotion();
  const planeRef = useRef<HTMLDivElement>(null);
  const [photos, setPhotos] = useState<number[]>(() =>
    Array.from({ length: TILES }, (_, i) => i % COUNT),
  );
  const [flipping, setFlipping] = useState<number | null>(null);
  const next = useRef(TILES);

  /* the wall keeps turning over */
  useEffect(() => {
    if (reduce) return;
    let alive = true;
    const turn = () => {
      if (!alive) return;
      const slot = Math.floor(Math.random() * TILES);
      setFlipping(slot);
      setTimeout(() => {
        if (!alive) return;
        setPhotos((prev) => {
          const out = [...prev];
          out[slot] = next.current % COUNT;
          next.current += 1;
          return out;
        });
      }, 340);
      setTimeout(() => alive && setFlipping(null), 700);
    };
    const id = setInterval(turn, 900);
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, [reduce]);

  /* the plane leans toward her, and drifts on its own when nobody is pointing */
  useEffect(() => {
    const plane = planeRef.current;
    if (!plane || reduce) return;
    let mx = 0.5;
    let my = 0.5;
    let cx = 0.5;
    let cy = 0.5;
    let idle = 0;
    let t = 0;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      mx = e.clientX / window.innerWidth;
      my = e.clientY / window.innerHeight;
      idle = 0;
    };

    const tick = () => {
      raf = requestAnimationFrame(tick);
      t += 1;
      idle += 1;
      if (idle > 180) {
        mx = 0.5 + Math.sin(t / 260) * 0.26;
        my = 0.5 + Math.cos(t / 191) * 0.2;
      }
      cx += (mx - cx) * 0.045;
      cy += (my - cy) * 0.045;
      plane.style.transform = `rotateX(${(cy - 0.5) * -7}deg) rotateY(${(cx - 0.5) * 10}deg) translateZ(-20px) scale(1.1)`;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, [reduce]);

  const cells = Array.from({ length: TILES }, (_, i) => {
    const seed = (i * 2654435761) % 1000;
    return {
      z: -26 + (seed % 7) * 9,             // a whisper of depth, not a ragged grid
      delay: 0.2 + ((seed % 23) / 23) * 1.05,
    };
  });

  return (
    <div
      aria-hidden
      className="absolute inset-0"
      style={{ perspective: "1300px", perspectiveOrigin: "50% 45%" }}
    >
        <div
          ref={planeRef}
          className="grid h-full w-full grid-cols-5 gap-[3px] p-[3px] sm:grid-cols-6 lg:grid-cols-10"
          style={{
            transformStyle: "preserve-3d",
            gridAutoRows: "1fr",
            transform: "translateZ(-20px) scale(1.1)",
          }}
        >
          {cells.map((cell, i) => (
            <div
              key={i}
              className="vasuki-tile relative h-full w-full"
              style={
                {
                  transformStyle: "preserve-3d",
                  "--z": `${cell.z}px`,
                  "--delay": `${cell.delay}s`,
                } as React.CSSProperties
              }
            >
              <div
                className="h-full w-full rounded-[2px] bg-cover bg-center"
                style={{
                  ...tileStyle(photos[i]),
                  filter: "brightness(0.56) saturate(0.85)",
                  transform: `rotateY(${flipping === i ? 90 : 0}deg)`,
                  transition: "transform 0.34s cubic-bezier(0.4,0,0.2,1)",
                  boxShadow: "0 12px 34px -14px rgba(0,0,0,0.9)",
                }}
              />
            </div>
          ))}
        </div>
    </div>
  );
};

export const Overture = ({ name }: { name: string }) => {
  const reduce = useReducedMotion();

  return (
    <section className="relative flex h-[100svh] flex-col items-center justify-center overflow-hidden">
      <PhotoWall />

      {/* the wall is a room; her name is the light in it */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[3]"
        style={{
          background:
            "radial-gradient(74% 56% at 50% 46%, rgba(7,6,10,0.95) 0%, rgba(7,6,10,0.84) 40%, rgba(7,6,10,0.6) 70%, rgba(7,6,10,0.86) 100%)",
        }}
      />

      <div className="pointer-events-none relative z-10 flex w-full flex-col items-center px-5 text-center">
        <p
          className="vasuki-in font-mono uppercase"
          style={
            {
              color: "#ffb46e",
              fontSize: "clamp(9px, 2.2vw, 12px)",
              letterSpacing: "0.46em",
              "--delay": "1.5s",
            } as React.CSSProperties
          }
        >
          Happy Birthday
        </p>

        <h1
          className="vasuki-in mt-4 w-full bg-clip-text text-transparent"
          style={
            {
              fontFamily: "var(--font-serif), Georgia, serif",
              fontSize: "clamp(3.4rem, 15.5vw, 12rem)",
              lineHeight: 0.86,
              letterSpacing: "-0.035em",
              backgroundImage: "url(/vasuki/tiles.webp)",
              backgroundSize: "320% auto",
              WebkitBackgroundClip: "text",
              filter:
                "brightness(1.75) saturate(1.35) contrast(1.08) drop-shadow(0 18px 58px rgba(0,0,0,0.95))",
              "--delay": "1.75s",
            } as React.CSSProperties
          }
        >
          {name}
        </h1>

        <div
          className="vasuki-in mt-12 flex flex-col items-center gap-3 sm:mt-16"
          style={{ "--delay": "2.8s" } as React.CSSProperties}
        >
          <span
            className="font-mono text-[10px] uppercase tracking-[0.3em]"
            style={{ color: "rgba(255,230,205,0.5)" }}
          >
            scroll
          </span>
          <span
            aria-hidden
            className="block w-px"
            style={{
              height: 50,
              background: "linear-gradient(to bottom, rgba(255,180,110,0.85), transparent)",
              animation: reduce ? undefined : "vasuki-cue 2.4s ease-in-out infinite",
            }}
          />
        </div>
      </div>
    </section>
  );
};
