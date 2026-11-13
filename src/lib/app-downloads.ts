import { statSync } from "node:fs";
import { join } from "node:path";

/** Server/build only. Releases are uploaded separately, never inferred from web-app links. */
export const appDownloads = {
  customer: { name: "خودرو چاره مشتریان", filename: "khodrochare-customer.apk" },
  fleet: { name: "سفیران خودرو چاره", filename: "khodrochare-safir.apk" },
} as const;
export type DownloadApp = keyof typeof appDownloads;

export function getAppDownload(app: DownloadApp, publicDirectory = join(process.cwd(), "public")) {
  const release = appDownloads[app];
  const href = `/downloads/${release.filename}`;
  try {
    const file = statSync(join(publicDirectory, "downloads", release.filename));
    return { ...release, href, available: file.isFile() && file.size > 0, bytes: file.size };
  } catch {
    return { ...release, href, available: false, bytes: 0 };
  }
}
