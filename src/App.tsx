import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage' // eager: it is the entry route
import RouteEffects from './components/RouteEffects'

// Every other screen is split into its own chunk and loaded on demand
const LoginPage = lazy(() => import('./pages/LoginPage'))
const RegisterPage = lazy(() => import('./pages/RegisterPage'))
const RequestServicePage = lazy(() => import('./pages/RequestServicePage'))
const LiveTrackingPage = lazy(() => import('./pages/LiveTrackingPage'))
const CustomerDashboard = lazy(() => import('./dashboards/CustomerDashboard'))
const MechanicDashboard = lazy(() => import('./dashboards/MechanicDashboard'))
const AdminDashboard = lazy(() => import('./dashboards/AdminDashboard'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

function PageLoader() {
  return (
    <div role="status" aria-live="polite" className="min-h-[100dvh] bg-black flex items-center justify-center">
      <div className="w-10 h-10 rounded-full border-2 border-white/10 border-t-[#F7FF19] animate-spin" />
      <span className="sr-only">Loading…</span>
    </div>
  )
}

function App() {
  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <RouteEffects />
      <main id="main-content" tabIndex={-1} className="outline-none">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/customer" element={<CustomerDashboard />} />
            <Route path="/mechanic" element={<MechanicDashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/request" element={<RequestServicePage />} />
            <Route path="/tracking/:id" element={<LiveTrackingPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
    </>
  )
}

export default App
