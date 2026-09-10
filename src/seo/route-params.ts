/** Next's prerender/runtime params may contain percent-encoded Persian segments. */
export function decodeRouteParam(value: string): string {
  try { return decodeURIComponent(value); } catch { return ""; }
}
