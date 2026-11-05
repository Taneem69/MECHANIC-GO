import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

// Self-hosted fonts (WOFF2, font-display: swap) — no third-party font requests
import '@fontsource-variable/inter/wght.css'
import '@fontsource-variable/space-grotesk/wght.css'
import '@fontsource-variable/jetbrains-mono/wght.css'
import '@fontsource/bebas-neue/latin.css'

import './index.css'
import App from './App.tsx'
import ErrorBoundary from './components/ErrorBoundary'
import { initSmoothScroll } from './lib/smoothScroll'
import { initMonitoring } from './lib/monitoring'
import { registerServiceWorker } from './lib/pwa'

// Links shared before the move to clean URLs look like /#/login — convert them once.
if (window.location.hash.startsWith('#/')) {
  window.history.replaceState(null, '', window.location.hash.slice(1))
}

// A tab opened before a deploy may ask for JS files that no longer exist: reload once.
window.addEventListener('vite:preloadError', () => {
  if (!sessionStorage.getItem('mg-chunk-reload')) {
    sessionStorage.setItem('mg-chunk-reload', '1')
    window.location.reload()
  }
})

createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ErrorBoundary>,
)

// Allow another one-time reload on a future deploy once this session has been healthy
setTimeout(() => sessionStorage.removeItem('mg-chunk-reload'), 10_000)

initSmoothScroll()
initMonitoring()
registerServiceWorker()
