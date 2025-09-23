# Qport Marketing Site

Single-page marketing experience for the Qport heavy cargo route intelligence platform.

## Highlights
- Modern hero with demo video CTA
- TailwindCSS + Next.js 12 foundation
- Mobile mission control gallery with hosted screenshots

## Local Development
```bash
yarn
yarn dev
```

## Build
```bash
yarn build
```

## GitHub Pages Assets
- Place marketing screenshots in `public/assets/` (the directory is tracked with a placeholder `.gitkeep`).
- Locally the gallery reads from `/assets/<image-name>` automatically.
- When deploying to GitHub Pages, set `NEXT_PUBLIC_ASSETS_BASE_URL=https://AjinkyaKate.github.io/Qport/assets` so the live site points at the hosted images.
