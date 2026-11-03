import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function DistortionSphere() {
  const containerRef = useRef<HTMLDivElement>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const frameRef = useRef<number>(0)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000)
    camera.position.set(0, 0, 600)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setClearColor(0x000000, 0)
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
    scene.add(ambientLight)
    const dirLight = new THREE.DirectionalLight(0xF7FF19, 0.8)
    dirLight.position.set(300, 200, 400)
    scene.add(dirLight)
    const dirLight2 = new THREE.DirectionalLight(0xffffff, 0.4)
    dirLight2.position.set(-300, -200, 300)
    scene.add(dirLight2)

    // Load textures
    const textureLoader = new THREE.TextureLoader()
    const texturePaths = [
      '/images/hero-mechanic-hands.jpg',
      '/images/hero-tow-truck.jpg',
      '/images/service-tools.jpg',
      '/images/service-tire.jpg',
      '/images/service-battery.jpg',
      '/images/service-dashboard.jpg',
      '/images/hero-city-lights.jpg',
    ]

    const group = new THREE.Group()
    scene.add(group)

    // Create ribbons
    const ribbonCount = 40
    const ribbons: { mesh: THREE.Mesh; speed: number; axis: THREE.Vector3 }[] = []

    for (let i = 0; i < ribbonCount; i++) {
      const angle = (i / ribbonCount) * Math.PI * 2
      const radius = 180 + Math.random() * 120
      const height = (Math.random() - 0.5) * 200

      // Create a curved tube
      const points: THREE.Vector3[] = []
      for (let j = 0; j <= 50; j++) {
        const t = j / 50
        const a = angle + t * Math.PI * 2
        points.push(new THREE.Vector3(
          Math.cos(a) * radius + (Math.random() - 0.5) * 20,
          height + Math.sin(t * Math.PI * 2) * 80,
          Math.sin(a) * radius + (Math.random() - 0.5) * 20
        ))
      }

      const curve = new THREE.CatmullRomCurve3(points, true)
      const geometry = new THREE.TubeGeometry(curve, 64, 3, 8, true)

      const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color().setHSL(0.15 + Math.random() * 0.05, 0.8, 0.5),
        metalness: 0.6,
        roughness: 0.3,
        emissive: new THREE.Color(0xF7FF19),
        emissiveIntensity: 0.1,
        transparent: true,
        opacity: 0.7,
        side: THREE.DoubleSide,
      })

      // Load texture onto material
      const texIndex = i % texturePaths.length
      textureLoader.load(texturePaths[texIndex], (texture: THREE.Texture) => {
        texture.wrapS = THREE.RepeatWrapping
        texture.wrapT = THREE.RepeatWrapping
        material.map = texture
        material.needsUpdate = true
      })

      const mesh = new THREE.Mesh(geometry, material)
      group.add(mesh)

      ribbons.push({
        mesh,
        speed: 0.001 + Math.random() * 0.002,
        axis: new THREE.Vector3(
          Math.random() - 0.5,
          Math.random() - 0.5,
          Math.random() - 0.5
        ).normalize(),
      })
    }

    let time = 0
    function animate() {
      frameRef.current = requestAnimationFrame(animate)
      time += 0.005

      group.rotation.y += 0.002
      group.rotation.x = Math.sin(time * 0.5) * 0.1

      ribbons.forEach((ribbon) => {
        ribbon.mesh.rotation.x += ribbon.speed * 0.5
        ribbon.mesh.rotation.y += ribbon.speed
      })

      renderer.render(scene, camera)
    }

    animate()

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(frameRef.current)
      renderer.dispose()
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0.6,
      }}
    />
  )
}
