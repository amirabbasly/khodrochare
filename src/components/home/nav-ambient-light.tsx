"use client";

import { useEffect, useRef } from "react";

/** One compositor-only glow on desktop. Random waypoints, no render loop or React updates. */
export function NavAmbientLight() {
  const light = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const element = light.current;
    if (!element) return;
    const media = window.matchMedia("(min-width: 1280px) and (prefers-reduced-motion: no-preference)");
    let animation: Animation | undefined;
    const update = () => {
      animation?.cancel();
      animation = undefined;
      if (!media.matches || document.hidden) return;
      const width = element.parentElement!.clientWidth;
      const point = () => `translate3d(${Math.round(Math.random() * width - 130)}px, ${Math.round(Math.random() * 44 - 90)}px, 0)`;
      const first = point();
      animation = element.animate([
        { transform: first, opacity: 0.5 },
        { transform: point(), opacity: 0.9 },
        { transform: point(), opacity: 0.65 },
        { transform: first, opacity: 0.5 },
      ], { duration: 18000 + Math.random() * 12000, iterations: Infinity, easing: "ease-in-out" });
    };
    update();
    media.addEventListener("change", update);
    window.addEventListener("resize", update);
    document.addEventListener("visibilitychange", update);
    return () => {
      animation?.cancel();
      media.removeEventListener("change", update);
      window.removeEventListener("resize", update);
      document.removeEventListener("visibilitychange", update);
    };
  }, []);
  return <span className="nav-ambient-clip" aria-hidden="true"><span ref={light} className="nav-ambient-orb" /></span>;
}
