"use client";

import { useState } from "react";
import { businessFacts } from "@/content/business";

/** The issuer must receive the browser's origin; do not proxy or optimize this seal. */
export function EnamadBadge() {
  const [loaded, setLoaded] = useState(false);
  return <a href={businessFacts.trustBadges.enamadUrl} referrerPolicy="origin" target="_blank" rel="noopener" aria-label="استعلام نماد اعتماد الکترونیکی خودرو چاره" title="استعلام نماد اعتماد الکترونیکی" className="relative inline-flex h-36 w-28 shrink-0 cursor-pointer items-center justify-center rounded-xl p-2 transition hover:bg-orange-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-400">
    {!loaded && <span className="absolute inset-2 bg-contain bg-center bg-no-repeat" role="img" aria-label="استعلام نماد؛ برای مشاهده وضعیت رسمی کلیک کنید" style={{ backgroundImage: "url(/images/enamad-transparent.png)" }} />}
    {/* eslint-disable-next-line @next/next/no-img-element -- Official dynamic seal requires a direct browser request and origin referrer. */}
    <img src={businessFacts.trustBadges.enamadLogoUrl} referrerPolicy="origin" alt="نماد اعتماد الکترونیکی خودرو چاره" width={96} height={120} onLoad={event => setLoaded(event.currentTarget.naturalWidth > 0)} onError={() => setLoaded(false)} style={{ cursor: "pointer", objectFit: "contain", opacity: loaded ? 1 : 0 }} {...{ code: "wd7JhqszKASC7UMkfKyIV34pBN1X2RTk" }} />
  </a>;
}
