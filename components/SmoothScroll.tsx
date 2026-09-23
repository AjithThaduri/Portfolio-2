"use client";

import { ReactNode, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

/* Lenis owns the scroll position, which means it also owns the problems a
   browser normally solves for free. This component handles them:

   - new page           start at the top, instantly
   - Back / Forward     return to where you were on that page
   - link with a #hash  land on that section, even on another page
   - same-page link     clicking the page you're on scrolls smoothly to top
   - overlays           other components pause scrolling via lockScroll()

   Elements that scroll on their own (dialogs, lists) opt out of smoothing
   with the data-lenis-prevent attribute. */

const NAV_OFFSET = 88;
let instance: Lenis | null = null;
let locks = 0;

/* Last scroll position per URL, for Back/Forward. Saving pauses between a
   popstate and the restore, so the outgoing page can't overwrite the entry
   we're about to restore. */
const positions = new Map<string, number>();
let restoring = false;
const urlKey = () => window.location.pathname + window.location.search;

/** Pause page scrolling while an overlay is open. Returns an unlock function. */
export const lockScroll = () => {
  locks += 1;
  instance?.stop();
  document.documentElement.style.overflow = "hidden";
  return () => {
    locks = Math.max(0, locks - 1);
    if (locks === 0) {
      instance?.start();
      document.documentElement.style.overflow = "";
    }
  };
};

const scrollToHash = (hash: string, immediate: boolean) => {
  const id = decodeURIComponent(hash.replace(/^#/, ""));
  const target = id ? document.getElementById(id) : null;
  if (!target) return false;
  const top = target.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
  if (instance) {
    instance.resize();
    instance.scrollTo(top, immediate ? { immediate: true, force: true } : { duration: 1.1, force: true });
  } else {
    window.scrollTo({ top, behavior: immediate ? "instant" : "smooth" });
  }
  return true;
};

export const SmoothScroll = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const fromHistory = useRef(false);
  const first = useRef(true);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduce) {
      instance = new Lenis({
        duration: 1.05,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        autoRaf: true,
      });
    }

    const onPop = () => {
      fromHistory.current = true;
      restoring = true;
    };
    const onScroll = () => {
      if (!restoring) positions.set(urlKey(), window.scrollY);
    };

    // In-page anchors and "click the page you're already on" links. Runs in
    // the capture phase, before Next's <Link> handler, so same-page clicks
    // are ours; links to other pages are left to the router.
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as HTMLElement | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!link || link.target === "_blank" || link.hasAttribute("download")) return;
      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname !== window.location.pathname) return;

      if (!url.hash || url.hash === "#top") {
        e.preventDefault();
        if (instance) instance.scrollTo(0, { duration: 1.1 });
        else window.scrollTo({ top: 0, behavior: "smooth" });
        history.pushState(null, "", url.pathname + url.search);
        return;
      }
      if (scrollToHash(url.hash, false)) {
        e.preventDefault();
        history.pushState(null, "", url.hash);
      }
    };

    window.addEventListener("popstate", onPop);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("click", onClick, true);
    return () => {
      window.removeEventListener("popstate", onPop);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("click", onClick, true);
      instance?.destroy();
      instance = null;
    };
  }, []);

  // Runs after every route change (and once on first load).
  useEffect(() => {
    const isFirst = first.current;
    first.current = false;
    const fromBackForward = fromHistory.current;
    fromHistory.current = false;

    const jump = (top: number) => {
      if (instance) instance.scrollTo(top, { immediate: true, force: true });
      else window.scrollTo({ top, behavior: "instant" });
    };

    // Two frames: the new page is committed, laid out and measurable.
    let inner = 0;
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => {
        instance?.resize();
        const hash = window.location.hash;
        if (fromBackForward) {
          jump(positions.get(urlKey()) ?? 0);
        } else if (hash && hash !== "#top" && scrollToHash(hash, true)) {
          // landed on the section
        } else if (!isFirst) {
          jump(0);
        }
        restoring = false;
      });
    });
    return () => {
      cancelAnimationFrame(outer);
      cancelAnimationFrame(inner);
    };
  }, [pathname]);

  return <>{children}</>;
};
