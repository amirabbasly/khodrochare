import { invoiceGuide } from "@/content/roadside-decision-guides";
import { DecisionGuidePage } from "@/components/seo/decision-guide-page";
import { seoMetadata } from "@/seo/metadata";
export const metadata = seoMetadata({ title: invoiceGuide.title, description: invoiceGuide.description, path: invoiceGuide.path, type: "article" });
export default function Page() { return <DecisionGuidePage guide={invoiceGuide} article />; }
