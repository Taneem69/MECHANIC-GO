import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Wrench, Eye, EyeOff, ArrowLeft, User, HardHat } from 'lucide-react'

type Role = 'customer' | 'mechanic'

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [role, setRole] = useState<Role>('customer')
  const [step, setStep] = useState(1)

  const roles = [
    {
      id: 'customer' as Role,
      label: 'Customer',
      description: 'I need vehicle repair services',
      icon: User,
    },
    {
      id: 'mechanic' as Role,
      label: 'Mechanic',
      description: 'I want to offer my services',
      icon: HardHat,
    },
    // Admin accounts are created internally — not available for public registration
  ]

  return (
    <div className="min-h-[100dvh] bg-black flex">
      {/* Left Panel - Visual */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img
          src="/images/hero-mechanic-hands.jpg"
          alt="Mechanic working"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
        <div className="relative z-10 flex flex-col justify-between p-12">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-[#F7FF19] flex items-center justify-center">
              <Wrench className="w-5 h-5 text-black" />
            </div>
            <span className="font-display text-2xl tracking-wide text-white">
              MECHANIC<span className="text-[#F7FF19]">GO</span>
            </span>
          </Link>
          <div>
            <h2 className="font-display text-6xl text-white mb-4">
              JOIN THE
              <br />
              <span className="text-[#F7FF19]">NETWORK.</span>
            </h2>
            <p className="text-white/60 max-w-sm">
              Create your account and get access to on-demand vehicle repair services or become a certified mechanic.
            </p>
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-white/50 hover:text-[#F7FF19] transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to home</span>
          </Link>

          <div className="lg:hidden mb-8">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-[#F7FF19] flex items-center justify-center">
                <Wrench className="w-5 h-5 text-black" />
              </div>
              <span className="font-display text-2xl tracking-wide text-white">
                MECHANIC<span className="text-[#F7FF19]">GO</span>
              </span>
            </Link>
          </div>

          <h1 className="text-h2 font-heading font-bold text-white mb-2">
            Get Started
          </h1>
          <p className="text-white/50 mb-8">
            Create your account in a few simple steps.
          </p>

          {/* Step Indicator */}
          <div className="flex gap-2 mb-8">
            {[1, 2].map((s) => (
              <div
                key={s}
                className={`flex-1 h-1 rounded-full transition-colors ${
                  s <= step ? 'bg-[#F7FF19]' : 'bg-white/10'
                }`}
              />
            ))}
          </div>

          {step === 1 && (
            <div>
              <p className="text-mono-sm text-white/50 mb-4">SELECT YOUR ROLE</p>
              <div className="space-y-3 mb-8">
                {roles.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => setRole(r.id)}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 text-left ${
                      role === r.id
                        ? 'border-[#F7FF19] bg-[#F7FF19]/10'
                        : 'border-white/10 bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        role === r.id ? 'bg-[#F7FF19]' : 'bg-white/10'
                      }`}
                    >
                      <r.icon
                        className={`w-6 h-6 ${
                          role === r.id ? 'text-black' : 'text-white/50'
                        }`}
                      />
                    </div>
                    <div>
                      <div className="font-semibold text-white">{r.label}</div>
                      <div className="text-sm text-white/50">{r.description}</div>
                    </div>
                  </button>
                ))}
              </div>
              <button
                onClick={() => setStep(2)}
                className="btn-primary block text-center w-full"
              >
                CONTINUE
              </button>
            </div>
          )}

          {step === 2 && (
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-mono-sm text-white/50 mb-2 block">
                    FIRST NAME
                  </label>
                  <input
                    type="text"
                    placeholder="John"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#F7FF19] transition-colors"
                  />
                </div>
                <div>
                  <label className="text-mono-sm text-white/50 mb-2 block">
                    LAST NAME
                  </label>
                  <input
                    type="text"
                    placeholder="Doe"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#F7FF19] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="text-mono-sm text-white/50 mb-2 block">
                  EMAIL
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#F7FF19] transition-colors"
                />
              </div>

              <div>
                <label className="text-mono-sm text-white/50 mb-2 block">
                  PHONE
                </label>
                <input
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#F7FF19] transition-colors"
                />
              </div>

              <div>
                <label className="text-mono-sm text-white/50 mb-2 block">
                  PASSWORD
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create a strong password"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 pr-12 text-white placeholder:text-white/30 focus:outline-none focus:border-[#F7FF19] transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <label className="flex items-start gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded accent-[#F7FF19] mt-0.5" />
                <span className="text-sm text-white/50">
                  I agree to the{' '}
                  <span className="text-[#F7FF19]">Terms of Service</span> and{' '}
                  <span className="text-[#F7FF19]">Privacy Policy</span>
                </span>
              </label>

              <Link
                to={role === 'mechanic' ? '/mechanic' : '/customer'}
                className="btn-primary block text-center w-full"
              >
                CREATE ACCOUNT
              </Link>

              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-sm text-white/50 hover:text-white transition-colors w-full text-center"
              >
                Back to role selection
              </button>
            </form>
          )}

          <p className="text-center text-white/50 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-[#F7FF19] hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
