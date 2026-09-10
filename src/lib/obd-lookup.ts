import { obdCodes } from "@/content/obd-codes";
import { normalizeDigits } from "./numbers";

export function lookupObd(value: string) {
  if (value.length > 20) return { status: "invalid" as const };
  const code = normalizeDigits(value).replace(/\s+/g, "").toUpperCase();
  if (!/^[PBCU][0-3][0-9A-F]{3}$/.test(code)) return { status: "invalid" as const };
  const entry = obdCodes.find((item) => item.code === code);
  return entry ? { status: "found" as const, code, entry } : { status: "unknown" as const, code };
}
