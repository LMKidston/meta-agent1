import { FormData } from '@/types/form-data'

export function generatePrompt(formData: FormData): string {
  const {
    agentType,
    industry,
    primaryGoal,
    specificTasks,
    tone,
    formality,
    responseLength,
    targetAudience,
    technicalDepth,
    explanationStyle,
    proactiveness,
    askQuestions,
    creativityLevel,
    responseStructure,
    includeExamples,
    formatStyle
  } = formData

  let prompt = `# AI Agent Configuration

## Role and Purpose
You are a ${agentType} AI agent specializing in ${industry}. Your primary goal is ${primaryGoal}.

## Core Responsibilities
Your main tasks include:
${specificTasks.map(task => `- ${task}`).join('\n')}

## Communication Style
- **Tone**: ${tone}
- **Formality Level**: ${formality}
- **Response Length**: ${responseLength}
- **Target Audience**: ${targetAudience}

## Expertise and Knowledge
- **Technical Depth**: ${technicalDepth}
- **Explanation Style**: ${explanationStyle}

## Behavioral Guidelines
- **Proactiveness Level**: ${proactiveness}/10 (where 1 is reactive only, 10 is highly proactive)
- **Ask Clarifying Questions**: ${askQuestions ? 'Yes - actively seek clarification when needed' : 'No - work with information provided'}
- **Creativity vs Accuracy**: ${creativityLevel}/10 (where 1 is strictly factual, 10 is highly creative)

## Response Format
- **Structure**: ${responseStructure}
- **Include Examples**: ${includeExamples ? 'Yes - provide relevant examples' : 'No - focus on direct answers'}
- **Format Style**: ${formatStyle}

## Instructions
1. Always maintain your role as a ${agentType} expert
2. Adapt your communication style based on the user's apparent expertise level
3. ${askQuestions ? 'Ask follow-up questions to better understand user needs' : 'Work with the information provided without asking additional questions'}
4. Keep responses ${responseLength.toLowerCase()}
5. Structure your responses in a ${formatStyle.toLowerCase()} format

Remember: Your goal is to be helpful, accurate, and aligned with the user's needs while maintaining your specialized expertise in ${industry}.`

  return prompt
}

export const AGENT_TYPES = [
  { value: 'consultant', label: 'Business Consultant', description: 'Provides strategic advice and solutions' },
  { value: 'teacher', label: 'Teacher/Tutor', description: 'Explains concepts and helps with learning' },
  { value: 'assistant', label: 'Personal Assistant', description: 'Helps with tasks and organization' },
  { value: 'analyst', label: 'Data Analyst', description: 'Analyzes data and provides insights' },
  { value: 'creator', label: 'Content Creator', description: 'Creates written content and copy' },
  { value: 'developer', label: 'Developer Helper', description: 'Assists with coding and technical problems' },
  { value: 'researcher', label: 'Researcher', description: 'Finds and synthesizes information' },
  { value: 'coach', label: 'Coach/Mentor', description: 'Provides guidance and motivation' }
]

export const INDUSTRIES = [
  { value: 'technology', label: 'Technology' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'education', label: 'Education' },
  { value: 'finance', label: 'Finance' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'legal', label: 'Legal' },
  { value: 'retail', label: 'Retail' },
  { value: 'manufacturing', label: 'Manufacturing' },
  { value: 'consulting', label: 'Consulting' },
  { value: 'creative', label: 'Creative Arts' },
  { value: 'general', label: 'General Purpose' }
]