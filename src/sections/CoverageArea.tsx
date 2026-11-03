import { useEffect, useRef } from 'react'
import { MapPin, Clock, Users, Shield } from 'lucide-react'

const stats = [
  { icon: Users, value: '2,400+', label: 'Certified Mechanics' },
  { icon: MapPin, value: '48', label: 'States Covered' },
  { icon: Clock, value: '34 min', label: 'Average Arrival' },
  { icon: Shield, value: '50K+', label: 'Happy Drivers' },
]

// Grid dots for map visualization
const gridDots = Array.from({ length: 12 }, (_, row) =>
  Array.from({ length: 20 }, (_, col) => ({
    id: `${row}-${col}`,
    x: col * 5,
    y: row * 8,
    active: Math.random() > 0.6,
    pulse: Math.random() > 0.7,
  }))
)

export default function CoverageArea() {
  const sectionRef = useRef<HTMLElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll('.stat-item')
            items.forEach((item, i) => {
              setTimeout(() => {
                item.classList.add('opacity-100', 'translate-y-0')
                item.classList.remove('opacity-0', 'translate-y-4')
              }, i * 100)
            })
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.3 }
    )

    if (statsRef.current) {
      observer.observe(statsRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="coverage"
      ref={sectionRef}
      className="relative bg-black py-24 lg:py-32 overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Text */}
          <div>
            <p className="text-caption text-[#F7FF19] mb-3">OUR REACH</p>
            <h2 className="text-h2 font-heading font-bold text-white mb-6">
              WE COME
              <br />
              TO <span className="text-[#F7FF19]">YOU</span>
            </h2>
            <p className="text-body-lg text-white/60 mb-10 max-w-md">
              Over 2,400 certified mechanics across 48 states. Average arrival time: 34 minutes.
            </p>

            {/* Stats Grid */}
            <div ref={statsRef} className="grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="stat-item glass-panel rounded-xl p-5 opacity-0 translate-y-4 transition-all duration-500"
                >
                  <stat.icon className="w-6 h-6 text-[#F7FF19] mb-3" />
                  <div className="font-display text-3xl text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-mono-sm text-white/50">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Abstract Map */}
          <div className="relative aspect-[4/3] lg:aspect-auto lg:h-[500px]">
            <div className="absolute inset-0 bg-[#0A0A0A] rounded-2xl overflow-hidden">
              {/* Grid */}
              <div className="absolute inset-0 grid grid-cols-20 grid-rows-12 gap-0">
                {gridDots.flat().map((dot) => (
                  <div
                    key={dot.id}
                    className={`flex items-center justify-center ${
                      dot.active ? '' : 'opacity-20'
                    }`}
                  >
                    <div
                      className={`w-1.5 h-1.5 rounded-full ${
                        dot.active
                          ? dot.pulse
                            ? 'bg-[#F7FF19] animate-pulse'
                            : 'bg-[#F7FF19]/60'
                          : 'bg-white/10'
                      }`}
                    />
                  </div>
                ))}
              </div>

              {/* Connection lines */}
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <line
                  x1="20"
                  y1="30"
                  x2="45"
                  y2="45"
                  stroke="#F7FF19"
                  strokeWidth="0.15"
                  opacity="0.3"
                />
                <line
                  x1="45"
                  y1="45"
                  x2="70"
                  y2="35"
                  stroke="#F7FF19"
                  strokeWidth="0.15"
                  opacity="0.3"
                />
                <line
                  x1="70"
                  y1="35"
                  x2="85"
                  y2="55"
                  stroke="#F7FF19"
                  strokeWidth="0.15"
                  opacity="0.3"
                />
                <line
                  x1="30"
                  y1="60"
                  x2="55"
                  y2="50"
                  stroke="#F7FF19"
                  strokeWidth="0.15"
                  opacity="0.3"
                />
                <line
                  x1="55"
                  y1="50"
                  x2="75"
                  y2="65"
                  stroke="#F7FF19"
                  strokeWidth="0.15"
                  opacity="0.3"
                />
              </svg>

              {/* Labels */}
              <div className="absolute top-6 left-6 text-mono-sm text-[#F7FF19]">
                LIVE COVERAGE MAP
              </div>
              <div className="absolute bottom-6 right-6 flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#F7FF19] animate-pulse" />
                  <span className="text-mono-sm text-white/60">ACTIVE</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-white/20" />
                  <span className="text-mono-sm text-white/60">COVERED</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
