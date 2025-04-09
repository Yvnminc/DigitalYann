export type CourseLinks = {
  [courseId: string]: {
    [chapterId: number]: string | null
  }
}

// Store all course links
export const courseLinks: CourseLinks = {
  // Doors to LLMs course links
  llm: {
    1: "https://speckled-omelet-cc3.notion.site/Chapter-1-Introduction-to-LLMs-1a36970c0d23807992fdc15b7c845825?pvs=74",
    2: "https://speckled-omelet-cc3.notion.site/Chapter-2-Train-Your-LLMs-1a36970c0d238013a171ea016adec164",
    3: "https://speckled-omelet-cc3.notion.site/Chapter-3-Reasoning-LLMs-1a36970c0d23809295c5d7a708695482",
    4: "https://speckled-omelet-cc3.notion.site/Chapter-4-RAG-System-1a36970c0d238067892bedf3e1076cd5",
    5: "https://speckled-omelet-cc3.notion.site/Chapter-5-Agentic-Era-1a36970c0d23804a8a21d3e97585cdbf?pvs=74",
    6: null, // No link available yet
    7: null,
    8: null,
    9: null,
    10: null,
  },
  // Doors to Deep Learning course links (placeholder for future)
  "deep-learning": {
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
    6: null,
    7: null,
    8: null,
    9: null,
    10: null,
  },
  // Doors to Artificial Intelligence course links (placeholder for future)
  ai: {
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
    6: null,
    7: null,
    8: null,
    9: null,
    10: null,
  },
  // Doors to Machine Learning course links (placeholder for future)
  ml: {
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
    6: null,
    7: null,
    8: null,
    9: null,
    10: null,
  },
}

// Helper function to check if a chapter has a link
export const hasChapterLink = (courseId: string, chapterId: number): boolean => {
  return Boolean(courseLinks[courseId]?.[chapterId])
}

// Helper function to get a chapter link
export const getChapterLink = (courseId: string, chapterId: number): string | null => {
  return courseLinks[courseId]?.[chapterId] || null
}
