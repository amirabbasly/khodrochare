/** Accept Persian/Arabic numerals without silently accepting partial numbers. */
export function normalizeDigits(value: string): string {
  return value.replace(/[۰-۹]/g, (digit) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(digit)))
    .replace(/[٠-٩]/g, (digit) => String("٠١٢٣٤٥٦٧٨٩".indexOf(digit)));
}
export function parseNonNegativeNumber(value: string): number | null {
  const normalized = normalizeDigits(value.trim()).replace(/٫/g, ".");
  // Do not silently reinterpret malformed grouping such as "1,5" as fifteen.
  if (!/^(?:\d+|\d{1,3}(?:[٬,]\d{3})+)(?:\.\d+)?$/.test(normalized)) return null;
  const number = Number(normalized.replace(/[٬,]/g, ""));
  return Number.isFinite(number) && number >= 0 ? number : null;
}

export function normalizeIranPhone(value: string): string {
  return normalizeDigits(value).replace(/[\s()-]/g, "").replace(/^(?:\+98|0098|98)(?=9)/, "0");
}
