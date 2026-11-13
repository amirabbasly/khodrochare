"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Keep the existing AOS attributes/styles, but observe actual viewport intersections.
 * No global scroll polling or dependency on offsets measured before streamed layout settles.
 */
export function ScrollAnimations() {
  const pathname = usePathname();
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const observed = new WeakSet<Element>();
    let frame = 0;
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("aos-animate");
        observer.unobserve(entry.target);
      }
    }, { rootMargin: "0px 0px -48px 0px", threshold: 0 });
    const register = () => {
      frame = 0;
      document.querySelectorAll<HTMLElement>("[data-aos]").forEach(element => {
        if (observed.has(element)) return;
        observed.add(element);
        const delay = Math.min(320, Math.max(0, Number(element.dataset.aosDelay) || 0));
        element.style.setProperty("--scroll-reveal-delay", `${delay}ms`);
        element.classList.add("aos-init");
        // Initial viewport content must not disappear during hydration.
        const rect = element.getBoundingClientRect();
        if (media.matches || (rect.height > 0 && rect.top < innerHeight - 48 && rect.bottom > 0)) {
          element.classList.add("aos-animate");
        } else {
          observer.observe(element);
        }
      });
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(register); };
    const preference = () => {
      document.documentElement.dataset.scrollMotion = media.matches ? "off" : "on";
      if (media.matches) document.querySelectorAll("[data-aos]").forEach(element => element.classList.add("aos-animate"));
    };
    preference();
    register();
    // Register streamed sections and content mounted after navigation without rescanning on scroll.
    const mutations = new MutationObserver(records => {
      if (records.some(record => record.addedNodes.length)) schedule();
    });
    mutations.observe(document.body, { childList: true, subtree: true });
    media.addEventListener("change", preference);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      mutations.disconnect();
      media.removeEventListener("change", preference);
    };
  }, [pathname]);
  return null;
}
