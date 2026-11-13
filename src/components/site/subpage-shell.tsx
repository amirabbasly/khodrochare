import { PageDiscussion } from "@/components/community/page-discussion";
import type { ReactNode } from "react";
import { ResponsiveSiteHeader } from "@/components/home/site-header";
import { SiteFaq } from "./site-faq";
import { SiteFooter } from "./site-footer";

export function SubpageShell({ children, showGeneralFaq = true }: { children: ReactNode; showGeneralFaq?: boolean }) {
  return <div className="landing-surface min-h-screen text-ink"><ResponsiveSiteHeader /><main id="main-content">{children}<PageDiscussion /></main>{showGeneralFaq && <SiteFaq />}<SiteFooter /></div>;
}
