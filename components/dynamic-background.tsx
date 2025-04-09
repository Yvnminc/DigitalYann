"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

export default function DynamicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [gradientAngle, setGradientAngle] = useState(0)

  // Slowly rotate the gradient angle
  useEffect(() => {
    const interval = setInterval(() => {
      setGradientAngle((prev) => (prev + 0.5) % 360)
    }, 100)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Create particles
    const particles: Particle[] = []
    const particleCount = 150

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
      opacity: number
      pulse: number
      pulseSpeed: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 3 + 0.5
        this.speedX = Math.random() * 0.5 - 0.25
        this.speedY = Math.random() * 0.5 - 0.25
        this.opacity = Math.random() * 0.5 + 0.2
        this.pulse = 0
        this.pulseSpeed = Math.random() * 0.02 + 0.01

        // Cyberpunk colors
        const colors = [
          "rgba(147, 51, 234, 0.8)", // Purple
          "rgba(236, 72, 153, 0.8)", // Pink
          "rgba(59, 130, 246, 0.8)", // Blue
          "rgba(16, 185, 129, 0.8)", // Teal
        ]

        this.color = colors[Math.floor(Math.random() * colors.length)]
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        // Pulse effect
        this.pulse += this.pulseSpeed
        if (this.pulse > Math.PI * 2) this.pulse = 0

        // Wrap around edges
        if (this.x < 0) this.x = canvas.width
        if (this.x > canvas.width) this.x = 0
        if (this.y < 0) this.y = canvas.height
        if (this.y > canvas.height) this.y = 0
      }

      draw() {
        if (!ctx) return

        // Pulsating opacity
        const pulseOpacity = this.opacity * (0.7 + 0.3 * Math.sin(this.pulse))

        // Extract RGB values from the color string
        const rgbaMatch = this.color.match(/rgba$$(\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)$$/)
        if (!rgbaMatch) return

        const r = Number.parseInt(rgbaMatch[1])
        const g = Number.parseInt(rgbaMatch[2])
        const b = Number.parseInt(rgbaMatch[3])

        // Create a gradient for each particle
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 2)

        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${pulseOpacity})`)
        gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`)

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size * (0.8 + 0.2 * Math.sin(this.pulse)), 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    // Draw grid lines
    function drawGrid() {
      if (!ctx) return

      ctx.strokeStyle = "rgba(255, 255, 255, 0.03)"
      ctx.lineWidth = 0.5

      const gridSize = 50

      // Vertical lines
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }

      // Horizontal lines
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }
    }

    // Draw cityscape silhouette
    function drawCityscape() {
      if (!ctx) return

      ctx.fillStyle = "rgba(20, 20, 30, 0.3)"

      // Draw buildings
      const buildingCount = Math.ceil(canvas.width / 30)
      const baseHeight = canvas.height * 0.3

      for (let i = 0; i < buildingCount; i++) {
        const width = Math.random() * 60 + 20
        const height = Math.random() * 150 + 50
        const x = i * 30
        const y = canvas.height - baseHeight - height

        ctx.fillRect(x, y, width, height)

        // Add windows
        ctx.fillStyle = "rgba(147, 51, 234, 0.2)"

        const windowSize = 2
        const windowSpacing = 10

        for (let wx = x + 5; wx < x + width - 5; wx += windowSpacing) {
          for (let wy = y + 10; wy < canvas.height - baseHeight; wy += windowSpacing) {
            if (Math.random() > 0.3) {
              ctx.fillRect(wx, wy, windowSize, windowSize)
            }
          }
        }

        ctx.fillStyle = "rgba(20, 20, 30, 0.3)"
      }
    }

    // Draw holographic lines
    function drawHolographicLines() {
      if (!ctx) return

      const time = Date.now() * 0.001

      for (let i = 0; i < 5; i++) {
        const y = canvas.height * (0.3 + (0.5 * i) / 5)
        const amplitude = 20 + 10 * Math.sin(time * 0.5 + i)
        const frequency = 0.005 + 0.002 * Math.cos(time * 0.3 + i)

        ctx.beginPath()
        ctx.moveTo(0, y)

        for (let x = 0; x < canvas.width; x += 5) {
          const offsetY = amplitude * Math.sin(x * frequency + time + i)
          ctx.lineTo(x, y + offsetY)
        }

        const gradient = ctx.createLinearGradient(0, y - amplitude, 0, y + amplitude)
        gradient.addColorStop(0, "rgba(147, 51, 234, 0)")
        gradient.addColorStop(0.5, `rgba(147, 51, 234, ${0.1 + 0.05 * Math.sin(time + i)})`)
        gradient.addColorStop(1, "rgba(147, 51, 234, 0)")

        ctx.strokeStyle = gradient
        ctx.lineWidth = 1
        ctx.stroke()
      }
    }

    // Animation loop
    function animate() {
      if (!ctx) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw gradient background
      const time = Date.now() * 0.0005
      const hue1 = (260 + 20 * Math.sin(time * 0.3)) % 360 // Purple range
      const hue2 = (220 + 40 * Math.sin(time * 0.5)) % 360 // Blue range

      const gradient = ctx.createLinearGradient(canvas.width / 2, 0, canvas.width / 2, canvas.height)

      gradient.addColorStop(0, `hsl(${hue1}, 70%, 10%)`)
      gradient.addColorStop(1, `hsl(${hue2}, 70%, 5%)`)

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw grid
      drawGrid()

      // Draw holographic lines
      drawHolographicLines()

      // Draw cityscape
      drawCityscape()

      // Draw and update particles
      particles.forEach((particle) => {
        particle.update()
        particle.draw()
      })

      // Draw glow spots
      const glowSpots = [
        { x: canvas.width * 0.2, y: canvas.height * 0.3, radius: 150, color: "rgba(147, 51, 234, 0.05)" },
        { x: canvas.width * 0.8, y: canvas.height * 0.7, radius: 200, color: "rgba(236, 72, 153, 0.05)" },
        { x: canvas.width * 0.5, y: canvas.height * 0.5, radius: 250, color: "rgba(59, 130, 246, 0.05)" },
      ]

      glowSpots.forEach((spot) => {
        const spotGradient = ctx.createRadialGradient(spot.x, spot.y, 0, spot.x, spot.y, spot.radius)
        spotGradient.addColorStop(0, spot.color)
        spotGradient.addColorStop(1, "rgba(0, 0, 0, 0)")

        ctx.fillStyle = spotGradient
        ctx.beginPath()
        ctx.arc(spot.x, spot.y, spot.radius, 0, Math.PI * 2)
        ctx.fill()
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [])

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* Shifting gradient overlay */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `linear-gradient(${gradientAngle}deg, rgba(76, 29, 149, 0.3), rgba(30, 58, 138, 0.3))`,
          transition: "background 0.5s ease",
        }}
      />

      {/* Additional ambient glow spots with animation */}
      <motion.div
        className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-purple-600/10 blur-3xl"
        animate={{
          opacity: [0.4, 0.7, 0.4],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute right-1/4 bottom-1/3 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl"
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute left-1/3 bottom-1/4 h-72 w-72 rounded-full bg-pink-500/10 blur-3xl"
        animate={{
          opacity: [0.2, 0.5, 0.2],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
    </div>
  )
}
