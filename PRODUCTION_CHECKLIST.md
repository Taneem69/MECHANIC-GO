# MechanicGo — Production Checklist

Your list has ~100 items. They do not all apply to a frontend-only site on Vercel, so each one is sorted below:

- ✅ **Done** — implemented in this repo
- ☁️ **Vercel** — Vercel does this automatically, nothing to build
- 🔧 **You do** — needs a click or a setting from you (steps given)
- 🏗️ **Backend** — cannot exist until the PHP/MySQL (or other) backend is built
- 💳 **Payments** — only when real payments are added
- 🚫 **Not needed** — wrong tool or over-engineering for this stage

---

## 1. Do these first (15 minutes)

| # | Action | Why |
|---|--------|-----|
| 1 | Vercel → Project → Settings → Environment Variables → add `VITE_SITE_URL` = your final URL (e.g. `https://mechanic-go.vercel.app`, or your custom domain later). Redeploy. | Canonical tags, sitemap and social-share links are built from it. Without it they point to `localhost`. |
| 2 | Push this code to GitHub (`git add . && git commit -m "production hardening" && git push`). | Vercel redeploys automatically. |
| 3 | After deploy, open `/does-not-exist` — you should see the 404 page. Open `/login` directly (not via the home page) — it should load, not 404. | Confirms rewrites work. |
| 4 | Test at https://pagespeed.web.dev and https://securityheaders.com with your live URL. | Real scores instead of guesses. |
| 5 | Optional: add `VITE_GA_MEASUREMENT_ID` (Google Analytics) and `VITE_SENTRY_DSN` (free Sentry account) in Vercel env vars. | Turns on analytics and error tracking. Nothing loads until set. |
| 6 | Add a free uptime monitor (UptimeRobot / BetterStack) pointing at `https://YOUR-URL/api/health`. | Alerts you if the site goes down. |

---

## 2. Frontend, performance, SEO, accessibility

| Item | Status | Notes |
|---|---|---|
| Mobile-first responsiveness | ✅ | Tailwind mobile-first; tested at 390px, no horizontal scroll |
| Fast page loading | ✅ | Initial JS **277 KB → 134 KB gzip**; every other page is lazy-loaded |
| Minification of CSS/JS/HTML | ✅ | Vite production build |
| Image optimization & compression | ✅ | JPG → WebP: 542 KB → 304 KB |
| Lazy loading below-the-fold images | ✅ | `loading="lazy"` + explicit width/height (prevents layout shift) |
| Lazy loading heavy code | ✅ | three.js (~190 KB gzip) loads after the hero text paints; skipped on reduced-motion / low-end devices |
| Custom fonts (WOFF2, `font-display: swap`) | ✅ | Self-hosted via Fontsource; no Google Fonts request |
| Preconnect/prefetch external domains | 🚫 | No third-party domains on first load (fonts are self-hosted) |
| Critical CSS / render path | ✅ | Inline boot shell in `index.html`; CSS code-split |
| Cache busting | ✅ | Hashed filenames in `/assets/` + immutable 1-year cache |
| Browser caching | ✅ | Cache rules in `vercel.json` |
| CDN deployment | ☁️ | Vercel Edge Network |
| Gzip / Brotli | ☁️ | Automatic on Vercel |
| HTTP/2, HTTP/3 (QUIC) | ☁️ | Automatic on Vercel |
| IPv6 / dual-stack | ☁️ | Handled by Vercel |
| Service worker (offline + caching) | ✅ | `public/sw.js` — network-first pages, cache-first assets |
| Web Workers | 🚫 | No heavy client-side computation yet |
| Core Web Vitals handling (LCP/INP/CLS) | ✅ | Optimised + measured in the real world (next row) |
| RUM with attribution | ✅ | `web-vitals/attribution` → GA4 and/or `VITE_VITALS_ENDPOINT` |
| Semantic HTML | ✅ | One `<main>`, `<nav aria-label>`, labelled forms, one `<h1>` per page |
| WCAG: skip link, focus, labels, contrast, reduced motion | ✅ | Skip link, visible focus ring, programmatic labels, `aria-invalid`/`role="alert"` errors, low-contrast text raised, `prefers-reduced-motion` respected |
| WCAG: full audit | 🔧 | Run Lighthouse + axe DevTools extension on each page and fix what they report; a manual screen-reader pass is still recommended |
| SEO-friendly URLs | ✅ | `/#/login` → `/login` (BrowserRouter). Old `#/` links auto-convert |
| Per-page title/description | ✅ | `src/lib/seo.ts` |
| Canonical tags | ✅ | Per page |
| Open Graph / Twitter cards | ✅ | + generated 1200×630 `og-image.jpg` |
| Structured data (Schema.org) | ✅ | Organization, WebSite, Service. **Deliberately no ratings/addresses** — fake review markup violates Google's rules |
| `sitemap.xml` + `robots.txt` | ✅ | Generated at build from your URL; private pages excluded |
| 404 page + proper 404 status | ✅ | Real HTTP 404 (not a "soft 404") |
| 301/308 redirects | ✅ | `/signin`, `/signup`, `/book`, etc. in `vercel.json` |
| Broken-link prevention | ✅ | Unknown routes → 404 page. 🔧 Footer links currently all point to `/` — replace with real pages (About, Terms, Privacy) |
| Cross-browser / cross-device | ✅ | Modern evergreen browsers (`es2020`). 🔧 Test on a real iPhone/Safari and Android |
| Async/deferred third-party scripts | ✅ | Analytics/Sentry load only after the page is idle |
| Memory-leak / main-thread profiling | 🔧 | Chrome DevTools → Performance & Memory tabs. The 3D scene now disposes all GPU resources and pauses off-screen |
| Server-side vs client-side rendering | 🚫 | This is a client-rendered SPA. If SEO becomes critical, migrate public pages to Next.js or add prerendering |
| Media-query efficiency | ✅ | Tailwind utilities only; no CSS expressions |

## 3. Security (frontend + hosting)

| Item | Status | Notes |
|---|---|---|
| HTTPS / SSL certificate | ☁️ | Automatic, auto-renewing |
| TLS 1.3 / disable old TLS | ☁️ | Vercel's default |
| HSTS | ✅ | `max-age=2y; includeSubDomains; preload` |
| HSTS preload list submission | 🔧 | Only after you have a **custom domain** — submit at hstspreload.org. Do not submit `*.vercel.app` |
| CSP (blocks XSS, `frame-ancestors`) | ✅ | Strict policy, no `unsafe-eval`, no third-party scripts except GA when enabled |
| X-Frame-Options / clickjacking | ✅ | `DENY` + CSP `frame-ancestors 'none'` |
| MIME sniffing prevention | ✅ | `X-Content-Type-Options: nosniff` |
| Referrer / Permissions policy | ✅ | Set |
| Dependency vulnerability scanning | ✅ | Production deps: **0 vulnerabilities**. CI audit on every push + weekly; Dependabot PRs |
| SAST in CI | ✅ | GitHub CodeQL |
| No hardcoded secrets / env separation | ✅ | `.env.example`, `.env` git-ignored. Rule: anything `VITE_*` is public |
| Form validation | ✅ | Zod + react-hook-form on login/register. ⚠️ Client-side only — the backend must re-validate |
| Subresource Integrity (SRI) | 🚫 | No external CDN scripts (everything self-hosted) |
| Error tracking | ✅ | Sentry wired, off until you add a DSN |
| Health-check endpoint | ✅ | `/api/health` |
| Admin self-registration | ✅ | Removed from public sign-up (earlier fix) |
| **Real auth / route protection** | 🏗️ | ⚠️ Dashboards are still reachable by typing the URL. Fine for a demo; **do not collect real data until the backend exists** |
| Custom domain, DNS, TTL, CAA, DNSSEC | 🔧 | Needs a domain. Buy one, add it in Vercel → Domains. If DNS is on Cloudflare: enable DNSSEC there, add a CAA record `0 issue "letsencrypt.org"`, keep TTL 300–3600 |
| Password-protect the demo | 🔧 | Vercel paid feature; free alternative: share the link privately |

## 4. Hosting, uptime, deployment

| Item | Status | Notes |
|---|---|---|
| Reliable hosting / uptime | ☁️ | Vercel global CDN; add the uptime monitor (step 6 above) |
| Auto-scaling / load balancing | ☁️ | Static files on a CDN scale automatically |
| Zero-downtime deploys, instant rollback | ☁️ | Every deploy is atomic; Vercel → Deployments → "Promote" an old one to roll back |
| Preview deployments / canary | ☁️ | Every pull request gets its own URL |
| Graceful shutdown, circuit breakers | 🏗️ | Backend concerns |
| Frontend backups / disaster recovery | ☁️ | Source is in GitHub; any deploy can be rebuilt |

## 5. Backend, database, API 🏗️ (none of this exists yet)

These cannot be "added to the website". They belong to the PHP/MySQL backend from your original spec, which Vercel does not run (host it on a VPS/Railway/Render/shared PHP hosting, and let Vercel serve only the frontend). Build them **in this order**:

1. **Auth first** — password hashing (Argon2id), HttpOnly+Secure+SameSite cookies or short-lived JWT + refresh rotation, CSRF protection, **rate limiting on login & password reset**, RBAC enforced on the server.
2. **Database** — prepared statements everywhere (SQL injection), indexes, connection pooling, daily automated backups **and a tested restore**, later read replicas.
3. **API hygiene** — payload validation, rate limiting, CORS allow-list (your exact frontend origin, not `*`), idempotency keys, structured logging.
4. **Uploads** — type/size checks, malware scan, private bucket + signed URLs; sanitise any rich text.
5. **Real-time** — WebSocket with auth on connect, per-user connection limits, origin checks.
6. **Outbound requests** — SSRF protection (allow-list hosts, block private IP ranges).
7. **Resilience** — health checks, graceful shutdown, deadlock-retry logic, cache eviction tuning.

Items in this group: SQL injection / CSRF / session & cookie attributes, API rate limiting, CORS + preflight caching, DB indexing/pooling/replicas/deadlocks/query plans/backup tests, JWT revocation, WYSIWYG sanitisation, blob storage policies, WebSocket/WebRTC limits, SSRF, graceful shutdown, circuit breakers, auth endpoint rate limits.

## 6. Payments 💳 (only when you take real money)

The safe rule: **card data must never touch your server or your database.** Use a hosted gateway (Stripe, or a local one such as SSLCommerz / bKash for Bangladesh) and its hosted fields or checkout page. That alone keeps you at the lightest PCI-DSS level (SAQ A).

Then: webhooks with signature verification, idempotency keys, async multi-state order pipeline, 3DS2 (the gateway handles it), tokenisation, reconciliation logs, rate limiting on checkout, sandbox vs production keys kept separate and rotated, escrow logic from your original spec.

🚫 **Not recommended at this stage:** fallback payment gateways, a custom fraud-scoring engine (use the gateway's built-in tools, e.g. Stripe Radar), and your own PCI scope. These add cost and risk with no benefit until you have real transaction volume.

---

## Honest summary

- **Frontend: production-ready for a public demo/portfolio.** Fast, accessible, secure-headers, SEO-ready, monitored.
- **It is not yet a production *platform*.** There is no backend, database, authentication or payments. All dashboard data is mock data. Sections 5 and 6 are the real remaining work and are the right next project.
