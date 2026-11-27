import { onlineServiceCluster } from "@/content/online-service-cluster";
import { DecisionGuidePage } from "@/components/seo/decision-guide-page";
import { seoMetadata } from "@/seo/metadata";

const guide = onlineServiceCluster.find(item => item.path === "/guides/night-roadside-access-planning")!;
export const metadata = seoMetadata({ title: guide.title, description: guide.description, path: guide.path });
export default function Page() { return <DecisionGuidePage guide={guide} />; }
