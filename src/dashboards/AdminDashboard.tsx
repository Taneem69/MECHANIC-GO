import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Wrench,
  Users,
  DollarSign,
  CheckCircle,
  XCircle,
  Clock,
  Star,
  Settings,
  Bell,
  LogOut,
  Home,
  Shield,
  Search,
  BarChart3,
  Flag,
  Briefcase,
} from 'lucide-react'

const sidebarItems = [
  { id: 'overview', label: 'Overview', icon: Home },
  { id: 'mechanics', label: 'Mechanics', icon: Briefcase },
  { id: 'customers', label: 'Customers', icon: Users },
  { id: 'transactions', label: 'Transactions', icon: DollarSign },
  { id: 'disputes', label: 'Disputes', icon: Flag },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'settings', label: 'Settings', icon: Settings },
]

const mockStats = {
  totalUsers: 12450,
  activeMechanics: 2840,
  todayRequests: 156,
  revenue: 48250,
  disputes: 3,
  avgResponse: 12,
}

const mockPendingMechanics = [
  {
    id: 1,
    name: 'Robert Taylor',
    email: 'robert.t@email.com',
    specialty: 'Transmission',
    experience: '8 years',
    applied: '2 hours ago',
    documents: 3,
  },
  {
    id: 2,
    name: 'Emily Park',
    email: 'emily.p@email.com',
    specialty: 'Electrical',
    experience: '5 years',
    applied: '5 hours ago',
    documents: 3,
  },
  {
    id: 3,
    name: 'David Kim',
    email: 'david.k@email.com',
    specialty: 'Engine',
    experience: '12 years',
    applied: '1 day ago',
    documents: 2,
  },
]

const mockRecentTransactions = [
  { id: 1, service: 'Battery Jump', customer: 'Alice W.', mechanic: 'Mike J.', amount: 65, status: 'completed', time: '10 min ago' },
  { id: 2, service: 'Brake Repair', customer: 'Bob M.', mechanic: 'Sarah C.', amount: 145, status: 'in_progress', time: '25 min ago' },
  { id: 3, service: 'Oil Change', customer: 'Carol D.', mechanic: 'Carlos R.', amount: 55, status: 'completed', time: '1 hr ago' },
  { id: 4, service: 'Tire Change', customer: 'Tom H.', mechanic: 'Mike J.', amount: 80, status: 'completed', time: '2 hrs ago' },
]

const mockDisputes = [
  { id: 1, type: 'Overcharge', customer: 'Alice W.', mechanic: 'John D.', amount: 120, status: 'open' },
  { id: 2, type: 'Service Quality', customer: 'Bob M.', mechanic: 'Steve K.', amount: 200, status: 'resolved' },
]

const categoryData = [
  { name: 'Roadside', value: 35, color: '#F7FF19' },
  { name: 'Engine', value: 25, color: '#4ADE80' },
  { name: 'Electrical', value: 20, color: '#F59E0B' },
  { name: 'Brakes', value: 15, color: '#EF4444' },
  { name: 'Other', value: 5, color: '#8B5CF6' },
]

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

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
              <Shield className="w-5 h-5 text-[#F7FF19]" />
            </div>
            <div>
              <div className="text-sm font-semibold text-white">Admin</div>
              <div className="text-xs text-white/50">admin@mechanicgo.com</div>
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
        <header className="sticky top-0 z-30 bg-black/80 backdrop-blur-xl border-b border-white/10 px-6 py-4 flex items-center justify-between gap-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-white p-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Search */}
          <div className="hidden sm:flex items-center flex-1 max-w-md bg-white/5 border border-white/10 rounded-lg px-4 py-2">
            <Search className="w-4 h-4 text-white/50 mr-2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search users, transactions..."
              className="bg-transparent text-sm text-white placeholder:text-white/50 focus:outline-none flex-1"
            />
          </div>

          <div className="flex items-center gap-3">
            <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors relative">
              <Bell className="w-5 h-5 text-white/70" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#EF4444] rounded-full" />
            </button>
          </div>
        </header>

        <div className="p-6 max-w-7xl mx-auto">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="glass-panel rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Users className="w-5 h-5 text-[#F7FF19]" />
                    <span className="text-mono-sm text-white/50">TOTAL USERS</span>
                  </div>
                  <div className="font-display text-3xl text-white">
                    {mockStats.totalUsers.toLocaleString()}
                  </div>
                </div>
                <div className="glass-panel rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Briefcase className="w-5 h-5 text-[#4ADE80]" />
                    <span className="text-mono-sm text-white/50">MECHANICS</span>
                  </div>
                  <div className="font-display text-3xl text-white">
                    {mockStats.activeMechanics.toLocaleString()}
                  </div>
                </div>
                <div className="glass-panel rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Wrench className="w-5 h-5 text-[#F59E0B]" />
                    <span className="text-mono-sm text-white/50">TODAY'S REQUESTS</span>
                  </div>
                  <div className="font-display text-3xl text-white">
                    {mockStats.todayRequests}
                  </div>
                </div>
                <div className="glass-panel rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <DollarSign className="w-5 h-5 text-[#F7FF19]" />
                    <span className="text-mono-sm text-white/50">REVENUE</span>
                  </div>
                  <div className="font-display text-3xl text-[#F7FF19]">
                    ${mockStats.revenue.toLocaleString()}
                  </div>
                </div>
                <div className="glass-panel rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Flag className="w-5 h-5 text-[#EF4444]" />
                    <span className="text-mono-sm text-white/50">DISPUTES</span>
                  </div>
                  <div className="font-display text-3xl text-white">
                    {mockStats.disputes}
                  </div>
                </div>
                <div className="glass-panel rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="w-5 h-5 text-[#4ADE80]" />
                    <span className="text-mono-sm text-white/50">AVG RESPONSE</span>
                  </div>
                  <div className="font-display text-3xl text-white">
                    {mockStats.avgResponse}m
                  </div>
                </div>
              </div>

              {/* Recent Transactions */}
              <div className="glass-panel rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Recent Transactions</h3>
                  <button
                    onClick={() => setActiveTab('transactions')}
                    className="text-sm text-[#F7FF19] hover:underline"
                  >
                    View All
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-mono-sm text-white/50 border-b border-white/10">
                        <th className="pb-3 pr-4">SERVICE</th>
                        <th className="pb-3 pr-4">CUSTOMER</th>
                        <th className="pb-3 pr-4">MECHANIC</th>
                        <th className="pb-3 pr-4">AMOUNT</th>
                        <th className="pb-3 pr-4">STATUS</th>
                        <th className="pb-3">TIME</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockRecentTransactions.map((tx) => (
                        <tr key={tx.id} className="border-b border-white/5 last:border-0">
                          <td className="py-3 pr-4 text-white">{tx.service}</td>
                          <td className="py-3 pr-4 text-white/60">{tx.customer}</td>
                          <td className="py-3 pr-4 text-white/60">{tx.mechanic}</td>
                          <td className="py-3 pr-4 text-[#F7FF19] font-semibold">${tx.amount}</td>
                          <td className="py-3 pr-4">
                            <span
                              className={`text-xs px-2 py-1 rounded-full ${
                                tx.status === 'completed'
                                  ? 'bg-[#4ADE80]/20 text-[#4ADE80]'
                                  : 'bg-[#F59E0B]/20 text-[#F59E0B]'
                              }`}
                            >
                              {tx.status}
                            </span>
                          </td>
                          <td className="py-3 text-white/55 text-sm">{tx.time}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Mechanics Tab */}
          {activeTab === 'mechanics' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-white">Pending Approvals</h2>
              {mockPendingMechanics.map((mechanic) => (
                <div
                  key={mechanic.id}
                  className="glass-panel rounded-xl p-5 border-l-4 border-l-[#F7FF19]"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-[#F7FF19]/20 flex items-center justify-center">
                        <span className="font-display text-xl text-[#F7FF19]">
                          {mechanic.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">{mechanic.name}</h3>
                        <p className="text-sm text-white/50">{mechanic.email}</p>
                      </div>
                    </div>
                    <span className="text-sm text-white/55">{mechanic.applied}</span>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                    <div>
                      <span className="text-white/55">Specialty</span>
                      <p className="text-white">{mechanic.specialty}</p>
                    </div>
                    <div>
                      <span className="text-white/55">Experience</span>
                      <p className="text-white">{mechanic.experience}</p>
                    </div>
                    <div>
                      <span className="text-white/55">Documents</span>
                      <p className="text-white">{mechanic.documents}/3 uploaded</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 bg-[#4ADE80] text-black py-2.5 rounded-lg font-semibold text-sm hover:bg-[#4ADE80]/90 transition-colors flex items-center justify-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      APPROVE
                    </button>
                    <button className="flex-1 bg-[#EF4444]/20 text-[#EF4444] py-2.5 rounded-lg font-semibold text-sm hover:bg-[#EF4444]/30 transition-colors flex items-center justify-center gap-2">
                      <XCircle className="w-4 h-4" />
                      REJECT
                    </button>
                    <button className="px-4 bg-white/10 text-white py-2.5 rounded-lg font-semibold text-sm hover:bg-white/20 transition-colors">
                      REVIEW
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Customers Tab */}
          {activeTab === 'customers' && (
            <div className="glass-panel rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Customer List</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-mono-sm text-white/50 border-b border-white/10">
                      <th className="pb-3 pr-4">NAME</th>
                      <th className="pb-3 pr-4">EMAIL</th>
                      <th className="pb-3 pr-4">SERVICES</th>
                      <th className="pb-3 pr-4">RATING</th>
                      <th className="pb-3">JOINED</th>
                    </tr>
                  </thead>
                  <tbody>
                    {['Alice Williams', 'Bob Martinez', 'Carol Davis', 'Tom Harris', 'Lisa Miller'].map(
                      (name, i) => (
                        <tr key={i} className="border-b border-white/5 last:border-0">
                          <td className="py-3 pr-4 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                              <span className="text-sm text-white">{name.charAt(0)}</span>
                            </div>
                            <span className="text-white">{name}</span>
                          </td>
                          <td className="py-3 pr-4 text-white/60">
                            {name.toLowerCase().replace(' ', '.')}@email.com
                          </td>
                          <td className="py-3 pr-4 text-white/60">{3 + i}</td>
                          <td className="py-3 pr-4">
                            <span className="flex items-center gap-1 text-[#F7FF19]">
                              <Star className="w-3 h-3 fill-[#F7FF19]" />
                              {(4.5 + i * 0.1).toFixed(1)}
                            </span>
                          </td>
                          <td className="py-3 text-white/55 text-sm">
                            {['Jan', 'Feb', 'Mar', 'Apr', 'May'][i]} 2025
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Transactions Tab */}
          {activeTab === 'transactions' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-white">All Transactions</h2>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-white/5 rounded-lg text-sm text-white/70 hover:bg-white/10 transition-colors">
                    Filter
                  </button>
                  <button className="px-4 py-2 bg-white/5 rounded-lg text-sm text-white/70 hover:bg-white/10 transition-colors">
                    Export
                  </button>
                </div>
              </div>

              {mockRecentTransactions.map((tx) => (
                <div
                  key={tx.id}
                  className="glass-panel rounded-xl p-5 flex items-center gap-4"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#F7FF19]/10 flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-[#F7FF19]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-white">{tx.service}</div>
                    <div className="text-sm text-white/50">
                      {tx.customer} → {tx.mechanic}
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="font-semibold text-[#F7FF19]">${tx.amount}</div>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        tx.status === 'completed'
                          ? 'bg-[#4ADE80]/20 text-[#4ADE80]'
                          : 'bg-[#F59E0B]/20 text-[#F59E0B]'
                      }`}
                    >
                      {tx.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Disputes Tab */}
          {activeTab === 'disputes' && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white mb-4">Open Disputes</h2>
              {mockDisputes.map((dispute) => (
                <div
                  key={dispute.id}
                  className={`glass-panel rounded-xl p-5 border-l-4 ${
                    dispute.status === 'open' ? 'border-l-[#EF4444]' : 'border-l-[#4ADE80]'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-white">{dispute.type}</h3>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${
                            dispute.status === 'open'
                              ? 'bg-[#EF4444]/20 text-[#EF4444]'
                              : 'bg-[#4ADE80]/20 text-[#4ADE80]'
                          }`}
                        >
                          {dispute.status}
                        </span>
                      </div>
                      <p className="text-sm text-white/50">
                        {dispute.customer} vs {dispute.mechanic}
                      </p>
                    </div>
                    <div className="font-semibold text-white">${dispute.amount}</div>
                  </div>

                  {dispute.status === 'open' && (
                    <div className="flex gap-2">
                      <button className="flex-1 bg-[#4ADE80] text-black py-2 rounded-lg font-semibold text-sm hover:bg-[#4ADE80]/90 transition-colors">
                        RESOLVE
                      </button>
                      <button className="flex-1 bg-white/10 text-white py-2 rounded-lg font-semibold text-sm hover:bg-white/20 transition-colors">
                        INVESTIGATE
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-white">Service Analytics</h2>

              {/* Category Breakdown */}
              <div className="glass-panel rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-6">
                  Service Category Distribution
                </h3>
                <div className="space-y-4">
                  {categoryData.map((cat) => (
                    <div key={cat.name}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-white/70">{cat.name}</span>
                        <span className="text-sm text-white font-mono">{cat.value}%</span>
                      </div>
                      <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-1000"
                          style={{
                            width: `${cat.value}%`,
                            backgroundColor: cat.color,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Heatmap placeholder */}
              <div className="glass-panel rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Service Request Heatmap
                </h3>
                <div className="grid grid-cols-7 gap-2">
                  {Array.from({ length: 49 }, (_, i) => {
                    const intensity = ((i * 37 + 11) % 100) / 100 // stable demo data
                    return (
                      <div
                        key={i}
                        className="aspect-square rounded-sm"
                        style={{
                          backgroundColor:
                            intensity > 0.7
                              ? '#F7FF19'
                              : intensity > 0.4
                                ? 'rgba(247, 255, 25, 0.5)'
                                : 'rgba(255, 255, 255, 0.05)',
                        }}
                      />
                    )
                  })}
                </div>
                <div className="flex items-center justify-between mt-4 text-xs text-white/55">
                  <span>Less</span>
                  <div className="flex gap-1">
                    <div className="w-3 h-3 rounded-sm bg-white/5" />
                    <div className="w-3 h-3 rounded-sm bg-[#F7FF19]/50" />
                    <div className="w-3 h-3 rounded-sm bg-[#F7FF19]" />
                  </div>
                  <span>More</span>
                </div>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="space-y-6 max-w-lg">
              <h2 className="text-xl font-semibold text-white">Platform Settings</h2>

              <div className="space-y-4">
                <div>
                  <label className="text-mono-sm text-white/50 mb-2 block">
                    PLATFORM NAME
                  </label>
                  <input
                    type="text"
                    defaultValue="MechanicGo"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#F7FF19]"
                  />
                </div>
                <div>
                  <label className="text-mono-sm text-white/50 mb-2 block">
                    SERVICE FEE (%)
                  </label>
                  <input
                    type="number"
                    defaultValue="15"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#F7FF19]"
                  />
                </div>
                <div>
                  <label className="text-mono-sm text-white/50 mb-2 block">
                    MINIMUM SERVICE CHARGE
                  </label>
                  <input
                    type="number"
                    defaultValue="45"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#F7FF19]"
                  />
                </div>
                <div>
                  <label className="text-mono-sm text-white/50 mb-2 block">
                    EMERGENCY SURCHARGE (%)
                  </label>
                  <input
                    type="number"
                    defaultValue="25"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#F7FF19]"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <h3 className="text-lg font-semibold text-white mb-4">Security</h3>
                <label className="flex items-center justify-between cursor-pointer mb-3">
                  <span className="text-white/70">Two-Factor Authentication</span>
                  <div className="w-11 h-6 bg-[#F7FF19] rounded-full relative">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-black rounded-full" />
                  </div>
                </label>
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-white/70">Require KYC for Mechanics</span>
                  <div className="w-11 h-6 bg-[#F7FF19] rounded-full relative">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-black rounded-full" />
                  </div>
                </label>
              </div>

              <button className="btn-primary w-full">SAVE SETTINGS</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
