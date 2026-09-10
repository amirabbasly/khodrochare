export const toolIds = ["transport-selector", "breakdown-guide", "obd-code", "quote-comparison", "cost-calculator"] as const;
export type ToolId = (typeof toolIds)[number];
