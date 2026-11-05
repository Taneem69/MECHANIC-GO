/* MechanicGo service worker
 * - Pages (navigations): network-first, fall back to the cached app shell when offline.
 * - /assets/* (hashed, immutable): cache-first.
 * - Images, icons: stale-while-revalidate.
 * - Never touches non-GET, cross-origin, or /api/ requests.
 * Bump VERSION to invalidate every cache.
 */
const VERSION = 'v1'
const SHELL_CACHE = `mg-shell-${VERSION}`
const ASSET_CACHE = `mg-assets-${VERSION}`
const OFFLINE_HTML =
  '<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">' +
  '<title>Offline — MechanicGo</title><body style="margin:0;background:#000;color:#fff;font-family:system-ui,sans-serif;' +
  'min-height:100vh;display:flex;align-items:center;justify-content:center;text-align:center;padding:24px">' +
  '<div><h1 style="color:#F7FF19">You are offline</h1><p>Check your connection and try again.</p></div>'

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(SHELL_CACHE).then((c) => c.addAll(['/', '/favicon.svg', '/manifest.webmanifest'])),
  )
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.filter((k) => ![SHELL_CACHE, ASSET_CACHE].includes(k)).map((k) => caches.delete(k)),
        ),
      )
      .then(() => self.clients.claim()),
  )
})

self.addEventListener('fetch', (event) => {
  const { request } = event
  if (request.method !== 'GET') return
  const url = new URL(request.url)
  if (url.origin !== self.location.origin || url.pathname.startsWith('/api/')) return

  // Page navigations: network-first
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((res) => {
          if (res.ok) {
            const copy = res.clone()
            caches.open(SHELL_CACHE).then((c) => c.put('/', copy))
          }
          return res
        })
        .catch(async () => {
          const cached = await caches.match('/')
          return (
            cached ||
            new Response(OFFLINE_HTML, { status: 503, headers: { 'Content-Type': 'text/html; charset=utf-8' } })
          )
        }),
    )
    return
  }

  // Hashed build output: cache-first
  if (url.pathname.startsWith('/assets/')) {
    event.respondWith(
      caches.open(ASSET_CACHE).then(async (cache) => {
        const hit = await cache.match(request)
        if (hit) return hit
        const res = await fetch(request)
        if (res.ok) cache.put(request, res.clone())
        return res
      }),
    )
    return
  }

  // Images and icons: stale-while-revalidate
  if (url.pathname.startsWith('/images/') || /\.(png|svg|webp|jpg|ico)$/.test(url.pathname)) {
    event.respondWith(
      caches.open(ASSET_CACHE).then(async (cache) => {
        const hit = await cache.match(request)
        const network = fetch(request)
          .then((res) => {
            if (res.ok) cache.put(request, res.clone())
            return res
          })
          .catch(() => hit)
        return hit || network
      }),
    )
  }
})
