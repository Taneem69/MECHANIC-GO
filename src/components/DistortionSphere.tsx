import { useEffect, useRef } from 'react'

const TEXTURE_PATHS = [
  '/images/hero-mechanic-hands.webp',
  '/images/hero-tow-truck.webp',
  '/images/service-tools.webp',
  '/images/service-tire.webp',
  '/images/service-battery.webp',
  '/images/service-dashboard.webp',
  '/images/hero-city-lights.webp',
]

/**
 * Decorative 3D background. Performance rules:
 *  - three.js (~700 KB) is loaded on demand, so the hero text paints first
 *  - skipped entirely for reduced-motion users and very low-end devices
 *  - 7 textures are shared by all ribbons (not one per ribbon)
 *  - rendering pauses when the tab is hidden or the hero is scrolled away
 *  - every GPU resource is disposed on unmount
 */
export default function DistortionSphere() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8
    if (memory <= 2 || (navigator.hardwareConcurrency ?? 4) <= 2) return

    let disposed = false
    let frame = 0
    let cleanup = () => {}

    void (async () => {
      const THREE = await import('three')
      if (disposed) return

      let renderer: InstanceType<typeof THREE.WebGLRenderer>
      try {
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
      } catch {
        return // WebGL unavailable: the page works fine without the background
      }

      const isSmall = window.innerWidth < 768
      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000)
      camera.position.set(0, 0, 600)

      renderer.setClearColor(0x000000, 0)
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, isSmall ? 1.5 : 2))
      container.appendChild(renderer.domElement)

      scene.add(new THREE.AmbientLight(0xffffff, 0.6))
      const dirLight = new THREE.DirectionalLight(0xf7ff19, 0.8)
      dirLight.position.set(300, 200, 400)
      scene.add(dirLight)
      const dirLight2 = new THREE.DirectionalLight(0xffffff, 0.4)
      dirLight2.position.set(-300, -200, 300)
      scene.add(dirLight2)

      const loader = new THREE.TextureLoader()
      const textures = TEXTURE_PATHS.map((path) => {
        const tex = loader.load(path)
        tex.wrapS = THREE.RepeatWrapping
        tex.wrapT = THREE.RepeatWrapping
        return tex
      })

      const group = new THREE.Group()
      scene.add(group)

      const ribbonCount = isSmall ? 18 : 40
      const ribbons: { mesh: InstanceType<typeof THREE.Mesh>; speed: number }[] = []

      for (let i = 0; i < ribbonCount; i++) {
        const angle = (i / ribbonCount) * Math.PI * 2
        const radius = 180 + Math.random() * 120
        const height = (Math.random() - 0.5) * 200

        const points: InstanceType<typeof THREE.Vector3>[] = []
        for (let j = 0; j <= 50; j++) {
          const t = j / 50
          const a = angle + t * Math.PI * 2
          points.push(
            new THREE.Vector3(
              Math.cos(a) * radius + (Math.random() - 0.5) * 20,
              height + Math.sin(t * Math.PI * 2) * 80,
              Math.sin(a) * radius + (Math.random() - 0.5) * 20,
            ),
          )
        }

        const geometry = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points, true), 64, 3, 8, true)
        const material = new THREE.MeshStandardMaterial({
          color: new THREE.Color().setHSL(0.15 + Math.random() * 0.05, 0.8, 0.5),
          metalness: 0.6,
          roughness: 0.3,
          emissive: new THREE.Color(0xf7ff19),
          emissiveIntensity: 0.1,
          transparent: true,
          opacity: 0.7,
          side: THREE.DoubleSide,
          map: textures[i % textures.length],
        })

        const mesh = new THREE.Mesh(geometry, material)
        group.add(mesh)
        ribbons.push({ mesh, speed: 0.001 + Math.random() * 0.002 })
      }

      const shouldRender = () => !document.hidden && window.scrollY < window.innerHeight * 1.5

      let time = 0
      const animate = () => {
        frame = requestAnimationFrame(animate)
        if (!shouldRender()) return
        time += 0.005
        group.rotation.y += 0.002
        group.rotation.x = Math.sin(time * 0.5) * 0.1
        for (const r of ribbons) {
          r.mesh.rotation.x += r.speed * 0.5
          r.mesh.rotation.y += r.speed
        }
        renderer.render(scene, camera)
      }
      animate()

      let resizeFrame = 0
      const handleResize = () => {
        cancelAnimationFrame(resizeFrame)
        resizeFrame = requestAnimationFrame(() => {
          camera.aspect = window.innerWidth / window.innerHeight
          camera.updateProjectionMatrix()
          renderer.setSize(window.innerWidth, window.innerHeight)
        })
      }
      window.addEventListener('resize', handleResize)

      cleanup = () => {
        window.removeEventListener('resize', handleResize)
        cancelAnimationFrame(frame)
        cancelAnimationFrame(resizeFrame)
        for (const r of ribbons) {
          r.mesh.geometry.dispose()
          ;(r.mesh.material as InstanceType<typeof THREE.MeshStandardMaterial>).dispose()
        }
        textures.forEach((t) => t.dispose())
        renderer.dispose()
        renderer.forceContextLoss()
        renderer.domElement.remove()
      }
    })()

    return () => {
      disposed = true
      cancelAnimationFrame(frame)
      cleanup()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      data-hero-canvas
      aria-hidden="true"
      style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', opacity: 0.6 }}
    />
  )
}
