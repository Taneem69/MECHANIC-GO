import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  Phone,
  MessageSquare,
  MapPin,
  Clock,
  Navigation,
  Star,
  CheckCircle,
  AlertCircle,
} from 'lucide-react'
import Navbar from '../components/Navbar'

type Status = 'en_route' | 'arrived' | 'diagnosing' | 'in_progress' | 'completed'

const mockMechanic = {
  id: 1,
  name: 'Mike Johnson',
  rating: 4.9,
  jobs: 342,
  phone: '+1 (555) 123-4567',
  specialty: 'Engine & Electrical',
  avatar: 'M',
}

export default function LiveTrackingPage() {
  const { id: _id } = useParams()
  const [status, setStatus] = useState<Status>('en_route')
  const [eta, setEta] = useState(12)
  const [chatOpen, setChatOpen] = useState(false)
  const [messages, setMessages] = useState([
    { from: 'mechanic', text: 'Hi! I\'m Mike, your mechanic. I\'m on my way!', time: '2:30 PM' },
    { from: 'customer', text: 'Great, thank you! I\'m at the location.', time: '2:31 PM' },
  ])
  const [newMessage, setNewMessage] = useState('')

  // Simulate status changes
  useEffect(() => {
    const timers = [
      setTimeout(() => { setStatus('arrived'); setEta(0) }, 8000),
      setTimeout(() => { setStatus('diagnosing') }, 12000),
      setTimeout(() => { setStatus('in_progress') }, 16000),
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  // Countdown timer
  useEffect(() => {
    if (eta <= 0) return
    const interval = setInterval(() => setEta((e) => Math.max(0, e - 1)), 60000)
    return () => clearInterval(interval)
  }, [eta])

  const handleSendMessage = () => {
    if (!newMessage.trim()) return
    setMessages([...messages, { from: 'customer', text: newMessage, time: 'Now' }])
    setNewMessage('')
  }

  const statusConfig: Record<Status, { label: string; color: string; icon: typeof Clock }> = {
    en_route: { label: 'En Route', color: 'text-[#F7FF19]', icon: Navigation },
    arrived: { label: 'Arrived', color: 'text-[#4ADE80]', icon: MapPin },
    diagnosing: { label: 'Diagnosing', color: 'text-[#F59E0B]', icon: AlertCircle },
    in_progress: { label: 'Repair in Progress', color: 'text-[#F7FF19]', icon: Clock },
    completed: { label: 'Completed', color: 'text-[#4ADE80]', icon: CheckCircle },
  }

  const currentStatus = statusConfig[status]

  return (
    <div className="min-h-[100dvh] bg-black">
      <Navbar />
      <div className="pt-16 h-[100dvh] flex flex-col">
        {/* Map Area */}
        <div className="flex-1 relative bg-[#0A0A0A] overflow-hidden">
          {/* Abstract Map Visualization */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* Grid */}
            {Array.from({ length: 20 }, (_, i) => (
              <g key={i}>
                <line x1={i * 5} y1="0" x2={i * 5} y2="100" stroke="rgba(255,255,255,0.05)" strokeWidth="0.2" />
                <line x1="0" y1={i * 5} x2="100" y2={i * 5} stroke="rgba(255,255,255,0.05)" strokeWidth="0.2" />
              </g>
            ))}
            {/* Route */}
            <path
              d="M 30 70 Q 50 50 65 40 Q 75 32 70 25"
              stroke="#F7FF19"
              strokeWidth="0.5"
              fill="none"
              strokeDasharray="2 1"
            >
              <animate attributeName="stroke-dashoffset" from="10" to="0" dur="2s" repeatCount="indefinite" />
            </path>
            {/* Customer location */}
            <circle cx="30" cy="70" r="1.5" fill="#4ADE80">
              <animate attributeName="r" values="1.5;2.5;1.5" dur="2s" repeatCount="indefinite" />
            </circle>
            {/* Mechanic location */}
            <circle cx="70" cy="25" r="1.5" fill="#F7FF19">
              <animate attributeName="r" values="1.5;2.5;1.5" dur="2s" repeatCount="indefinite" />
            </circle>
          </svg>

          {/* Back Button */}
          <Link
            to="/customer"
            className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-black/80 backdrop-blur-sm px-4 py-2 rounded-full text-white/70 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Dashboard</span>
          </Link>

          {/* Status Overlay */}
          <div className="absolute top-4 right-4 z-20 glass-panel rounded-full px-4 py-2 flex items-center gap-2">
            <currentStatus.icon className={`w-4 h-4 ${currentStatus.color}`} />
            <span className={`text-sm font-medium ${currentStatus.color}`}>
              {currentStatus.label}
            </span>
          </div>

          {/* ETA Card */}
          {eta > 0 && (
            <div className="absolute bottom-32 left-1/2 -translate-x-1/2 glass-panel rounded-xl px-6 py-3 flex items-center gap-3">
              <Clock className="w-5 h-5 text-[#F7FF19]" />
              <span className="text-white font-semibold">{eta} min arrival</span>
            </div>
          )}
        </div>

        {/* Bottom Panel - Mechanic Info */}
        <div className="bg-[#1A1A1A] border-t border-white/10 p-4 lg:p-6">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-full bg-[#F7FF19]/20 flex items-center justify-center flex-shrink-0">
                <span className="font-display text-2xl text-[#F7FF19]">
                  {mockMechanic.avatar}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-white">{mockMechanic.name}</h3>
                <div className="flex items-center gap-3 text-sm text-white/50">
                  <span className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-[#F7FF19] fill-[#F7FF19]" />
                    {mockMechanic.rating}
                  </span>
                  <span>{mockMechanic.jobs} jobs</span>
                  <span className="text-[#F7FF19]">{mockMechanic.specialty}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#4ADE80]/20 hover:text-[#4ADE80] transition-all">
                  <Phone className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setChatOpen(!chatOpen)}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#F7FF19]/20 hover:text-[#F7FF19] transition-all"
                >
                  <MessageSquare className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center gap-2">
              {(['en_route', 'arrived', 'diagnosing', 'in_progress', 'completed'] as Status[]).map(
                (s, i) => {
                  const isActive =
                    ['en_route', 'arrived', 'diagnosing', 'in_progress', 'completed'].indexOf(
                      status
                    ) >= i
                  return (
                    <div key={s} className="flex-1 flex items-center gap-1">
                      <div
                        className={`flex-1 h-1.5 rounded-full transition-all duration-500 ${
                          isActive ? 'bg-[#F7FF19]' : 'bg-white/10'
                        }`}
                      />
                    </div>
                  )
                }
              )}
            </div>
          </div>
        </div>

        {/* Chat Panel */}
        {chatOpen && (
          <div className="absolute bottom-32 right-4 w-80 bg-[#1A1A1A] border border-white/10 rounded-xl overflow-hidden z-30 shadow-2xl">
            <div className="p-3 border-b border-white/10 flex items-center justify-between">
              <span className="text-sm font-semibold text-white">Chat with {mockMechanic.name}</span>
              <button
                onClick={() => setChatOpen(false)}
                className="text-white/50 hover:text-white"
              >
                ✕
              </button>
            </div>
            <div className="h-64 overflow-y-auto p-3 space-y-3">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.from === 'customer' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-xl px-3 py-2 text-sm ${
                      msg.from === 'customer'
                        ? 'bg-[#F7FF19] text-black'
                        : 'bg-white/10 text-white'
                    }`}
                  >
                    <p>{msg.text}</p>
                    <span className="text-xs opacity-50">{msg.time}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 border-t border-white/10 flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type a message..."
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#F7FF19]"
              />
              <button
                onClick={handleSendMessage}
                className="px-3 py-2 bg-[#F7FF19] text-black rounded-lg text-sm font-medium hover:bg-[#F7FF19]/90 transition-colors"
              >
                Send
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
