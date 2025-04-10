"use client"

import type React from "react"

import { useState, useEffect, useRef, useCallback } from "react"
import { ChevronDown, BookOpen, Check, Copy, Sun, Moon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import AudioWaveform from "./audio-waveform"
import LearningModulesPanel from "./learning-modules-panel"
import { useTheme } from "next-themes"
import RecordingIndicator from "./recording-indicator"
import ExpandingVoiceInput from "./expanding-voice-input"
import ExpandableMessage from "./expandable-message"

// Add models array for reference
const models = [
  { id: "openai/gpt-4o-search-preview", name: "GPT-4o" },
  { id: "anthropic/claude-3.7-sonnet", name: "Claude 3.7 Sonnet" },
  { id: "deepseek/deepseek-r1", name: "DeepSeek" },
  { id: "google/gemini-2.0-flash-001", name: "Gemini 2.0 Flash" },
  { id: "openrouter/quasar-alpha", name: "Quasar Alpha" },
]

type Message = {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
}

export default function VoiceInterface() {
  const [isRecording, setIsRecording] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [inputText, setInputText] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "I'm your AI assistant. How can I help you today?",
      isUser: false,
      timestamp: new Date(),
    },
  ])
  const [isTyping, setIsTyping] = useState(false)
  const [showScrollIndicator, setShowScrollIndicator] = useState(false)
  const [isLearningModulesOpen, setIsLearningModulesOpen] = useState(false)
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const learningModulesRef = useRef<HTMLDivElement>(null)
  const transcriptionStreamRef = useRef<EventSource | null>(null)
  const [selectedModel, setSelectedModel] = useState("google/gemini-2.0-flash-001")
  const [isProcessing, setIsProcessing] = useState(false)

  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // After mounting, we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  // Handle click outside settings panel
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (learningModulesRef.current && !learningModulesRef.current.contains(event.target as Node)) {
        setIsLearningModulesOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Check if user has scrolled up
  useEffect(() => {
    const chatContainer = chatContainerRef.current
    if (!chatContainer) return

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = chatContainer
      const isScrolledToBottom = scrollHeight - scrollTop - clientHeight < 10
      setShowScrollIndicator(!isScrolledToBottom)
    }

    chatContainer.addEventListener("scroll", handleScroll)
    return () => chatContainer.removeEventListener("scroll", handleScroll)
  }, [])

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      })
    }
  }, [messages, isTyping]) // Add isTyping to dependencies to scroll when typing indicator appears/disappears

  // Reset copied message ID after timeout
  useEffect(() => {
    if (copiedMessageId) {
      const timeout = setTimeout(() => {
        setCopiedMessageId(null)
      }, 2000)

      return () => clearTimeout(timeout)
    }
  }, [copiedMessageId])

  // Simulate voice recognition
  // useEffect(() => {
  //   if (isRecording) {
  //     const phrases = [
  //       "Show me the latest tech news",
  //       "What's the weather like in Neo Tokyo",
  //       "Play some synthwave music",
  //       "Set a reminder for my meeting tomorrow",
  //     ]

  //     let currentPhrase = ""
  //     const words = phrases[Math.floor(Math.random() * phrases.length)].split(" ")

  //     const interval = setInterval(() => {
  //       if (words.length > 0) {
  //         currentPhrase += " " + words.shift()
  //         setTranscript(currentPhrase.trim())
  //       } else {
  //         clearInterval(interval)
  //       }
  //     }, 300)

  //     return () => clearInterval(interval)
  //   }
  // }, [isRecording])

  // Update the toggleRecording function to call the start-transcription API
  const toggleRecording = async () => {
    if (!isRecording) {
      // Starting a new recording session
      try {
        const sessionId = `session_${Date.now()}` // Simple UUID generation

        // Call the start-transcription API
        const response = await fetch("/api/start-transcription", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            language: "en-US",
            sessionId,
            model: "whisper",
            timestamp: Date.now(),
          }),
        })

        if (!response.ok) {
          throw new Error("Failed to start transcription")
        }

        // Start the transcription stream
        startTranscriptionStream(sessionId)

        setIsRecording(true)
      } catch (error) {
        console.error("Error starting transcription:", error)
        // Show error notification to user
      }
    } else {
      // Ending the recording session
      setIsRecording(false)

      // Submit the transcript if there is any
      if (transcript) {
        handleSendMessage(transcript)
      }
      setTranscript("")
    }
  }

  // Add a new function to handle the transcription stream
  const startTranscriptionStream = (sessionId: string) => {
    // For demo purposes, we'll simulate the streaming with our existing code
    // In a real implementation, you would use SSE or WebSockets here

    // Example of how to implement with SSE:
    /*
    const eventSource = new EventSource(`/api/stream-transcription?sessionId=${sessionId}`);

    eventSource.addEventListener('transcript', (event) => {
      const data = JSON.parse(event.data);
      setTranscript(data.text);

      if (data.final) {
        // Optionally handle final transcription differently
      }
    });

    eventSource.addEventListener('error', () => {
      eventSource.close();
      setIsRecording(false);
    });

    // Store the eventSource reference to close it later
    transcriptionStreamRef.current = eventSource;
    */

    // For demo, we'll keep our existing simulation code
    const phrases = [
      "Show me the latest tech news",
      "What's the weather like in Neo Tokyo",
      "Play some synthwave music",
      "Set a reminder for my meeting tomorrow",
    ]

    let currentPhrase = ""
    const words = phrases[Math.floor(Math.random() * phrases.length)].split(" ")

    const interval = setInterval(() => {
      if (words.length > 0) {
        currentPhrase += " " + words.shift()
        setTranscript(currentPhrase.trim())
      } else {
        clearInterval(interval)
      }
    }, 300)

    // Store the interval ID to clear it later
    return () => clearInterval(interval)
  }

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }

  // const toggleRecording = () => {
  //   setIsRecording(!isRecording)
  //   if (isRecording) {
  //     // Submit the transcript
  //     if (transcript) {
  //       handleSendMessage(transcript)
  //     }
  //     setTranscript("")
  //   }
  // }

  // Update the handleKeyDown function to handle Enter and Shift+Enter properly

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      if (!e.shiftKey) {
        e.preventDefault()
        if (inputText || transcript) {
          handleSendMessage(inputText || transcript)
        }
      }
      // If Shift+Enter, allow default behavior (new line)
    }
  }

  // Update the handleSendMessage function to reset the textarea height after sending

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return

    // Add user message
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser: true,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, newMessage])
    setInputText("")
    setTranscript("")
    setIsProcessing(true)
    setIsTyping(true)

    try {
      console.log(`Using model: ${selectedModel} for chat`);
      
      // Prepare messages history for the API
      const messageHistory = messages
        .concat(newMessage)
        .map(msg => ({
          role: msg.isUser ? "user" : "assistant",
          content: msg.text
        }))

      // Call the API with the selected model
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: selectedModel,
          messages: messageHistory,
          temperature: 0.7
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to get response from API")
      }

      const data = await response.json()
      
      // Extract the assistant's response
      const assistantResponse = data.choices && data.choices[0]?.message?.content
      
      if (assistantResponse) {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: assistantResponse,
          isUser: false,
          timestamp: new Date(),
        }

        setMessages((prev) => [...prev, aiMessage])
      } else {
        throw new Error("Invalid response format")
      }
    } catch (error) {
      console.error("Error getting AI response:", error)
      
      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm sorry, I encountered an error processing your request. Please try again.",
        isUser: false,
        timestamp: new Date(),
      }
      
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
      setIsProcessing(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value)
  }

  const clearText = () => {
    setInputText("")
    setTranscript("")
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const copyMessageToClipboard = (message: Message) => {
    navigator.clipboard
      .writeText(message.text)
      .then(() => {
        setCopiedMessageId(message.id)
      })
      .catch((err) => {
        console.error("Failed to copy message: ", err)
      })
  }

  // Subscribe to model changes from LearningModulesPanel
  const handleModelChange = useCallback((modelId: string) => {
    console.log(`Changing model to: ${modelId}`);
    setSelectedModel(modelId);
  }, []);

  // Update LearningModulesPanel to not reset the model when toggled
  const toggleLearningModules = useCallback(() => {
    setIsLearningModulesOpen(prev => !prev);
  }, []);

  // Don't render UI until mounted to avoid hydration mismatch
  if (!mounted) return null

  const isDark = resolvedTheme === "dark"

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center">
      {/* Main interface container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl h-[80vh]"
      >
        {/* Floating glass chat container */}
        <div
          className="relative flex flex-col h-full rounded-3xl overflow-hidden"
          style={{
            boxShadow: `
              0 0 30px rgba(139, 92, 246, 0.2),
              0 0 10px rgba(236, 72, 153, 0.15),
              inset 0 0 5px rgba(255, 255, 255, 0.05)
            `,
          }}
        >
          {/* Glow border effect */}
          <div className="absolute inset-0 pointer-events-none z-10">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500/30 via-transparent to-cyan-500/20 opacity-70" />
          </div>

          {/* Glass background with blur - consistent 0.6 alpha */}
          <div
            className="absolute inset-0 backdrop-blur-xl border border-white/10 rounded-3xl z-0 transition-colors duration-300"
            style={{
              backgroundColor: isDark ? "rgba(10, 10, 20, 0.6)" : "rgba(255, 255, 255, 0.6)",
              borderColor: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(200, 200, 200, 0.2)",
            }}
          />

          {/* Header */}
          <div
            className="relative p-6 border-b z-20 transition-colors duration-300"
            style={{ borderColor: isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(200, 200, 200, 0.2)" }}
          >
            <div className="flex items-center justify-between">
              <h1
                className="text-3xl font-light tracking-wide transition-colors duration-300"
                style={{ color: isDark ? "white" : "#111827" }}
              >
                Digtial Yann
              </h1>

              <div className="flex items-center space-x-3">
                {/* Theme toggle button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleTheme}
                  className="w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md border transition-all duration-300"
                  style={{
                    backgroundColor: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.6)",
                    borderColor: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(200, 200, 200, 0.2)",
                  }}
                >
                  {isDark ? <Sun size={18} className="text-white/70" /> : <Moon size={18} className="text-gray-700" />}
                </motion.button>

                {/* Learning Modules button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleLearningModules}
                  className="w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md border transition-all duration-300"
                  style={{
                    backgroundColor: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.6)",
                    borderColor: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(200, 200, 200, 0.2)",
                  }}
                >
                  <BookOpen size={18} className={isDark ? "text-white/70" : "text-gray-700"} />
                </motion.button>
              </div>
            </div>
          </div>

          {/* Learning Modules Panel */}
          <AnimatePresence>
            {isLearningModulesOpen && (
              <div className="absolute top-20 right-6 z-50" ref={learningModulesRef}>
                <LearningModulesPanel 
                  onModelChange={handleModelChange} 
                  currentModelId={selectedModel} 
                />
              </div>
            )}
          </AnimatePresence>

          {/* Chat area */}
          <div
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-track-transparent z-20"
            style={{
              scrollbarColor: isDark ? "rgba(255,255,255,0.1) transparent" : "rgba(0,0,0,0.1) transparent",
            }}
          >
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    onClick={() => copyMessageToClipboard(message)}
                    className={cn(
                      "relative max-w-[80%] p-4 rounded-2xl backdrop-blur-md shadow-lg cursor-pointer group transition-all duration-300",
                      message.isUser
                        ? isDark
                          ? "bg-gradient-to-r from-purple-600/30 to-cyan-600/20 text-white border border-white/10"
                          : "bg-gradient-to-r from-indigo-100 to-blue-100 text-gray-800 border border-black/5"
                        : isDark
                          ? "bg-white/10 text-white border border-white/5"
                          : "bg-white/60 text-gray-800 border border-black/5", // Consistent 0.6 alpha
                      copiedMessageId === message.id &&
                        (isDark ? "ring-2 ring-purple-500/50" : "ring-2 ring-indigo-300"),
                    )}
                    style={{
                      boxShadow: message.isUser
                        ? isDark
                          ? "0 4px 12px rgba(139, 92, 246, 0.15), inset 0 1px 1px rgba(255, 255, 255, 0.1)"
                          : "0 4px 12px rgba(199, 210, 254, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.7)"
                        : isDark
                          ? "0 4px 12px rgba(0, 0, 0, 0.1), inset 0 1px 1px rgba(255, 255, 255, 0.05)"
                          : "0 4px 12px rgba(0, 0, 0, 0.05), inset 0 1px 1px rgba(255, 255, 255, 0.7)",
                    }}
                  >
                    <ExpandableMessage content={message.text} timestamp={message.timestamp} isDark={isDark} />
                    <div
                      className={cn(
                        "absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200",
                        copiedMessageId === message.id && "opacity-100",
                      )}
                    >
                      {copiedMessageId === message.id ? (
                        <Check size={16} className="text-green-400" />
                      ) : (
                        <Copy size={14} className={isDark ? "text-white/50" : "text-gray-400"} />
                      )}
                    </div>

                    <AnimatePresence>
                      {copiedMessageId === message.id && (
                        <motion.div
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/70 text-white text-xs py-1 px-2 rounded"
                        >
                          Copied!
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                      <div className="shimmer-effect"></div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}

              <div ref={messagesEndRef} />
            </AnimatePresence>

            {/* Redesigned "Assistant is thinking..." indicator */}
            <AnimatePresence>
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{
                    opacity: 0,
                    y: -10,
                    height: 0,
                    transition: { duration: 0.3 },
                  }}
                  transition={{ duration: 0.3 }}
                  className="flex justify-start mt-2 overflow-hidden"
                >
                  <motion.div
                    className="max-w-[80%] rounded-2xl overflow-hidden"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -20, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      backdropFilter: "blur(10px)",
                      backgroundColor: isDark ? "rgba(0, 0, 0, 0.3)" : "rgba(255, 255, 255, 0.4)",
                      boxShadow: isDark
                        ? "0 2px 10px rgba(0, 0, 0, 0.2), 0 0 4px rgba(139, 92, 246, 0.1)"
                        : "0 2px 10px rgba(0, 0, 0, 0.05), 0 0 4px rgba(255, 255, 255, 0.5)",
                    }}
                  >
                    <div className="px-5 py-3 flex items-center space-x-3">
                      <span
                        className="text-sm font-medium transition-colors duration-300"
                        style={{ color: isDark ? "#d1d5db" : "#374151" }}
                      >
                        Assistant is thinking
                      </span>
                      <div className="flex space-x-1.5">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            className="w-2 h-2 rounded-full"
                            style={{
                              backgroundColor: isDark ? "#a78bfa" : "#818cf8",
                            }}
                            animate={{
                              scale: [0.8, 1.2, 0.8],
                              opacity: [0.5, 0.8, 0.5],
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Number.POSITIVE_INFINITY,
                              delay: i * 0.2,
                              ease: "easeInOut",
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Scroll to bottom indicator */}
          <AnimatePresence>
            {showScrollIndicator && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                onClick={scrollToBottom}
                className="absolute bottom-32 right-6 z-30 w-10 h-10 rounded-full bg-purple-600/80 flex items-center justify-center shadow-lg"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronDown size={20} className="text-white" />
              </motion.button>
            )}
          </AnimatePresence>

          {/* Audio waveform visualization */}
          <div className="relative h-12 z-20">
            <AudioWaveform isActive={isRecording} />
          </div>

          {/* Input area with expanding input field */}
          <div
            className="relative p-6 border-t z-20 transition-colors duration-300"
            style={{ borderColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(200,200,200,0.2)" }}
          >
            <ExpandingVoiceInput
              isRecording={isRecording}
              transcript={transcript}
              inputText={inputText}
              onInputChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onClearText={clearText}
              onSendMessage={() => handleSendMessage(inputText || transcript)}
              onToggleRecording={toggleRecording}
            />
          </div>
        </div>

        {/* Dynamic Island style Recording indicator */}
        <RecordingIndicator isRecording={isRecording} />
      </motion.div>
    </div>
  )
}
