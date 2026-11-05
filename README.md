# MechanicGo

On-demand roadside assistance and mobile-mechanic web app. Vite + React 19 + TypeScript + Tailwind.

## Run locally
```bash
npm install
npm run dev        # http://localhost:3000
```

Other scripts: `npm run build`, `npm run preview`, `npm run lint`.

## Deploy (Vercel)
1. Push to GitHub, import the repo in Vercel (preset: Vite, no settings to change).
2. Set `VITE_SITE_URL` in Vercel -> Settings -> Environment Variables, then redeploy.
3. See `.env.example` for optional analytics / error-tracking variables.

`vercel.json` holds the security headers, caching, redirects and SPA rewrites.

## Status
Frontend with mock data. See **PRODUCTION_CHECKLIST.md** for what is done and what still needs a backend.
