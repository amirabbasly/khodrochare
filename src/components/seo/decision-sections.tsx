import { contextualCopy } from "./contextual-copy";
import type { EditorialSection } from "@/content/editorial-types";
import { EditorialDetails } from "./editorial-content";
import { Section } from "./landing-ui";

/** Server-rendered text and accessible tables; no client bundle or new URLs. */
export function DecisionSections({ sections, path = "" }: { sections: readonly EditorialSection[]; path?: string }) {
  const used = new Set<string>();
  return sections.map(section => <Section key={section.title} title={section.title}><p>{contextualCopy(section.body, path, used)}</p><EditorialDetails section={section} /></Section>);
}
