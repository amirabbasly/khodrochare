import type { EditorialSection } from "@/content/editorial-types";
import { EditorialDetails } from "./editorial-content";
import { Section } from "./landing-ui";

/** Server-rendered text and accessible tables; no client bundle or new URLs. */
export function DecisionSections({ sections }: { sections: readonly EditorialSection[] }) {
  return sections.map(section => <Section key={section.title} title={section.title}><p>{section.body}</p><EditorialDetails section={section} /></Section>);
}
