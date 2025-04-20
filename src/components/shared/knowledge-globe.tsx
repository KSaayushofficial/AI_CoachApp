"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"

export function KnowledgeGlobe({ subject = "oop-java" }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    const width = canvas.width
    const height = canvas.height

    // Set up nodes based on subject
    type Node = {
      id: number
      name: string
      x: number
      y: number
      radius: number
      color: string
      vx?: number
      vy?: number
    }

    let nodes: Node[] = []
    let connections: { source: number; target: number }[] = []

    if (subject === "oop-java") {
      nodes = [
        { id: 1, name: "OOP", x: width / 2, y: height / 2, radius: 30, color: "#3B82F6" },
        { id: 2, name: "Inheritance", x: width / 2 - 120, y: height / 2 - 100, radius: 25, color: "#10B981" },
        { id: 3, name: "Polymorphism", x: width / 2 + 120, y: height / 2 - 100, radius: 25, color: "#F59E0B" },
        { id: 4, name: "Encapsulation", x: width / 2 - 120, y: height / 2 + 100, radius: 25, color: "#8B5CF6" },
        { id: 5, name: "Abstraction", x: width / 2 + 120, y: height / 2 + 100, radius: 25, color: "#EC4899" },
        { id: 6, name: "Classes", x: width / 2 - 200, y: height / 2, radius: 20, color: "#6366F1" },
        { id: 7, name: "Objects", x: width / 2 + 200, y: height / 2, radius: 20, color: "#14B8A6" },
      ]

      connections = [
        { source: 1, target: 2 },
        { source: 1, target: 3 },
        { source: 1, target: 4 },
        { source: 1, target: 5 },
        { source: 1, target: 6 },
        { source: 1, target: 7 },
        { source: 2, target: 6 },
        { source: 3, target: 7 },
        { source: 4, target: 6 },
        { source: 5, target: 6 },
      ]
    } else if (subject === "data-structures") {
      nodes = [
        { id: 1, name: "Data Structures", x: width / 2, y: height / 2, radius: 30, color: "#3B82F6" },
        { id: 2, name: "Arrays", x: width / 2 - 150, y: height / 2 - 80, radius: 25, color: "#10B981" },
        { id: 3, name: "Linked Lists", x: width / 2 + 150, y: height / 2 - 80, radius: 25, color: "#F59E0B" },
        { id: 4, name: "Trees", x: width / 2 - 180, y: height / 2 + 80, radius: 25, color: "#8B5CF6" },
        { id: 5, name: "Graphs", x: width / 2, y: height / 2 + 120, radius: 25, color: "#EC4899" },
        { id: 6, name: "Hash Tables", x: width / 2 + 180, y: height / 2 + 80, radius: 25, color: "#6366F1" },
      ]

      connections = [
        { source: 1, target: 2 },
        { source: 1, target: 3 },
        { source: 1, target: 4 },
        { source: 1, target: 5 },
        { source: 1, target: 6 },
        { source: 4, target: 5 },
      ]
    } else {
      // Default nodes for any subject
      nodes = [
        {
          id: 1,
          name: subject
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" "),
          x: width / 2,
          y: height / 2,
          radius: 30,
          color: "#3B82F6",
        },
        { id: 2, name: "Concept 1", x: width / 2 - 120, y: height / 2 - 100, radius: 25, color: "#10B981" },
        { id: 3, name: "Concept 2", x: width / 2 + 120, y: height / 2 - 100, radius: 25, color: "#F59E0B" },
        { id: 4, name: "Concept 3", x: width / 2 - 120, y: height / 2 + 100, radius: 25, color: "#8B5CF6" },
        { id: 5, name: "Concept 4", x: width / 2 + 120, y: height / 2 + 100, radius: 25, color: "#EC4899" },
      ]

    let animationFrame: number
        { source: 1, target: 2 },
        { source: 1, target: 3 },
        { source: 1, target: 4 },
        { source: 1, target: 5 },
        { source: 2, target: 3 },
        { source: 4, target: 5 },
      ]
    }

    // Animation variables
    let animationFrame: number
    let angle = 0

    // Node physics
    const nodePhysics = {
      repulsion: 0.1,
      springLength: 100,
      springStrength: 0.01,
      damping: 0.9,
      if (ctx) ctx.clearRect(0, 0, width, height)

    // Initialize node velocities
    nodes.forEach((node: Node) => {
      node.vx = 0
      node.vy = 0
    })

    // Draw function
    const draw = (): void => {
      // Clear canvas
      ctx.clearRect(0, 0, width, height)

      // Update physics
      updatePhysics()

      // Draw connections
      if (ctx) {
        ctx.strokeStyle = "rgba(var(--primary-rgb), 0.2)"
        ctx.lineWidth = 1
      }

      connections.forEach((conn: { source: number; target: number }) => {
        const source = nodes.find((n) => n.id === conn.source)
        const target = nodes.find((n) => n.id === conn.target)

        if (source && target) {
          if (ctx) {
            ctx.beginPath()
            ctx.moveTo(source.x, source.y)
            ctx.lineTo(target.x, target.y)
            ctx.stroke()
          }

          // Draw animated particles along connections
          const particleCount = 2
          for (let i = 0; i < particleCount; i++) {
            const t = (angle / 100 + i / particleCount) % 1
            const x = source.x + (target.x - source.x) * t
            const y = source.y + (target.y - source.y) * t

            if (ctx) {
              ctx.fillStyle = "rgba(var(--primary-rgb), 0.8)"
        const gradient = ctx?.createRadialGradient(source.x, source.y, 0, source.x, source.y, source.radius * 2)
              ctx.arc(x, y, 2, 0, Math.PI * 2)
              ctx.fill()
            }
        if (ctx && gradient) {
          ctx.fillStyle = gradient
          ctx.beginPath()
          ctx.arc(node.x, node.y, node.radius * 2, 0, Math.PI * 2)
          ctx.fill()
        }
        if (ctx) {
          ctx.fillStyle = node.color + "80"
          ctx.strokeStyle = node.color
          ctx.lineWidth = 2
          ctx.beginPath()
          ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
          ctx.fill()
          ctx.stroke()
        }
        if (ctx) {
          ctx.fillStyle = "#fff"
          ctx.font = "12px sans-serif"
          ctx.textAlign = "center"
          ctx.textBaseline = "middle"
          ctx.fillText(node.name, node.x, node.y)
        }
        // Node circle
        ctx.fillStyle = node.color + "80"
        ctx.strokeStyle = node.color
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
        ctx.fill()
        ctx.stroke()

        // Node text
        ctx.fillStyle = "#fff"
        ctx.font = "12px sans-serif"
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText(node.name, node.x, node.y)
      })

      // Update animation angle
      angle += 1

      // Continue animation
      animationFrame = requestAnimationFrame(draw)
    }

    // Physics update function
    const updatePhysics = (): void => {
      // Apply forces between nodes (repulsion)
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const nodeA = nodes[i]
          const nodeB = nodes[j]

          const dx = nodeB.x - nodeA.x
          const dy = nodeB.y - nodeA.y
          const distance = Math.sqrt(dx * dx + dy * dy) || 1

          // Repulsive force (inverse square law)
          const force = nodePhysics.repulsion / (distance * distance)

          const forceX = (dx / distance) * force
          const forceY = (dy / distance) * force

          nodeA.vx -= forceX
          nodeA.vy -= forceY
          nodeB.vx += forceX
          nodeB.vy += forceY
        }
      }

      // Apply spring forces along connections
      connections.forEach((conn) => {
        const source = nodes.find((n) => n.id === conn.source)
        const target = nodes.find((n) => n.id === conn.target)

        if (source && target) {
          const dx = target.x - source.x
          const dy = target.y - source.y
          const distance = Math.sqrt(dx * dx + dy * dy) || 1

          // Spring force (Hooke's law)
          const displacement = distance - nodePhysics.springLength
          const force = displacement * nodePhysics.springStrength

          const forceX = (dx / distance) * force
          const forceY = (dy / distance) * force

          source.vx += forceX
          source.vy += forceY
          target.vx -= forceX
          target.vy -= forceY
        }
      })

      // Update positions and apply damping
      nodes.forEach((node) => {
        node.vx *= nodePhysics.damping
        node.vy *= nodePhysics.damping

        node.x += node.vx
        node.y += node.vy

        // Boundary constraints
        const padding = node.radius
        if (node.x < padding) {
          node.x = padding
          node.vx = -node.vx * 0.5
        }
        if (node.x > width - padding) {
          node.x = width - padding
          node.vx = -node.vx * 0.5
        }
        if (node.y < padding) {
          node.y = padding
          node.vy = -node.vy * 0.5
        }
        if (node.y > height - padding) {
          node.y = height - padding
          node.vy = -node.vy * 0.5
        }
      })
    }

    // Start animation
    draw()

    // Clean up
    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame)
    }
  }, [subject])

  return (
    <div className="w-full h-full relative">
      <canvas ref={canvasRef} width={1000} height={300} className="w-full h-full" />
      <motion.div
        className="absolute top-4 left-4 bg-background/80 backdrop-blur-sm rounded-lg px-3 py-1.5 text-sm font-medium border border-border/10"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        {subject
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")}{" "}
        Knowledge Network
      </motion.div>
    </div>
  )
}

