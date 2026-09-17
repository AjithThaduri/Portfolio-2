"use client";

import { useEffect, useRef, useState } from "react";

/* A licence-free ambient bed, synthesised in the browser: three detuned sines
   under a slow filter sweep. If a real track is ever dropped at
   /vasuki/song.mp3 it is used instead and this never plays.
   Nothing starts until she asks — browsers block autoplay, and it would be
   rude anyway. */

export const Sound = () => {
  const [on, setOn] = useState(false);
  const [ready, setReady] = useState(false);
  const audio = useRef<HTMLAudioElement | null>(null);
  const ctxRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  useEffect(() => {
    // show the control only once we know the page is interactive
    const id = setTimeout(() => setReady(true), 2600);
    return () => clearTimeout(id);
  }, []);

  const startAmbient = () => {
    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    const ctx = new AC();
    const master = ctx.createGain();
    master.gain.value = 0;
    master.connect(ctx.destination);

    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 620;
    filter.Q.value = 0.6;
    filter.connect(master);

    // a quiet open fifth, gently detuned so it never sits still
    [110, 164.81, 220, 329.63].forEach((f, i) => {
      const osc = ctx.createOscillator();
      osc.type = i % 2 ? "sine" : "triangle";
      osc.frequency.value = f;
      osc.detune.value = (i - 1.5) * 5;

      const g = ctx.createGain();
      g.gain.value = 0.16 / (i + 1);

      const lfo = ctx.createOscillator();
      lfo.frequency.value = 0.035 + i * 0.017;
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 0.07 / (i + 1);
      lfo.connect(lfoGain).connect(g.gain);

      osc.connect(g).connect(filter);
      osc.start();
      lfo.start();
    });

    const sweep = ctx.createOscillator();
    sweep.frequency.value = 0.02;
    const sweepGain = ctx.createGain();
    sweepGain.gain.value = 260;
    sweep.connect(sweepGain).connect(filter.frequency);
    sweep.start();

    master.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 3);
    ctxRef.current = ctx;
    gainRef.current = master;
  };

  const toggle = async () => {
    if (on) {
      audio.current?.pause();
      if (gainRef.current && ctxRef.current) {
        gainRef.current.gain.linearRampToValueAtTime(0, ctxRef.current.currentTime + 0.8);
        setTimeout(() => ctxRef.current?.suspend(), 900);
      }
      setOn(false);
      return;
    }

    if (ctxRef.current) {
      await ctxRef.current.resume();
      gainRef.current?.gain.linearRampToValueAtTime(0.5, ctxRef.current.currentTime + 2);
      setOn(true);
      return;
    }

    // prefer a real track if one has been added
    try {
      const head = await fetch("/vasuki/song.mp3", { method: "HEAD" });
      if (head.ok) {
        const a = new Audio("/vasuki/song.mp3");
        a.loop = true;
        a.volume = 0;
        await a.play();
        audio.current = a;
        let v = 0;
        const fade = setInterval(() => {
          v = Math.min(0.55, v + 0.02);
          a.volume = v;
          if (v >= 0.55) clearInterval(fade);
        }, 90);
        setOn(true);
        return;
      }
    } catch {
      /* no track — the ambient bed is the fallback */
    }

    startAmbient();
    setOn(true);
  };

  useEffect(
    () => () => {
      audio.current?.pause();
      ctxRef.current?.close();
    },
    [],
  );

  if (!ready) return null;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={on ? "Turn the music off" : "Turn the music on"}
      className="fixed bottom-6 left-6 z-50 flex h-10 items-center gap-2.5 rounded-full border px-4 backdrop-blur-md transition-colors"
      style={{
        borderColor: on ? "rgba(255,180,110,0.5)" : "rgba(255,230,205,0.16)",
        background: "rgba(7,6,10,0.55)",
        color: on ? "#ffb46e" : "rgba(255,230,205,0.5)",
      }}
    >
      <span className="flex h-3 items-end gap-[2px]" aria-hidden>
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-[2px] rounded-full"
            style={{
              height: on ? undefined : 4,
              background: "currentColor",
              animation: on ? `vasuki-eq 1.1s ease-in-out ${i * 0.17}s infinite` : undefined,
            }}
          />
        ))}
      </span>
      <span className="font-mono text-[10px] uppercase tracking-[0.22em]">
        {on ? "sound on" : "sound"}
      </span>
    </button>
  );
};
