"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// AOS installs global scroll handlers; initialise once, including across client navigations.
let ready: Promise<typeof import("aos")["default"]> | undefined;
let initialised = false;
function loadAos() {
  ready ??= import("aos").then(module => module.default);
  return ready;
}

export function ScrollAnimations() {
  const pathname = usePathname();
  useEffect(() => {
    let disposed = false;
    let frame = 0;
    let engine: Awaited<ReturnType<typeof loadAos>> | undefined;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const preference = () => { document.documentElement.dataset.scrollMotion = media.matches ? "off" : "on"; };
    const stagger = () => {
      document.querySelectorAll<HTMLElement>("[data-aos]").forEach(element => {
        const delay = Math.min(320, Math.max(0, Number(element.dataset.aosDelay) || 0));
        element.style.setProperty("--scroll-reveal-delay", `${delay}ms`);
      });
    };
    const refresh = () => {
      if (disposed || !engine || frame) return;
      frame = requestAnimationFrame(() => { frame = 0; stagger(); engine?.refreshHard(); });
    };
    loadAos().then(async aos => {
      // Next may hydrate inside a hidden streaming container. AOS must not measure
      // that zero-height tree, otherwise once:true incorrectly reveals every section.
      let layoutReady = false;
      for (let attempt = 0; attempt < 120 && !disposed; attempt++) {
        await new Promise<void>(resolve => requestAnimationFrame(() => resolve()));
        if ((document.querySelector("main")?.getBoundingClientRect().height ?? 0) > 0) {
          layoutReady = true;
          break;
        }
      }
      if (disposed || !layoutReady) return;
      if (!initialised) {
        aos.init({ startEvent: "khodrochare:aos-ready", duration: 480, easing: "ease-out-cubic", once: true, offset: 48, disableMutationObserver: true, throttleDelay: 100 });
        document.dispatchEvent(new Event("khodrochare:aos-ready"));
        initialised = true;
      }
      engine = aos;
      stagger();
      aos.refreshHard();
      // Enable scoped animation styles only AFTER AOS has classified in-view content.
      preference();
      document.fonts.ready.then(refresh);
    }).catch(() => { if (!disposed) document.documentElement.dataset.scrollMotion = "off"; });
    media.addEventListener("change", preference);
    document.addEventListener("toggle", refresh, true);
    document.addEventListener("load", refresh, true);
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      media.removeEventListener("change", preference);
      document.removeEventListener("toggle", refresh, true);
      document.removeEventListener("load", refresh, true);
    };
  }, [pathname]);
  return null;
}
