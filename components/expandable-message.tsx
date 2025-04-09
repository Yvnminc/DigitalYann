"use client"

import { useState } from "react"
import { motion } from "framer-motion"

interface ExpandableMessageProps {
  content: string
  timestamp: Date
  isDark: boolean
}

export default function ExpandableMessage({ content, timestamp, isDark }: ExpandableMessageProps) {
  const [expanded, setExpanded] = useState(false)
  const isLong = content.length > 1000

  // Create a preview of the message (first ~400 characters)
  const preview = isLong ? content.slice(0, 400) + "..." : content

  return (
    <div>
      <p
        className="text-sm md:text-base transition-colors duration-300"
        style={{ color: isDark ? "white" : "#111827" }}
      >
        {expanded || !isLong ? content : preview}
      </p>

      {isLong && (
        <motion.button
          initial={{ opacity: 0.7 }}
          whileHover={{ opacity: 1 }}
          onClick={() => setExpanded((prev) => !prev)}
          className="text-xs mt-2 font-medium"
          style={{
            color: isDark ? "rgba(167, 139, 250, 0.8)" : "rgba(79, 70, 229, 0.8)",
          }}
        >
          {expanded ? "Show less" : "Show more"}
        </motion.button>
      )}

      <p
        className="text-xs mt-1 text-right transition-colors duration-300"
        style={{ color: isDark ? "rgba(255,255,255,0.4)" : "#9ca3af" }}
      >
        {timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
      </p>
    </div>
  )
}
