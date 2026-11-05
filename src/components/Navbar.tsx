import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Wrench, Menu, X } from 'lucide-react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!mobileOpen) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMobileOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [mobileOpen])

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
      setMobileOpen(false)
    }
  }

  return (
    <nav
      aria-label="Primary"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || !isHome
          ? 'bg-black/80 backdrop-blur-xl border-b border-white/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" aria-label="MechanicGo home" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-full bg-[#F7FF19] flex items-center justify-center group-hover:scale-110 transition-transform">
              <Wrench className="w-5 h-5 text-black" />
            </div>
            <span className="font-display text-2xl tracking-wide text-white">
              MECHANIC<span className="text-[#F7FF19]">GO</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {isHome ? (
              <>
                <button
                  onClick={() => scrollToSection('how-it-works')}
                  className="text-sm text-white/70 hover:text-[#F7FF19] transition-colors uppercase tracking-wider"
                >
                  How It Works
                </button>
                <button
                  onClick={() => scrollToSection('services')}
                  className="text-sm text-white/70 hover:text-[#F7FF19] transition-colors uppercase tracking-wider"
                >
                  Services
                </button>
                <button
                  onClick={() => scrollToSection('estimator')}
                  className="text-sm text-white/70 hover:text-[#F7FF19] transition-colors uppercase tracking-wider"
                >
                  Pricing
                </button>
              </>
            ) : (
              <Link
                to="/"
                className="text-sm text-white/70 hover:text-[#F7FF19] transition-colors uppercase tracking-wider"
              >
                Home
              </Link>
            )}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              to="/login"
              className="text-sm text-white/70 hover:text-white transition-colors uppercase tracking-wider"
            >
              Sign In
            </Link>
            <Link to="/register" className="btn-primary text-xs">
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white p-3 -mr-3"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div id="mobile-menu" className="lg:hidden bg-black/95 backdrop-blur-xl border-t border-white/10">
          <div className="px-6 py-6 flex flex-col gap-4">
            {isHome ? (
              <>
                <button
                  onClick={() => scrollToSection('how-it-works')}
                  className="text-left text-white/70 hover:text-[#F7FF19] transition-colors uppercase tracking-wider py-2"
                >
                  How It Works
                </button>
                <button
                  onClick={() => scrollToSection('services')}
                  className="text-left text-white/70 hover:text-[#F7FF19] transition-colors uppercase tracking-wider py-2"
                >
                  Services
                </button>
                <button
                  onClick={() => scrollToSection('estimator')}
                  className="text-left text-white/70 hover:text-[#F7FF19] transition-colors uppercase tracking-wider py-2"
                >
                  Pricing
                </button>
              </>
            ) : (
              <Link
                to="/"
                className="text-white/70 hover:text-[#F7FF19] transition-colors uppercase tracking-wider py-2"
                onClick={() => setMobileOpen(false)}
              >
                Home
              </Link>
            )}
            <hr className="border-white/10" />
            <Link
              to="/login"
              className="text-white/70 hover:text-white transition-colors uppercase tracking-wider py-2"
              onClick={() => setMobileOpen(false)}
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="btn-primary text-center text-xs"
              onClick={() => setMobileOpen(false)}
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
