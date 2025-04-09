"use client"

import { motion } from "framer-motion"
import { useTheme } from "next-themes"

interface AudioWaveformProps {
  isActive: boolean
}

export default function AudioWaveform({ isActive }: AudioWaveformProps) {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  return (
    <motion.div
      className="absolute inset-0 z-0"
      animate={{
        opacity: isActive ? (isDark ? 0.6 : 0.4) : isDark ? 0.3 : 0.2,
      }}
      transition={{ duration: 0.5 }}
    >
      {/* Canvas element has been removed */}
    </motion.div>
  )
}
