import { roadsideCoordinationCluster } from "@/content/roadside-coordination-cluster";
import { DecisionGuidePage } from "@/components/seo/decision-guide-page";
import { seoMetadata } from "@/seo/metadata";
const guide = roadsideCoordinationCluster.find(item => item.path === "/guides/company-car-roadside-coordination")!;
export const metadata = seoMetadata({ title: guide.title, description: guide.description, path: guide.path });
export default function Page() { return <DecisionGuidePage guide={guide} />; }
