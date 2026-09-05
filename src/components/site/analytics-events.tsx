"use client";

import { useEffect } from "react";

type AnalyticsWindow = Window & {
  dataLayer?: Record<string, unknown>[];
  gtag?: (command: "event", eventName: string, parameters: Record<string, unknown>) => void;
};

function sendEvent(eventName: string, parameters: Record<string, unknown>) {
  const analyticsWindow = window as AnalyticsWindow;
  if (typeof analyticsWindow.gtag === "function") analyticsWindow.gtag("event", eventName, parameters);
  else {
    analyticsWindow.dataLayer = analyticsWindow.dataLayer ?? [];
    analyticsWindow.dataLayer.push({ event: eventName, ...parameters });
  }
}

export function AnalyticsEvents() {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest<HTMLAnchorElement>("a[href]");
      if (!link) return;
      const href = link.getAttribute("href") ?? "";
      if (href.startsWith("tel:")) sendEvent("click_tel", { link_url: href, page_path: window.location.pathname, placement: link.closest("header") ? "header" : link.closest("footer") ? "footer" : "content" });
      if (href.includes("#request")) sendEvent("service_request_start", { page_path: window.location.pathname });
      if (href.startsWith("mailto:")) sendEvent("contact_email_intent", { page_path: window.location.pathname });
      if (href.includes("wa.me") || href.includes("whatsapp")) sendEvent("click_whatsapp", { page_path: window.location.pathname });
    };
    const handleRequestResult = (event: Event) => {
      const status = (event as CustomEvent<{ status: string }>).detail?.status;
      if (["prepared", "attempt", "received"].includes(status)) sendEvent(`service_request_${status}`, { page_path: window.location.pathname });
    };
    document.addEventListener("click", handleClick);
    window.addEventListener("service-request-result", handleRequestResult);
    return () => {
      document.removeEventListener("click", handleClick);
      window.removeEventListener("service-request-result", handleRequestResult);
    };
  }, []);
  return null;
}
