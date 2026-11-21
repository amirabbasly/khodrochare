import Link from "next/link";
import { contextualParts } from "@/lib/contextual-links";
/** Server-only inline links: no extra section, client script or speculative prefetch. */
export function contextualCopy(text: string, path: string, used: Set<string>) {
  return contextualParts(text, path, used).map((part, index) => part.href
    ? <Link key={`${part.href}-${index}`} href={part.href} data-contextual-link="service" prefetch={false} className="font-bold text-brand-orange underline underline-offset-4">{part.text}</Link>
    : part.text);
}
