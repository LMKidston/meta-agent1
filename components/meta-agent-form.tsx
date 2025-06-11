'use client'

import { useState } from 'react'
import { FormData } from '@/types/form-data'
import { generatePrompt, AGENT_TYPES, INDUSTRIES } from '@/lib/prompt-templates'
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
  // New Enhanced Fields
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

  const handleArrayToggle = (field: keyof Pick<FormData, 'domainFrameworks' | 'keyMetrics' | 'industryFocus' | 'methodologies'>, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field] as string[]).includes(value)
        ? (prev[field] as string[]).filter(item => item !== value)
        : [...(prev[field] as string[]), value]
    }))
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
                    onChange={(e) => setFormData(prev => ({ ...prev, agentType: e.target.value }))}
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
              onChange={(e) => setFormData(prev => ({ ...prev, industry: e.target.value }))}
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
              What's the primary goal of your agent?
            </label>
            <textarea
              value={formData.primaryGoal}
              onChange={(e) => setFormData(prev => ({ ...prev, primaryGoal: e.target.value }))}
              placeholder="e.g., Help users learn programming concepts, Provide business strategy advice, Assist with creative writing..."
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              What specific tasks should your agent help with? (Select all that apply)
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {[
                'Answer questions',
                'Provide step-by-step guidance',
                'Generate ideas',
                'Review and critique work',
                'Create templates or examples',
                'Explain complex concepts',
                'Troubleshoot problems',
                'Make recommendations'
              ].map((task) => (
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
              Who is your target audience?
            </label>
            <div className="space-y-2">
              {[
                { value: 'beginners', label: 'Beginners - Little to no experience' },
                { value: 'intermediate', label: 'Intermediate - Some experience' },
                { value: 'advanced', label: 'Advanced - Experienced users' },
                { value: 'experts', label: 'Experts - Professional level' },
                { value: 'mixed', label: 'Mixed - Adapt to user level' }
              ].map((option) => (
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
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {[
                'SWOT Analysis',
                'Porter\'s Five Forces',
                'Financial Ratio Analysis',
                'DCF Valuation',
                'Risk Assessment Matrix',
                'Competitor Analysis',
                'Market Research Framework',
                'Decision Trees',
                'Cost-Benefit Analysis',
                'PESTLE Analysis',
                'Balanced Scorecard',
                'Lean Canvas'
              ].map((framework) => (
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
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              How deep should the analysis be?
            </label>
            <div className="space-y-2">
              {[
                { value: 'surface', label: 'Surface-level overview' },
                { value: 'moderate', label: 'Moderate depth with key insights' },
                { value: 'comprehensive', label: 'Comprehensive deep-dive analysis' },
                { value: 'exhaustive', label: 'Exhaustive analysis with all factors' }
              ].map((option) => (
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
            </label>
            <div className="space-y-2">
              {[
                { value: 'clear-directive', label: 'Clear directives (Buy/Sell/Hold)' },
                { value: 'ranked-options', label: 'Ranked options with reasoning' },
                { value: 'pros-cons', label: 'Pros and cons analysis' },
                { value: 'risk-weighted', label: 'Risk-weighted recommendations' },
                { value: 'conditional', label: 'Conditional recommendations based on scenarios' }
              ].map((option) => (
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

        {/* Submit Button */
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