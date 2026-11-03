import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import CustomerDashboard from './dashboards/CustomerDashboard'
import MechanicDashboard from './dashboards/MechanicDashboard'
import AdminDashboard from './dashboards/AdminDashboard'
import RequestServicePage from './pages/RequestServicePage'
import LiveTrackingPage from './pages/LiveTrackingPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/customer" element={<CustomerDashboard />} />
      <Route path="/mechanic" element={<MechanicDashboard />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/request" element={<RequestServicePage />} />
      <Route path="/tracking/:id" element={<LiveTrackingPage />} />
    </Routes>
  )
}

export default App
