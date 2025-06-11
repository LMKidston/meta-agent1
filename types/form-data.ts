export interface FormData {
  // Agent Purpose & Domain
  agentType: string
  industry: string
  primaryGoal: string
  specificTasks: string[]

  // Communication Style
  tone: string
  formality: string
  responseLength: string

  // Expertise Level
  targetAudience: string
  technicalDepth: string
  explanationStyle: string

  // Behavior & Personality
  proactiveness: number
  askQuestions: boolean
  creativityLevel: number

  // Output Format
  responseStructure: string
  includeExamples: boolean
  formatStyle: string
}

export interface QuestionOption {
  value: string
  label: string
  description?: string
}