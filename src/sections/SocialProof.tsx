import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Star } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const rowTexts = [
  ['4.9 ★ AVERAGE RATING ★', 'TRUSTED BY 50K+ DRIVERS ★', '"MECHANIC WAS HERE IN 20 MIN"', '4.9 ★ AVERAGE RATING ★', 'BEST ROADSIDE APP ★'],
  ['"SAVED ME ON THE HIGHWAY"', '24/7 AVAILABILITY ★', '4.9 ★ AVERAGE RATING ★', '"PROFESSIONAL SERVICE"', '24/7 AVAILABILITY ★'],
  ['CERTIFIED MECHANICS ★', '"FAIR PRICING, NO HIDDEN FEES"', 'CERTIFIED MECHANICS ★', '48 STATES COVERED ★', '"FAIR PRICING, NO HIDDEN FEES"'],
  ['"WILL NEVER USE ANYONE ELSE"', '4.9 ★ AVERAGE RATING ★', '"WILL NEVER USE ANYONE ELSE"', '50K+ HAPPY CUSTOMERS ★', '4.9 ★ AVERAGE RATING ★'],
  ['AVERAGE WAIT: 34 MIN ★', '"LIFESAVER ON A ROAD TRIP"', 'AVERAGE WAIT: 34 MIN ★', 'MECHANICGO #1 RATED ★', '"LIFESAVER ON A ROAD TRIP"'],
  ['★ ★ ★ ★ ★', '5-STAR SERVICE GUARANTEED', '★ ★ ★ ★ ★', '5-STAR SERVICE GUARANTEED', '★ ★ ★ ★ ★'],
  ['"FIXED MY BATTERY IN 10 MIN"', 'OVER 2,400 MECHANICS ★', '"FIXED MY BATTERY IN 10 MIN"', 'TRANSPARENT PRICING ★', 'OVER 2,400 MECHANICS ★'],
  ['NATIONWIDE COVERAGE ★', '"THE UBER OF CAR REPAIR"', 'NATIONWIDE COVERAGE ★', 'ALWAYS ON TIME ★', '"THE UBER OF CAR REPAIR"'],
]

// 24 rows total - 8 unique patterns repeated
const allRows = [...rowTexts, ...rowTexts, ...rowTexts]

export default function SocialProof() {
  const containerRef = useRef<HTMLDivElement>(null)
  const rowRefs = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const container = containerRef.current
    const rows = rowRefs.current.filter(Boolean)
    if (!container || rows.length === 0) return

    const middle = (rows.length - 1) / 2 // 11.5 for 24 rows

    rows.forEach((row, index) => {
      const normalizedIndex = index / middle

      gsap.set(row, { transformOrigin: '50% 50% -600px' })

      const rotationX =
        index < middle
          ? 16 * normalizedIndex
          : index === middle
            ? 0
            : -16 * Math.abs(normalizedIndex - 2)

      const yPercent =
        index < middle
          ? -30 * normalizedIndex
          : index === middle
            ? 0
            : 30 * Math.abs(normalizedIndex - 2)

      gsap.set(row, { rotationX, yPercent })
    })

    // Scroll-driven animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    })

    rows.forEach((row, index) => {
      const direction = index % 2 === 0 ? 1 : -1
      tl.to(row, { x: `${125 * direction}vw`, ease: 'none' }, 0)
    })

    return () => {
      tl.kill()
    }
  }, [])

  // Determine if a text item should be highlighted (center rows, middle items)
  const isActive = (rowIndex: number, itemIndex: number) => {
    return rowIndex >= 10 && rowIndex <= 13 && itemIndex === 2
  }

  const isFocus = (rowIndex: number, itemIndex: number) => {
    return rowIndex === 11 && itemIndex === 2
  }

  return (
    <div ref={containerRef} className="kinetic-wall-container py-16">
      <div className="text-center mb-8">
        <p className="text-caption text-[#F7FF19] mb-3">SOCIAL PROOF</p>
        <h2 className="text-h2 font-heading font-bold text-white">
          WHAT DRIVERS SAY
        </h2>
      </div>

      <div className="relative" style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}>
        {allRows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            ref={(el) => {
              if (el) rowRefs.current[rowIndex] = el
            }}
            className="kinetic-wall-row"
          >
            {row.map((text, itemIndex) => (
              <span
                key={itemIndex}
                className={`kinetic-wall-item ${
                  isFocus(rowIndex, itemIndex)
                    ? 'focus'
                    : isActive(rowIndex, itemIndex)
                      ? 'active'
                      : ''
                }`}
              >
                {text.includes('★') ? (
                  <span className="flex items-center gap-2">
                    {text.split('★').map((part, i) => (
                      <span key={i} className="flex items-center gap-2">
                        {part}
                        {i < text.split('★').length - 1 && (
                          <Star className="w-4 h-4 fill-[#F7FF19] text-[#F7FF19] inline" />
                        )}
                      </span>
                    ))}
                  </span>
                ) : (
                  text
                )}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
