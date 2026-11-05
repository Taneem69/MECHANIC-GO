import path from 'path'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv, type Plugin } from 'vite'

// Public pages that search engines may index. Private app pages (dashboards,
// live tracking) are deliberately left out and blocked in robots.txt + headers.
const INDEXABLE_ROUTES = ['/', '/request', '/register']
const PRIVATE_PREFIXES = ['/admin', '/customer', '/mechanic', '/tracking/']

/** Fills __SITE_URL__ in index.html and emits robots.txt + sitemap.xml at build time. */
function siteMeta(siteUrl: string): Plugin {
  return {
    name: 'mechanicgo-site-meta',
    transformIndexHtml: (html) => html.replaceAll('__SITE_URL__', siteUrl),
    generateBundle() {
      const today = new Date().toISOString().slice(0, 10)
      const robots = [
        'User-agent: *',
        'Allow: /',
        ...PRIVATE_PREFIXES.map((p) => `Disallow: ${p}`),
        '',
        `Sitemap: ${siteUrl}/sitemap.xml`,
        '',
      ].join('\n')
      const sitemap =
        '<?xml version="1.0" encoding="UTF-8"?>\n' +
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
        INDEXABLE_ROUTES.map(
          (r) =>
            `  <url><loc>${siteUrl}${r === '/' ? '/' : r}</loc><lastmod>${today}</lastmod></url>`,
        ).join('\n') +
        '\n</urlset>\n'
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robots })
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemap })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  // Priority: explicit VITE_SITE_URL (custom domain) -> Vercel's production URL -> localhost
  const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : ''
  const siteUrl = (env.VITE_SITE_URL || vercelUrl || 'http://localhost:3000').replace(/\/$/, '')

  if (mode === 'production' && siteUrl.includes('localhost')) {
    console.warn(
      '\n[mechanicgo] VITE_SITE_URL is not set, so canonical/sitemap/OG URLs point to localhost.\n' +
        '             Set it in Vercel -> Settings -> Environment Variables.\n',
    )
  }

  return {
    // Absolute base so assets resolve correctly on nested routes like /tracking/123
    base: '/',
    plugins: [react(), siteMeta(siteUrl)],
    define: { __SITE_URL__: JSON.stringify(siteUrl) },
    server: { port: 3000 },
    resolve: {
      alias: { '@': path.resolve(__dirname, './src') },
    },
    build: {
      target: 'es2020',
      assetsInlineLimit: 0, // no data: URIs, so the CSP can stay strict
      cssCodeSplit: true,
      sourcemap: false,
      chunkSizeWarningLimit: 600,
      rollupOptions: {
        output: {
          // Stable vendor chunks cache well across deploys; three/recharts only load when needed.
          manualChunks: {
            react: ['react', 'react-dom', 'react-router-dom'],
            gsap: ['gsap', 'gsap/ScrollTrigger'],
            three: ['three'],
            charts: ['recharts'],
          },
        },
      },
    },
  }
})
