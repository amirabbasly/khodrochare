"use client";

import Script from "next/script";

const measurementId = process.env.NEXT_PUBLIC_GA_ID;

/**
 * Loads GA4 only when NEXT_PUBLIC_GA_ID is configured, so the site keeps a clean
 * head (and a fast LCP) until measurement is actually needed.
 */
export function Analytics() {
  if (!measurementId) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${measurementId}',{anonymize_ip:true});`}
      </Script>
    </>
  );
}
