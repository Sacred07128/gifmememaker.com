## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Deployment

The site is 100% static (Astro SSG → `dist/`) and deploys to **Cloudflare Workers static assets** (config: `wrangler.jsonc`, no Worker script — assets only).

| Command | Action |
| --- | --- |
| `npm run deploy` | Build `dist/` + deploy to Cloudflare |
| `npm run deploy:dry` | Validate the wrangler config without deploying |
| `npm run cf:preview` | Build + serve the production bundle locally via `wrangler dev` (port 8787) |

First-time setup:

```
npx wrangler login
npm run deploy
```

Notes:

- **Live URL: `https://gifmememaker.gifmememaker.workers.dev`** (worker `gifmememaker`, workers.dev subdomain `gifmememaker`, version `f4eaabd6-c4c1-4e9a-baf9-0b06ac3acc41`, deployed 2026-10-01).
- Redeploy any time with `npm run deploy` (requires `npx wrangler login` once per machine).
- Until `gifmememaker.com` is purchased, attach the domain in Cloudflare dashboard → Workers & Pages → `gifmememaker` → Domains & Routes (domain DNS must be on Cloudflare).
- Unknown URLs serve `dist/404.html` via `assets.not_found_handling: "404-page"` in `wrangler.jsonc`.
- No server runtime is needed: the meme studio (GIF/video/PNG export) runs entirely client-side. Workers was chosen over Pages because Cloudflare now directs new projects to Workers.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
- ▼Todo
[✓] Research competitor features & compile 'better' ideas list
[✓] Load tailwind-4-docs skill & consult Astro docs
[✓] Expand memeData.ts to cover all 66 templates (memes + gifs)
[✓] Rewrite FeatureComparison as competitor-free 'Why gifmememaker' feature grid
[✓] Remove competitor mentions from FAQ, Footer, index meta; unify brand to gifmememaker.com
[✓] Build studio engine: animated GIF/video playback, play/pause, scrub, trim, speed, rotate/flip
[✓] Implement exports: PNG/JPG, GIF (omggif), WebM/MP4 (MediaRecorder) with Pro gating (4K, watermark removal, AI captions)
[✓] Wire free-only mode toggle to lock Pro features and filter gallery
[✓] Fix fonts URL, default theme, Header/Hero brand consistency

[✓] Remove header 'AI v3.0' badge and Pro/Free tier badges on template cards
[✓] Rename brand from MakeItFunny.com to gifmememaker.com
[✓] Build, verify with dev server, fix errors