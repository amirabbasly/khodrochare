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
      if (href.startsWith("tel:")) sendEvent("click_tel", { link_url: href, page_location: window.location.href, placement: link.closest("header") ? "header" : link.closest("footer") ? "footer" : "content" });
      if (href.includes("#request")) sendEvent("service_request_start", { link_url: href, page_location: window.location.href });
      if (href.includes("wa.me") || href.includes("whatsapp")) sendEvent("click_whatsapp", { link_url: href, page_location: window.location.href });
    };
    const handleSubmit = (event: SubmitEvent) => {
      const form = event.target as HTMLFormElement | null;
      if (form?.id === "request") sendEvent("service_request_submit", { page_location: window.location.href, form_id: form.id });
    };
    document.addEventListener("click", handleClick);
    document.addEventListener("submit", handleSubmit);
    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("submit", handleSubmit);
    };
  }, []);
  return null;
}
