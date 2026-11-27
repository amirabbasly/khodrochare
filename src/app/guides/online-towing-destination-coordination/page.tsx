import { onlineServiceCluster } from "@/content/online-service-cluster";
import { DecisionGuidePage } from "@/components/seo/decision-guide-page";
import { seoMetadata } from "@/seo/metadata";

// Explicit route entry also makes this URL independently visible in deployment manifests.
const guide = onlineServiceCluster.find(item => item.path === "/guides/online-towing-destination-coordination")!;
export const metadata = seoMetadata({ title: guide.title, description: guide.description, path: guide.path });
export default function Page() { return <DecisionGuidePage guide={guide} />; }
