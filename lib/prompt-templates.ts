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

// Industry-specific frameworks and methodologies
export const INDUSTRY_FRAMEWORKS = {
  finance: [
    'SWOT Analysis',
    'Porter\'s Five Forces',
    'Financial Ratio Analysis',
    'DCF Valuation',
    'Risk Assessment Matrix',
    'Competitor Analysis',
    'Technical Analysis',
    'Fundamental Analysis',
    'Monte Carlo Simulation',
    'Black-Scholes Model',
    'Capital Asset Pricing Model (CAPM)',
    'Economic Value Added (EVA)'
  ],
  healthcare: [
    'Clinical Decision Support',
    'Evidence-Based Medicine',
    'Health Technology Assessment',
    'Clinical Practice Guidelines',
    'Risk Stratification',
    'Care Pathway Analysis',
    'Health Economics Evaluation',
    'Patient Safety Framework',
    'Quality Improvement (PDSA)',
    'Population Health Management',
    'Healthcare Analytics',
    'Regulatory Compliance Framework'
  ],
  technology: [
    'Agile Framework',
    'DevOps Methodology',
    'System Architecture Design',
    'API Design Patterns',
    'Security Framework (OWASP)',
    'Performance Optimization',
    'Scalability Analysis',
    'Technical Debt Assessment',
    'Code Review Process',
    'Testing Pyramid',
    'Continuous Integration/Deployment',
    'Cloud Architecture Patterns'
  ],
  marketing: [
    'Customer Journey Mapping',
    'Marketing Mix (4Ps/7Ps)',
    'Brand Positioning Framework',
    'Customer Segmentation',
    'A/B Testing Methodology',
    'Attribution Modeling',
    'Conversion Funnel Analysis',
    'Customer Lifetime Value (CLV)',
    'Market Research Framework',
    'Content Strategy Framework',
    'Social Media Analytics',
    'ROI/ROAS Analysis'
  ],
  education: [
    'Bloom\'s Taxonomy',
    'Learning Objectives Framework',
    'Instructional Design (ADDIE)',
    'Assessment and Evaluation',
    'Curriculum Development',
    'Differentiated Instruction',
    'Educational Technology Integration',
    'Student Engagement Strategies',
    'Learning Analytics',
    'Competency-Based Education',
    'Universal Design for Learning (UDL)',
    'Peer Assessment Framework'
  ],
  legal: [
    'Legal Research Methodology',
    'Case Law Analysis',
    'Statutory Interpretation',
    'Contract Analysis Framework',
    'Due Diligence Process',
    'Risk Assessment (Legal)',
    'Compliance Framework',
    'Litigation Strategy',
    'Legal Writing Standards',
    'Client Interview Techniques',
    'Ethical Guidelines Framework',
    'Regulatory Analysis'
  ],
  retail: [
    'Customer Experience Framework',
    'Inventory Management',
    'Merchandising Strategy',
    'Price Optimization',
    'Supply Chain Analysis',
    'Market Basket Analysis',
    'Category Management',
    'Store Layout Optimization',
    'Seasonal Planning',
    'Customer Segmentation',
    'Omnichannel Strategy',
    'Retail Analytics'
  ],
  manufacturing: [
    'Lean Manufacturing',
    'Six Sigma',
    'Total Quality Management (TQM)',
    'Supply Chain Optimization',
    'Production Planning',
    'Just-in-Time (JIT)',
    'Statistical Process Control',
    'Value Stream Mapping',
    'Root Cause Analysis',
    'OEE (Overall Equipment Effectiveness)',
    'Kaizen Framework',
    'Safety Management System'
  ],
  consulting: [
    'Problem-Solving Framework',
    'Stakeholder Analysis',
    'Change Management',
    'Process Improvement',
    'Business Case Development',
    'Project Management (PMI)',
    'Strategic Planning',
    'Organizational Assessment',
    'Data-Driven Decision Making',
    'Client Engagement Framework',
    'Implementation Planning',
    'Performance Measurement'
  ],
  creative: [
    'Design Thinking',
    'Creative Brief Framework',
    'Brand Development Process',
    'User Experience (UX) Design',
    'Creative Project Management',
    'Concept Development',
    'Visual Hierarchy Principles',
    'Content Creation Framework',
    'Creative Review Process',
    'Portfolio Development',
    'Client Presentation Framework',
    'Creative Strategy Development'
  ],
  general: [
    'SWOT Analysis',
    'Problem-Solving Framework',
    'Decision Matrix',
    'Root Cause Analysis',
    'Stakeholder Analysis',
    'Risk Assessment',
    'Process Mapping',
    'Best Practices Framework',
    'Quality Assurance',
    'Performance Metrics',
    'Strategic Planning',
    'Project Management'
  ]
}

// Industry-specific recommendation styles
export const INDUSTRY_RECOMMENDATION_STYLES = {
  finance: [
    { value: 'buy-sell-hold', label: 'Buy/Sell/Hold recommendations' },
    { value: 'risk-weighted', label: 'Risk-weighted portfolio allocation' },
    { value: 'target-price', label: 'Target price with upside/downside' },
    { value: 'rating-scale', label: 'Rating scale (Strong Buy to Strong Sell)' },
    { value: 'scenario-based', label: 'Scenario-based projections' }
  ],
  healthcare: [
    { value: 'clinical-guidelines', label: 'Evidence-based clinical recommendations' },
    { value: 'treatment-pathways', label: 'Treatment pathway options' },
    { value: 'risk-benefit', label: 'Risk-benefit analysis' },
    { value: 'quality-metrics', label: 'Quality improvement recommendations' },
    { value: 'safety-protocols', label: 'Safety and compliance guidelines' }
  ],
  technology: [
    { value: 'implementation-roadmap', label: 'Technical implementation roadmap' },
    { value: 'architecture-options', label: 'Architecture and design options' },
    { value: 'best-practices', label: 'Industry best practices' },
    { value: 'performance-optimization', label: 'Performance optimization steps' },
    { value: 'security-recommendations', label: 'Security and compliance recommendations' }
  ],
  marketing: [
    { value: 'campaign-strategy', label: 'Campaign strategy recommendations' },
    { value: 'channel-optimization', label: 'Channel mix optimization' },
    { value: 'budget-allocation', label: 'Budget allocation suggestions' },
    { value: 'ab-testing', label: 'A/B testing recommendations' },
    { value: 'performance-kpis', label: 'KPI-driven performance recommendations' }
  ],
  education: [
    { value: 'learning-objectives', label: 'Learning objective-based recommendations' },
    { value: 'instructional-strategies', label: 'Instructional strategy options' },
    { value: 'assessment-methods', label: 'Assessment and evaluation methods' },
    { value: 'differentiated-approach', label: 'Differentiated learning approaches' },
    { value: 'improvement-plan', label: 'Student improvement action plans' }
  ],
  legal: [
    { value: 'legal-strategy', label: 'Legal strategy recommendations' },
    { value: 'compliance-guidance', label: 'Compliance and regulatory guidance' },
    { value: 'risk-mitigation', label: 'Legal risk mitigation steps' },
    { value: 'precedent-analysis', label: 'Precedent-based recommendations' },
    { value: 'negotiation-strategy', label: 'Negotiation strategy options' }
  ],
  retail: [
    { value: 'inventory-optimization', label: 'Inventory optimization recommendations' },
    { value: 'pricing-strategy', label: 'Pricing and promotion strategies' },
    { value: 'customer-experience', label: 'Customer experience improvements' },
    { value: 'merchandising-plan', label: 'Merchandising and layout recommendations' },
    { value: 'seasonal-strategy', label: 'Seasonal planning strategies' }
  ],
  manufacturing: [
    { value: 'process-improvement', label: 'Process improvement recommendations' },
    { value: 'quality-enhancement', label: 'Quality enhancement strategies' },
    { value: 'efficiency-optimization', label: 'Operational efficiency optimization' },
    { value: 'cost-reduction', label: 'Cost reduction initiatives' },
    { value: 'safety-protocols', label: 'Safety and compliance protocols' }
  ],
  consulting: [
    { value: 'strategic-options', label: 'Strategic options analysis' },
    { value: 'implementation-plan', label: 'Implementation roadmap' },
    { value: 'change-management', label: 'Change management recommendations' },
    { value: 'performance-improvement', label: 'Performance improvement strategies' },
    { value: 'stakeholder-alignment', label: 'Stakeholder alignment recommendations' }
  ],
  creative: [
    { value: 'concept-development', label: 'Creative concept recommendations' },
    { value: 'design-options', label: 'Design direction options' },
    { value: 'brand-alignment', label: 'Brand-aligned creative strategies' },
    { value: 'iteration-feedback', label: 'Iterative improvement suggestions' },
    { value: 'execution-timeline', label: 'Creative execution timeline' }
  ],
  general: [
    { value: 'clear-directive', label: 'Clear directives with action steps' },
    { value: 'ranked-options', label: 'Ranked options with reasoning' },
    { value: 'pros-cons', label: 'Pros and cons analysis' },
    { value: 'step-by-step', label: 'Step-by-step implementation guide' },
    { value: 'conditional', label: 'Conditional recommendations based on scenarios' }
  ]
}