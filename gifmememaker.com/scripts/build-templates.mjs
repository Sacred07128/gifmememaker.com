import fs from 'node:fs';
import path from 'node:path';

const existingData = fs.readFileSync('src/utils/memeData.ts', 'utf8');

// Parse existing items
const existingIds = new Set();
const match = existingData.match(/export const MEME_TEMPLATES: MemeTemplate\[\] = \[([\s\S]*?)\];/);
if (!match) throw new Error('Could not find MEME_TEMPLATES');

const idMatches = [...match[1].matchAll(/id:\s*['"]([^'"]+)['"]/g)];
for (const m of idMatches) {
  existingIds.add(m[1]);
}
console.log('Existing template IDs count:', existingIds.size);

const newGifs = [
  {
    id: 'blinking-guy',
    name: 'Blinking White Guy',
    type: 'gif',
    isPremium: false,
    category: 'GIFs',
    url: '/assets/gifs/blinking-guy.gif',
    topDefault: 'TEACHER: THE TEST IS EASY',
    bottomDefault: 'THE TEST:'
  },
  {
    id: 'leo-cheers-gif',
    name: 'Leonardo DiCaprio Cheers Toast',
    type: 'gif',
    isPremium: false,
    category: 'GIFs',
    url: '/assets/gifs/leo-cheers.gif',
    topDefault: 'CHEERS TO THE CODE',
    bottomDefault: 'THAT WORKED ON THE FIRST RUN'
  },
  {
    id: 'kermit-tea',
    name: 'Kermit Sipping Tea',
    type: 'gif',
    isPremium: false,
    category: 'GIFs',
    url: '/assets/gifs/kermit-tea.gif',
    topDefault: 'I WARNED YOU ABOUT THAT BUG',
    bottomDefault: 'BUT THAT IS NONE OF MY BUSINESS'
  },
  {
    id: 'mind-blown',
    name: 'Mind Blown Reaction',
    type: 'gif',
    isPremium: false,
    category: 'GIFs',
    url: '/assets/gifs/mind-blown.gif',
    topDefault: 'WHEN YOU REALIZE',
    bottomDefault: 'YOU CAN MAKE MEMES 100% IN BROWSER'
  },
  {
    id: 'rock-eyebrow',
    name: 'The Rock Eyebrow Raise',
    type: 'gif',
    isPremium: false,
    category: 'GIFs',
    url: '/assets/gifs/rock-eyebrow.gif',
    topDefault: 'WHEN SOMEONE PUSHES DIRECTLY TO MAIN',
    bottomDefault: 'AND SAYS TRUST ME BRO'
  },
  {
    id: 'pop-cat',
    name: 'Pop Cat Animated',
    type: 'gif',
    isPremium: false,
    category: 'GIFs',
    url: '/assets/gifs/pop-cat.gif',
    topDefault: 'ME YAPPING WITH NO EVIDENCE',
    bottomDefault: 'JUST PURE CONFIDENCE'
  },
  {
    id: 'vibing-cat',
    name: 'Cat Vibing to Music',
    type: 'gif',
    isPremium: false,
    category: 'GIFs',
    url: '/assets/gifs/vibing-cat.gif',
    topDefault: 'WHEN THE WEEKEND STARTS',
    bottomDefault: 'AND ALL YOUR TASKS ARE DONE'
  },
  {
    id: 'homer-hedge',
    name: 'Homer Simpson Backs Into Bushes',
    type: 'gif',
    isPremium: false,
    category: 'GIFs',
    url: '/assets/gifs/homer-hedge.gif',
    topDefault: 'WHEN THEY ASK WHO BROKE THE BUILD',
    bottomDefault: 'I WAS NEVER HERE'
  },
  {
    id: 'spiderman-dance',
    name: 'Spider-Man Dancing',
    type: 'gif',
    isPremium: false,
    category: 'GIFs',
    url: '/assets/gifs/spiderman-dance.gif',
    topDefault: 'WHEN YOUR MEME GETS',
    bottomDefault: 'OVER 10K LIKES'
  },
  {
    id: 'obama-mic-drop',
    name: 'Obama Mic Drop',
    type: 'gif',
    isPremium: false,
    category: 'GIFs',
    url: '/assets/gifs/obama-mic-drop.gif',
    topDefault: 'DELIVERED ON TIME WITH ZERO BUGS',
    bottomDefault: 'MIC DROP'
  },
  {
    id: 'confused-math-lady',
    name: 'Confused Math Lady Calculating',
    type: 'gif',
    isPremium: false,
    category: 'GIFs',
    url: '/assets/gifs/confused-math-lady.gif',
    topDefault: 'ME TRYING TO CALCULATE',
    bottomDefault: 'WHERE ALL MY TIME WENT'
  },
  {
    id: 'shocked-cat',
    name: 'Shocked Surprised Cat',
    type: 'gif',
    isPremium: false,
    category: 'GIFs',
    url: '/assets/gifs/shocked-cat.gif',
    topDefault: 'WHEN YOU CHECK YOUR BANK ACCOUNT',
    bottomDefault: 'AFTER A WEEKEND OF ONLINE SHOPPING'
  },
  {
    id: 'success-kid',
    name: 'Success Kid Fist Pump',
    type: 'gif',
    isPremium: false,
    category: 'GIFs',
    url: '/assets/gifs/success-kid.gif',
    topDefault: 'TRIED SOMETHING RISKY',
    bottomDefault: 'WORKED BEAUTIFULLY'
  }
];

const raw = JSON.parse(fs.readFileSync('../imgflip_memes.json', 'utf8'));
const memes = raw.data.memes;

const newImages = [];
for (const m of memes) {
  const ext = path.extname(m.url) || '.jpg';
  const cleanFilename = m.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + ext;
  let slugId = m.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  if (existingIds.has(slugId)) {
    slugId = `${slugId}-imgflip`;
  }
  if (existingIds.has(slugId)) continue;
  existingIds.add(slugId);
  
  let category = 'Classic';
  const n = m.name.toLowerCase();
  if (n.includes('cat') || n.includes('doge') || n.includes('monkey') || n.includes('pikachu') || n.includes('spongebob')) category = 'Trending';
  else if (n.includes('skeptical') || n.includes('reaction') || n.includes('crying') || n.includes('laughing') || n.includes('face') || n.includes('slap')) category = 'Reaction';
  else if (n.includes('brain') || n.includes('scientist') || n.includes('curve') || n.includes('conspiracy')) category = 'Tech';

  newImages.push({
    id: slugId,
    name: m.name,
    type: 'image',
    isPremium: false,
    category,
    url: `/assets/memes/${cleanFilename}`,
    topDefault: 'WHEN YOU WANT TO MAKE A MEME',
    bottomDefault: 'AND IT TURNS OUT EPIC'
  });
}

console.log('Adding', newGifs.length, 'GIFs and', newImages.length, 'Images.');

// Append new items into MEME_TEMPLATES array
const serializedGifs = newGifs.map(g => `  {\n    id: '${g.id}',\n    name: ${JSON.stringify(g.name)},\n    type: 'gif',\n    isPremium: false,\n    category: 'GIFs',\n    url: '${g.url}',\n    topDefault: ${JSON.stringify(g.topDefault)},\n    bottomDefault: ${JSON.stringify(g.bottomDefault)}\n  }`).join(',\n');

const serializedImages = newImages.map(img => `  {\n    id: '${img.id}',\n    name: ${JSON.stringify(img.name)},\n    type: 'image',\n    isPremium: false,\n    category: '${img.category}',\n    url: '${img.url}',\n    topDefault: ${JSON.stringify(img.topDefault)},\n    bottomDefault: ${JSON.stringify(img.bottomDefault)}\n  }`).join(',\n');

// Also remove any mentions of AI in memeData.ts
let updated = existingData;
updated = updated.replace("'ME WRITING DEEP AI MEMES'", "'ME WRITING VIRAL MEMES'");
updated = updated.replace("'VS BUILDING A NEW AI MEME SITE'", "'VS MAKING MEMES AT 3 AM'");
updated = updated.replace("'AI GENERATING MEMES AT 60 FPS'", "'GENERATING CRISP MEMES AT 60 FPS'");
updated = updated.replace('AI_CAPTION_PROMPTS', 'CAPTION_PROMPTS');
// Export both CAPTION_PROMPTS and alias AI_CAPTION_PROMPTS for backwards compatibility if needed
updated = updated.replace(
  'export const CAPTION_PROMPTS',
  'export const CAPTION_PROMPTS'
);
if (!updated.includes('export const AI_CAPTION_PROMPTS')) {
  updated += '\nexport const AI_CAPTION_PROMPTS = CAPTION_PROMPTS;\n';
}

const lastTplIndex = updated.indexOf('// ---- Animated GIF Templates ----');
if (lastTplIndex !== -1) {
  // Insert new GIFs right after animated gif section
  updated = updated.replace('// ---- Animated GIF Templates ----', `// ---- Animated GIF Templates ----\n${serializedGifs},`);
}

const endOfTemplatesIndex = updated.lastIndexOf('};');
// Insert new images before the closing of MEME_TEMPLATES
updated = updated.replace(/\n\];\s*\n\s*export const (AI_CAPTION_PROMPTS|CAPTION_PROMPTS)/, `,\n\n  // ---- Web Classic & Trending Meme Templates ----\n${serializedImages}\n];\n\nexport const $1`);

fs.writeFileSync('src/utils/memeData.ts', updated, 'utf8');
console.log('Successfully updated src/utils/memeData.ts!');
