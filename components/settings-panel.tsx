"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown, Globe, Cpu } from "lucide-react"
import { useTheme } from "next-themes"

type ModelOption = {
  id: string
  name: string
  description: string
}

type LanguageOption = {
  id: string
  name: string
  nativeName: string
}

const models: ModelOption[] = [
  { id: "gpt-4o", name: "GPT-4o", description: "Most capable model, best for complex tasks" },
  { id: "gpt-4o-mini", name: "GPT-4o-mini", description: "Faster responses, good for most tasks" },
  { id: "gpt-3.5-turbo", name: "GPT-3.5 Turbo", description: "Fast and efficient for simple tasks" },
  { id: "claude-3-opus", name: "Claude 3 Opus", description: "Advanced reasoning and comprehension" },
  { id: "claude-3-sonnet", name: "Claude 3 Sonnet", description: "Balanced performance and efficiency" },
]

const languages: LanguageOption[] = [
  { id: "en", name: "English", nativeName: "English" },
  { id: "zh", name: "Chinese", nativeName: "中文" },
  { id: "es", name: "Spanish", nativeName: "Español" },
  { id: "fr", name: "French", nativeName: "Français" },
  { id: "de", name: "German", nativeName: "Deutsch" },
  { id: "ja", name: "Japanese", nativeName: "日本語" },
  { id: "ko", name: "Korean", nativeName: "한국어" },
  { id: "pt", name: "Portuguese", nativeName: "Português" },
  { id: "ru", name: "Russian", nativeName: "Русский" },
  { id: "ar", name: "Arabic", nativeName: "العربية" },
  { id: "hi", name: "Hindi", nativeName: "हिन्दी" },
  { id: "it", name: "Italian", nativeName: "Italiano" },
]

export default function SettingsPanel() {
  const [selectedModel, setSelectedModel] = useState(models[0])
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0])
  const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false)
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false)

  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: -10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -10 }}
      transition={{ duration: 0.2 }}
      className="w-72 rounded-2xl overflow-hidden backdrop-blur-xl border shadow-lg transition-all duration-300"
      style={{
        backgroundColor: isDark ? "rgba(10, 10, 20, 0.6)" : "rgba(255, 255, 255, 0.6)", // Consistent alpha
        borderColor: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(200, 200, 200, 0.2)",
        boxShadow: isDark
          ? `0 0 20px rgba(139, 92, 246, 0.2), 0 0 5px rgba(6, 182, 212, 0.1), inset 0 0 5px rgba(255, 255, 255, 0.05)`
          : `0 0 20px rgba(199, 210, 254, 0.2), 0 0 5px rgba(147, 197, 253, 0.1), inset 0 0 5px rgba(255, 255, 255, 0.2)`,
      }}
    >
      {/* Glow border effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/20 via-transparent to-cyan-500/20 opacity-50" />
      </div>

      <div className="p-6">
        <h3
          className="text-lg font-light mb-6 text-center transition-colors duration-300"
          style={{ color: isDark ? "white" : "#111827" }}
        >
          Settings
        </h3>

        {/* Model Selection */}
        <div className="mb-6">
          <label
            className="block text-sm mb-2 flex items-center transition-colors duration-300"
            style={{ color: isDark ? "rgba(255,255,255,0.7)" : "rgba(75,85,99,1)" }}
          >
            <Cpu size={14} className="mr-2" />
            Model
          </label>
          <div className="relative">
            <button
              onClick={() => {
                setIsModelDropdownOpen(!isModelDropdownOpen)
                setIsLanguageDropdownOpen(false)
              }}
              className="w-full p-2.5 border rounded-lg flex items-center justify-between transition-all duration-300"
              style={{
                backgroundColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.6)", // Consistent alpha
                borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(200,200,200,0.2)",
                color: isDark ? "white" : "#111827",
              }}
            >
              <span>{selectedModel.name}</span>
              <ChevronDown
                size={16}
                className={`transition-transform duration-200 ${isModelDropdownOpen ? "rotate-180" : ""}`}
              />
            </button>

            {/* Dropdown with fixed height and scrolling */}
            {isModelDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute mt-1 w-full backdrop-blur-md border rounded-lg overflow-hidden z-50"
                style={{
                  backgroundColor: isDark ? "rgba(0,0,0,0.75)" : "rgba(255,255,255,0.9)",
                  borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(200,200,200,0.2)",
                  boxShadow: isDark
                    ? "0 8px 16px rgba(0, 0, 0, 0.3), 0 0 4px rgba(139, 92, 246, 0.2)"
                    : "0 8px 16px rgba(0, 0, 0, 0.1), 0 0 4px rgba(199, 210, 254, 0.3)",
                  maxHeight: "180px", // Fixed height
                }}
              >
                {/* Scrollable container with gradient masks */}
                <div
                  className="max-h-[180px] overflow-y-auto relative"
                  style={{
                    scrollbarWidth: "thin",
                    scrollbarColor: isDark ? "rgba(255,255,255,0.2) transparent" : "rgba(0,0,0,0.2) transparent",
                  }}
                >
                  {/* Top fade gradient */}
                  <div
                    className="sticky top-0 left-0 right-0 h-4 z-10 pointer-events-none"
                    style={{
                      background: isDark
                        ? "linear-gradient(to bottom, rgba(0,0,0,0.75), transparent)"
                        : "linear-gradient(to bottom, rgba(255,255,255,0.9), transparent)",
                    }}
                  />

                  {models.map((model) => (
                    <button
                      key={model.id}
                      onClick={() => {
                        setSelectedModel(model)
                        setIsModelDropdownOpen(false)
                      }}
                      className={`w-full p-2.5 text-left transition-colors duration-200 ${
                        selectedModel.id === model.id
                          ? isDark
                            ? "bg-purple-500/30 text-white"
                            : "bg-indigo-100 text-indigo-900"
                          : isDark
                            ? "text-white/90 hover:bg-white/10"
                            : "text-gray-800 hover:bg-gray-100"
                      }`}
                    >
                      <div className="font-medium">{model.name}</div>
                      <div
                        className="text-xs transition-colors duration-300"
                        style={{ color: isDark ? "rgba(255,255,255,0.6)" : "rgba(75,85,99,0.8)" }}
                      >
                        {model.description}
                      </div>
                    </button>
                  ))}

                  {/* Bottom fade gradient */}
                  <div
                    className="sticky bottom-0 left-0 right-0 h-4 z-10 pointer-events-none"
                    style={{
                      background: isDark
                        ? "linear-gradient(to top, rgba(0,0,0,0.75), transparent)"
                        : "linear-gradient(to top, rgba(255,255,255,0.9), transparent)",
                    }}
                  />
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Language Selection */}
        <div className="mb-6">
          <label
            className="block text-sm mb-2 flex items-center transition-colors duration-300"
            style={{ color: isDark ? "rgba(255,255,255,0.7)" : "rgba(75,85,99,1)" }}
          >
            <Globe size={14} className="mr-2" />
            Language
          </label>
          <div className="relative">
            <button
              onClick={() => {
                setIsLanguageDropdownOpen(!isLanguageDropdownOpen)
                setIsModelDropdownOpen(false)
              }}
              className="w-full p-2.5 border rounded-lg flex items-center justify-between transition-all duration-300"
              style={{
                backgroundColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.6)", // Consistent alpha
                borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(200,200,200,0.2)",
                color: isDark ? "white" : "#111827",
              }}
            >
              <span>
                {selectedLanguage.name} ({selectedLanguage.nativeName})
              </span>
              <ChevronDown
                size={16}
                className={`transition-transform duration-200 ${isLanguageDropdownOpen ? "rotate-180" : ""}`}
              />
            </button>

            {/* Dropdown with fixed height and scrolling */}
            {isLanguageDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute mt-1 w-full backdrop-blur-md border rounded-lg overflow-hidden z-50"
                style={{
                  backgroundColor: isDark ? "rgba(0,0,0,0.75)" : "rgba(255,255,255,0.9)",
                  borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(200,200,200,0.2)",
                  boxShadow: isDark
                    ? "0 8px 16px rgba(0, 0, 0, 0.3), 0 0 4px rgba(139, 92, 246, 0.2)"
                    : "0 8px 16px rgba(0, 0, 0, 0.1), 0 0 4px rgba(199, 210, 254, 0.3)",
                  maxHeight: "180px", // Fixed height
                }}
              >
                {/* Scrollable container with gradient masks */}
                <div
                  className="max-h-[180px] overflow-y-auto relative"
                  style={{
                    scrollbarWidth: "thin",
                    scrollbarColor: isDark ? "rgba(255,255,255,0.2) transparent" : "rgba(0,0,0,0.2) transparent",
                  }}
                >
                  {/* Top fade gradient */}
                  <div
                    className="sticky top-0 left-0 right-0 h-4 z-10 pointer-events-none"
                    style={{
                      background: isDark
                        ? "linear-gradient(to bottom, rgba(0,0,0,0.75), transparent)"
                        : "linear-gradient(to bottom, rgba(255,255,255,0.9), transparent)",
                    }}
                  />

                  {languages.map((language) => (
                    <button
                      key={language.id}
                      onClick={() => {
                        setSelectedLanguage(language)
                        setIsLanguageDropdownOpen(false)
                      }}
                      className={`w-full p-2.5 text-left transition-colors duration-200 ${
                        selectedLanguage.id === language.id
                          ? isDark
                            ? "bg-purple-500/30 text-white"
                            : "bg-indigo-100 text-indigo-900"
                          : isDark
                            ? "text-white/90 hover:bg-white/10"
                            : "text-gray-800 hover:bg-gray-100"
                      }`}
                    >
                      <span>{language.name}</span>
                      <span
                        className="text-xs ml-2 transition-colors duration-300"
                        style={{ color: isDark ? "rgba(255,255,255,0.6)" : "rgba(75,85,99,0.8)" }}
                      >
                        ({language.nativeName})
                      </span>
                    </button>
                  ))}

                  {/* Bottom fade gradient */}
                  <div
                    className="sticky bottom-0 left-0 right-0 h-4 z-10 pointer-events-none"
                    style={{
                      background: isDark
                        ? "linear-gradient(to top, rgba(0,0,0,0.75), transparent)"
                        : "linear-gradient(to top, rgba(255,255,255,0.9), transparent)",
                    }}
                  />
                </div>
              </motion.div>
            )}
          </div>
        </div>

        <div
          className="pt-4 mt-2 border-t transition-colors duration-300"
          style={{ borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(200,200,200,0.2)" }}
        >
          <p
            className="text-xs text-center transition-colors duration-300"
            style={{ color: isDark ? "rgba(255,255,255,0.4)" : "rgba(75,85,99,0.6)" }}
          >
            Settings are automatically saved
          </p>
        </div>
      </div>
    </motion.div>
  )
}
