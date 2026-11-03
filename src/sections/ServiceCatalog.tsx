import { useEffect, useRef } from 'react'

const services = [
  { title: 'TIRE CHANGE', category: 'ROADSIDE', image: '/images/service-tire.jpg' },
  { title: 'BATTERY JUMP', category: 'ELECTRICAL', image: '/images/service-battery.jpg' },
  { title: 'OIL LEAK FIX', category: 'ENGINE', image: '/images/hero-mechanic-hands.jpg' },
  { title: 'BRAKE PADS', category: 'BRAKES', image: '/images/service-tools.jpg' },
  { title: 'ENGINE DIAG', category: 'ENGINE', image: '/images/service-dashboard.jpg' },
  { title: 'TOWING', category: 'ROADSIDE', image: '/images/hero-tow-truck.jpg' },
  { title: 'TRANSMISSION', category: 'REPAIR', image: '/images/hero-city-lights.jpg' },
  { title: 'AC REPAIR', category: 'COOLING', image: '/images/service-battery.jpg' },
]

const row1 = [...services, ...services]
const row2 = [...services.slice(4), ...services.slice(0, 4), ...services, ...services]

export default function ServiceCatalog() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const row1Ref = useRef<HTMLDivElement>(null)
  const row2Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrapper = wrapperRef.current
    const r1 = row1Ref.current
    const r2 = row2Ref.current
    if (!wrapper || !r1 || !r2) return

    let scrollY = 0
    let targetScrollY = 0
    let animationId: number

    const handleScroll = () => {
      const rect = wrapper.getBoundingClientRect()
      const wrapperTop = rect.top
      const wrapperHeight = rect.height
      const viewportHeight = window.innerHeight

      if (wrapperTop < viewportHeight && wrapperTop > -wrapperHeight) {
        const progress = (viewportHeight - wrapperTop) / (viewportHeight + wrapperHeight)
        targetScrollY = progress * 2000
      }
    }

    const animateGalleryScroll = (
      currentScroll: number,
      winWidth: number,
      row: HTMLDivElement,
      direction = 1
    ) => {
      const cards = row.querySelectorAll<HTMLDivElement>('.rolling-gallery-card')
      const offset = -currentScroll * direction

      cards.forEach((card) => {
        const rect = card.getBoundingClientRect()
        const elementCenter = rect.left + rect.width / 2
        const viewportCenter = winWidth / 2
        const distance = elementCenter - viewportCenter
        const maxDistance = winWidth
        const percent = Math.max(-1, Math.min(1, distance / maxDistance))
        const rotateY = percent * 25
        const rotateX = Math.abs(percent) * -8
        const translateZ = Math.abs(percent) * -120
        const brightness = 1 - Math.abs(percent) * 0.4

        card.style.transform = `translateX(${offset}px) rotateY(${rotateY}deg) rotateX(${rotateX}deg) translateZ(${translateZ}px)`
        card.style.filter = `brightness(${brightness})`
      })
    }

    const animate = () => {
      scrollY += (targetScrollY - scrollY) * 0.08
      animateGalleryScroll(scrollY * 0.4, window.innerWidth, r1, 1)
      animateGalleryScroll(-scrollY * 0.4, window.innerWidth, r2, -1)
      animationId = requestAnimationFrame(animate)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    animate()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <section id="services" className="relative bg-black py-24 lg:py-32">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 mb-12">
        <p className="text-caption text-[#F7FF19] mb-3">WHAT WE FIX</p>
        <h2 className="text-h2 font-heading font-bold text-white">
          SERVICE CATALOG
        </h2>
      </div>

      <div ref={wrapperRef} className="rolling-gallery-wrapper">
        {/* Row 1 */}
        <div
          ref={row1Ref}
          className="rolling-gallery-row"
          style={{ transform: 'translateX(-50%) translateY(-50%)' }}
        >
          {row1.map((service, i) => (
            <div key={`r1-${i}`} className="rolling-gallery-card group cursor-pointer">
              <div className="relative w-full h-full">
                <img
                  src={service.image}
                  alt={service.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="text-mono-sm text-[#F7FF19] mb-2 block">
                    {service.category}
                  </span>
                  <h3 className="text-h4 font-heading font-bold text-white">
                    {service.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Row 2 */}
        <div
          ref={row2Ref}
          className="rolling-gallery-row"
          style={{
            transform: 'translateX(-50%) translateY(-50%) translateZ(-200px) rotateZ(-10deg)',
            top: '65%',
          }}
        >
          {row2.map((service, i) => (
            <div key={`r2-${i}`} className="rolling-gallery-card group cursor-pointer">
              <div className="relative w-full h-full">
                <img
                  src={service.image}
                  alt={service.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="text-mono-sm text-[#F7FF19] mb-2 block">
                    {service.category}
                  </span>
                  <h3 className="text-h4 font-heading font-bold text-white">
                    {service.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
