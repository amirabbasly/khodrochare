import { serviceKnowledge, localServiceGuides } from "./service-knowledge";
import { tools } from "./tools";
/** Only pages whose visible editorial content changed in this release receive this date. */
export const growthUpdatedAt = "2026-09-07";
export const growthUpdatedPaths = new Set([
  "/", "/blog", "/pricing", "/امداد-خودرو", "/امداد-خودرو-آنلاین", "/tools",
  ...tools.map((tool) => `/tools/${tool.slug}`),
  ...Object.keys(serviceKnowledge).map((slug) => `/services/${slug}`),
  ...Object.keys(localServiceGuides),
]);
