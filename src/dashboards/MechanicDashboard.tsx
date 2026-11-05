import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Wrench,
  MapPin,
  Star,
  DollarSign,
  Settings,
  Bell,
  CheckCircle,
  XCircle,
  Navigation,
  LogOut,
  Home,
  TrendingUp,
  Calendar,
  ToggleLeft,
  ToggleRight,
} from 'lucide-react'

const sidebarItems = [
  { id: 'overview', label: 'Overview', icon: Home },
  { id: 'requests', label: 'Job Requests', icon: Wrench },
  { id: 'earnings', label: 'Earnings', icon: DollarSign },
  { id: 'schedule', label: 'Schedule', icon: Calendar },
  { id: 'settings', label: 'Settings', icon: Settings },
]

const mockIncomingRequests = [
  {
    id: 1,
    service: 'Battery Jump Start',
    customer: 'Alice Williams',
    distance: '0.8 mi',
    eta: '5 min away',
    vehicle: '2021 Honda Civic',
    location: '456 Oak Ave',
    urgency: 'high',
  },
  {
    id: 2,
    service: 'Flat Tire Change',
    customer: 'Bob Martinez',
    distance: '1.5 mi',
    eta: '10 min away',
    vehicle: '2019 Ford F-150',
    location: '789 Pine St',
    urgency: 'medium',
  },
  {
    id: 3,
    service: 'Engine Overheating',
    customer: 'Carol Davis',
    distance: '2.3 mi',
    eta: '15 min away',
    vehicle: '2020 BMW X5',
    location: '321 Elm Dr',
    urgency: 'high',
  },
]

const mockCompletedJobs = [
  { id: 1, service: 'Brake Pad Replacement', date: 'Today', customer: 'Tom H.', earnings: 120, rating: 5 },
  { id: 2, service: 'Oil Change', date: 'Yesterday', customer: 'Lisa M.', earnings: 65, rating: 5 },
  { id: 3, service: 'Battery Replacement', date: 'Jun 3', customer: 'James K.', earnings: 95, rating: 4 },
  { id: 4, service: 'Diagnostic Scan', date: 'Jun 2', customer: 'Sarah L.', earnings: 45, rating: 5 },
]

const weeklyData = [
  { day: 'Mon', earnings: 145 },
  { day: 'Tue', earnings: 210 },
  { day: 'Wed', earnings: 85 },
  { day: 'Thu', earnings: 320 },
  { day: 'Fri', earnings: 175 },
  { day: 'Sat', earnings: 250 },
  { day: 'Sun', earnings: 130 },
]

export default function MechanicDashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isOnline, setIsOnline] = useState(true)

  const totalEarnings = weeklyData.reduce((sum, d) => sum + d.earnings, 0)
  const maxEarnings = Math.max(...weeklyData.map((d) => d.earnings))

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
              <span className="font-display text-lg text-[#F7FF19]">M</span>
            </div>
            <div>
              <div className="text-sm font-semibold text-white">Mike Johnson</div>
              <div className="text-xs text-white/50">mike@mechanicgo.com</div>
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
          <div className="flex items-center gap-4">
            <div
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full cursor-pointer transition-all ${
                isOnline ? 'bg-[#4ADE80]/20' : 'bg-white/10'
              }`}
              onClick={() => setIsOnline(!isOnline)}
            >
              {isOnline ? (
                <>
                  <div className="w-2 h-2 rounded-full bg-[#4ADE80] animate-pulse" />
                  <span className="text-sm font-medium text-[#4ADE80]">Online</span>
                  <ToggleRight className="w-5 h-5 text-[#4ADE80]" />
                </>
              ) : (
                <>
                  <div className="w-2 h-2 rounded-full bg-white/30" />
                  <span className="text-sm font-medium text-white/50">Offline</span>
                  <ToggleLeft className="w-5 h-5 text-white/50" />
                </>
              )}
            </div>
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
              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="glass-panel rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="w-5 h-5 text-[#F7FF19]" />
                    <span className="text-mono-sm text-white/50">TODAY</span>
                  </div>
                  <div className="font-display text-3xl text-white">$245</div>
                </div>
                <div className="glass-panel rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-[#4ADE80]" />
                    <span className="text-mono-sm text-white/50">JOBS</span>
                  </div>
                  <div className="font-display text-3xl text-white">12</div>
                </div>
                <div className="glass-panel rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="w-5 h-5 text-[#F7FF19]" />
                    <span className="text-mono-sm text-white/50">RATING</span>
                  </div>
                  <div className="font-display text-3xl text-white">4.9</div>
                </div>
                <div className="glass-panel rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-5 h-5 text-[#4ADE80]" />
                    <span className="text-mono-sm text-white/50">WEEK</span>
                  </div>
                  <div className="font-display text-3xl text-white">
                    ${totalEarnings}
                  </div>
                </div>
              </div>

              {/* Weekly Earnings Chart */}
              <div className="glass-panel rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-6">Weekly Earnings</h3>
                <div className="flex items-end gap-3 h-40">
                  {weeklyData.map((d) => (
                    <div key={d.day} className="flex-1 flex flex-col items-center gap-2">
                      <span className="text-xs text-white/50">${d.earnings}</span>
                      <div
                        className="w-full bg-[#F7FF19]/80 rounded-t-sm transition-all hover:bg-[#F7FF19]"
                        style={{ height: `${(d.earnings / maxEarnings) * 100}%` }}
                      />
                      <span className="text-xs text-white/50">{d.day}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Jobs */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Recent Jobs</h3>
                <div className="space-y-3">
                  {mockCompletedJobs.map((job) => (
                    <div
                      key={job.id}
                      className="glass-panel rounded-xl p-4 flex items-center gap-4"
                    >
                      <div className="w-10 h-10 rounded-lg bg-[#F7FF19]/10 flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-[#4ADE80]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-white">{job.service}</div>
                        <div className="text-sm text-white/50">
                          {job.customer} • {job.date}
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="font-semibold text-[#F7FF19]">+${job.earnings}</div>
                        <div className="flex items-center gap-1 text-sm text-white/50">
                          <Star className="w-3 h-3 fill-[#F7FF19] text-[#F7FF19]" />
                          {job.rating}.0
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Job Requests Tab */}
          {activeTab === 'requests' && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white mb-4">
                Incoming Requests
              </h2>
              {mockIncomingRequests.map((req) => (
                <div
                  key={req.id}
                  className={`glass-panel rounded-xl p-5 border-l-4 ${
                    req.urgency === 'high'
                      ? 'border-l-[#EF4444]'
                      : 'border-l-[#F7FF19]'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-white">{req.service}</h3>
                        {req.urgency === 'high' && (
                          <span className="text-xs bg-[#EF4444]/20 text-[#EF4444] px-2 py-0.5 rounded-full">
                            URGENT
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-white/50">{req.vehicle}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-[#4ADE80]">
                        <Navigation className="w-4 h-4" />
                        <span className="font-semibold">{req.distance}</span>
                      </div>
                      <span className="text-sm text-white/50">{req.eta}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-white/50 mb-4">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {req.location}
                    </span>
                    <span>{req.customer}</span>
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 bg-[#4ADE80] text-black py-2.5 rounded-lg font-semibold text-sm hover:bg-[#4ADE80]/90 transition-colors flex items-center justify-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      ACCEPT
                    </button>
                    <button className="flex-1 bg-white/10 text-white py-2.5 rounded-lg font-semibold text-sm hover:bg-white/20 transition-colors flex items-center justify-center gap-2">
                      <XCircle className="w-4 h-4" />
                      DECLINE
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Earnings Tab */}
          {activeTab === 'earnings' && (
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="glass-panel rounded-xl p-5 text-center">
                  <div className="text-mono-sm text-white/50 mb-1">THIS WEEK</div>
                  <div className="font-display text-3xl text-[#F7FF19]">${totalEarnings}</div>
                </div>
                <div className="glass-panel rounded-xl p-5 text-center">
                  <div className="text-mono-sm text-white/50 mb-1">THIS MONTH</div>
                  <div className="font-display text-3xl text-white">$3,420</div>
                </div>
                <div className="glass-panel rounded-xl p-5 text-center">
                  <div className="text-mono-sm text-white/50 mb-1">ALL TIME</div>
                  <div className="font-display text-3xl text-white">$24,850</div>
                </div>
              </div>

              <div className="glass-panel rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-6">Earnings Breakdown</h3>
                <div className="flex items-end gap-3 h-48">
                  {weeklyData.map((d) => (
                    <div key={d.day} className="flex-1 flex flex-col items-center gap-2">
                      <span className="text-xs text-white/50">${d.earnings}</span>
                      <div
                        className="w-full bg-gradient-to-t from-[#F7FF19]/60 to-[#F7FF19] rounded-t-sm"
                        style={{ height: `${(d.earnings / maxEarnings) * 100}%` }}
                      />
                      <span className="text-xs text-white/50">{d.day}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Schedule Tab */}
          {activeTab === 'schedule' && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white mb-4">This Week</h2>
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(
                (day, i) => (
                  <div key={day} className="glass-panel rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-white">{day}</span>
                      <span className="text-sm text-white/50">
                        {i < 5 ? '8:00 AM - 6:00 PM' : '10:00 AM - 4:00 PM'}
                      </span>
                    </div>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#F7FF19] rounded-full"
                        style={{ width: `${70 + ((i * 13) % 30)}%` }}
                      />
                    </div>
                  </div>
                )
              )}
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="space-y-6 max-w-lg">
              <h2 className="text-xl font-semibold text-white">Profile Settings</h2>

              <div className="space-y-4">
                <div>
                  <label className="text-mono-sm text-white/50 mb-2 block">FULL NAME</label>
                  <input
                    type="text"
                    defaultValue="Mike Johnson"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#F7FF19]"
                  />
                </div>
                <div>
                  <label className="text-mono-sm text-white/50 mb-2 block">SPECIALTY</label>
                  <input
                    type="text"
                    defaultValue="Engine & Electrical"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#F7FF19]"
                  />
                </div>
                <div>
                  <label className="text-mono-sm text-white/50 mb-2 block">SERVICE RADIUS</label>
                  <input
                    type="text"
                    defaultValue="15 miles"
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

              <button className="btn-primary w-full">SAVE CHANGES</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
