"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"
import { Mic } from "lucide-react"
import { useEffect, useState } from "react"

interface RecordingIndicatorProps {
  isRecording: boolean
}

export default function RecordingIndicator({ isRecording }: RecordingIndicatorProps) {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"
  const [visible, setVisible] = useState(false)

  // Control visibility with auto-hide
  useEffect(() => {
    if (isRecording) {
      setVisible(true)

      // Auto-hide after 2 seconds
      const timer = setTimeout(() => {
        setVisible(false)
      }, 2000)

      return () => clearTimeout(timer)
    } else {
      setVisible(false)
    }
  }, [isRecording])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="absolute top-6 left-1/2 z-50"
          initial={{ opacity: 0, y: -10, scale: 0.95, x: "-50%" }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
            x: "-50%",
            transition: {
              type: "spring",
              stiffness: 400,
              damping: 25,
            },
          }}
          exit={{
            opacity: 0,
            y: -20,
            scale: 0.95,
            x: "-50%",
            transition: {
              duration: 0.6,
              ease: "easeOut",
            },
          }}
        >
          <div
            className="flex items-center px-5 py-3 rounded-full backdrop-blur-xl shadow-lg"
            style={{
              backgroundColor: isDark ? "rgba(20, 20, 20, 0.6)" : "rgba(255, 255, 255, 0.6)",
              minWidth: "160px",
              height: "48px",
              boxShadow: isDark
                ? "0 4px 20px rgba(0, 0, 0, 0.3), 0 0 10px rgba(139, 92, 246, 0.2)"
                : "0 4px 20px rgba(0, 0, 0, 0.1), 0 0 10px rgba(255, 255, 255, 0.5)",
            }}
          >
            {/* Mic icon with pulsing animation */}
            <div className="relative mr-2">
              <Mic size={16} className={isDark ? "text-purple-300" : "text-purple-500"} />
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  backgroundColor: isDark ? "#a78bfa" : "#818cf8",
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.7, 0.2, 0.7],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
            </div>

            {/* Text */}
            <span
              className="font-medium"
              style={{
                color: isDark ? "#d1d5db" : "#6b7280",
              }}
            >
              Listening...
            </span>

            {/* Animated waveform dots */}
            <div className="flex space-x-1 ml-3">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    backgroundColor: isDark ? "#a78bfa" : "#818cf8",
                  }}
                  animate={{
                    height: ["6px", "12px", "6px"],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.2,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
