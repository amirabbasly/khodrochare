import { providerGuide } from "@/content/roadside-decision-guides";
import { DecisionGuidePage } from "@/components/seo/decision-guide-page";
import { seoMetadata } from "@/seo/metadata";
export const metadata = seoMetadata({ title: providerGuide.title, description: providerGuide.description, path: providerGuide.path });
export default function Page() { return <DecisionGuidePage guide={providerGuide} />; }
