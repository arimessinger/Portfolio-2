# Engineering Portfolio

A React + Vite engineering portfolio.

## Scripts

```bash
npm install     # install dependencies
npm run dev     # start dev server at http://localhost:5173
npm run build   # production build to dist/
npm run preview # serve the production build locally
npm run lint    # run oxlint
```

## Structure

- `index.html` — HTML entry point
- `src/main.jsx` — React entry point
- `src/App.jsx` — top-level component
- `src/App.css`, `src/index.css` — styles
- `public/` — static assets served as-is

## Deploy on Vercel

1. Push this folder to a GitHub, GitLab, or Bitbucket repository.
2. In Vercel, click **Add New… → Project** and import the repository.
3. Vercel detects Vite automatically. Leave the build settings at their defaults (`npm run build`, output `dist`).
4. Click **Deploy**.
