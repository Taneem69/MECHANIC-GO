import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import Lenis from 'lenis'
import './index.css'
import App from './App.tsx'

// Initialize Lenis smooth scroll
// The library is listed in package.json but was never wired up
const lenis = new Lenis({
  duration: 1.2,
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
})

function raf(time: number) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}
requestAnimationFrame(raf)

createRoot(document.getElementById('root')!).render(
  <HashRouter>
    <App />
  </HashRouter>,
)
