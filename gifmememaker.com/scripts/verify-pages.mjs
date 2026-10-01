// Verifies SEO essentials on every site page (run with dev server or against dist).
// Usage: node scripts/verify-pages.mjs [--dist]
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const DIST = process.argv.includes('--dist');
const ORIGIN = 'https://gifmememaker.com';

const pages = DIST
  ? readdirSync('dist', { withFileTypes: true })
      .filter(
        (e) =>
          (e.isDirectory() || e.name === 'index.html') &&
          existsSync(join('dist', e.isDirectory() ? e.name : '', 'index.html')),
      )
      .map((e) => (e.isDirectory() ? `${e.name}/` : ''))
  : ['', 'about-us/', 'contact-us/', 'privacy-policy/', 'terms-and-conditions/'];

let failures = 0;

const fail = (msg) => {
  console.error(`  ✖ ${msg}`);
  failures++;
};

for (const p of pages.sort()) {
  const html = DIST
    ? readFileSync(join('dist', p, 'index.html'), 'utf8')
    : await (await fetch(`http://localhost:4321/${p}`)).text();

  console.log(`/${p || ''}`);

  const title = html.match(/<title>([^<]*)<\/title>/)?.[1] ?? '';
  const desc = html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? '';
  const canonical = html.match(/<link rel="canonical" href="([^"]*)"/)?.[1] ?? '';
  const ogUrl = html.match(/<meta property="og:url" content="([^"]*)"/)?.[1] ?? '';
  const ogImage = html.match(/<meta property="og:image" content="([^"]*)"/)?.[1] ?? '';
  const h1Count = (html.match(/<h1[\s>]/g) ?? []).length;
  const jsonLd = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];

  if (!title) fail('missing <title>');
  if (!desc) fail('missing meta description');
  if (canonical !== `${ORIGIN}/${p}`) fail(`canonical "${canonical}" != "${ORIGIN}/${p}"`);
  if (ogUrl !== canonical) fail(`og:url "${ogUrl}" != canonical`);
  if (!ogImage) fail('missing og:image');
  if (h1Count !== 1) fail(`H1 count = ${h1Count} (expected 1)`);

  const types = [];
  for (const [, raw] of jsonLd) {
    try {
      const j = JSON.parse(raw);
      if (j['@graph']) types.push(...j['@graph'].map((x) => x['@type']));
      else types.push(j['@type']);
    } catch {
      fail('JSON-LD failed to parse');
    }
  }
  if (!types.includes('WebSite')) fail('missing WebSite schema');

  if (p !== '') {
    if (!types.includes('BreadcrumbList')) fail('missing BreadcrumbList schema');
    if (!html.includes(`href="/${p}"`)) fail('page not linked from its own footer/nav');
  }

  console.log(
    `  title: ${title} (${title.length} chars) | H1: ${h1Count} | JSON-LD: ${types.join(',')}`,
  );
}

// Error pages: exist, are noindexed, and have exactly one H1.
const errorPages = DIST ? ['404.html', '500.html'] : [];
for (const f of errorPages) {
  const path = join('dist', f);
  if (!existsSync(path)) {
    fail(`missing dist/${f}`);
    continue;
  }
  const html = readFileSync(path, 'utf8');
  console.log(`/${f}`);
  if (!html.includes('noindex')) fail(`${f}: missing noindex robots meta`);
  const h1 = (html.match(/<h1[\s>]/g) ?? []).length;
  if (h1 !== 1) fail(`${f}: H1 count = ${h1}`);
  const title = html.match(/<title>([^<]*)<\/title>/)?.[1] ?? '';
  console.log(`  title: ${title} | H1: ${h1} | noindex: yes`);
}

// Dev mode: an unknown URL must return status 404 with our custom page.
if (!DIST) {
  const res = await fetch('http://localhost:4321/this-page-does-not-exist');
  const html = await res.text();
  console.log('/[unknown route]');
  if (res.status !== 404) fail(`unknown route returned ${res.status}, expected 404`);
  if (!html.includes('noindex')) fail('custom 404 is missing noindex robots meta');
  if (!html.includes('This page ghosted us')) fail('custom 404 content not served');
  const h1 = (html.match(/<h1[\s>]/g) ?? []).length;
  if (h1 !== 1) fail(`404 page: H1 count = ${h1}`);
  console.log(`  status: ${res.status} | noindex: yes | H1: ${h1}`);
}

console.log(failures === 0 ? '\n✔ All pages passed' : `\n✖ ${failures} failure(s)`);
process.exit(failures === 0 ? 0 : 1);
