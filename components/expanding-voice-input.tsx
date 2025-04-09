"use client"

import type React from "react"

import { useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Mic, Send } from "lucide-react"
import { useTheme } from "next-themes"
import VoiceTranscriptionPanel from "./voice-transcription-panel"

interface ExpandingVoiceInputProps {
  isRecording: boolean
  transcript: string
  inputText: string
  onInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void
  onClearText: () => void
  onSendMessage: () => void
  onToggleRecording: () => void
}

export default function ExpandingVoiceInput({
  isRecording,
  transcript,
  inputText,
  onInputChange,
  onKeyDown,
  onClearText,
  onSendMessage,
  onToggleRecording,
}: ExpandingVoiceInputProps) {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Update the handleTranscriptionKeyDown function to handle the API
  const handleTranscriptionKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      if (transcript) {
        // This will trigger the parent component to stop recording and send the message
        onSendMessage()

        // In a real implementation, you might want to explicitly close the stream:
        // if (transcriptionStreamRef.current) {
        //   transcriptionStreamRef.current.close();
        // }
      }
    }
  }

  return (
    <div className="relative">
      {/* Original input box - unchanged */}
      <div
        className="w-full backdrop-blur-md border rounded-full overflow-hidden"
        style={{
          backgroundColor: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.6)",
          borderColor: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(200, 200, 200, 0.2)",
          boxShadow: isDark
            ? "0 4px 20px rgba(0, 0, 0, 0.3), 0 0 10px rgba(139, 92, 246, 0.2)"
            : "0 4px 20px rgba(0, 0, 0, 0.1), 0 0 10px rgba(255, 255, 255, 0.5)",
          height: "56px",
        }}
      >
        {/* Text area */}
        {/* Find the text area container and textarea element
        // Replace the existing div and textarea with this improved layout: */}
        <div className="relative h-full flex items-center">
          <textarea
            ref={textareaRef}
            placeholder="Press Enter to send • Shift+Enter for new line"
            className="w-full resize-none py-4 pl-6 pr-28 bg-transparent scrollbar-thin"
            style={{
              color: isDark ? "white" : "#111827",
              border: "none",
              outline: "none",
              scrollbarColor: isDark ? "rgba(255,255,255,0.2) transparent" : "rgba(0,0,0,0.2) transparent",
              scrollbarWidth: "thin",
              overflow: "auto",
              maxHeight: "200px",
            }}
            value={inputText}
            onChange={onInputChange}
            onKeyDown={onKeyDown}
            rows={1}
            disabled={isRecording}
          />

          {/* Button container - positioned absolutely to ensure visibility */}
          <div className="absolute right-2 flex items-center space-x-3 z-10">
            {/* Send button */}
            <motion.button
              onClick={onSendMessage}
              disabled={!inputText}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 disabled:opacity-30"
              style={{
                backgroundColor: isDark ? "rgba(139, 92, 246, 0.2)" : "rgba(199, 210, 254, 0.3)",
                color: isDark
                  ? !inputText
                    ? "rgba(255,255,255,0.3)"
                    : "rgba(255,255,255,0.8)"
                  : !inputText
                    ? "rgba(79,70,229,0.3)"
                    : "rgba(79,70,229,0.8)",
                boxShadow: isDark ? "0 2px 8px rgba(0, 0, 0, 0.2)" : "0 2px 8px rgba(0, 0, 0, 0.05)",
              }}
            >
              <Send size={20} />
            </motion.button>

            {/* Record button */}
            <motion.button
              onClick={onToggleRecording}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 bg-gradient-to-br from-purple-500 to-cyan-600"
              style={{
                boxShadow: "0 0 20px rgba(147, 51, 234, 0.3), 0 0 5px rgba(6, 182, 212, 0.2)",
              }}
            >
              <Mic size={20} className="text-white" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Floating Voice Transcription Panel */}
      <VoiceTranscriptionPanel
        isRecording={isRecording}
        transcript={transcript}
        onClose={onToggleRecording}
        onSend={onSendMessage}
        onKeyDown={handleTranscriptionKeyDown}
        isDark={isDark}
      />

      {/* Overlay to blur/disable chat when recording */}
      <AnimatePresence>
        {isRecording && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[40]"
            style={{ pointerEvents: "none" }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
