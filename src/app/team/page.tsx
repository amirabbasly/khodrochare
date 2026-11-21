import { TeamShowcase } from "@/components/site/team-showcase";
import { SubpageShell } from "@/components/site/subpage-shell";
import { seoMetadata } from "@/seo/metadata";
export const metadata = seoMetadata({ title: "تیم ما | خانواده خودرو چاره", description: "آشنایی با مدیریت و تیم عملیات، فنی و پشتیبانی خودرو چاره و راه ارتباط رسمی با مجموعه.", path: "/team" });
export default function TeamPage() {
  return <SubpageShell><h1 className="sr-only">تیم ما؛ خودرو چاره</h1><TeamShowcase /></SubpageShell>;
}
