"use client";

import { ReactNode, useEffect } from "react";
import Lenis from "lenis";

export const SmoothScroll = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    // Lenis owns the scroll position, so native anchor jumps do nothing.
    // Route in-page links through it instead.
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey)
        return;
      const link = (e.target as HTMLElement | null)?.closest?.(
        'a[href^="#"]',
      ) as HTMLAnchorElement | null;
      if (!link) return;

      const hash = link.getAttribute("href") || "";
      if (hash === "#" || hash === "#top") {
        e.preventDefault();
        lenis.scrollTo(0);
        history.pushState(null, "", " ");
        return;
      }
      const target = document.querySelector(hash);
      if (!target) return;
      e.preventDefault();
      // Lenis caches the document height; re-measure or a long jump clamps short.
      lenis.resize();
      const top = target.getBoundingClientRect().top + window.scrollY - 72;
      lenis.scrollTo(top, { duration: 1.1, force: true });
      history.pushState(null, "", hash);
    };
    document.addEventListener("click", onClick);

    // honour a hash present on first load
    if (window.location.hash) {
      const target = document.querySelector(window.location.hash);
      if (target) {
        requestAnimationFrame(() => {
          lenis.resize();
          const top = target.getBoundingClientRect().top + window.scrollY - 72;
          lenis.scrollTo(top, { immediate: true, force: true });
        });
      }
    }

    return () => {
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
};
