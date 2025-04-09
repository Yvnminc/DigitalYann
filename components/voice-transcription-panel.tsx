"use client"

import type React from "react"

import { useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Mic, Send, X } from "lucide-react"

interface VoiceTranscriptionPanelProps {
  isRecording: boolean
  transcript: string
  onClose: () => void
  onSend: () => void
  onKeyDown: (e: React.KeyboardEvent) => void
  isDark: boolean
}

export default function VoiceTranscriptionPanel({
  isRecording,
  transcript,
  onClose,
  onSend,
  onKeyDown,
  isDark,
}: VoiceTranscriptionPanelProps) {
  const transcriptRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when new text is added
  useEffect(() => {
    if (isRecording && transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight
    }
  }, [transcript, isRecording])

  // Handle key events for the entire panel
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey && isRecording) {
        e.preventDefault()
        if (transcript) {
          onSend()
        }
      } else if (e.key === "Escape" && isRecording) {
        onClose()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isRecording, transcript, onSend, onClose])

  return (
    <AnimatePresence>
      {isRecording && (
        <motion.div
          key="voice-popup"
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="fixed bottom-32 mx-auto left-0 right-0 w-[80%] max-w-2xl h-[280px] rounded-2xl z-50 flex flex-col"
          style={{
            backgroundColor: isDark ? "rgba(0, 0, 0, 0.5)" : "rgba(255, 255, 255, 0.6)",
            backdropFilter: "blur(12px)",
            borderColor: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(200, 200, 200, 0.2)",
            borderWidth: "1px",
            boxShadow: isDark
              ? "0 8px 30px rgba(0, 0, 0, 0.4), 0 0 15px rgba(139, 92, 246, 0.25)"
              : "0 8px 30px rgba(0, 0, 0, 0.15), 0 0 15px rgba(255, 255, 255, 0.6)",
          }}
        >
          {/* Blinking red dot indicator */}
          <div className="absolute top-3 left-1/2 transform -translate-x-1/2 flex items-center">
            <motion.div
              className="w-3 h-3 rounded-full bg-red-500"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            />
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center"
            style={{
              backgroundColor: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)",
            }}
          >
            <X size={16} className={isDark ? "text-white/70" : "text-gray-700"} />
          </button>

          {/* Transcription area */}
          <div
            ref={transcriptRef}
            className="flex-1 p-6 pt-10 overflow-y-auto scrollbar-thin"
            style={{
              scrollbarColor: isDark ? "rgba(255,255,255,0.2) transparent" : "rgba(0,0,0,0.2) transparent",
              color: isDark ? "white" : "#111827",
            }}
            onKeyDown={onKeyDown}
            tabIndex={0}
          >
            {transcript || <div className="text-center opacity-50 mt-16">Listening...</div>}
          </div>

          {/* Bottom controls */}
          <div className="p-4 flex justify-between items-center">
            {/* Recording indicator */}
            <div className="flex items-center">
              <div className="relative mr-2">
                <Mic size={16} className={isDark ? "text-red-300" : "text-red-500"} />
                <motion.div
                  className="absolute inset-0 rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.7, 0.2, 0.7],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                  style={{
                    backgroundColor: isDark ? "rgba(248, 113, 113, 0.5)" : "rgba(239, 68, 68, 0.5)",
                  }}
                />
              </div>
              <span className="text-xs opacity-70">{transcript ? "Transcribing..." : "Listening..."}</span>
            </div>

            {/* Send button */}
            <motion.button
              onClick={onSend}
              disabled={!transcript}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-full flex items-center justify-center disabled:opacity-30"
              style={{
                backgroundColor: isDark ? "rgba(139, 92, 246, 0.2)" : "rgba(199, 210, 254, 0.3)",
                color: isDark ? "rgba(255,255,255,0.8)" : "rgba(79,70,229,0.8)",
                boxShadow: isDark ? "0 2px 8px rgba(0, 0, 0, 0.2)" : "0 2px 8px rgba(0, 0, 0, 0.05)",
              }}
            >
              <Send size={18} />
            </motion.button>
          </div>

          {/* Hint text */}
          <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 text-xs opacity-40 pointer-events-none">
            Press Enter to send
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
