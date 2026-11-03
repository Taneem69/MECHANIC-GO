import { Link } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
      {/* Text Overlay */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <p className="text-caption text-[#F7FF19] mb-6 tracking-[0.25em]">
          24/7 ROADSIDE ASSISTANCE
        </p>

        <h1 className="font-display text-hero text-white uppercase mb-6">
          FIXED FAST.
          <br />
          <span className="text-[#F7FF19]">FIXED RIGHT.</span>
        </h1>

        <p className="text-body-lg text-white/70 max-w-lg mx-auto mb-10">
          On-demand mechanics coming to you. Transparent pricing, certified experts, zero hassle.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/request" className="btn-primary">
            REQUEST SERVICE
          </Link>
          <button
            onClick={() =>
              document
                .getElementById('estimator')
                ?.scrollIntoView({ behavior: 'smooth' })
            }
            className="btn-secondary"
          >
            SEE PRICING
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3">
        <p className="text-mono-sm text-white/50">SCROLL TO EXPLORE</p>
        <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center animate-bounce">
          <div className="w-2 h-2 rounded-full bg-[#F7FF19]" />
        </div>
        <ChevronDown className="w-4 h-4 text-[#F7FF19] animate-pulse" />
      </div>
    </section>
  )
}
