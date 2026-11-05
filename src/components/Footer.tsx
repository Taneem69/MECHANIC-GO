import { Link } from 'react-router-dom'
import { Wrench, Phone, Mail, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10">
      {/* CTA Banner */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <div className="text-center mb-16">
          <h2 className="font-display text-hero text-white mb-4">
            GET BACK ON THE <span className="text-[#F7FF19]">ROAD</span>
          </h2>
          <div className="w-32 h-1 bg-[#F7FF19] mx-auto animate-pulse" />
        </div>

        {/* Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-[#F7FF19] flex items-center justify-center">
                <Wrench className="w-4 h-4 text-black" />
              </div>
              <span className="font-display text-xl tracking-wide text-white">
                MECHANIC<span className="text-[#F7FF19]">GO</span>
              </span>
            </Link>
            <p className="text-sm text-white/50 mb-4">
              On-demand roadside assistance and automotive repair. Anytime, anywhere.
            </p>
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#F7FF19] hover:text-black transition-all cursor-pointer">
                <Phone className="w-4 h-4" />
              </div>
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#F7FF19] hover:text-black transition-all cursor-pointer">
                <Mail className="w-4 h-4" />
              </div>
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#F7FF19] hover:text-black transition-all cursor-pointer">
                <MapPin className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-caption text-[#F7FF19] mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-white/50 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm text-white/50 hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm text-white/50 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm text-white/50 hover:text-white transition-colors">
                  Press
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-caption text-[#F7FF19] mb-4">Services</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-white/50 hover:text-white transition-colors">
                  Roadside Assistance
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm text-white/50 hover:text-white transition-colors">
                  Engine Repair
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm text-white/50 hover:text-white transition-colors">
                  Electrical Services
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm text-white/50 hover:text-white transition-colors">
                  Brake Services
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-caption text-[#F7FF19] mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-white/50 hover:text-white transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm text-white/50 hover:text-white transition-colors">
                  Safety
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm text-white/50 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm text-white/50 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-mono-sm text-white/50">
            &copy; 2026 MechanicGo. All rights reserved.
          </p>
          <div className="flex gap-4">
            <span className="text-mono-sm text-white/50">Available on</span>
            <span className="text-mono-sm text-[#F7FF19] cursor-pointer hover:underline">
              App Store
            </span>
            <span className="text-mono-sm text-white/50">&</span>
            <span className="text-mono-sm text-[#F7FF19] cursor-pointer hover:underline">
              Google Play
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
