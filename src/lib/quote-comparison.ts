export type QuotedPrice = { quoted: number; extras: number; discount: number };
export function quoteTotal(quote: QuotedPrice): number {
  for (const value of [quote.quoted, quote.extras, quote.discount]) {
    if (!Number.isSafeInteger(value) || value < 0 || value > 1_000_000_000) throw new Error("invalid_amount");
  }
  const subtotal = quote.quoted + quote.extras;
  if (quote.discount > subtotal) throw new Error("discount_exceeds_total");
  return subtotal - quote.discount;
}
export function compareQuotes(first: QuotedPrice, second: QuotedPrice, sameScope: boolean) {
  if (sameScope !== true) throw new Error("different_scope");
  const firstTotal = quoteTotal(first); const secondTotal = quoteTotal(second);
  return { firstTotal, secondTotal, difference: Math.abs(firstTotal - secondTotal), lower: firstTotal === secondTotal ? "equal" as const : firstTotal < secondTotal ? "first" as const : "second" as const };
}
