import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Gauge, TrendingUp, AlertTriangle } from 'lucide-react'

const symptoms = [
  'Grinding Noise',
  'Fluid Leak',
  'Warning Light',
  'Strange Smell',
  'Vibration',
  'Overheating',
  'Hard Start',
  'Poor Braking',
]

const vehicleTypes = ['Sedan', 'SUV', 'Truck', 'Motorcycle', 'EV']

function useTypewriter(text: string, speed = 30, trigger: string) {
  const [display, setDisplay] = useState('')

  useEffect(() => {
    setDisplay('')
    let i = 0
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplay(text.substring(0, i + 1))
        i++
      } else {
        clearInterval(interval)
      }
    }, speed)
    return () => clearInterval(interval)
  }, [text, trigger, speed])

  return display
}

export default function CostEstimator() {
  const [selectedSymptom, setSelectedSymptom] = useState('')
  const [vehicleType, setVehicleType] = useState('Sedan')
  const [severity, setSeverity] = useState(3)
  const sectionRef = useRef<HTMLElement>(null)

  const diagnosis = selectedSymptom
    ? `ANALYSIS: ${selectedSymptom.toUpperCase()} DETECTED ON ${vehicleType.toUpperCase()}. SEVERITY LEVEL ${severity}/5. ESTIMATED LABOR: ${severity * 0.8} HRS. PARTS AVAILABILITY: IN STOCK.`
    : 'SELECT SYMPTOMS TO BEGIN DIAGNOSTIC SEQUENCE...'

  const typedDiagnosis = useTypewriter(diagnosis, 20, selectedSymptom + vehicleType + severity)

  const basePrice = selectedSymptom ? 45 + severity * 35 : 0
  const laborPrice = selectedSymptom ? severity * 65 : 0
  const totalPrice = basePrice + laborPrice

  return (
    <section
      id="estimator"
      ref={sectionRef}
      className="relative py-24 lg:py-32"
      style={{
        background: '#EFEFEF',
        backgroundImage:
          'linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }}
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="text-center mb-12">
          <p className="text-caption text-black/50 mb-3">SMART PRICING</p>
          <h2 className="text-h2 font-heading font-bold text-black">
            ESTIMATE YOUR REPAIR
          </h2>
        </div>

        <div className="bg-[#1A1A1A] rounded-2xl overflow-hidden max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2">
            {/* Left Column - Inputs */}
            <div className="p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-white/10">
              {/* Vehicle Selector */}
              <div className="mb-8">
                <label className="text-mono-sm text-white/50 mb-3 block">
                  VEHICLE TYPE
                </label>
                <div className="flex flex-wrap gap-2">
                  {vehicleTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => setVehicleType(type)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                        vehicleType === type
                          ? 'bg-[#F7FF19] text-black'
                          : 'bg-white/10 text-white/70 hover:bg-white/20'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Symptom Tags */}
              <div className="mb-8">
                <label className="text-mono-sm text-white/50 mb-3 block">
                  SYMPTOMS
                </label>
                <div className="flex flex-wrap gap-2">
                  {symptoms.map((symptom) => (
                    <button
                      key={symptom}
                      onClick={() => setSelectedSymptom(symptom)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                        selectedSymptom === symptom
                          ? 'bg-[#F7FF19] text-black'
                          : 'bg-white/10 text-white/70 hover:bg-white/20'
                      }`}
                    >
                      {symptom}
                    </button>
                  ))}
                </div>
              </div>

              {/* Severity Slider */}
              <div className="mb-4">
                <label className="text-mono-sm text-white/50 mb-3 block flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  SEVERITY LEVEL
                </label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={severity}
                  onChange={(e) => setSeverity(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer accent-[#F7FF19]"
                />
                <div className="flex justify-between mt-2">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <span
                      key={n}
                      className={`text-xs font-mono ${
                        n <= severity ? 'text-[#F7FF19]' : 'text-white/50'
                      }`}
                    >
                      L{n}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Output */}
            <div className="p-8 lg:p-12">
              {/* Diagnostic Terminal */}
              <div className="mb-8">
                <label className="text-mono-sm text-white/50 mb-3 block flex items-center gap-2">
                  <Gauge className="w-4 h-4" />
                  DIAGNOSTIC OUTPUT
                </label>
                <div className="bg-black/50 rounded-lg p-4 font-mono text-xs text-[#4ADE80] leading-relaxed min-h-[80px]">
                  {typedDiagnosis}
                  <span className="animate-pulse">_</span>
                </div>
              </div>

              {/* Price Gauge */}
              <div className="mb-8">
                <label className="text-mono-sm text-white/50 mb-3 block flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  COST ESTIMATE
                </label>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/60">Base Service Fee</span>
                    <span className="text-sm text-white font-mono">
                      ${basePrice > 0 ? '45' : '--'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/60">Labor ({severity * 0.8} hrs)</span>
                    <span className="text-sm text-white font-mono">
                      ${laborPrice > 0 ? laborPrice : '--'}
                    </span>
                  </div>
                  <div className="h-px bg-white/10" />
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white font-semibold">Estimated Total</span>
                    <span className="text-2xl font-display text-[#F7FF19]">
                      ${totalPrice > 0 ? `${totalPrice}-${totalPrice + 50}` : '--'}
                    </span>
                  </div>
                </div>

                {/* Visual bar */}
                <div className="mt-4 flex gap-1 h-2">
                  <div
                    className="bg-[#4ADE80] rounded-l-full transition-all duration-500"
                    style={{ width: `${severity * 15}%` }}
                  />
                  <div
                    className="bg-[#F7FF19] transition-all duration-500"
                    style={{ width: `${severity * 10}%` }}
                  />
                  <div
                    className="bg-[#F59E0B] rounded-r-full transition-all duration-500"
                    style={{ width: `${severity * 5}%` }}
                  />
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-mono-sm text-[#4ADE80]">LOW</span>
                  <span className="text-mono-sm text-[#F7FF19]">AVG</span>
                  <span className="text-mono-sm text-[#F59E0B]">HIGH</span>
                </div>
              </div>

              {/* CTA */}
              <Link
                to="/request"
                className="btn-primary block text-center w-full"
              >
                BOOK THIS SERVICE
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
