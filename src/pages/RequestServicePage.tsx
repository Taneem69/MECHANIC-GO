import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Wrench,
  ArrowLeft,
  MapPin,
  Car,
  AlertTriangle,
  Camera,
  CheckCircle,
  ChevronRight,
  Clock,
} from 'lucide-react'
import Navbar from '../components/Navbar'

const serviceCategories = [
  { id: 'roadside', name: 'Roadside Assistance', icon: AlertTriangle, subs: ['Flat Tire', 'Battery Jump', 'Fuel Delivery', 'Lockout'] },
  { id: 'engine', name: 'Engine Services', icon: Wrench, subs: ['Diagnosis', 'Overheating', 'Strange Noise', 'Won\'t Start'] },
  { id: 'electrical', name: 'Electrical', icon: Car, subs: ['Battery', 'Alternator', 'Wiring', 'Lights'] },
  { id: 'brake', name: 'Brake Services', icon: AlertTriangle, subs: ['Pad Replacement', 'Fluid', 'Grinding', 'Soft Pedal'] },
]

const mockMechanics = [
  { id: 1, name: 'Mike Johnson', rating: 4.9, jobs: 342, eta: '12 min', distance: '1.2 mi', specialty: 'Engine' },
  { id: 2, name: 'Sarah Chen', rating: 4.8, jobs: 518, eta: '18 min', distance: '2.1 mi', specialty: 'Electrical' },
  { id: 3, name: 'Carlos Ruiz', rating: 5.0, jobs: 289, eta: '22 min', distance: '3.0 mi', specialty: 'Brakes' },
]

export default function RequestServicePage() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedSub, setSelectedSub] = useState('')
  const [location, setLocation] = useState('')
  const [vehicleInfo, setVehicleInfo] = useState({ year: '', make: '', model: '' })
  const [description, setDescription] = useState('')
  const [photos, setPhotos] = useState<string[]>([])

  const handlePhotoUpload = () => {
    setPhotos([...photos, `/images/service-tools.jpg`])
  }

  const handleSubmit = () => {
    setStep(4)
  }

  const handleBookMechanic = (mechanicId: number) => {
    navigate(`/tracking/${mechanicId}`)
  }

  return (
    <div className="min-h-[100dvh] bg-black">
      <Navbar />
      <div className="pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-6">
          {/* Header */}
          <div className="mb-8">
            <Link
              to="/customer"
              className="inline-flex items-center gap-2 text-white/50 hover:text-[#F7FF19] transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Back to Dashboard</span>
            </Link>
            <h1 className="text-h2 font-heading font-bold text-white">
              Request <span className="text-[#F7FF19]">Service</span>
            </h1>
          </div>

          {/* Progress */}
          <div className="flex gap-2 mb-8">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`flex-1 h-1 rounded-full transition-colors ${
                  s <= step ? 'bg-[#F7FF19]' : 'bg-white/10'
                }`}
              />
            ))}
          </div>

          {/* Step 1: Service Type */}
          {step === 1 && (
            <div>
              <p className="text-mono-sm text-white/50 mb-4">STEP 1 — SELECT SERVICE TYPE</p>
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {serviceCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(cat.id)
                      setSelectedSub('')
                    }}
                    className={`p-6 rounded-xl border text-left transition-all duration-300 ${
                      selectedCategory === cat.id
                        ? 'border-[#F7FF19] bg-[#F7FF19]/10'
                        : 'border-white/10 bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    <cat.icon
                      className={`w-8 h-8 mb-3 ${
                        selectedCategory === cat.id ? 'text-[#F7FF19]' : 'text-white/50'
                      }`}
                    />
                    <h3 className="font-semibold text-white mb-1">{cat.name}</h3>
                    <p className="text-sm text-white/50">
                      {cat.subs.length} services available
                    </p>
                  </button>
                ))}
              </div>

              {selectedCategory && (
                <div className="mb-8">
                  <p className="text-mono-sm text-white/50 mb-3">SPECIFIC ISSUE</p>
                  <div className="flex flex-wrap gap-2">
                    {serviceCategories
                      .find((c) => c.id === selectedCategory)
                      ?.subs.map((sub) => (
                        <button
                          key={sub}
                          onClick={() => setSelectedSub(sub)}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                            selectedSub === sub
                              ? 'bg-[#F7FF19] text-black'
                              : 'bg-white/10 text-white/70 hover:bg-white/20'
                          }`}
                        >
                          {sub}
                        </button>
                      ))}
                  </div>
                </div>
              )}

              <button
                onClick={() => setStep(2)}
                disabled={!selectedSub}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                CONTINUE <ChevronRight className="w-4 h-4 inline ml-1" />
              </button>
            </div>
          )}

          {/* Step 2: Location & Vehicle */}
          {step === 2 && (
            <div className="space-y-6">
              <p className="text-mono-sm text-white/50">STEP 2 — LOCATION & VEHICLE</p>

              <div>
                <label className="text-mono-sm text-white/50 mb-2 block">
                  YOUR LOCATION
                </label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#F7FF19]" />
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Enter address or use current location"
                    className="w-full bg-white/5 border border-white/10 rounded-lg pl-12 pr-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#F7FF19]"
                  />
                </div>
                <button className="text-sm text-[#F7FF19] mt-2 hover:underline">
                  Use my current location
                </button>
              </div>

              <div>
                <label className="text-mono-sm text-white/50 mb-2 block">
                  VEHICLE INFORMATION
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <input
                    type="text"
                    placeholder="Year"
                    value={vehicleInfo.year}
                    onChange={(e) => setVehicleInfo({ ...vehicleInfo, year: e.target.value })}
                    className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#F7FF19]"
                  />
                  <input
                    type="text"
                    placeholder="Make"
                    value={vehicleInfo.make}
                    onChange={(e) => setVehicleInfo({ ...vehicleInfo, make: e.target.value })}
                    className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#F7FF19]"
                  />
                  <input
                    type="text"
                    placeholder="Model"
                    value={vehicleInfo.model}
                    onChange={(e) => setVehicleInfo({ ...vehicleInfo, model: e.target.value })}
                    className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#F7FF19]"
                  />
                </div>
              </div>

              <div>
                <label className="text-mono-sm text-white/50 mb-2 block">
                  DESCRIPTION (OPTIONAL)
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe what's happening with your vehicle..."
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#F7FF19] resize-none"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="btn-secondary"
                >
                  BACK
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="btn-primary"
                >
                  CONTINUE <ChevronRight className="w-4 h-4 inline ml-1" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Photos & Submit */}
          {step === 3 && (
            <div className="space-y-6">
              <p className="text-mono-sm text-white/50">STEP 3 — PHOTO EVIDENCE</p>

              <div className="grid grid-cols-3 gap-3">
                {photos.map((photo, i) => (
                  <div key={i} className="aspect-square rounded-xl overflow-hidden bg-white/5">
                    <img src={photo} alt={`Photo ${i + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
                <button
                  onClick={handlePhotoUpload}
                  className="aspect-square rounded-xl border-2 border-dashed border-white/20 flex flex-col items-center justify-center gap-2 hover:border-[#F7FF19] hover:bg-[#F7FF19]/5 transition-all"
                >
                  <Camera className="w-8 h-8 text-white/30" />
                  <span className="text-xs text-white/30">Add Photo</span>
                </button>
              </div>

              <div className="glass-panel rounded-xl p-6">
                <h3 className="font-semibold text-white mb-4">Service Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/50">Service</span>
                    <span className="text-white">{selectedSub}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/50">Location</span>
                    <span className="text-white">{location || 'Current Location'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/50">Vehicle</span>
                    <span className="text-white">
                      {vehicleInfo.year} {vehicleInfo.make} {vehicleInfo.model}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(2)}
                  className="btn-secondary"
                >
                  BACK
                </button>
                <button
                  onClick={handleSubmit}
                  className="btn-primary"
                >
                  SUBMIT REQUEST
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Matching Mechanics */}
          {step === 4 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <CheckCircle className="w-8 h-8 text-[#4ADE80]" />
                <div>
                  <h3 className="text-xl font-semibold text-white">Request Submitted!</h3>
                  <p className="text-white/50">Matching you with nearby mechanics...</p>
                </div>
              </div>

              <div className="space-y-4">
                {mockMechanics.map((mechanic) => (
                  <div
                    key={mechanic.id}
                    className="glass-panel rounded-xl p-5 flex items-center gap-4 hover:border-[#F7FF19]/30 transition-all cursor-pointer"
                    onClick={() => handleBookMechanic(mechanic.id)}
                  >
                    <div className="w-14 h-14 rounded-full bg-[#F7FF19]/20 flex items-center justify-center flex-shrink-0">
                      <span className="font-display text-2xl text-[#F7FF19]">
                        {mechanic.name.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-white">{mechanic.name}</h4>
                      <div className="flex items-center gap-3 text-sm text-white/50">
                        <span>★ {mechanic.rating}</span>
                        <span>{mechanic.jobs} jobs</span>
                        <span className="text-[#F7FF19]">{mechanic.specialty}</span>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="flex items-center gap-1 text-[#4ADE80]">
                        <Clock className="w-4 h-4" />
                        <span className="font-semibold">{mechanic.eta}</span>
                      </div>
                      <span className="text-sm text-white/50">{mechanic.distance}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
