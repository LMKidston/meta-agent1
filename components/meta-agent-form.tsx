'use client'

import { useState } from 'react'
import { FormData } from '@/types/form-data'
import { generatePrompt, AGENT_TYPES, INDUSTRIES, INDUSTRY_FRAMEWORKS, INDUSTRY_RECOMMENDATION_STYLES, AGENT_TYPE_RECOMMENDATION_PATTERNS, AGENT_TYPE_FRAMEWORK_PREFERENCES, AGENT_TYPE_DEPTH_CONCEPTS, AGENT_TYPE_QUESTIONS } from '@/lib/prompt-templates'
import { Copy, Check } from 'lucide-react'

const initialFormData: FormData = {
  agentType: '',
  industry: '',
  primaryGoal: '',
  specificTasks: [],
  tone: '',
  formality: '',
  responseLength: '',
  targetAudience: '',
  technicalDepth: '',
  explanationStyle: '',
  proactiveness: 5,
  askQuestions: true,
  creativityLevel: 5,
  responseStructure: '',
  includeExamples: true,
  formatStyle: '',
  domainFrameworks: [],
  analysisDepth: '',
  dataRequirements: '',
  handlesUncertainty: '',
  followUpStyle: '',
  riskTolerance: '',
  keyMetrics: [],
  industryFocus: [],
  methodologies: [],
  reportStructure: '',
  decisionFramework: '',
  recommendationStyle: ''
}

export default function MetaAgentForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [generatedPrompt, setGeneratedPrompt] = useState('')
  const [copied, setCopied] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const prompt = generatePrompt(formData)
    setGeneratedPrompt(prompt)
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedPrompt)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const handleTaskToggle = (task: string) => {
    setFormData(prev => ({
      ...prev,
      specificTasks: prev.specificTasks.includes(task)
        ? prev.specificTasks.filter(t => t !== task)
        : [...prev.specificTasks, task]
    }))
  }

  const handleArrayToggle = (field: string, value: string) => {
    setFormData(prev => {
      const currentArray = (prev as any)[field] as string[]
      return {
        ...prev,
        [field]: currentArray.includes(value)
          ? currentArray.filter(item => item !== value)
          : [...currentArray, value]
      }
    })
  }

  // Get intelligently filtered frameworks based on both agent type and industry
  const getFilteredFrameworks = () => {
    const industryFrameworks = formData.industry 
      ? INDUSTRY_FRAMEWORKS[formData.industry as keyof typeof INDUSTRY_FRAMEWORKS] || INDUSTRY_FRAMEWORKS.general
      : INDUSTRY_FRAMEWORKS.general

    const agentTypeFrameworks = formData.agentType 
      ? AGENT_TYPE_FRAMEWORK_PREFERENCES[formData.agentType as keyof typeof AGENT_TYPE_FRAMEWORK_PREFERENCES] || []
      : []

    // If we have both agent type and industry, show intersection + most relevant
    if (formData.agentType && formData.industry) {
      // Find frameworks that appear in both lists (intersection)
      const intersection = industryFrameworks.filter(framework => 
        agentTypeFrameworks.some(agentFramework => 
          framework.toLowerCase().includes(agentFramework.toLowerCase()) ||
          agentFramework.toLowerCase().includes(framework.toLowerCase()) ||
          framework === agentFramework
        )
      )

      // Add agent-specific frameworks that are relevant to any industry
      const agentSpecificRelevant = agentTypeFrameworks.filter(framework => 
        ['Analysis', 'Framework', 'Management', 'Planning', 'Assessment', 'Strategy', 'Process'].some(keyword =>
          framework.includes(keyword)
        )
      )

      // Combine and deduplicate
      const allFrameworks = [...intersection, ...agentSpecificRelevant, ...industryFrameworks.slice(0, 8)]
      const combined = Array.from(new Set(allFrameworks))
      return combined.slice(0, 12) // Limit to 12 most relevant
    }

    // If we only have agent type, show agent-specific frameworks
    if (formData.agentType && !formData.industry) {
      return agentTypeFrameworks
    }

    // If we only have industry, show industry frameworks
    if (!formData.agentType && formData.industry) {
      return industryFrameworks
    }

    // Default: show general frameworks
    return INDUSTRY_FRAMEWORKS.general
  }

  // Get agent-first recommendation styles (prioritize agent type over industry)
  const getCombinedRecommendationStyles = () => {
    const agentTypePattern = formData.agentType 
      ? AGENT_TYPE_RECOMMENDATION_PATTERNS[formData.agentType as keyof typeof AGENT_TYPE_RECOMMENDATION_PATTERNS]
      : null

    const industryStyles = formData.industry 
      ? INDUSTRY_RECOMMENDATION_STYLES[formData.industry as keyof typeof INDUSTRY_RECOMMENDATION_STYLES] || INDUSTRY_RECOMMENDATION_STYLES.general
      : INDUSTRY_RECOMMENDATION_STYLES.general

    // Priority 1: Agent type with industry context
    if (agentTypePattern && formData.industry) {
      // Create agent-type-first recommendations with industry flavor
      const agentBasedRecs = agentTypePattern.style.map(style => ({
        value: style,
        label: `${style.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} (${formData.industry} context)`
      }))

      // Add a few industry-specific recommendations that make sense for this agent type
      const compatibleIndustryRecs = industryStyles.slice(0, 2).map(style => ({
        ...style,
        label: `${style.label} (${agentTypePattern.format.split(' ')[0]} approach)`
      }))

      return [...agentBasedRecs, ...compatibleIndustryRecs]
    }

    // Priority 2: Agent type only (no industry selected)
    if (agentTypePattern && !formData.industry) {
      return agentTypePattern.style.map(style => ({
        value: style,
        label: style.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
      }))
    }

    // Priority 3: Industry only (no agent type selected)
    if (!agentTypePattern && formData.industry) {
      return industryStyles
    }

    // Default: General recommendations
    return INDUSTRY_RECOMMENDATION_STYLES.general
  }

  // Get agent-specific depth concept
  const getDepthConcept = () => {
    if (!formData.agentType) {
      return {
        concept: 'Analysis Depth',
        question: 'How deep should the analysis be?',
        options: [
          { value: 'surface', label: 'Surface-level overview' },
          { value: 'moderate', label: 'Moderate depth with key insights' },
          { value: 'comprehensive', label: 'Comprehensive deep-dive analysis' },
          { value: 'exhaustive', label: 'Exhaustive analysis with all factors' }
        ]
      }
    }
    return AGENT_TYPE_DEPTH_CONCEPTS[formData.agentType as keyof typeof AGENT_TYPE_DEPTH_CONCEPTS] || {
      concept: 'Analysis Depth',
      question: 'How deep should the analysis be?',
      options: [
        { value: 'surface', label: 'Surface-level overview' },
        { value: 'moderate', label: 'Moderate depth with key insights' },
        { value: 'comprehensive', label: 'Comprehensive deep-dive analysis' },
        { value: 'exhaustive', label: 'Exhaustive analysis with all factors' }
      ]
    }
  }

  // Get agent-specific question variations
  const getAgentQuestions = () => {
    if (!formData.agentType) return null
    return AGENT_TYPE_QUESTIONS[formData.agentType as keyof typeof AGENT_TYPE_QUESTIONS] || null
  }

  // Get primary goal question text
  const getPrimaryGoalQuestion = () => {
    const agentQuestions = getAgentQuestions()
    return agentQuestions?.primaryGoal || "What's the primary goal of your agent?"
  }

  // Get task options
  const getTaskOptions = () => {
    const agentQuestions = getAgentQuestions()
    return agentQuestions?.tasks || {
      label: "What specific tasks should your agent help with? (Select all that apply)",
      options: [
        'Answer questions',
        'Provide step-by-step guidance',
        'Generate ideas',
        'Review and critique work',
        'Create templates or examples',
        'Explain complex concepts',
        'Troubleshoot problems',
        'Make recommendations'
      ]
    }
  }

  // Get target audience options
  const getTargetAudienceOptions = () => {
    const agentQuestions = getAgentQuestions()
    return agentQuestions?.targetAudience || {
      label: "Who is your target audience?",
      options: [
        { value: 'beginners', label: 'Beginners - Little to no experience' },
        { value: 'intermediate', label: 'Intermediate - Some experience' },
        { value: 'advanced', label: 'Advanced - Experienced users' },
        { value: 'experts', label: 'Experts - Professional level' },
        { value: 'mixed', label: 'Mixed - Adapt to user level' }
      ]
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8 space-y-8">
        {/* Agent Purpose & Domain */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900">Agent Purpose & Domain</h2>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              What type of agent do you want to create?
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {AGENT_TYPES.map((type) => (
                <label key={type.value} className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="radio"
                    name="agentType"
                    value={type.value}
                    checked={formData.agentType === type.value}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      agentType: e.target.value,
                      // Clear recommendation style when agent type changes
                      recommendationStyle: ''
                    }))}
                    className="mt-1"
                  />
                  <div>
                    <div className="font-medium">{type.label}</div>
                    <div className="text-sm text-gray-500">{type.description}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              What industry or field will it serve?
            </label>
            <select
              value={formData.industry}
              onChange={(e) => setFormData(prev => ({ 
                ...prev, 
                industry: e.target.value,
                // Clear framework and recommendation selections when industry changes
                domainFrameworks: [],
                recommendationStyle: ''
              }))}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select an industry</option>
              {INDUSTRIES.map((industry) => (
                <option key={industry.value} value={industry.value}>
                  {industry.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              {getPrimaryGoalQuestion()}
              {formData.agentType && (
                <span className="text-sm text-blue-600 block mt-1">
                  Customized for {formData.agentType}
                </span>
              )}
            </label>
            <textarea
              value={formData.primaryGoal}
              onChange={(e) => setFormData(prev => ({ ...prev, primaryGoal: e.target.value }))}
              placeholder={formData.agentType === 'consultant' ? "e.g., Help companies improve operational efficiency, Guide strategic planning decisions, Support digital transformation initiatives..." 
                : formData.agentType === 'teacher' ? "e.g., Help students master calculus concepts, Improve writing skills, Prepare for certification exams..."
                : formData.agentType === 'product-manager' ? "e.g., Increase user engagement by 25%, Launch 3 major features per quarter, Improve product-market fit..."
                : "e.g., Help users learn programming concepts, Provide business strategy advice, Assist with creative writing..."}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              {getTaskOptions().label}
              {formData.agentType && (
                <span className="text-sm text-blue-600 block mt-1">
                  {formData.agentType} specific tasks
                </span>
              )}
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {getTaskOptions().options.map((task) => (
                <label key={task} className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.specificTasks.includes(task)}
                    onChange={() => handleTaskToggle(task)}
                  />
                  <span>{task}</span>
                </label>
              ))}
            </div>
          </div>
        </section>

        {/* Communication Style */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900">Communication Style</h2>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              What tone should your agent use?
            </label>
            <div className="space-y-2">
              {[
                { value: 'professional', label: 'Professional' },
                { value: 'friendly', label: 'Friendly' },
                { value: 'casual', label: 'Casual' },
                { value: 'enthusiastic', label: 'Enthusiastic' },
                { value: 'empathetic', label: 'Empathetic' }
              ].map((option) => (
                <label key={option.value} className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
                  <input
                    type="radio"
                    name="tone"
                    value={option.value}
                    checked={formData.tone === option.value}
                    onChange={(e) => setFormData(prev => ({ ...prev, tone: e.target.value }))}
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              How formal should the responses be?
            </label>
            <div className="space-y-2">
              {[
                { value: 'very-formal', label: 'Very Formal' },
                { value: 'formal', label: 'Formal' },
                { value: 'balanced', label: 'Balanced' },
                { value: 'informal', label: 'Informal' },
                { value: 'very-informal', label: 'Very Informal' }
              ].map((option) => (
                <label key={option.value} className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
                  <input
                    type="radio"
                    name="formality"
                    value={option.value}
                    checked={formData.formality === option.value}
                    onChange={(e) => setFormData(prev => ({ ...prev, formality: e.target.value }))}
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Preferred response length?
            </label>
            <div className="space-y-2">
              {[
                { value: 'brief', label: 'Brief (1-2 sentences)' },
                { value: 'concise', label: 'Concise (1 paragraph)' },
                { value: 'detailed', label: 'Detailed (2-3 paragraphs)' },
                { value: 'comprehensive', label: 'Comprehensive (as long as needed)' }
              ].map((option) => (
                <label key={option.value} className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
                  <input
                    type="radio"
                    name="responseLength"
                    value={option.value}
                    checked={formData.responseLength === option.value}
                    onChange={(e) => setFormData(prev => ({ ...prev, responseLength: e.target.value }))}
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          </div>
        </section>

        {/* Expertise Level */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900">Expertise Level & Audience</h2>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              {getTargetAudienceOptions().label}
              {formData.agentType && (
                <span className="text-sm text-blue-600 block mt-1">
                  {formData.agentType} audience targeting
                </span>
              )}
            </label>
            <div className="space-y-2">
              {getTargetAudienceOptions().options.map((option) => (
                <label key={option.value} className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
                  <input
                    type="radio"
                    name="targetAudience"
                    value={option.value}
                    checked={formData.targetAudience === option.value}
                    onChange={(e) => setFormData(prev => ({ ...prev, targetAudience: e.target.value }))}
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              What level of technical depth should your agent provide?
            </label>
            <div className="space-y-2">
              {[
                { value: 'basic', label: 'Basic - Simple explanations' },
                { value: 'intermediate', label: 'Intermediate - Some technical detail' },
                { value: 'advanced', label: 'Advanced - Technical depth with metrics' },
                { value: 'expert', label: 'Expert - Assume professional knowledge' }
              ].map((option) => (
                <label key={option.value} className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
                  <input
                    type="radio"
                    name="technicalDepth"
                    value={option.value}
                    checked={formData.technicalDepth === option.value}
                    onChange={(e) => setFormData(prev => ({ ...prev, technicalDepth: e.target.value }))}
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              How should your agent explain concepts?
            </label>
            <div className="space-y-2">
              {[
                { value: 'step-by-step', label: 'Step-by-step breakdowns' },
                { value: 'analogies', label: 'Using analogies and examples' },
                { value: 'data-driven', label: 'Data-driven with evidence' },
                { value: 'framework-based', label: 'Using established frameworks' },
                { value: 'conversational', label: 'Conversational explanations' }
              ].map((option) => (
                <label key={option.value} className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
                  <input
                    type="radio"
                    name="explanationStyle"
                    value={option.value}
                    checked={formData.explanationStyle === option.value}
                    onChange={(e) => setFormData(prev => ({ ...prev, explanationStyle: e.target.value }))}
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          </div>
        </section>

        {/* Domain Expertise */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900">Domain Expertise & Frameworks</h2>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              What frameworks or methodologies should your agent use? (Select all that apply)
              {(formData.agentType || formData.industry) && (
                <span className="text-sm text-blue-600 block mt-1">
                  {formData.agentType && formData.industry 
                    ? `Showing frameworks for ${formData.agentType} in ${formData.industry}`
                    : formData.agentType 
                      ? `Showing ${formData.agentType} preferred frameworks`
                      : `Showing ${formData.industry} industry frameworks`
                  }
                </span>
              )}
            </label>
            {getFilteredFrameworks().length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {getFilteredFrameworks().map((framework) => (
                  <label key={framework} className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.domainFrameworks.includes(framework)}
                      onChange={() => handleArrayToggle('domainFrameworks', framework)}
                    />
                    <span>{framework}</span>
                  </label>
                ))}
              </div>
            ) : (
              <div className="text-gray-500 italic p-4 bg-gray-50 rounded">
                Please select an agent type and/or industry above to see relevant frameworks and methodologies.
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              {getDepthConcept().question}
              {formData.agentType && (
                <span className="text-sm text-blue-600 block mt-1">
                  {getDepthConcept().concept} for {formData.agentType}
                </span>
              )}
            </label>
            <div className="space-y-2">
              {getDepthConcept().options.map((option) => (
                <label key={option.value} className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
                  <input
                    type="radio"
                    name="analysisDepth"
                    value={option.value}
                    checked={formData.analysisDepth === option.value}
                    onChange={(e) => setFormData(prev => ({ ...prev, analysisDepth: e.target.value }))}
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          </div>
        </section>

        {/* Behavior & Decision Making */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900">Behavior & Decision Making</h2>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              How proactive should your agent be? ({formData.proactiveness}/10)
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={formData.proactiveness}
              onChange={(e) => setFormData(prev => ({ ...prev, proactiveness: parseInt(e.target.value) }))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Reactive only</span>
              <span>Highly proactive</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Should your agent ask clarifying questions?
            </label>
            <div className="space-y-2">
              {[
                { value: true, label: 'Yes - Ask questions to better understand needs' },
                { value: false, label: 'No - Work with information provided' }
              ].map((option) => (
                <label key={String(option.value)} className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
                  <input
                    type="radio"
                    name="askQuestions"
                    checked={formData.askQuestions === option.value}
                    onChange={() => setFormData(prev => ({ ...prev, askQuestions: option.value }))}
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              How should your agent handle uncertainty?
            </label>
            <div className="space-y-2">
              {[
                { value: 'acknowledge', label: 'Acknowledge limitations and provide best estimate' },
                { value: 'research', label: 'Request more information before proceeding' },
                { value: 'scenario', label: 'Provide multiple scenarios or options' },
                { value: 'conservative', label: 'Take conservative approach when uncertain' }
              ].map((option) => (
                <label key={option.value} className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
                  <input
                    type="radio"
                    name="handlesUncertainty"
                    value={option.value}
                    checked={formData.handlesUncertainty === option.value}
                    onChange={(e) => setFormData(prev => ({ ...prev, handlesUncertainty: e.target.value }))}
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          </div>
        </section>

        {/* Output Format & Structure */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900">Output Format & Structure</h2>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              What structure should responses follow?
            </label>
            <div className="space-y-2">
              {[
                { value: 'executive-summary', label: 'Executive Summary + Details' },
                { value: 'structured-report', label: 'Structured Report with Sections' },
                { value: 'bullet-points', label: 'Bullet Points with Key Insights' },
                { value: 'narrative', label: 'Narrative Flow' },
                { value: 'comparison-table', label: 'Comparison Tables/Charts' }
              ].map((option) => (
                <label key={option.value} className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
                  <input
                    type="radio"
                    name="responseStructure"
                    value={option.value}
                    checked={formData.responseStructure === option.value}
                    onChange={(e) => setFormData(prev => ({ ...prev, responseStructure: e.target.value }))}
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              How should your agent make recommendations?
              {(formData.industry || formData.agentType) && (
                <span className="text-sm text-blue-600 block mt-1">
                  {formData.agentType && formData.industry 
                    ? `${formData.agentType} recommendation style with ${formData.industry} context`
                    : formData.agentType 
                      ? `${formData.agentType} recommendation patterns`
                      : `${formData.industry} industry recommendations`
                  }
                </span>
              )}
            </label>
            <div className="space-y-2">
              {getCombinedRecommendationStyles().map((option) => (
                <label key={option.value} className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
                  <input
                    type="radio"
                    name="recommendationStyle"
                    value={option.value}
                    checked={formData.recommendationStyle === option.value}
                    onChange={(e) => setFormData(prev => ({ ...prev, recommendationStyle: e.target.value }))}
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Should responses include examples?
            </label>
            <div className="space-y-2">
              {[
                { value: true, label: 'Yes - Include relevant examples and case studies' },
                { value: false, label: 'No - Focus on direct answers only' }
              ].map((option) => (
                <label key={String(option.value)} className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
                  <input
                    type="radio"
                    name="includeExamples"
                    checked={formData.includeExamples === option.value}
                    onChange={() => setFormData(prev => ({ ...prev, includeExamples: option.value }))}
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          </div>
        </section>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-200"
          >
            Generate My AI Agent Prompt
          </button>
        </div>
      </form>

      {/* Generated Prompt */}
      {generatedPrompt && (
        <div className="mt-8 bg-white rounded-lg shadow-lg p-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-900">Your AI Agent Prompt</h3>
            <button
              onClick={copyToClipboard}
              className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-md transition duration-200"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>
          <pre className="bg-gray-50 p-4 rounded-md overflow-x-auto text-sm whitespace-pre-wrap">
            {generatedPrompt}
          </pre>
          <div className="mt-4 text-sm text-gray-600">
            <p><strong>How to use:</strong> Copy this prompt and paste it into ChatGPT, Claude, You.com, or any AI chat platform to activate your custom agent.</p>
          </div>
        </div>
      )}
    </div>
  )
}