// Local lab audit only. Not CrUX, not a field Core Web Vitals certification.
// Optional tooling: npm install --no-save --package-lock=false lighthouse @sparticuz/chromium
// CHROME_PATH=/path/to/chromium node scripts/audit-tehran-performance.mjs
import { mkdir, writeFile } from 'node:fs/promises';
import lighthouse from 'lighthouse';
import { launch } from 'chrome-launcher';
import { withProductionServer } from './lib/production-server.mjs';

await mkdir('coverage/tehran-performance', { recursive: true });
await withProductionServer(async origin => {
  const chrome = await launch({ chromePath: process.env.CHROME_PATH, chromeFlags: ['--headless', '--no-sandbox', '--disable-dev-shm-usage', '--disable-gpu'] });
  try {
    const results = [];
    for (const path of ['/تهران', '/تهران/یدک-کش', '/roads/tehran-highways']) {
      const result = await lighthouse(new URL(path, origin).href, { port: chrome.port, output: 'json', logLevel: 'error', onlyCategories: ['performance', 'seo', 'accessibility'], formFactor: 'mobile', screenEmulation: { mobile: true, width: 360, height: 800, deviceScaleFactor: 1, disabled: false } });
      const { lhr } = result;
      results.push({ path, scores: Object.fromEntries(Object.entries(lhr.categories).map(([key, value]) => [key, value.score])), metrics: Object.fromEntries(['first-contentful-paint', 'largest-contentful-paint', 'cumulative-layout-shift', 'total-blocking-time', 'speed-index'].map(key => [key, lhr.audits[key]?.numericValue])), opportunities: Object.values(lhr.audits).filter(audit => audit.score !== null && audit.score < 0.9 && audit.details?.type === 'opportunity').map(audit => ({ id: audit.id, title: audit.title, savingsMs: audit.details.overallSavingsMs })), failures: Object.values(lhr.audits).filter(audit => audit.score === 0).map(audit => ({ id: audit.id, title: audit.title })) });
      await writeFile(`coverage/tehran-performance/${encodeURIComponent(path)}.json`, JSON.stringify(lhr, null, 2));
    }
    await writeFile('coverage/tehran-performance/summary.json', JSON.stringify(results, null, 2));
    console.log(JSON.stringify(results, null, 2));
  } finally { await chrome.kill(); }
});
