"use client"

import { useEffect, useRef } from "react"

export default function CyberpunkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

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
    const particleCount = 100

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 2 + 0.5
        this.speedX = Math.random() * 0.5 - 0.25
        this.speedY = Math.random() * 0.5 - 0.25

        // Cyberpunk colors
        const colors = [
          "rgba(147, 51, 234, 0.5)", // Purple
          "rgba(236, 72, 153, 0.5)", // Pink
          "rgba(59, 130, 246, 0.5)", // Blue
          "rgba(16, 185, 129, 0.5)", // Teal
        ]

        this.color = colors[Math.floor(Math.random() * colors.length)]
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        // Wrap around edges
        if (this.x < 0) this.x = canvas.width
        if (this.x > canvas.width) this.x = 0
        if (this.y < 0) this.y = canvas.height
        if (this.y > canvas.height) this.y = 0
      }

      draw() {
        if (!ctx) return
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
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
      const baseHeight = canvas.height * 0.4

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

    // Animation loop
    function animate() {
      if (!ctx) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, "rgba(15, 23, 42, 1)")
      gradient.addColorStop(1, "rgba(23, 15, 42, 1)")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw grid
      drawGrid()

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
        const gradient = ctx.createRadialGradient(spot.x, spot.y, 0, spot.x, spot.y, spot.radius)
        gradient.addColorStop(0, spot.color)
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)")

        ctx.fillStyle = gradient
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
    <div className="absolute inset-0 z-0">
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* Additional ambient glow spots */}
      <div className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-purple-600/10 blur-3xl animate-pulse-slow" />
      <div className="absolute right-1/4 bottom-1/3 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl animate-pulse-slow animation-delay-300" />
      <div className="absolute left-1/3 bottom-1/4 h-72 w-72 rounded-full bg-pink-500/10 blur-3xl animate-pulse-slow animation-delay-600" />
    </div>
  )
}
