// Error tracking (Sentry), analytics (GA4) and real-user Web Vitals.
// Everything is opt-in through env vars and loaded after the page is idle,
// so none of it can delay first paint. With no env vars set, nothing is loaded.

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID
const SENTRY_DSN = import.meta.env.VITE_SENTRY_DSN
const VITALS_ENDPOINT = import.meta.env.VITE_VITALS_ENDPOINT

type SentryModule = typeof import('@sentry/react')
let sentryPromise: Promise<SentryModule | null> | null = null

function getSentry(): Promise<SentryModule | null> {
  if (!SENTRY_DSN) return Promise.resolve(null)
  sentryPromise ??= import('@sentry/react').then((Sentry) => {
    Sentry.init({
      dsn: SENTRY_DSN,
      environment: import.meta.env.MODE,
      tracesSampleRate: 0.1, // personal data (IPs, cookies) is not sent unless you opt in
    })
    return Sentry
  })
  return sentryPromise
}

/** Report a caught error (used by the ErrorBoundary). Safe to call without a DSN. */
export async function captureError(error: unknown, context?: Record<string, unknown>) {
  const Sentry = await getSentry()
  Sentry?.captureException(error, { extra: context })
}

function loadAnalytics() {
  if (!GA_ID || navigator.doNotTrack === '1') return
  window.dataLayer = window.dataLayer || []
  // GA requires the real `arguments` object, not a rest array
  window.gtag = function () {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments)
  }
  window.gtag('js', new Date())
  window.gtag('config', GA_ID, { anonymize_ip: true, send_page_view: false })
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_ID)}`
  document.head.appendChild(script)
}

/** Call on every client-side route change (the initial load is covered too). */
export function trackPageView(path: string) {
  window.gtag?.('event', 'page_view', { page_path: path, page_title: document.title })
}

const ATTRIBUTION_KEYS = [
  'target', 'url', 'loadState', 'interactionTarget', 'interactionType',
  'largestShiftTarget', 'largestShiftValue', 'timeToFirstByte', 'resourceLoadDelay',
  'resourceLoadDuration', 'elementRenderDelay', 'inputDelay', 'processingDuration', 'presentationDelay',
] as const

interface VitalMetric {
  name: string
  value: number
  rating: string
  id: string
  navigationType: string
  attribution: object
}

async function reportWebVitals() {
  // The attribution build tells you WHICH element/resource caused a bad score.
  const { onCLS, onINP, onLCP, onFCP, onTTFB } = await import('web-vitals/attribution')

  const send = (metric: VitalMetric) => {
    const source = metric.attribution as Record<string, unknown>
    const attribution: Record<string, unknown> = {}
    for (const key of ATTRIBUTION_KEYS) {
      if (key in source) attribution[key] = source[key]
    }
    // CLS is a tiny decimal; scale it so it survives rounding
    const value = metric.name === 'CLS' ? Math.round(metric.value * 1000) : Math.round(metric.value)

    if (VITALS_ENDPOINT) {
      navigator.sendBeacon?.(
        VITALS_ENDPOINT,
        JSON.stringify({
          name: metric.name,
          value,
          rating: metric.rating,
          id: metric.id,
          navigationType: metric.navigationType,
          path: location.pathname,
          attribution,
        }),
      )
    }
    window.gtag?.('event', metric.name, {
      value,
      metric_rating: metric.rating,
      metric_id: metric.id,
      non_interaction: true,
    })
    if (import.meta.env.DEV) console.debug('[web-vitals]', metric.name, value, metric.rating, attribution)
  }

  onLCP(send)
  onINP(send)
  onCLS(send)
  onFCP(send)
  onTTFB(send)
}

const whenIdle = (fn: () => void) =>
  'requestIdleCallback' in window ? window.requestIdleCallback(fn, { timeout: 4000 }) : setTimeout(fn, 2000)

export function initMonitoring() {
  whenIdle(() => {
    void reportWebVitals()
    void getSentry()
    if (import.meta.env.PROD) loadAnalytics()
  })
}
