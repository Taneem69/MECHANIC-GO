import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { applySeo } from '../lib/seo'
import { trackPageView } from '../lib/monitoring'

/** Runs on every navigation: SEO tags, scroll reset, focus for screen readers, analytics. */
export default function RouteEffects() {
  const { pathname } = useLocation()
  const first = useRef(true)

  useEffect(() => {
    applySeo(pathname)
    trackPageView(pathname)
    if (first.current) {
      first.current = false
      return
    }
    window.scrollTo(0, 0)
    // Move focus to the new page so keyboard/screen-reader users know the view changed
    document.getElementById('main-content')?.focus({ preventScroll: true })
  }, [pathname])

  return null
}
