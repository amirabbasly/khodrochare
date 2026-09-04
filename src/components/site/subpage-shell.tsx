import type { ReactNode } from "react";
import { ResponsiveSiteHeader } from "@/components/home/site-header";
import { SiteFaq } from "./site-faq";
import { SiteFooter } from "./site-footer";

export function SubpageShell({ children }: { children: ReactNode }) {
  return <div className="min-h-screen bg-[#f5f7f9] text-ink"><ResponsiveSiteHeader /><main id="main-content">{children}</main><SiteFaq /><SiteFooter /></div>;
}
