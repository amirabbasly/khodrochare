/** Accept Persian/Arabic numerals without silently accepting partial numbers. */
export function normalizeDigits(value: string): string {
  return value.replace(/[۰-۹]/g, (digit) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(digit)))
    .replace(/[٠-٩]/g, (digit) => String("٠١٢٣٤٥٦٧٨٩".indexOf(digit)));
}
export function parseNonNegativeNumber(value: string): number | null {
  const normalized = normalizeDigits(value.trim()).replace(/[٬,]/g, "").replace(/٫/g, ".");
  if (!/^\d+(?:\.\d+)?$/.test(normalized)) return null;
  const number = Number(normalized);
  return Number.isFinite(number) && number >= 0 ? number : null;
}

export function normalizeIranPhone(value: string): string {
  return normalizeDigits(value).replace(/[\s()-]/g, "").replace(/^(?:\+98|0098|98)(?=9)/, "0");
}
