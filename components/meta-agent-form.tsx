/**
 * Meta Agent Form Component
 * 
 * A comprehensive form component for creating custom AI agent prompts.
 * Features dynamic framework filtering, agent-specific questionnaires,
 * and intelligent prompt generation.
 * 
 * @author Lilian Kidston
 * @version 1.0.0
 */

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
      // Failed to copy text - silently handle error
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

  // Get agent-first frameworks (prioritize agent type, add relevant industry context)
  const getFilteredFrameworks = () => {
    const agentTypeFrameworks = formData.agentType 
      ? AGENT_TYPE_FRAMEWORK_PREFERENCES[formData.agentType as keyof typeof AGENT_TYPE_FRAMEWORK_PREFERENCES] || []
      : []

    const industryFrameworks = formData.industry 
      ? INDUSTRY_FRAMEWORKS[formData.industry as keyof typeof INDUSTRY_FRAMEWORKS] || INDUSTRY_FRAMEWORKS.general
      : INDUSTRY_FRAMEWORKS.general

    // Priority 1: Agent type + industry (agent frameworks first, then compatible industry ones)
    if (formData.agentType && formData.industry) {
      // Start with ALL agent-specific frameworks
      const primaryFrameworks = [...agentTypeFrameworks]

      // Find industry frameworks that are compatible with this agent type
      const compatibleIndustryFrameworks = industryFrameworks.filter(framework => {
        // Exclude frameworks that are clearly not relevant to this agent type
        if (isFrameworkExcludedForAgent(framework, formData.agentType)) {
          return false
        }
        
        // Include industry frameworks that align with agent's work style
        const agentKeywords = getAgentCompatibilityKeywords(formData.agentType)
        
        // Score each framework based on keyword matches
        const matches = agentKeywords.filter(keyword => 
          framework.toLowerCase().includes(keyword.toLowerCase())
        ).length
        
        // Require at least 1 keyword match AND not be in exclusion list
        return matches > 0
      })
      .sort((a, b) => {
        // Sort by number of keyword matches (more matches = higher priority)
        const agentKeywords = getAgentCompatibilityKeywords(formData.agentType)
        const aMatches = agentKeywords.filter(keyword => 
          a.toLowerCase().includes(keyword.toLowerCase())
        ).length
        const bMatches = agentKeywords.filter(keyword => 
          b.toLowerCase().includes(keyword.toLowerCase())
        ).length
        return bMatches - aMatches
      })
      .slice(0, 4) // Limit to 4 most compatible industry frameworks

      // Combine: agent frameworks first, then compatible industry ones
      const combined = [...primaryFrameworks, ...compatibleIndustryFrameworks]
      return Array.from(new Set(combined)).slice(0, 12)
    }

    // Priority 2: Agent type only
    if (formData.agentType && !formData.industry) {
      return agentTypeFrameworks
    }

    // Priority 3: Industry only (no agent type selected)
    if (!formData.agentType && formData.industry) {
      return industryFrameworks
    }

    // Default: General frameworks
    return INDUSTRY_FRAMEWORKS.general
  }

  // Get whitelisted industry frameworks for specific agent+industry combinations
  const getWhitelistedIndustryFrameworks = (agentType: string, industry: string): string[] => {
    const whitelist: Record<string, Record<string, string[]>> = {
      'hr-specialist': {
        'cybersecurity': [],  // HR consumes security training, doesn't create security frameworks
        'finance': [],  // HR handles employment compliance, not financial regulations
        'healthcare': ['Employee Relations'],  // Only people-related healthcare frameworks
        'technology': [],  // HR uses project management but doesn't implement technical frameworks
        'manufacturing': ['Safety Management System'],  // Workplace safety is HR domain
        'legal': ['Compliance Framework', 'Ethical Guidelines Framework'],
        'retail': ['Performance Metrics'],  // Employee performance, not customer metrics
        'consulting': ['Performance Measurement', 'Change Management'],
        'education': ['Assessment and Evaluation'],  // Employee assessment, not student assessment
        'marketing': []  // HR doesn't implement marketing frameworks
      },
      'sales-rep': {
        'cybersecurity': [],  // Sales reps receive security training, don't implement it
        'finance': ['Customer Segmentation'],  // Financial customer segmentation
        'healthcare': ['Customer Experience Framework'],  // Healthcare customer experience
        'technology': ['Customer Journey Mapping'],  // Tech customer journeys
        'manufacturing': ['Customer Experience Framework'],  // Manufacturing customer experience
        'legal': ['Client Interview Techniques'],  // Legal client techniques applicable to sales
        'retail': ['Customer Experience Framework', 'Customer Segmentation'],  // Core retail sales
        'consulting': ['Client Engagement Framework'],  // Consulting client engagement
        'education': [],  // Sales reps don't implement educational frameworks
        'marketing': ['Customer Journey Mapping', 'Customer Segmentation']  // Sales-marketing alignment
      },
      'teacher': {
        'cybersecurity': [],  // Teachers receive security training, don't create security curricula
        'finance': [],  // Financial education would use education frameworks, not finance frameworks
        'healthcare': [],  // Health education would use education frameworks, not clinical frameworks
        'technology': [],  // Computer science education would use education frameworks, not dev frameworks
        'manufacturing': [],  // Industrial education would use education frameworks, not manufacturing frameworks
        'legal': [],  // Legal education would use education frameworks, not legal practice frameworks
        'retail': [],  // Retail education would use education frameworks, not retail operation frameworks
        'consulting': [],  // Business education would use education frameworks, not consulting frameworks
        'education': ['Assessment and Evaluation'],  // Core educational assessment
        'marketing': []  // Marketing education would use education frameworks, not marketing frameworks
      },
      'coach': {
        'cybersecurity': [],  // Coaches help with personal performance, not security implementation
        'finance': [],  // Financial coaching uses coaching frameworks, not finance frameworks
        'healthcare': [],  // Health coaching uses coaching frameworks, not clinical frameworks  
        'technology': [],  // Tech coaching uses coaching frameworks, not development frameworks
        'manufacturing': [],  // Manufacturing coaching uses coaching frameworks, not production frameworks
        'legal': [],  // Legal coaching uses coaching frameworks, not legal practice frameworks
        'retail': [],  // Retail coaching uses coaching frameworks, not retail operation frameworks
        'consulting': [],  // Business coaching uses coaching frameworks, not consulting frameworks
        'education': [],  // Educational coaching uses coaching frameworks, not educational frameworks
        'marketing': []  // Marketing coaching uses coaching frameworks, not marketing frameworks
      },
      'consultant': {
        'cybersecurity': ['Risk Assessment Matrix (Cyber)'],  // Business risk assessment, not technical implementation
        'finance': ['SWOT Analysis', 'Risk Assessment', 'Strategic Planning'],  // Business strategy frameworks
        'healthcare': ['Strategic Planning', 'Quality Improvement (PDSA)'],  // Business improvement, not clinical
        'technology': ['Strategic Planning'],  // Tech strategy, not development frameworks
        'manufacturing': ['Strategic Planning', 'Process Improvement'],  // Business process, not production
        'legal': ['Strategic Planning', 'Risk Assessment (Legal)', 'Stakeholder Analysis'],  // Business legal strategy
        'retail': ['Strategic Planning', 'Market Analysis'],  // Business strategy frameworks
        'consulting': ['Strategic Planning', 'Stakeholder Analysis', 'Change Management'],  // Core consulting
        'education': ['Strategic Planning', 'Change Management'],  // Educational strategy, not teaching
        'marketing': ['Strategic Planning', 'Market Research Framework']  // Marketing strategy frameworks
      },
      'developer': {
        'cybersecurity': ['NIST Cybersecurity Framework', 'OWASP Top 10', 'Security Controls Framework', 'Threat Modeling'],
        'finance': ['API Design Patterns', 'System Architecture Design', 'Security Framework (OWASP)', 'Performance Optimization'],
        'healthcare': ['System Architecture Design', 'API Design Patterns', 'Security Framework (OWASP)', 'Regulatory Compliance Framework'],
        'technology': ['Agile Framework', 'DevOps Methodology', 'API Design Patterns', 'System Architecture Design'],
        'manufacturing': ['System Architecture Design', 'API Design Patterns', 'Performance Optimization', 'Quality Assurance'],
        'legal': ['API Design Patterns', 'System Architecture Design', 'Security Framework (OWASP)', 'Compliance Framework'],
        'retail': ['API Design Patterns', 'System Architecture Design', 'Performance Optimization', 'Customer Experience Framework'],
        'consulting': ['System Architecture Design', 'API Design Patterns', 'Performance Optimization', 'Project Management'],
        'education': ['System Architecture Design', 'API Design Patterns', 'Performance Optimization', 'Agile Framework'],
        'marketing': ['API Design Patterns', 'System Architecture Design', 'Performance Optimization', 'Customer Journey Mapping']
      },
      'analyst': {
        'cybersecurity': ['Risk Assessment Matrix (Cyber)', 'Cyber Threat Intelligence', 'Compliance Frameworks (SOC 2, ISO 27001)', 'Security Controls Framework'],
        'finance': ['Financial Ratio Analysis', 'SWOT Analysis', 'Risk Assessment', 'Technical Analysis'],
        'healthcare': ['Healthcare Analytics', 'Performance Measurement', 'Risk Assessment', 'Quality Improvement (PDSA)'],
        'technology': ['Performance Optimization', 'System Architecture Design', 'Agile Framework', 'Technical Analysis'],
        'manufacturing': ['Statistical Process Control', 'Performance Measurement', 'Quality Assurance', 'Root Cause Analysis'],
        'legal': ['Risk Assessment (Legal)', 'Regulatory Analysis', 'Case Law Analysis', 'Performance Measurement'],
        'retail': ['Market Basket Analysis', 'Customer Segmentation', 'Performance Metrics', 'Retail Analytics'],
        'consulting': ['SWOT Analysis', 'Performance Measurement', 'Data-Driven Decision Making', 'Stakeholder Analysis'],
        'education': ['Learning Analytics', 'Assessment and Evaluation', 'Performance Measurement', 'Student Engagement Strategies'],
        'marketing': ['Customer Journey Mapping', 'A/B Testing Methodology', 'Attribution Modeling', 'Market Research Framework']
      },
      'creator': {
        'cybersecurity': [],  // Creators make content about security, don't implement security training
        'finance': ['Brand Development Process'],  // Financial brand/content creation
        'healthcare': ['Content Strategy Framework', 'Brand Development Process'],  // Healthcare content/branding
        'technology': ['User Experience (UX) Design', 'Design Thinking'],  // Tech design frameworks
        'manufacturing': ['Design Thinking', 'Brand Development Process'],  // Manufacturing design/branding
        'legal': ['Content Strategy Framework', 'Brand Development Process'],  // Legal content/branding
        'retail': ['Brand Development Process', 'Customer Experience Framework'],  // Retail brand/experience design
        'consulting': ['Content Strategy Framework', 'Brand Development Process'],  // Consulting content/branding
        'education': ['Content Strategy Framework', 'Instructional Design (ADDIE)'],  // Educational content design
        'marketing': ['Brand Development Process', 'Content Strategy Framework', 'Creative Brief Framework']  // Core creative marketing
      },
      'researcher': {
        'cybersecurity': ['Risk Assessment Matrix (Cyber)', 'Cyber Threat Intelligence', 'Compliance Frameworks (SOC 2, ISO 27001)'],
        'finance': ['Financial Ratio Analysis', 'Market Research Framework', 'Risk Assessment'],
        'healthcare': ['Evidence-Based Medicine', 'Health Technology Assessment', 'Healthcare Analytics'],
        'technology': ['System Architecture Design', 'Performance Optimization', 'Agile Framework'],
        'manufacturing': ['Root Cause Analysis', 'Performance Measurement', 'Quality Assurance'],
        'legal': ['Legal Research Methodology', 'Case Law Analysis', 'Regulatory Analysis'],
        'retail': ['Market Research Framework', 'Customer Segmentation', 'Market Analysis'],
        'consulting': ['Market Research Framework', 'Data-Driven Decision Making', 'Performance Measurement'],
        'education': ['Learning Analytics', 'Assessment and Evaluation', 'Educational Technology Integration'],
        'marketing': ['Market Research Framework', 'Customer Journey Mapping', 'A/B Testing Methodology']
      },
      'assistant': {
        'cybersecurity': ['Security Awareness Training', 'Compliance Frameworks (SOC 2, ISO 27001)', 'Process Mapping'],
        'finance': ['Process Mapping', 'Performance Measurement', 'Risk Assessment'],
        'healthcare': ['Process Mapping', 'Regulatory Compliance Framework', 'Quality Assurance'],
        'technology': ['Agile Framework', 'Process Mapping', 'Project Management'],
        'manufacturing': ['Process Mapping', 'Quality Assurance', 'Safety Management System'],
        'legal': ['Process Mapping', 'Compliance Framework', 'Document Management'],
        'retail': ['Process Mapping', 'Customer Experience Framework', 'Inventory Management'],
        'consulting': ['Process Mapping', 'Project Management', 'Stakeholder Analysis'],
        'education': ['Process Mapping', 'Assessment and Evaluation', 'Administrative Systems'],
        'marketing': ['Process Mapping', 'Customer Journey Mapping', 'Campaign Management']
      },
      'product-manager': {
        'cybersecurity': ['Risk Assessment Matrix (Cyber)', 'Agile Framework', 'Customer Journey Mapping'],
        'finance': ['Agile Framework', 'Customer Journey Mapping', 'Market Research Framework'],
        'healthcare': ['Agile Framework', 'Customer Journey Mapping', 'Regulatory Compliance Framework'],
        'technology': ['Agile Framework', 'User Experience (UX) Design', 'Customer Journey Mapping'],
        'manufacturing': ['Agile Framework', 'Customer Journey Mapping', 'Quality Assurance'],
        'legal': ['Agile Framework', 'Customer Journey Mapping', 'Compliance Framework'],
        'retail': ['Customer Journey Mapping', 'Merchandising Strategy', 'Customer Experience Framework'],
        'consulting': ['Agile Framework', 'Customer Journey Mapping', 'Strategic Planning'],
        'education': ['Agile Framework', 'Customer Journey Mapping', 'Learning Objectives Framework'],
        'marketing': ['Customer Journey Mapping', 'Market Research Framework', 'A/B Testing Methodology']
      },
      'ux-designer': {
        'cybersecurity': ['User Experience (UX) Design', 'Customer Journey Mapping', 'Design Thinking'],
        'finance': ['User Experience (UX) Design', 'Customer Journey Mapping', 'Design Thinking'],
        'healthcare': ['User Experience (UX) Design', 'Customer Journey Mapping', 'Patient Safety Framework'],
        'technology': ['User Experience (UX) Design', 'Design Thinking', 'Agile Framework'],
        'manufacturing': ['User Experience (UX) Design', 'Design Thinking', 'Customer Experience Framework'],
        'legal': ['User Experience (UX) Design', 'Customer Journey Mapping', 'Design Thinking'],
        'retail': ['User Experience (UX) Design', 'Customer Journey Mapping', 'Customer Experience Framework'],
        'consulting': ['User Experience (UX) Design', 'Customer Journey Mapping', 'Design Thinking'],
        'education': ['User Experience (UX) Design', 'Learning Objectives Framework', 'Student Engagement Strategies'],
        'marketing': ['User Experience (UX) Design', 'Customer Journey Mapping', 'Brand Development Process']
      },
      'project-manager': {
        'cybersecurity': ['Project Management (PMI)', 'Risk Assessment Matrix (Cyber)', 'Compliance Frameworks (SOC 2, ISO 27001)'],
        'finance': ['Project Management (PMI)', 'Risk Assessment', 'Strategic Planning'],
        'healthcare': ['Project Management (PMI)', 'Quality Improvement (PDSA)', 'Regulatory Compliance Framework'],
        'technology': ['Agile Framework', 'DevOps Methodology', 'Project Management (PMI)'],
        'manufacturing': ['Project Management (PMI)', 'Quality Assurance', 'Process Improvement'],
        'legal': ['Project Management (PMI)', 'Compliance Framework', 'Risk Assessment (Legal)'],
        'retail': ['Project Management (PMI)', 'Customer Experience Framework', 'Inventory Management'],
        'consulting': ['Project Management (PMI)', 'Change Management', 'Stakeholder Analysis'],
        'education': ['Project Management (PMI)', 'Educational Technology Integration', 'Assessment and Evaluation'],
        'marketing': ['Project Management (PMI)', 'Customer Journey Mapping', 'Campaign Strategy']
      },
      'customer-success': {
        'cybersecurity': ['Customer Journey Mapping', 'Security Awareness Training', 'Performance Measurement'],
        'finance': ['Customer Journey Mapping', 'Performance Measurement', 'Risk Assessment'],
        'healthcare': ['Customer Journey Mapping', 'Customer Experience Framework', 'Quality Improvement (PDSA)'],
        'technology': ['Customer Journey Mapping', 'Agile Framework', 'User Experience (UX) Design'],
        'manufacturing': ['Customer Journey Mapping', 'Customer Experience Framework', 'Quality Assurance'],
        'legal': ['Customer Journey Mapping', 'Client Interview Techniques', 'Performance Measurement'],
        'retail': ['Customer Journey Mapping', 'Customer Experience Framework', 'Customer Segmentation'],
        'consulting': ['Customer Journey Mapping', 'Client Engagement Framework', 'Performance Measurement'],
        'education': ['Customer Journey Mapping', 'Student Engagement Strategies', 'Assessment and Evaluation'],
        'marketing': ['Customer Journey Mapping', 'Customer Segmentation', 'Customer Lifetime Value (CLV)']
      },
      'investment-advisor': {
        'cybersecurity': ['Risk Assessment Matrix (Cyber)', 'Compliance Frameworks (SOC 2, ISO 27001)', 'Performance Measurement'],
        'finance': ['Financial Ratio Analysis', 'DCF Valuation', 'Risk Assessment', 'Technical Analysis'],
        'healthcare': ['Risk Assessment', 'Performance Measurement', 'Regulatory Compliance Framework'],
        'technology': ['Risk Assessment', 'Performance Measurement', 'Market Analysis'],
        'manufacturing': ['Risk Assessment', 'Performance Measurement', 'Market Analysis'],
        'legal': ['Risk Assessment (Legal)', 'Compliance Framework', 'Performance Measurement'],
        'retail': ['Market Analysis', 'Performance Measurement', 'Risk Assessment'],
        'consulting': ['Risk Assessment', 'Performance Measurement', 'Strategic Planning'],
        'education': ['Risk Assessment', 'Performance Measurement', 'Market Analysis'],
        'marketing': ['Market Analysis', 'Performance Measurement', 'Customer Segmentation']
      },
      'therapist': {
        'cybersecurity': [],  // Therapists receive security training, don't implement security frameworks
        'finance': [],  // Therapists don't implement financial frameworks
        'healthcare': ['Clinical Practice Guidelines', 'Evidence-Based Medicine', 'Patient Safety Framework'],  // Core clinical frameworks
        'technology': [],  // Therapists don't implement tech frameworks
        'manufacturing': [],  // Therapists don't implement manufacturing frameworks
        'legal': ['Ethical Guidelines Framework'],  // Clinical ethics are relevant
        'retail': [],  // Therapists don't implement retail frameworks
        'consulting': [],  // Therapists don't implement consulting frameworks
        'education': [],  // Therapists don't implement educational frameworks (that's educational therapy)
        'marketing': []  // Therapists don't implement marketing frameworks
      },
      'compliance-officer': {
        'cybersecurity': ['NIST Cybersecurity Framework', 'Compliance Frameworks (SOC 2, ISO 27001)', 'Risk Assessment Matrix (Cyber)'],
        'finance': ['Regulatory Compliance Framework', 'Risk Assessment', 'Compliance Framework'],
        'healthcare': ['Regulatory Compliance Framework', 'Clinical Practice Guidelines', 'Patient Safety Framework'],
        'technology': ['Compliance Framework', 'Security Framework (OWASP)', 'Risk Assessment'],
        'manufacturing': ['Safety Management System', 'Regulatory Compliance Framework', 'Quality Assurance'],
        'legal': ['Compliance Framework', 'Regulatory Analysis', 'Legal Research Methodology'],
        'retail': ['Regulatory Compliance Framework', 'Customer Experience Framework', 'Risk Assessment'],
        'consulting': ['Compliance Framework', 'Risk Assessment', 'Regulatory Analysis'],
        'education': ['Regulatory Compliance Framework', 'Assessment and Evaluation', 'Compliance Framework'],
        'marketing': ['Regulatory Compliance Framework', 'Customer Segmentation', 'Risk Assessment']
      },
      'qa-specialist': {
        'cybersecurity': ['Security Controls Framework', 'Compliance Frameworks (SOC 2, ISO 27001)', 'Risk Assessment Matrix (Cyber)'],
        'finance': ['Quality Assurance', 'Risk Assessment', 'Regulatory Compliance Framework'],
        'healthcare': ['Quality Improvement (PDSA)', 'Patient Safety Framework', 'Clinical Practice Guidelines'],
        'technology': ['Testing Pyramid', 'Quality Assurance', 'Agile Framework'],
        'manufacturing': ['Total Quality Management (TQM)', 'Statistical Process Control', 'Six Sigma'],
        'legal': ['Quality Assurance', 'Compliance Framework', 'Legal Research Methodology'],
        'retail': ['Quality Assurance', 'Customer Experience Framework', 'Performance Metrics'],
        'consulting': ['Quality Assurance', 'Performance Measurement', 'Best Practices Framework'],
        'education': ['Assessment and Evaluation', 'Quality Assurance', 'Learning Objectives Framework'],
        'marketing': ['Quality Assurance', 'A/B Testing Methodology', 'Performance Metrics']
      },
      'technical-writer': {
        'cybersecurity': ['Security Awareness Training', 'Compliance Frameworks (SOC 2, ISO 27001)', 'Documentation Framework'],
        'finance': ['Documentation Framework', 'Regulatory Compliance Framework', 'Process Mapping'],
        'healthcare': ['Clinical Practice Guidelines', 'Regulatory Compliance Framework', 'Documentation Framework'],
        'technology': ['API Design Patterns', 'System Architecture Design', 'Agile Framework'],
        'manufacturing': ['Documentation Framework', 'Safety Management System', 'Process Mapping'],
        'legal': ['Legal Research Methodology', 'Documentation Framework', 'Compliance Framework'],
        'retail': ['Documentation Framework', 'Process Mapping', 'Customer Experience Framework'],
        'consulting': ['Documentation Framework', 'Best Practices Framework', 'Process Mapping'],
        'education': ['Instructional Design (ADDIE)', 'Learning Objectives Framework', 'Documentation Framework'],
        'marketing': ['Content Strategy Framework', 'Documentation Framework', 'Brand Development Process']
      },
      'innovation-catalyst': {
        'cybersecurity': ['Innovation Framework', 'Risk Assessment Matrix (Cyber)', 'Technology Assessment'],
        'finance': ['Innovation Framework', 'Market Research Framework', 'Technology Assessment'],
        'healthcare': ['Innovation Framework', 'Health Technology Assessment', 'Technology Assessment'],
        'technology': ['Innovation Framework', 'Agile Framework', 'Design Thinking'],
        'manufacturing': ['Innovation Framework', 'Lean Manufacturing', 'Technology Assessment'],
        'legal': ['Innovation Framework', 'Technology Assessment', 'Strategic Planning'],
        'retail': ['Innovation Framework', 'Customer Experience Framework', 'Technology Assessment'],
        'consulting': ['Innovation Framework', 'Strategic Planning', 'Technology Assessment'],
        'education': ['Innovation Framework', 'Educational Technology Integration', 'Technology Assessment'],
        'marketing': ['Innovation Framework', 'Market Research Framework', 'Brand Development Process']
      }
    }

    return whitelist[agentType]?.[industry] || []
  }

  // Check if a framework should be excluded for a specific agent type
  const isFrameworkExcludedForAgent = (framework: string, agentType: string): boolean => {
    // Always allow frameworks from the agent's own specialty
    const agentFrameworks = AGENT_TYPE_FRAMEWORK_PREFERENCES[agentType as keyof typeof AGENT_TYPE_FRAMEWORK_PREFERENCES] || []
    if (agentFrameworks.includes(framework)) {
      return false
    }

    // For industry frameworks, check against whitelist
    if (formData.industry) {
      const allowedIndustryFrameworks = getWhitelistedIndustryFrameworks(agentType, formData.industry)
      const allIndustryFrameworks = INDUSTRY_FRAMEWORKS[formData.industry as keyof typeof INDUSTRY_FRAMEWORKS] || []
      
      // If this framework is from the selected industry, only allow it if it's whitelisted
      if (allIndustryFrameworks.includes(framework)) {
        return !allowedIndustryFrameworks.includes(framework)
      }
    }

    // Default: don't exclude frameworks not covered by the above logic
    return false
  }

  // Get keywords that help match industry frameworks to agent types
  const getAgentCompatibilityKeywords = (agentType: string): string[] => {
    const keywordMap: Record<string, string[]> = {
      'consultant': ['Strategy', 'Analysis', 'Planning', 'Management', 'Assessment', 'Framework', 'Business', 'Process'],
      'teacher': ['Learning', 'Assessment', 'Development', 'Instruction', 'Education', 'Framework', 'Guidelines', 'Training'],
      'assistant': ['Management', 'Process', 'Organization', 'Planning', 'Framework', 'Workflow', 'Coordination', 'Administration'],
      'analyst': ['Analysis', 'Data', 'Statistical', 'Performance', 'Metrics', 'Assessment', 'Analytics', 'Evaluation'],
      'creator': ['Design', 'Creative', 'Content', 'Brand', 'Framework', 'Strategy', 'Development', 'Experience'],
      'developer': ['Technical', 'Development', 'Design', 'Architecture', 'Framework', 'System', 'Integration', 'Security'],
      'researcher': ['Research', 'Analysis', 'Data', 'Study', 'Framework', 'Assessment', 'Evidence', 'Methodology'],
      'coach': ['Performance', 'Development', 'Goals', 'Skills', 'Framework', 'Assessment', 'Training', 'Support'],
      'product-manager': ['Product', 'Strategy', 'Planning', 'Management', 'Framework', 'Analysis', 'Roadmap', 'User'],
      'ux-designer': ['Design', 'User', 'Experience', 'Research', 'Framework', 'Analysis', 'Customer', 'Interface'],
      'project-manager': ['Project', 'Management', 'Planning', 'Framework', 'Process', 'Risk', 'Resource', 'Timeline'],
      'sales-rep': ['Customer', 'Sales', 'Management', 'Analysis', 'Framework', 'Process', 'Relationship', 'Engagement'],
      'hr-specialist': ['Performance', 'Management', 'Development', 'Framework', 'Assessment', 'Planning', 'Employee', 'Talent'],
      'customer-success': ['Customer', 'Management', 'Framework', 'Analysis', 'Process', 'Success', 'Relationship', 'Engagement'],
      'investment-advisor': ['Analysis', 'Assessment', 'Strategy', 'Planning', 'Framework', 'Management', 'Performance', 'Risk'],
      'therapist': ['Assessment', 'Framework', 'Planning', 'Development', 'Analysis', 'Guidelines', 'Treatment', 'Support'],
      'compliance-officer': ['Compliance', 'Framework', 'Assessment', 'Management', 'Analysis', 'Process', 'Regulatory', 'Risk'],
      'qa-specialist': ['Quality', 'Testing', 'Framework', 'Process', 'Assessment', 'Management', 'Standards', 'Control'],
      'technical-writer': ['Documentation', 'Framework', 'Process', 'Design', 'Analysis', 'Guidelines', 'Information', 'Content'],
      'innovation-catalyst': ['Innovation', 'Framework', 'Development', 'Analysis', 'Strategy', 'Design', 'Creative', 'Technology']
    }
    return keywordMap[agentType] || ['Framework', 'Analysis', 'Management', 'Process']
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
        { value: 'mixed', label: 'Mixed - Adapt to user level' },
        { value: 'beginners', label: 'Beginners - Little to no experience' },
        { value: 'intermediate', label: 'Intermediate - Some experience' },
        { value: 'advanced', label: 'Advanced - Experienced users' },
        { value: 'experts', label: 'Experts - Professional level' }
      ]
    }
  }

  return (
    <div className="max-w-5xl mx-auto">
      <form onSubmit={handleSubmit} className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 md:p-12 space-y-10">
        {/* Agent Purpose & Domain */}
        <section className="space-y-8">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">1</span>
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">Agent Purpose & Domain</h2>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-4">
              What type of agent do you want to create?
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {AGENT_TYPES.map((type) => (
                <label key={type.value} className="group flex items-start space-x-3 p-4 border border-slate-200 rounded-xl hover:border-blue-300 hover:bg-blue-50/50 cursor-pointer transition-all duration-200 hover:shadow-sm">
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
                    className="mt-1 w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500 focus:ring-2"
                  />
                  <div>
                    <div className="font-semibold text-slate-800 group-hover:text-blue-900 transition-colors">{type.label}</div>
                    <div className="text-sm text-slate-500 mt-1">{type.description}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-4">
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
              className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/80 backdrop-blur-sm transition-all duration-200 hover:border-blue-300"
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
              className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/80 backdrop-blur-sm transition-all duration-200 hover:border-blue-300 resize-none"
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
        <section className="space-y-8">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">2</span>
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">Communication Style</h2>
          </div>
          
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
        <section className="space-y-8">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-violet-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">3</span>
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">Expertise Level & Audience</h2>
          </div>
          
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
                { value: 'adaptive', label: 'Adaptive - Match user\'s level' },
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
        <section className="space-y-8">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">4</span>
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">Domain Expertise & Frameworks</h2>
          </div>
          
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
        <section className="space-y-8">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">5</span>
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">Behavior & Decision Making</h2>
          </div>
          
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
        <section className="space-y-8">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">6</span>
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">Output Format & Structure</h2>
          </div>
          
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
        <div className="flex justify-center pt-8">
          <button
            type="submit"
            className="group relative bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 px-10 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300/50"
          >
            <span className="relative z-10 flex items-center space-x-2">
              <span>Generate My AI Agent Prompt</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
          </button>
        </div>
      </form>

      {/* Generated Prompt */}
      {generatedPrompt && (
        <div className="mt-12 bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 md:p-12 animate-in slide-in-from-bottom duration-500">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">Your AI Agent Prompt</h3>
            </div>
            <button
              onClick={copyToClipboard}
              className="group flex items-center space-x-2 bg-gradient-to-r from-slate-100 to-slate-200 hover:from-slate-200 hover:to-slate-300 px-6 py-3 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="font-medium text-green-700">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-600 group-hover:text-slate-700" />
                  <span className="font-medium text-slate-600 group-hover:text-slate-700">Copy Prompt</span>
                </>
              )}
            </button>
          </div>
          <div className="bg-slate-50/50 backdrop-blur-sm rounded-2xl border border-slate-200/50 overflow-hidden">
            <pre className="p-6 overflow-x-auto text-sm text-slate-700 whitespace-pre-wrap leading-relaxed font-mono">
              {generatedPrompt}
            </pre>
          </div>
          <div className="mt-6 p-4 bg-blue-50/50 rounded-xl border border-blue-200/50">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-blue-900 mb-1">How to Use Your Agent</p>
                <p className="text-sm text-blue-700">Copy this prompt and paste it into ChatGPT, Claude, You.com, or any AI platform to activate your custom agent with all the specified configurations.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}