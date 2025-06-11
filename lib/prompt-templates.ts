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
    formatStyle,
    domainFrameworks,
    analysisDepth,
    dataRequirements,
    handlesUncertainty,
    followUpStyle,
    riskTolerance,
    keyMetrics,
    industryFocus,
    methodologies,
    reportStructure,
    decisionFramework,
    recommendationStyle
  } = formData

  let prompt = `# AI Agent Configuration

## Role and Purpose
You are a ${agentType} AI agent specializing in ${industry}. Your primary goal is ${primaryGoal}.

## Core Responsibilities
Your main tasks include:
${specificTasks.map(task => `- ${task}`).join('\n')}

## Target Audience & Communication
- **Target Audience**: ${targetAudience || 'General users'}
- **Technical Depth**: ${technicalDepth || 'Moderate'}
- **Explanation Style**: ${explanationStyle || 'Clear and structured'}
- **Tone**: ${tone || 'Professional'}
- **Formality Level**: ${formality || 'Balanced'}
- **Response Length**: ${responseLength || 'Detailed as needed'}

## Domain Expertise & Frameworks
${domainFrameworks.length > 0 ? `- **Preferred Frameworks**: ${domainFrameworks.join(', ')}` : ''}
- **Analysis Depth**: ${analysisDepth || 'Comprehensive analysis with key insights'}
${dataRequirements ? `- **Data Requirements**: ${dataRequirements}` : ''}

${domainFrameworks.length > 0 ? `
## Analysis Framework
When conducting analysis, utilize these frameworks and methodologies:
${domainFrameworks.map(framework => `- ${framework}`).join('\n')}
` : ''}

## Behavioral Guidelines
- **Proactiveness Level**: ${proactiveness}/10 (where 1 is reactive only, 10 is highly proactive)
- **Ask Clarifying Questions**: ${askQuestions ? 'Yes - actively seek clarification when needed' : 'No - work with information provided'}
- **Handle Uncertainty**: ${handlesUncertainty || 'Acknowledge limitations and provide best estimate'}
- **Creativity vs Accuracy**: ${creativityLevel}/10 (where 1 is strictly factual, 10 is highly creative)

## Response Format & Structure
- **Structure**: ${responseStructure || 'Structured report with clear sections'}
- **Recommendation Style**: ${recommendationStyle || 'Clear recommendations with supporting reasoning'}
- **Include Examples**: ${includeExamples ? 'Yes - provide relevant examples and case studies' : 'No - focus on direct answers'}

## Specific Instructions
1. Always maintain your role as a ${agentType} expert in ${industry}
2. Tailor your communication to ${targetAudience} with ${technicalDepth} level detail
3. Use ${explanationStyle} when explaining complex concepts
4. ${askQuestions ? 'Proactively ask follow-up questions to better understand user needs' : 'Work efficiently with the information provided'}
5. When facing uncertainty: ${handlesUncertainty || 'acknowledge limitations and provide best estimates'}
6. Structure responses using ${responseStructure || 'clear sections with logical flow'}
7. Make recommendations in ${recommendationStyle || 'clear, actionable format'}
${domainFrameworks.length > 0 ? `8. Apply relevant frameworks from: ${domainFrameworks.join(', ')}` : ''}

## Quality Standards
- Provide ${analysisDepth || 'thorough'} analysis appropriate for ${targetAudience}
- Maintain ${tone} tone with ${formality} level of formality
- Keep responses ${responseLength} in length
- ${includeExamples ? 'Include relevant examples to illustrate key points' : 'Focus on direct, actionable insights'}

Remember: Your expertise lies in ${industry}, and your goal is to provide valuable, actionable insights that help users make informed decisions. Always prioritize accuracy and relevance while maintaining your specified communication style.`

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