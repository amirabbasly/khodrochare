import { notFound } from "next/navigation";
import { onlineServiceCluster } from "@/content/online-service-cluster";
import { DecisionGuidePage } from "@/components/seo/decision-guide-page";
import { seoMetadata } from "@/seo/metadata";
export const dynamicParams = false;
export function generateStaticParams() { return onlineServiceCluster.map(guide => ({ slug: guide.path.split("/").pop()! })); }
async function getGuide(params: Promise<{ slug: string }>) {
  const { slug } = await params;
  const guide = onlineServiceCluster.find(item => item.path === `/guides/${slug}`);
  if (!guide) notFound();
  return guide;
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const guide = await getGuide(params);
  return seoMetadata({ title: guide.title, description: guide.description, path: guide.path });
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) { return <DecisionGuidePage guide={await getGuide(params)} />; }
