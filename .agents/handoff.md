# Handoff — gifmememaker.com

_Last updated: 2026-10-06. Much of the current work is **uncommitted** — run `git status` / `git diff` in the repo root and reconcile this doc with reality before editing._

## 1. Current objective and status

**Objective:** Build and operate **gifmememaker.com** — a 100% static Astro site (marketing pages + browser-based meme studio with image/GIF/video support and PNG/JPG/GIF/WebM/MP4 export) — deployed to Cloudflare Workers static assets.

**Status:**
- Site is feature-complete and **builds cleanly**: `npm run build` inside `gifmememaker.com/` produces 7 pages + `sitemap-index.xml` (verified passing on 2026-10-06, after all uncommitted edits).
- **Live:** `https://gifmememaker.gifmememaker.workers.dev` (worker `gifmememaker`, deployed 2026-10-01). Custom domain `gifmememaker.com` not yet attached (domain not purchased).
- **Active in-flight work (uncommitted):** partially removing the **AI Captions** feature from the UI, adding **Google Analytics (GA4 `G-LHRPNE0YHP`)**, adding a **language selector** (UI-only placeholder), plus SEO/config touch-ups (robots.txt sitemap URL, astro/wrangler config formatting).
- All checklist items in `gifmememaker.com/AGENTS.md` are marked done ✓ (competitor-removal, 66-template expansion, brand rename MakeItFunny→gifmememaker, studio engine, exports + Pro gating, free-only mode, fonts/theme, build verify).
- **Next:** the user will supply a list of specific website corrections. Do not commit or deploy until instructed.

## 2. Key files modified or created

### Uncommitted changes (paths relative to workspace root)

**Staged:**
- `gifmememaker.com/astro.config.mjs` — formatting/import-order only; retains `site: 'https://gifmememaker.com'`, `sitemap()` integration, Tailwind Vite plugin.
- `gifmememaker.com/public/robots.txt` — Sitemap line now points at `sitemap-index.xml` (matches `@astrojs/sitemap` output).
- `gifmememaker.com/src/styles/global.css` — Tailwind import switched to `@import "tailwindcss/index.css"` + formatting churn; holds custom classes (`geist-mesh-gradient`, `page-prose`, hairline/mono-eyebrow utilities).
- `gifmememaker.com/wrangler.jsonc` — ⚠️ **looks regressed**: drops `assets.not_found_handling: "404-page"` and the explanatory comments, reverts `compatibility_date` to `2024-09-23`. AGENTS.md documents 404-page behavior that depends on this. Probably tool-generated churn — restore unless the user says otherwise.

**Unstaged modifications:**
- `gifmememaker.com/src/components/Header.astro` — nav anchors changed `/#x` → `#x`; "AI Captions" nav link removed; added inline language dropdown (ids `language-toggle`, `language-dropdown`, `current-lang`; 11 languages; persists to `localStorage['language']`, sets `document.documentElement.lang`; **no actual translation**); applies saved theme on load.
- `gifmememaker.com/src/components/MemeStudio.astro` — removed the AI Captions tab button and the `#tab-ai` panel (~59 lines deleted).
- `gifmememaker.com/src/layouts/Layout.astro` — added GA4 gtag scripts (`G-LHRPNE0YHP`) in `<head>`.
- `gifmememaker.com/src/pages/404.astro` — replaced the `/#ai-captions` quick-link card with an `/#comparison` "Free vs Premium Tiers" card.
- Deleted: four `gifmememaker.com/.wrangler/tmp/**` build-artifact files that were committed by mistake.

**Untracked / junk at workspace root:**
- `imgflip_memes.json` — imgflip meme-template API dump (reference data for template work).
- `nul` — accidental Windows redirect junk file; safe to delete.


### Key existing files (structure, for orientation)
- `gifmememaker.com/src/pages/` — `index.astro`, `404.astro`, `500.astro`, `about-us.astro`, `contact-us.astro`, `privacy-policy.astro`, `terms-and-conditions.astro`. Pages import `Header.astro` directly; `index`/`404`/`500` render `<Header />`.
- `gifmememaker.com/src/components/` — `Hero`, `MemeStudio` (section `id="studio"`), `TemplateGallery` (`id="templates"`), `FeatureComparison` (`id="comparison"`), `FAQSection` (`id="faq"`), `Footer`, `Header`, `Logo`, `SeoContent`, `ContentPage`, `Welcome`, `LanguageSelector.astro` (**empty file, 0 bytes — placeholder**).
- `gifmememaker.com/src/scripts/studio.ts` (~1290 lines) — main studio engine; notable members: `generateAiCaption(category)`, `updateAiLeft()`, `applyFreeOnlyLocks()`, `setFreeOnly(on)`, `openProModal(feature)`, `showProgress()`, constant `FREE_AI_USES` / field `aiUsesLeft`. Emits `mif:free-only` event.
- `gifmememaker.com/src/utils/memeData.ts` (template catalog, 66 templates), `gifmememaker.com/src/utils/gifEncoder.ts` (GIF encode path; uses `omggif`).
- `gifmememaker.com/src/data/site.ts` — `DEFAULT_TITLE`, `FAQS`, SEO copy (several AI-caption references remain here).
- `gifmememaker.com/src/layouts/Layout.astro` — fonts, JSON-LD schemas, theme, now GA. `gifmememaker.com/src/styles/global.css` — design tokens/utilities.
- `gifmememaker.com/scripts/` — `verify-seo.mjs`, `verify-pages.mjs`, `check-svg.mjs`, `generate-og-image.mjs` (run with `node scripts/<name>.mjs`).
- Assets: `gifmememaker.com/public/assets/memes/` (66 images), `public/assets/gifs/` (3 GIFs).
- Docs: `gifmememaker.com/AGENTS.md` (dev/deploy commands + todo log), `gifmememaker.com/DESIGN.md` (design system: Geist fonts, #fafafa/#0a0a0a palette, hairline cards, pill CTAs vs 6px controls).



## 3. Decisions made and architecture choices

- **Framework:** Astro ^7.3.5, fully static (SSG → `dist/`). No server runtime — the studio runs entirely client-side (canvas, `omggif` for GIF, `MediaRecorder` for WebM/MP4).
- **Styling:** Tailwind CSS v4 via `@tailwindcss/vite` (not the Astro integration); custom design tokens/utilities live in `global.css`.
- **SEO:** `@astrojs/sitemap` integration, `site` set to `https://gifmememaker.com`, JSON-LD schemas in `Layout.astro`, robots.txt → `sitemap-index.xml`.
- **Deployment:** Cloudflare **Workers static assets** (chosen over Pages because Cloudflare directs new projects there) via `wrangler.jsonc`, no Worker script. Commands: `npm run deploy`, `npm run deploy:dry`, `npm run cf:preview`. 404 handling intended through `assets.not_found_handling: "404-page"` (currently at risk — see staged wrangler change above).
- **Monetization model:** Pro-gating implemented client-side (4K, watermark removal, AI captions, high FPS locked behind Pro modal) plus a "free-only mode" toggle (`chk-free-only-mode` → `mif:free-only` event) that locks Pro features and filters the gallery. No backend/auth.
- **Brand:** unified to **gifmememaker.com** (renamed from MakeItFunny.com via `rename_brand.py`).
- **i18n:** deliberately deferred — the current language selector only records preference and sets `<html lang>`; no translation layer chosen yet.
- **Agent tooling:** skills under `.agents/skills/` (incl. `tailwind-4-docs`), plus `.claude/`, `.gemini/`, `.qwen/`, `.kilo/` config dirs; `AGENTS.md`/`CLAUDE.md`/`GEMINI.md` in the project mirror guidance.

### ⚠️ Git topology (read before committing/pushing)
- **Workspace-root repo:** branch `main` @ `5940b3e` ("Add astro sitemap integration"); 4 local vs 1 remote commit, diff reports **no merge base** — local and `origin/main` have diverged (origin's tree has project files at repo **root**; the local root repo nests them under `gifmememaker.com/`). Remote: `https://github.com/Sacred07128/gifmememaker.com.git`.
- **Nested repo:** `gifmememaker.com/.git` exists as a separate repository (its `main` = `1d76c94`, same remote) — this is what got pushed to GitHub. Two repos overlap on the same working files. **Decide the canonical repo with the user before any push.**
- Commit `5940b3e` accidentally committed `.wrangler/state/*.sqlite` local-state files; `.wrangler/tmp/*` deletions are pending. Untrack + gitignore `.wrangler/` later.
- `gifmemaker.com/` (misspelled dir) is a brand-rename leftover: `rename_brand.py` + old `Header.astro`/`TemplateGallery.astro` still containing "MakeItFunny.com" (3 tracked files). Cleanup candidate.


## 4. Immediate next steps for the next agent

1. **Wait for the user's list of website corrections** — that is the stated immediate next task. Make the edits, then rebuild.
2. **Reconcile the wrangler config:** restore `not_found_handling: "404-page"` and a current `compatibility_date` in `gifmememaker.com/wrangler.jsonc` unless the user confirms the stripped version is intentional (AGENTS.md documents the 404 behavior).
3. **Decide the AI Captions removal scope — it is half-done.** Already removed: Header nav link, MemeStudio `#tab-ai` tab/panel, 404 quick-link. Still present: `Hero.astro` (🤖 AI Meme Captions badge + copy), `FeatureComparison.astro` (item `title: 'AI Meme Captions'`), `SeoContent.astro` (AI sections), `src/data/site.ts` (FAQs/`DEFAULT_TITLE`) and `index.astro` TITLE, `Footer.astro` copy, and the whole AI path in `studio.ts` (`generateAiCaption`, `FREE_AI_USES`, `aiUsesLeft`, `.ai-gen-btn`, `lbl-ai-left`). The `#ai-captions` anchor no longer exists anywhere — finish the removal consistently **or** restore the tab; don't leave both halves.
4. **Fix header anchors on non-index pages:** `Header.astro` now uses `#studio` / `#templates` / `#comparison` / `#faq`, but `404.astro` and `500.astro` also render `<Header />` and have no such sections → broken nav there. Restore `/#…` for those pages (or handle scroll-to-section in JS).
5. **Resolve the language selector:** either populate the empty `LanguageSelector.astro` and remove the duplicated inline dropdown in `Header.astro`, or drop the UI until real i18n exists.
6. **Commit hygiene (when told to commit):** split staged vs unstaged work into logical commits; delete root `nul`; decide the fate of root `imgflip_memes.json`; untrack/gitignore `.wrangler/`; remove the misspelled `gifmemaker.com/` leftover dir.
7. **Before pushing:** reconcile the two-repo situation (§3 git topology) with the user — do not push blindly.
8. **Validate after every change:** `cd gifmememaker.com && npm run build` (currently green), then `node scripts/verify-seo.mjs` and `node scripts/verify-pages.mjs`. Dev server: `astro dev --background` (manage with `astro dev status/stop/logs`). Deploy only on request via `npm run deploy`.


