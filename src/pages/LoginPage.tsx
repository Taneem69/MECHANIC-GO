import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Wrench, Eye, EyeOff, ArrowLeft } from 'lucide-react'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<'customer' | 'mechanic' | 'admin'>('customer')

  return (
    <div className="min-h-[100dvh] bg-black flex">
      {/* Left Panel - Visual */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img
          src="/images/hero-tow-truck.jpg"
          alt="Mechanic"
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
              WELCOME
              <br />
              <span className="text-[#F7FF19]">BACK.</span>
            </h2>
            <p className="text-white/60 max-w-sm">
              Sign in to access your dashboard, track services, and manage your account.
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
            Sign In
          </h1>
          <p className="text-white/50 mb-8">
            Enter your credentials to access your account.
          </p>

          {/* Role Selector */}
          <div className="flex gap-2 mb-8 p-1 bg-white/5 rounded-full">
            {(['customer', 'mechanic', 'admin'] as const).map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`flex-1 py-2 rounded-full text-sm font-medium transition-all duration-300 capitalize ${
                  role === r
                    ? 'bg-[#F7FF19] text-black'
                    : 'text-white/50 hover:text-white'
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="text-mono-sm text-white/50 mb-2 block">
                EMAIL
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
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

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded accent-[#F7FF19]" />
                <span className="text-sm text-white/50">Remember me</span>
              </label>
              <button className="text-sm text-[#F7FF19] hover:underline">
                Forgot password?
              </button>
            </div>

            <Link
              to={role === 'admin' ? '/admin' : role === 'mechanic' ? '/mechanic' : '/customer'}
              className="btn-primary block text-center w-full"
            >
              SIGN IN
            </Link>
          </form>

          <p className="text-center text-white/50 mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-[#F7FF19] hover:underline">
              Get Started
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
