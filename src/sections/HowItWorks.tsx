import { useEffect, useRef } from 'react'
import { Wrench, Truck, CheckCircle } from 'lucide-react'

const steps = [
  {
    icon: Wrench,
    title: 'DIAGNOSE',
    description:
      "Tell us what's wrong or let our AI diagnose the issue based on symptoms.",
    step: '01',
  },
  {
    icon: Truck,
    title: 'DISPATCH',
    description:
      'We locate the nearest certified mechanic and send them your way with live tracking.',
    step: '02',
  },
  {
    icon: CheckCircle,
    title: 'DONE',
    description:
      'Repair completed at your location. Pay securely through the app.',
    step: '03',
  },
]

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.step-card')
            cards.forEach((card, i) => {
              setTimeout(() => {
                card.classList.add('opacity-100', 'translate-y-0')
                card.classList.remove('opacity-0', 'translate-y-8')
              }, i * 150)
            })
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative bg-[#EFEFEF] py-24 lg:py-32"
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <p className="text-caption text-black/50 mb-3">THE PROCESS</p>
          <h2 className="text-h2 font-heading font-bold text-black">
            HOW IT WORKS
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((step, index) => (
            <div
              key={step.title}
              ref={(el) => {
                if (el) cardsRef.current[index] = el
              }}
              className="step-card bg-white rounded-2xl p-8 lg:p-10 shadow-lg hover:shadow-xl transition-all duration-500 opacity-0 translate-y-8"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-black flex items-center justify-center">
                  <step.icon className="w-7 h-7 text-[#F7FF19]" />
                </div>
                <span className="font-display text-5xl text-black/10">
                  {step.step}
                </span>
              </div>

              <h3 className="text-h4 font-heading font-bold text-black mb-3">
                {step.title}
              </h3>
              <p className="text-body text-black/60 leading-relaxed">
                {step.description}
              </p>

              <div className="mt-6 h-1 w-12 bg-[#F7FF19] rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
