import { mkdir, writeFile } from "node:fs/promises";
import { indexablePaths } from "./lib/route-inventory";
import { absoluteUrl } from "../src/seo/metadata";
async function main() {
await mkdir("docs", { recursive: true });
await writeFile("docs/google-indexing-urls.txt", indexablePaths.map(absoluteUrl).join("\n") + "\n");
console.log(`Exported ${indexablePaths.length} canonical URLs to docs/google-indexing-urls.txt (use only after production deployment).`);

}
main().catch((error: Error) => { console.error(error); process.exitCode = 1; });
