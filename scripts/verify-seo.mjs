// Quick on-page SEO verification against the running dev server (or dist/).
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const useDist = process.argv.includes('--dist');

const html = useDist
  ? fs.readFileSync(path.join(__dirname, '..', 'dist', 'index.html'), 'utf8')
  : await new Promise((resolve) => {
      http.get('http://localhost:4321/', (res) => {
        let d = '';
        res.on('data', (c) => (d += c));
        res.on('end', () => resolve(d));
      });
    });

const kws = [
  'meme maker',
  'meme maker online',
  'video meme maker',
  'online meme maker',
  'meme maker app',
  'ai meme maker',
  'meme maker ai',
  'meme maker free',
  'gif meme maker',
  'best meme maker app',
  'meme maker video',
  'meme maker gif',
  'free meme maker',
  'free meme maker app',
];

const body = html
  .replace(/<script[\s\S]*?<\/script>/g, ' ')
  .replace(/<[^>]+>/g, ' ')
  .toLowerCase();

console.log('--- keyword occurrences in visible page text ---');
for (const k of kws) {
  console.log(String(body.split(k).length - 1).padStart(3), k);
}

const h1s = [...html.matchAll(/<h1[\s\S]*?<\/h1>/g)].map((m) =>
  m[0].replace(/<[^>]+>/g, '').trim()
);
console.log('\nH1 count:', h1s.length, '->', h1s.join(' | '));
console.log('H2 count:', (html.match(/<h2/g) || []).length);
console.log('canonical:', (html.match(/rel="canonical" href="([^"]+)/) || [])[1]);
console.log('og:url:', (html.match(/property="og:url" content="([^"]+)/) || [])[1]);
console.log('og:image:', (html.match(/property="og:image" content="([^"]+)/) || [])[1]);

const title = (html.match(/<title>([^<]*)<\/title>/) || [])[1] || '';
console.log('title:', title, `(${title.length} chars)`);

const schemaBlocks = [...html.matchAll(
  /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g
)];
console.log('JSON-LD blocks:', schemaBlocks.length);
for (const [, raw] of schemaBlocks) {
  const j = JSON.parse(raw);
  console.log(
    '  -',
    j['@graph'] ? j['@graph'].map((g) => g['@type']).join(',') : j['@type']
  );
}
