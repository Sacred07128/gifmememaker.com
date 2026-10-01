# Astro Starter Kit: Basics

```sh
npm create astro@latest -- --template basics
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src
│   ├── assets
│   │   └── astro.svg
│   ├── components
│   │   └── Welcome.astro
│   ├── layouts
│   │   └── Layout.astro
│   └── pages
│       └── index.astro
└── package.json
```

To learn more about the folder structure of an Astro project, refer to [our guide on project structure](https://docs.astro.build/en/basics/project-structure/).

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run deploy`          | Build + deploy to Cloudflare Workers (static assets) |
| `npm run cf:preview`      | Build + serve the production bundle via `wrangler dev` |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## ☁️ Deployment (Cloudflare Workers)

The site is fully static — `npm run build` produces plain files in `./dist/`, which Cloudflare Workers serves from its global edge network (config in `wrangler.jsonc`).

One-time setup, then deploy:

```sh
npx wrangler login   # authenticate with your Cloudflare account
npm run deploy       # build + upload
```

You'll get a `gifmememaker.workers.dev` URL instantly. When you buy `gifmememaker.com`, add it in the Cloudflare dashboard under Workers → `gifmememaker` → Domains & Routes.

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
