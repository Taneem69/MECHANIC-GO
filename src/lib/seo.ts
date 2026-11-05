// Per-route <title>, description, canonical and robots tags for a client-rendered app.
// The static defaults live in index.html (for crawlers/bots that do not run JS).

interface PageMeta {
  title: string
  description: string
  noindex?: boolean
}

const SUFFIX = ' | MechanicGo'

const PAGES: Record<string, PageMeta> = {
  '/': {
    title: 'MechanicGo — On-Demand Roadside Assistance & Mobile Mechanics',
    description:
      'Book a certified mechanic who comes to you. Transparent pricing, real-time tracking and secure payments for roadside assistance, repairs and inspections.',
  },
  '/request': {
    title: 'Request a Mechanic' + SUFFIX,
    description:
      'Describe the problem, share your location and get a certified mechanic on the way with an upfront price estimate.',
  },
  '/register': {
    title: 'Create Your Account' + SUFFIX,
    description: 'Sign up as a customer or a mechanic and get started with MechanicGo in minutes.',
  },
  '/login': { title: 'Sign In' + SUFFIX, description: 'Sign in to your MechanicGo account.', noindex: true },
  '/customer': { title: 'Customer Dashboard' + SUFFIX, description: 'Your requests and vehicles.', noindex: true },
  '/mechanic': { title: 'Mechanic Dashboard' + SUFFIX, description: 'Jobs and earnings.', noindex: true },
  '/admin': { title: 'Admin Dashboard' + SUFFIX, description: 'Platform administration.', noindex: true },
}

const TRACKING: PageMeta = {
  title: 'Live Tracking' + SUFFIX,
  description: 'Track your mechanic in real time.',
  noindex: true,
}

const NOT_FOUND: PageMeta = {
  title: 'Page not found' + SUFFIX,
  description: 'The page you are looking for does not exist.',
  noindex: true,
}

export function metaForPath(pathname: string): PageMeta {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname
  if (PAGES[path]) return PAGES[path]
  if (path.startsWith('/tracking/')) return TRACKING
  return NOT_FOUND
}

function setMeta(selector: string, attr: 'name' | 'property', key: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', value)
}

export function applySeo(pathname: string) {
  const meta = metaForPath(pathname)
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname
  const url = `${__SITE_URL__}${path}`

  document.title = meta.title
  setMeta('meta[name="description"]', 'name', 'description', meta.description)
  setMeta('meta[property="og:title"]', 'property', 'og:title', meta.title)
  setMeta('meta[property="og:description"]', 'property', 'og:description', meta.description)
  setMeta('meta[property="og:url"]', 'property', 'og:url', url)
  setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', meta.title)
  setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', meta.description)

  let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!canonical) {
    canonical = document.createElement('link')
    canonical.rel = 'canonical'
    document.head.appendChild(canonical)
  }
  canonical.href = url

  const robots = document.head.querySelector<HTMLMetaElement>('meta[name="robots"]')
  if (meta.noindex) {
    setMeta('meta[name="robots"]', 'name', 'robots', 'noindex, nofollow')
  } else if (robots) {
    robots.remove()
  }
}
