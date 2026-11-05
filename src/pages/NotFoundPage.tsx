import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

export default function NotFoundPage() {
  return (
    <div className="min-h-[100dvh] bg-black">
      <Navbar />
      <div className="min-h-[100dvh] flex flex-col items-center justify-center gap-4 px-6 text-center">
        <p className="font-display text-[clamp(96px,22vw,200px)] leading-none text-[#F7FF19]" aria-hidden="true">
          404
        </p>
        <h1 className="text-h3 font-heading font-bold text-white">This page took a wrong turn.</h1>
        <p className="text-white/60 max-w-md">
          The page you are looking for does not exist or has moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 mt-2">
          <Link to="/" className="btn-primary">Back to home</Link>
          <Link to="/request" className="btn-secondary">Request a mechanic</Link>
        </div>
      </div>
    </div>
  )
}
