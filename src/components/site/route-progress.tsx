"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export function RouteProgress() {
  const pathname = usePathname();
  const previousPathname = useRef(pathname);
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const link = target?.closest("a");
      const href = link?.getAttribute("href");
      if (!href || !href.startsWith("/") || href.startsWith("//") || href === window.location.pathname) return;
      setVisible(true);
      setProgress(18);
      window.setTimeout(() => setProgress(72), 120);
    };

    document.addEventListener("click", handleClick, true);
    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, []);

  useEffect(() => {
    if (previousPathname.current === pathname || !visible) return;
    previousPathname.current = pathname;
    const completeTimer = window.setTimeout(() => setProgress(100), 0);
    const hideTimer = window.setTimeout(() => {
      setVisible(false);
      setProgress(0);
    }, 260);
    return () => { clearTimeout(completeTimer); clearTimeout(hideTimer); };
  }, [pathname, visible]);

  return <div className={`pointer-events-none fixed inset-x-0 top-0 z-[200] h-1 transition-opacity duration-200 ${visible ? "opacity-100" : "opacity-0"}`} aria-hidden="true"><div className="h-full bg-brand-orange shadow-[0_0_14px_rgba(255,83,21,.8)] transition-[width] duration-300 ease-out" style={{ width: `${progress}%` }} /></div>;
}
