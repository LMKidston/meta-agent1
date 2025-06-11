/**
 * TypeScript Interfaces for Meta Agent Creator
 * 
 * Defines the structure for form data and related types
 * used throughout the application.
 * 
 * @author Lilian Kidston
 * @version 1.0.0
 */

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

  // New Enhanced Fields
  // Domain Expertise
  domainFrameworks: string[]
  analysisDepth: string
  dataRequirements: string
  
  // Advanced Behavior
  handlesUncertainty: string
  followUpStyle: string
  riskTolerance: string
  
  // Specialized Knowledge
  keyMetrics: string[]
  industryFocus: string[]
  methodologies: string[]
  
  // Output Enhancement
  reportStructure: string
  decisionFramework: string
  recommendationStyle: string
}

export interface QuestionOption {
  value: string
  label: string
  description?: string
}