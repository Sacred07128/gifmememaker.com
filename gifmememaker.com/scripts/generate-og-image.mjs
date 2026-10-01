// Generates public/og-image.png (1200x630) for Open Graph / Twitter cards.
// Run: node scripts/generate-og-image.mjs
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, '..', 'public', 'og-image.png');

const svg = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0a0a0a"/>
      <stop offset="100%" stop-color="#111827"/>
    </linearGradient>
    <radialGradient id="glow1" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#0070f3" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="#0070f3" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glow2" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#ff0080" stop-opacity="0.40"/>
      <stop offset="100%" stop-color="#ff0080" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glow3" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#7928ca" stop-opacity="0.40"/>
      <stop offset="100%" stop-color="#7928ca" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="1200" height="630" fill="url(#bg)"/>
  <circle cx="180" cy="120" r="320" fill="url(#glow1)"/>
  <circle cx="1050" cy="520" r="300" fill="url(#glow2)"/>
  <circle cx="820" cy="90" r="260" fill="url(#glow3)"/>

  <!-- Brand badge -->
  <rect x="72" y="72" rx="24" ry="24" width="64" height="64" fill="#ffffff"/>
  <text x="104" y="118" font-family="Arial, Helvetica, sans-serif" font-size="40" font-weight="700" fill="#171717" text-anchor="middle">G</text>
  <text x="156" y="116" font-family="Arial, Helvetica, sans-serif" font-size="30" font-weight="700" fill="#ffffff">gifmememaker.com</text>

  <!-- Eyebrow -->
  <text x="72" y="255" font-family="Arial, Helvetica, sans-serif" font-size="26" font-weight="700" letter-spacing="6" fill="#3291ff">FREE • NO SIGNUP • 100% PRIVATE</text>

  <!-- Headline -->
  <text x="72" y="360" font-family="Arial, Helvetica, sans-serif" font-size="96" font-weight="800" fill="#ffffff">MEME MAKER</text>
  <text x="72" y="452" font-family="Arial, Helvetica, sans-serif" font-size="64" font-weight="800" fill="#0070f3">AI • GIF • VIDEO</text>

  <!-- Sub copy -->
  <text x="72" y="516" font-family="Arial, Helvetica, sans-serif" font-size="30" font-weight="400" fill="#a1a1a1">Make memes online in seconds — AI captions, 70+ templates, instant downloads.</text>

  <!-- Domain pill -->
  <rect x="72" y="548" rx="26" ry="26" width="330" height="54" fill="#ffffff" fill-opacity="0.10" stroke="#333333"/>
  <text x="237" y="583" font-family="Arial, Helvetica, sans-serif" font-size="26" font-weight="700" fill="#ffffff" text-anchor="middle">70+ FREE TEMPLATES</text>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile(OUT);

const meta = await sharp(OUT).metadata();
console.log(`Wrote ${OUT} — ${meta.width}x${meta.height}`);
