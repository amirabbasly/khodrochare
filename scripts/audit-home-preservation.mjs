import { createHash } from 'node:crypto';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { load } from 'cheerio';
import { withProductionServer } from './lib/production-server.mjs';

const baselineFile = process.argv[3] ?? '/tmp/seo-home-baseline.json';
const mode = process.argv[2] ?? 'compare';
const files = execFileSync('git', ['ls-files', 'src/components/home', 'src/components/site', 'src/app/globals.css', 'src/app/page.tsx', 'public'], { encoding: 'utf8' }).trim().split('\n');
const hash = value => createHash('sha256').update(value).digest('hex');
const sources = Object.fromEntries(await Promise.all(files.map(async file => [file, hash(await readFile(file))])));
const layout = await readFile('src/app/layout.tsx', 'utf8');
sources['root-layout-render'] = hash(layout.slice(layout.indexOf('export default')));
await withProductionServer(async origin => {
  const response = await fetch(origin);
  if (response.status !== 200) throw new Error('Homepage did not return 200');
  const $ = load(await response.text());
  // Flight payload and bundle names can change without changing rendered homepage markup.
  $('script,link,style').remove();
  const bodyHash = hash($('body').html());
  const snapshot = { sources, bodyHash, links: $('body a[href]').map((_, el) => $(el).attr('href')).get() };
  if (mode === 'capture') {
    await writeFile(baselineFile, JSON.stringify(snapshot, null, 2));
    console.log('Captured homepage source and SSR markup baseline');
  } else {
    const before = JSON.parse(await readFile(baselineFile, 'utf8'));
    const changed = Object.keys(before.sources).filter(file => before.sources[file] !== sources[file]);
    const report = { sourceFilesChecked: files.length, changedSources: changed, renderedMarkupUnchanged: before.bodyHash === bodyHash, linkDestinationsUnchanged: JSON.stringify(before.links) === JSON.stringify(snapshot.links), visualBrowserComparison: 'not performed', fieldCoreWebVitals: 'not measured' };
    await mkdir('coverage/seo', { recursive: true });
    await writeFile('coverage/seo/home-preservation.json', JSON.stringify(report, null, 2));
    console.log(JSON.stringify(report, null, 2));
    if (changed.length || !report.renderedMarkupUnchanged || !report.linkDestinationsUnchanged) throw new Error('Homepage preservation failed');
  }
});
