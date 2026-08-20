"use client";

import { useEffect } from "react";
import AOS from "aos";

export function AosProvider() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.documentElement.classList.add("aos-ready");

    AOS.init({
      duration: reducedMotion ? 0 : 650,
      easing: "ease-out-cubic",
      once: true,
      offset: 70,
    });

    const refresh = () => AOS.refresh();
    window.addEventListener("load", refresh);
    return () => {
      window.removeEventListener("load", refresh);
      document.documentElement.classList.remove("aos-ready");
    };
  }, []);

  return null;
}
