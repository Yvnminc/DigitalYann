"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface ExpandableMessageProps {
  content: string
  timestamp: Date
  isDark: boolean
}

export default function ExpandableMessage({ content, timestamp, isDark }: ExpandableMessageProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const shouldTruncate = content.length > 300

  // Format the timestamp
  const formattedTime = new Intl.DateTimeFormat("en", {
    hour: "numeric",
    minute: "numeric",
  }).format(timestamp)

  // Get the truncated content if needed
  const truncatedContent = shouldTruncate ? `${content.substring(0, 300)}...` : content

  // Render the message content with markdown support
  const renderContent = (text: string) => (
    <div className="prose prose-sm dark:prose-invert max-w-none">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {text}
      </ReactMarkdown>
    </div>
  )

  return (
    <div>
      {/* Message content with markdown support */}
      <div className={cn("transition-all duration-300", isExpanded ? "line-clamp-none" : "")}>
        {isExpanded ? renderContent(content) : renderContent(truncatedContent)}
      </div>

      {/* Expand/collapse button for long messages */}
      {shouldTruncate && (
        <div className="mt-2 flex justify-end">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsExpanded(!isExpanded)}
            className={cn(
              "flex items-center text-xs py-1 px-2 rounded-full transition-colors",
              isDark
                ? "bg-white/10 hover:bg-white/20 text-white/70"
                : "bg-black/5 hover:bg-black/10 text-black/60"
            )}
          >
            <span className="mr-1">
              {isExpanded ? "Show less" : "Show more"}
            </span>
            {isExpanded ? (
              <ChevronUp size={14} />
            ) : (
              <ChevronDown size={14} />
            )}
          </motion.button>
        </div>
      )}

      {/* Timestamp */}
      <div 
        className="text-[10px] mt-1 opacity-60"
        style={{ color: isDark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.6)" }}
      >
        {formattedTime}
      </div>
    </div>
  )
}
