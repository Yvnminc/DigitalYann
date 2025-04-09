"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown, Cpu, BookText, Brain, Network, Layers, ExternalLink } from "lucide-react"
import { useTheme } from "next-themes"
import { courseLinks, hasChapterLink } from "@/data/course-links"

type ModelOption = {
  id: string
  name: string
  description: string
}

type Chapter = {
  id: number
  title: string
}

type Course = {
  id: string
  title: string
  icon: React.ElementType
  chapters: Chapter[]
}

const models: ModelOption[] = [
  { id: "gpt-4o", name: "GPT-4o", description: "Most capable model, best for complex tasks" },
  { id: "gpt-4o-mini", name: "GPT-4o-mini", description: "Faster responses, good for most tasks" },
  { id: "gpt-3.5-turbo", name: "GPT-3.5 Turbo", description: "Fast and efficient for simple tasks" },
  { id: "claude-3-opus", name: "Claude 3 Opus", description: "Advanced reasoning and comprehension" },
  { id: "claude-3-sonnet", name: "Claude 3 Sonnet", description: "Balanced performance and efficiency" },
]

// Generate 10 chapters for each course
const generateChapters = (): Chapter[] => {
  return Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    title: `Chapter ${i + 1}`,
  }))
}

const courses: Course[] = [
  {
    id: "llm",
    title: "Doors to LLMs",
    icon: BookText,
    chapters: generateChapters(),
  },
  {
    id: "deep-learning",
    title: "Doors to Deep Learning",
    icon: Network,
    chapters: generateChapters(),
  },
  {
    id: "ai",
    title: "Doors to Artificial Intelligence",
    icon: Brain,
    chapters: generateChapters(),
  },
  {
    id: "ml",
    title: "Doors to Machine Learning",
    icon: Layers,
    chapters: generateChapters(),
  },
]

export default function LearningModulesPanel() {
  const [selectedModel, setSelectedModel] = useState(models[0])
  const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false)
  const [expandedCourseId, setExpandedCourseId] = useState<string | null>(null)

  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  const toggleCourse = (courseId: string) => {
    if (expandedCourseId === courseId) {
      setExpandedCourseId(null)
    } else {
      setExpandedCourseId(courseId)
    }
  }

  const openChapterLink = (courseId: string, chapterId: number) => {
    const link = courseLinks[courseId]?.[chapterId]
    if (link) {
      window.open(link, "_blank", "noopener,noreferrer")
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: -10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -10 }}
      transition={{ duration: 0.2 }}
      className="w-80 rounded-2xl overflow-hidden backdrop-blur-xl border shadow-lg transition-all duration-300"
      style={{
        backgroundColor: isDark ? "rgba(10, 10, 20, 0.6)" : "rgba(255, 255, 255, 0.6)",
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
          Learning Modules
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
              onClick={() => setIsModelDropdownOpen(!isModelDropdownOpen)}
              className="w-full p-2.5 border rounded-lg flex items-center justify-between transition-all duration-300"
              style={{
                backgroundColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.6)",
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
                  maxHeight: "180px",
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

        {/* Course Modules */}
        <div className="space-y-3 mt-8">
          <h4
            className="text-sm font-medium mb-3 transition-colors duration-300"
            style={{ color: isDark ? "rgba(255,255,255,0.8)" : "rgba(75,85,99,1)" }}
          >
            Course Modules
          </h4>

          {courses.map((course) => (
            <div key={course.id} className="mb-3">
              <button
                onClick={() => toggleCourse(course.id)}
                className="w-full p-3 border rounded-lg flex items-center justify-between transition-all duration-300"
                style={{
                  backgroundColor: isDark
                    ? expandedCourseId === course.id
                      ? "rgba(139, 92, 246, 0.2)"
                      : "rgba(255,255,255,0.1)"
                    : expandedCourseId === course.id
                      ? "rgba(199, 210, 254, 0.3)"
                      : "rgba(255,255,255,0.6)",
                  borderColor:
                    expandedCourseId === course.id
                      ? isDark
                        ? "rgba(139, 92, 246, 0.4)"
                        : "rgba(129, 140, 248, 0.4)"
                      : isDark
                        ? "rgba(255,255,255,0.1)"
                        : "rgba(200,200,200,0.2)",
                  color: isDark ? "white" : "#111827",
                  boxShadow:
                    expandedCourseId === course.id
                      ? isDark
                        ? "0 0 15px rgba(139, 92, 246, 0.2)"
                        : "0 0 15px rgba(199, 210, 254, 0.3)"
                      : "none",
                }}
              >
                <div className="flex items-center">
                  <course.icon size={18} className={`mr-3 ${isDark ? "text-purple-400" : "text-indigo-500"}`} />
                  <span className="text-sm font-medium">{course.title}</span>
                </div>
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-200 ${expandedCourseId === course.id ? "rotate-180" : ""}`}
                />
              </button>

              {/* Chapters list */}
              {expandedCourseId === course.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-1 overflow-hidden"
                >
                  <div
                    className="border rounded-lg p-2 backdrop-blur-md"
                    style={{
                      backgroundColor: isDark ? "rgba(0,0,0,0.4)" : "rgba(255,255,255,0.4)",
                      borderColor: isDark ? "rgba(139, 92, 246, 0.2)" : "rgba(129, 140, 248, 0.2)",
                    }}
                  >
                    <div
                      className="max-h-[200px] overflow-y-auto pr-2"
                      style={{
                        scrollbarWidth: "thin",
                        scrollbarColor: isDark ? "rgba(255,255,255,0.2) transparent" : "rgba(0,0,0,0.2) transparent",
                      }}
                    >
                      {course.chapters.map((chapter) => {
                        const hasLink = hasChapterLink(course.id, chapter.id)
                        return (
                          <motion.button
                            key={chapter.id}
                            whileHover={{ x: 4 }}
                            className={`w-full text-left p-2 rounded-md flex items-center justify-between my-1 transition-colors duration-200 ${
                              hasLink ? "cursor-pointer" : "cursor-default"
                            }`}
                            style={{
                              backgroundColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
                              color: isDark ? "white" : "#111827",
                            }}
                            onClick={() => hasLink && openChapterLink(course.id, chapter.id)}
                          >
                            <div className="flex items-center">
                              <div
                                className={`w-2 h-2 rounded-full mr-3 ${
                                  hasLink
                                    ? isDark
                                      ? "bg-green-400"
                                      : "bg-green-500"
                                    : isDark
                                      ? "bg-gray-600"
                                      : "bg-gray-300"
                                }`}
                              />
                              <span className="text-sm">{chapter.title}</span>
                            </div>
                            {hasLink && (
                              <ExternalLink
                                size={14}
                                className={isDark ? "text-purple-400 opacity-70" : "text-indigo-500 opacity-70"}
                              />
                            )}
                          </motion.button>
                        )
                      })}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          ))}
        </div>

        <div
          className="pt-4 mt-6 border-t transition-colors duration-300"
          style={{ borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(200,200,200,0.2)" }}
        >
          <p
            className="text-xs text-center transition-colors duration-300"
            style={{ color: isDark ? "rgba(255,255,255,0.4)" : "rgba(75,85,99,0.6)" }}
          >
            Your progress is automatically saved
          </p>
        </div>
      </div>
    </motion.div>
  )
}
