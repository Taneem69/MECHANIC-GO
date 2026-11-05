/** Injected by vite.config.ts (VITE_SITE_URL -> Vercel URL -> localhost). */
declare const __SITE_URL__: string

interface Window {
  dataLayer: unknown[]
  gtag: (...args: unknown[]) => void
}

interface ImportMetaEnv {
  readonly VITE_SITE_URL?: string
  readonly VITE_GA_MEASUREMENT_ID?: string
  readonly VITE_SENTRY_DSN?: string
  readonly VITE_VITALS_ENDPOINT?: string
}
