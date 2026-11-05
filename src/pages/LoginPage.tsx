import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Wrench, ArrowLeft } from 'lucide-react'
import FormField from '../components/FormField'
import { loginSchema, type LoginValues } from '../lib/validation'

type Role = 'customer' | 'mechanic' | 'admin'
const ROLE_HOME: Record<Role, string> = { customer: '/customer', mechanic: '/mechanic', admin: '/admin' }

export default function LoginPage() {
  const navigate = useNavigate()
  const [role, setRole] = useState<Role>('customer')
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({ resolver: zodResolver(loginSchema), mode: 'onTouched' })

  // DEMO ONLY: there is no backend yet, so a valid form just opens the dashboard.
  // Replace with: POST /api/v1/auth/login -> httpOnly Secure cookie, then redirect by the role the SERVER returns.
  const onSubmit = handleSubmit(() => navigate(ROLE_HOME[role]))

  return (
    <div className="min-h-[100dvh] bg-black flex">
      {/* Left Panel - Visual */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img loading="lazy" decoding="async" width={864} height={1184}
          src="/images/hero-tow-truck.webp"
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
          <div role="group" aria-label="Sign in as" className="flex gap-2 mb-8 p-1 bg-white/5 rounded-full">
            {(['customer', 'mechanic', 'admin'] as const).map((r) => (
              <button
                key={r}
                type="button"
                aria-pressed={role === r}
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

          <form className="space-y-4" onSubmit={onSubmit} noValidate>
            <FormField
              label="EMAIL"
              type="email"
              autoComplete="email"
              inputMode="email"
              placeholder="you@example.com"
              error={errors.email?.message}
              {...register('email')}
            />

            <FormField
              label="PASSWORD"
              type="password"
              autoComplete="current-password"
              placeholder="Enter your password"
              error={errors.password?.message}
              {...register('password')}
            />

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded accent-[#F7FF19]" />
                <span className="text-sm text-white/50">Remember me</span>
              </label>
              <button type="button" className="text-sm text-[#F7FF19] hover:underline">
                Forgot password?
              </button>
            </div>

            <button type="submit" className="btn-primary block text-center w-full">
              SIGN IN
            </button>
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
