import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Wrench,
  MapPin,
  Clock,
  Star,
  History,
  CreditCard,
  Settings,
  Bell,
  Plus,
  Car,
  ChevronRight,
  LogOut,
  Home,
} from 'lucide-react'

const sidebarItems = [
  { id: 'overview', label: 'Overview', icon: Home },
  { id: 'vehicles', label: 'My Vehicles', icon: Car },
  { id: 'history', label: 'Service History', icon: History },
  { id: 'payments', label: 'Payments', icon: CreditCard },
  { id: 'settings', label: 'Settings', icon: Settings },
]

const mockActiveRequest = {
  id: 1,
  service: 'Battery Jump Start',
  mechanic: 'Mike Johnson',
  status: 'en_route',
  eta: '12 min',
  location: '123 Main St, Downtown',
}

const mockHistory = [
  { id: 1, service: 'Tire Change', date: 'May 15, 2025', mechanic: 'Sarah Chen', cost: 65, rating: 5 },
  { id: 2, service: 'Oil Leak Repair', date: 'Apr 22, 2025', mechanic: 'Carlos Ruiz', cost: 145, rating: 5 },
  { id: 3, service: 'Brake Inspection', date: 'Mar 10, 2025', mechanic: 'Mike Johnson', cost: 45, rating: 4 },
]

const mockVehicles = [
  { id: 1, year: '2020', make: 'Toyota', model: 'Camry', plate: 'ABC-1234', color: 'Silver' },
  { id: 2, year: '2019', make: 'Honda', model: 'CR-V', plate: 'XYZ-5678', color: 'Black' },
]

export default function CustomerDashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-[100dvh] bg-black flex">
      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#0A0A0A] border-r border-white/10 transform transition-transform duration-300 lg:transform-none ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6">
          <Link to="/" className="flex items-center gap-2 mb-10">
            <div className="w-8 h-8 rounded-full bg-[#F7FF19] flex items-center justify-center">
              <Wrench className="w-4 h-4 text-black" />
            </div>
            <span className="font-display text-xl tracking-wide text-white">
              MECHANIC<span className="text-[#F7FF19]">GO</span>
            </span>
          </Link>

          <nav className="space-y-1">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id)
                  setSidebarOpen(false)
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  activeTab === item.id
                    ? 'bg-[#F7FF19]/10 text-[#F7FF19]'
                    : 'text-white/50 hover:text-white hover:bg-white/5'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-[#F7FF19]/20 flex items-center justify-center">
              <span className="font-display text-lg text-[#F7FF19]">J</span>
            </div>
            <div>
              <div className="text-sm font-semibold text-white">John Doe</div>
              <div className="text-xs text-white/50">john@example.com</div>
            </div>
          </div>
          <Link
            to="/"
            className="flex items-center gap-2 text-sm text-white/50 hover:text-[#F7FF19] transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </Link>
        </div>
      </aside>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-black/80 backdrop-blur-xl border-b border-white/10 px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-white p-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-lg font-semibold text-white capitalize hidden sm:block">
            {activeTab.replace('-', ' ')}
          </h1>
          <div className="flex items-center gap-3">
            <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors relative">
              <Bell className="w-5 h-5 text-white/70" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#F7FF19] rounded-full" />
            </button>
          </div>
        </header>

        <div className="p-6 max-w-6xl mx-auto">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Quick Actions */}
              <div className="grid sm:grid-cols-3 gap-4">
                <Link
                  to="/request"
                  className="bg-[#F7FF19] rounded-xl p-5 flex items-center gap-4 hover:scale-[1.02] transition-transform"
                >
                  <div className="w-12 h-12 rounded-xl bg-black/10 flex items-center justify-center">
                    <Plus className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <div className="font-semibold text-black">Request Service</div>
                    <div className="text-sm text-black/60">Get help now</div>
                  </div>
                </Link>
                <div className="glass-panel rounded-xl p-5 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#F7FF19]/10 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-[#F7FF19]" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">Avg. Response</div>
                    <div className="text-sm text-white/50">12 minutes</div>
                  </div>
                </div>
                <div className="glass-panel rounded-xl p-5 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#4ADE80]/10 flex items-center justify-center">
                    <Star className="w-6 h-6 text-[#4ADE80]" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">Your Rating</div>
                    <div className="text-sm text-white/50">4.9 / 5.0</div>
                  </div>
                </div>
              </div>

              {/* Active Request */}
              {mockActiveRequest && (
                <div className="glass-panel rounded-xl p-6 border-l-4 border-l-[#F7FF19]">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-mono-sm text-[#F7FF19] mb-1">ACTIVE REQUEST</p>
                      <h3 className="text-xl font-semibold text-white">
                        {mockActiveRequest.service}
                      </h3>
                    </div>
                    <Link
                      to={`/tracking/${mockActiveRequest.id}`}
                      className="btn-primary text-xs"
                    >
                      TRACK
                    </Link>
                  </div>
                  <div className="grid sm:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-white/60">
                      <MapPin className="w-4 h-4 text-[#F7FF19]" />
                      {mockActiveRequest.location}
                    </div>
                    <div className="flex items-center gap-2 text-white/60">
                      <Wrench className="w-4 h-4 text-[#F7FF19]" />
                      {mockActiveRequest.mechanic}
                    </div>
                    <div className="flex items-center gap-2 text-white/60">
                      <Clock className="w-4 h-4 text-[#4ADE80]" />
                      ETA: {mockActiveRequest.eta}
                    </div>
                  </div>
                </div>
              )}

              {/* Recent History */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Recent Services</h3>
                  <button
                    onClick={() => setActiveTab('history')}
                    className="text-sm text-[#F7FF19] hover:underline flex items-center gap-1"
                  >
                    View All <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-3">
                  {mockHistory.slice(0, 3).map((item) => (
                    <div
                      key={item.id}
                      className="glass-panel rounded-xl p-4 flex items-center gap-4"
                    >
                      <div className="w-10 h-10 rounded-lg bg-[#F7FF19]/10 flex items-center justify-center flex-shrink-0">
                        <Wrench className="w-5 h-5 text-[#F7FF19]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-white">{item.service}</div>
                        <div className="text-sm text-white/50">
                          {item.mechanic} • {item.date}
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="font-semibold text-white">${item.cost}</div>
                        <div className="flex items-center gap-1 text-sm text-[#F7FF19]">
                          <Star className="w-3 h-3 fill-[#F7FF19]" />
                          {item.rating}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Vehicles Tab */}
          {activeTab === 'vehicles' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-white">My Vehicles</h2>
                <button className="btn-primary text-xs">
                  <Plus className="w-4 h-4 inline mr-1" /> ADD VEHICLE
                </button>
              </div>
              {mockVehicles.map((vehicle) => (
                <div
                  key={vehicle.id}
                  className="glass-panel rounded-xl p-5 flex items-center gap-4"
                >
                  <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center">
                    <Car className="w-7 h-7 text-white/50" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-white">
                      {vehicle.year} {vehicle.make} {vehicle.model}
                    </div>
                    <div className="text-sm text-white/50">
                      {vehicle.color} • {vehicle.plate}
                    </div>
                  </div>
                  <button className="text-white/50 hover:text-white transition-colors">
                    <Settings className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* History Tab */}
          {activeTab === 'history' && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white mb-4">Service History</h2>
              {mockHistory.map((item) => (
                <div
                  key={item.id}
                  className="glass-panel rounded-xl p-5"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-[#F7FF19]/10 flex items-center justify-center">
                        <Wrench className="w-6 h-6 text-[#F7FF19]" />
                      </div>
                      <div>
                        <div className="font-semibold text-white">{item.service}</div>
                        <div className="text-sm text-white/50">{item.mechanic}</div>
                        <div className="text-sm text-white/50">{item.date}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-white">${item.cost}</div>
                      <div className="flex items-center gap-1 text-sm text-[#F7FF19]">
                        <Star className="w-3 h-3 fill-[#F7FF19]" />
                        {item.rating}.0
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Payments Tab */}
          {activeTab === 'payments' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-white">Payment Methods</h2>
              <div className="glass-panel rounded-xl p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#F7FF19]/10 flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-[#F7FF19]" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-white">•••• •••• •••• 4242</div>
                    <div className="text-sm text-white/50">Expires 12/26</div>
                  </div>
                  <span className="text-xs bg-[#4ADE80]/20 text-[#4ADE80] px-2 py-1 rounded-full">
                    Default
                  </span>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-white">Transaction History</h3>
              {mockHistory.map((item) => (
                <div key={item.id} className="glass-panel rounded-xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-white/50" />
                    </div>
                    <div>
                      <div className="font-medium text-white">{item.service}</div>
                      <div className="text-sm text-white/50">{item.date}</div>
                    </div>
                  </div>
                  <span className="font-semibold text-white">-${item.cost}</span>
                </div>
              ))}
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="space-y-6 max-w-lg">
              <h2 className="text-xl font-semibold text-white">Account Settings</h2>

              <div className="space-y-4">
                <div>
                  <label className="text-mono-sm text-white/50 mb-2 block">FULL NAME</label>
                  <input
                    type="text"
                    defaultValue="John Doe"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#F7FF19]"
                  />
                </div>
                <div>
                  <label className="text-mono-sm text-white/50 mb-2 block">EMAIL</label>
                  <input
                    type="email"
                    defaultValue="john@example.com"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#F7FF19]"
                  />
                </div>
                <div>
                  <label className="text-mono-sm text-white/50 mb-2 block">PHONE</label>
                  <input
                    type="tel"
                    defaultValue="+1 (555) 123-4567"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#F7FF19]"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <h3 className="text-lg font-semibold text-white mb-4">Notifications</h3>
                <div className="space-y-3">
                  {['Service Updates', 'Promotions', 'New Features'].map((item) => (
                    <label key={item} className="flex items-center justify-between cursor-pointer">
                      <span className="text-white/70">{item}</span>
                      <div className="w-11 h-6 bg-[#F7FF19] rounded-full relative">
                        <div className="absolute right-1 top-1 w-4 h-4 bg-black rounded-full" />
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <button className="btn-primary w-full">SAVE CHANGES</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
