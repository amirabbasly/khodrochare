export type QuoteInput = { base: number; distance: number; includedKm: number; perKm: number; waitingMinutes: number; perMinute: number; parts: number; extras: number; discount: number };
export type QuoteResult = { base: number; billableKm: number; transport: number; waiting: number; parts: number; extras: number; discount: number; subtotal: number; total: number };
/** Arithmetic only. No official tariffs, route estimates or vehicle multipliers are invented. */
export function calculateQuote(input: QuoteInput): QuoteResult {
  for (const [key, value] of Object.entries(input)) {
    if (!Number.isFinite(value) || value < 0 || value > 1_000_000_000) throw new Error(`invalid_${key}`);
  }
  if (input.distance > 10000 || input.includedKm > 10000 || input.waitingMinutes > 10080) throw new Error("invalid_range");
  for (const key of ["base", "perKm", "perMinute", "parts", "extras", "discount"] as const) {
    if (!Number.isSafeInteger(input[key])) throw new Error("invalid_currency");
  }
  const billableKm = Math.max(0, input.distance - input.includedKm);
  const transport = Math.round(billableKm * input.perKm);
  const waiting = Math.round(input.waitingMinutes * input.perMinute);
  const subtotal = input.base + transport + waiting + input.parts + input.extras;
  if (!Number.isSafeInteger(subtotal) || input.discount > subtotal) throw new Error("invalid_total");
  return { base: input.base, billableKm, transport, waiting, parts: input.parts, extras: input.extras, discount: input.discount, subtotal, total: subtotal - input.discount };
}
