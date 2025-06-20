/**
 * Prompt Templates and Agent Configuration System
 * 
 * Centralized system for managing AI agent types, industry frameworks,
 * and intelligent prompt generation with dynamic filtering.
 * 
 * @author Lilian Kidston
 * @version 1.0.0
 */

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
${agentType && AGENT_TYPE_RECOMMENDATION_PATTERNS[agentType as keyof typeof AGENT_TYPE_RECOMMENDATION_PATTERNS] ? `
- **Agent-Specific Format**: ${AGENT_TYPE_RECOMMENDATION_PATTERNS[agentType as keyof typeof AGENT_TYPE_RECOMMENDATION_PATTERNS].format}` : ''}

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
  { value: 'coach', label: 'Coach/Mentor', description: 'Provides guidance and motivation' },
  
  // New Modern Professional Roles
  { value: 'product-manager', label: 'Product Manager', description: 'Guides product development and strategy' },
  { value: 'ux-designer', label: 'UX/UI Designer', description: 'Designs user experiences and interfaces' },
  { value: 'project-manager', label: 'Project Manager', description: 'Manages projects and coordinates teams' },
  { value: 'sales-rep', label: 'Sales Representative', description: 'Helps with sales processes and customer relationships' },
  { value: 'hr-specialist', label: 'HR Specialist', description: 'Assists with human resources and people management' },
  { value: 'customer-success', label: 'Customer Success Manager', description: 'Focuses on customer retention and satisfaction' },
  
  // New Specialized Expertise
  { value: 'investment-advisor', label: 'Investment Advisor', description: 'Provides investment and portfolio guidance' },
  { value: 'therapist', label: 'Therapist/Counselor', description: 'Offers mental health and wellness support' },
  { value: 'compliance-officer', label: 'Compliance Officer', description: 'Ensures regulatory adherence' },
  { value: 'qa-specialist', label: 'Quality Assurance Specialist', description: 'Focuses on quality control and testing' },
  { value: 'technical-writer', label: 'Technical Writer', description: 'Creates documentation and technical content' },
  { value: 'innovation-catalyst', label: 'Innovation Catalyst', description: 'Drives creative problem-solving and innovation' }
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
  
  // New High-Growth Sectors
  { value: 'real-estate', label: 'Real Estate' },
  { value: 'insurance', label: 'Insurance' },
  { value: 'hospitality', label: 'Hospitality & Tourism' },
  { value: 'agriculture', label: 'Agriculture & Food' },
  { value: 'energy', label: 'Energy & Utilities' },
  { value: 'transportation', label: 'Transportation & Logistics' },
  
  // New Emerging/Specialized Fields
  { value: 'cybersecurity', label: 'Cybersecurity' },
  { value: 'sustainability', label: 'Sustainability & ESG' },
  { value: 'cryptocurrency', label: 'Cryptocurrency & Blockchain' },
  { value: 'gaming', label: 'Gaming & Entertainment' },
  { value: 'nonprofit', label: 'Non-Profit & Social Impact' },
  { value: 'government', label: 'Government & Public Sector' },
  
  // New Professional Services
  { value: 'architecture', label: 'Architecture & Construction' },
  { value: 'accounting', label: 'Accounting & Auditing' },
  { value: 'human-resources', label: 'Human Resources' },
  
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
  ],
  
  // New High-Growth Sectors
  'real-estate': [
    'Comparative Market Analysis (CMA)',
    'Cap Rate Analysis',
    'Net Operating Income (NOI)',
    'Cash-on-Cash Return',
    'Property Valuation Methods',
    'Market Trend Analysis',
    'Due Diligence Framework',
    'Investment Property Analysis',
    'Rental Yield Calculation',
    'Market Absorption Rates',
    'Zoning and Land Use Analysis',
    'Real Estate Investment Trust (REIT) Analysis'
  ],
  
  insurance: [
    'Risk Assessment Framework',
    'Actuarial Analysis',
    'Underwriting Guidelines',
    'Claims Management Process',
    'Catastrophe Modeling',
    'Premium Calculation Methods',
    'Reinsurance Strategy',
    'Loss Reserving Techniques',
    'Regulatory Compliance (Solvency II)',
    'Customer Lifetime Value (Insurance)',
    'Fraud Detection Framework',
    'Policy Portfolio Analysis'
  ],
  
  hospitality: [
    'Revenue Management',
    'Guest Experience Journey',
    'Yield Management',
    'Service Quality Framework (SERVQUAL)',
    'Hotel Performance Metrics (RevPAR, ADR)',
    'Customer Satisfaction Measurement',
    'Seasonal Demand Planning',
    'Event Management Framework',
    'Food & Beverage Cost Control',
    'Staff Training and Development',
    'Tourism Market Analysis',
    'Sustainability in Tourism'
  ],
  
  agriculture: [
    'Crop Yield Optimization',
    'Soil Health Assessment',
    'Integrated Pest Management (IPM)',
    'Precision Agriculture',
    'Supply Chain Management (Farm-to-Table)',
    'Weather Risk Management',
    'Sustainable Farming Practices',
    'Food Safety Standards (HACCP)',
    'Agricultural Economics',
    'Livestock Management',
    'Water Resource Management',
    'Organic Certification Process'
  ],
  
  energy: [
    'Energy Efficiency Analysis',
    'Renewable Energy Assessment',
    'Grid Management Systems',
    'Power Purchase Agreements (PPAs)',
    'Energy Storage Solutions',
    'Load Forecasting',
    'Carbon Footprint Analysis',
    'Regulatory Compliance (Energy)',
    'Smart Grid Technology',
    'Energy Trading and Risk Management',
    'Utility Performance Metrics',
    'Environmental Impact Assessment'
  ],
  
  transportation: [
    'Supply Chain Optimization',
    'Route Planning and Optimization',
    'Logistics Performance Metrics',
    'Fleet Management',
    'Inventory Management (3PL)',
    'Warehouse Management Systems',
    'Transportation Cost Analysis',
    'Last-Mile Delivery Solutions',
    'Freight Consolidation',
    'Cross-Docking Operations',
    'Cold Chain Management',
    'Sustainability in Logistics'
  ],
  
  // New Emerging/Specialized Fields
  cybersecurity: [
    'NIST Cybersecurity Framework',
    'OWASP Top 10',
    'Threat Modeling',
    'Risk Assessment Matrix (Cyber)',
    'Incident Response Framework',
    'Penetration Testing Methodology',
    'Security Controls Framework',
    'Vulnerability Management',
    'Identity and Access Management (IAM)',
    'Security Awareness Training',
    'Compliance Frameworks (SOC 2, ISO 27001)',
    'Cyber Threat Intelligence'
  ],
  
  sustainability: [
    'Life Cycle Assessment (LCA)',
    'ESG Reporting Standards',
    'Carbon Footprint Analysis',
    'Sustainability Metrics Framework',
    'Circular Economy Principles',
    'Environmental Management Systems',
    'Social Impact Assessment',
    'Green Building Standards (LEED)',
    'Sustainable Supply Chain',
    'Climate Risk Assessment',
    'Biodiversity Impact Assessment',
    'Stakeholder Engagement Framework'
  ],
  
  cryptocurrency: [
    'Blockchain Analysis',
    'DeFi Protocol Assessment',
    'Smart Contract Auditing',
    'Tokenomics Framework',
    'Cryptocurrency Valuation Models',
    'Risk Management (Crypto)',
    'Regulatory Compliance (Crypto)',
    'Trading Strategy Framework',
    'Wallet Security Best Practices',
    'Market Analysis (Technical/Fundamental)',
    'Liquidity Pool Analysis',
    'NFT Valuation Framework'
  ],
  
  gaming: [
    'Game Design Framework',
    'Player Experience (PX) Design',
    'Monetization Strategy',
    'Game Analytics and Metrics',
    'Community Management',
    'Live Operations Framework',
    'Game Testing and QA',
    'Player Engagement Models',
    'Game Economy Design',
    'Platform Integration',
    'Content Creation Pipeline',
    'Entertainment Industry Analysis'
  ],
  
  nonprofit: [
    'Impact Measurement Framework',
    'Fundraising Strategy',
    'Grant Writing Process',
    'Volunteer Management',
    'Program Evaluation',
    'Stakeholder Engagement',
    'Social Return on Investment (SROI)',
    'Community Needs Assessment',
    'Advocacy Campaign Framework',
    'Donor Relationship Management',
    'Board Governance',
    'Mission Alignment Assessment'
  ],
  
  government: [
    'Policy Analysis Framework',
    'Public Administration',
    'Regulatory Impact Assessment',
    'Stakeholder Consultation Process',
    'Government Performance Management',
    'Public Finance Management',
    'Legislative Process',
    'Public Service Delivery',
    'Crisis Management',
    'Intergovernmental Relations',
    'Public Engagement Strategies',
    'Evidence-Based Policy Making'
  ],
  
  // New Professional Services
  architecture: [
    'Design Process Framework',
    'Building Information Modeling (BIM)',
    'Project Management (Construction)',
    'Sustainability Design (Green Building)',
    'Site Analysis and Planning',
    'Building Code Compliance',
    'Cost Estimation and Budgeting',
    'Construction Administration',
    'Historic Preservation',
    'Accessibility Standards (ADA)',
    'Value Engineering',
    'Risk Management (Construction)'
  ],
  
  accounting: [
    'Generally Accepted Accounting Principles (GAAP)',
    'International Financial Reporting Standards (IFRS)',
    'Audit Planning and Execution',
    'Tax Planning and Compliance',
    'Financial Statement Analysis',
    'Internal Controls Assessment',
    'Forensic Accounting',
    'Management Accounting',
    'Budgeting and Forecasting',
    'Cost Accounting',
    'Risk Assessment (Financial)',
    'Regulatory Compliance (Financial)'
  ],
  
  'human-resources': [
    'Talent Acquisition Framework',
    'Performance Management System',
    'Employee Engagement Strategies',
    'Compensation and Benefits',
    'Learning and Development',
    'Succession Planning',
    'HR Analytics and Metrics',
    'Employee Relations',
    'Diversity, Equity, and Inclusion (DEI)',
    'Change Management (HR)',
    'Workforce Planning',
    'Employment Law Compliance'
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
  ],
  
  // New High-Growth Sectors
  'real-estate': [
    { value: 'investment-analysis', label: 'Investment analysis with ROI projections' },
    { value: 'market-comparison', label: 'Comparative market analysis recommendations' },
    { value: 'property-valuation', label: 'Property valuation with pricing strategy' },
    { value: 'location-assessment', label: 'Location and market timing recommendations' },
    { value: 'portfolio-strategy', label: 'Real estate portfolio optimization' }
  ],
  
  insurance: [
    { value: 'risk-rating', label: 'Risk assessment and rating recommendations' },
    { value: 'coverage-analysis', label: 'Coverage gap analysis and solutions' },
    { value: 'premium-optimization', label: 'Premium pricing and optimization' },
    { value: 'claims-strategy', label: 'Claims management and prevention strategies' },
    { value: 'policy-recommendations', label: 'Policy design and underwriting recommendations' }
  ],
  
  hospitality: [
    { value: 'revenue-optimization', label: 'Revenue management and pricing strategies' },
    { value: 'guest-experience', label: 'Guest experience improvement recommendations' },
    { value: 'operational-efficiency', label: 'Operational efficiency and cost management' },
    { value: 'marketing-strategy', label: 'Marketing and customer acquisition strategies' },
    { value: 'service-quality', label: 'Service quality enhancement recommendations' }
  ],
  
  agriculture: [
    { value: 'crop-optimization', label: 'Crop yield and farming practice optimization' },
    { value: 'sustainability-practices', label: 'Sustainable farming recommendations' },
    { value: 'resource-management', label: 'Resource allocation and efficiency strategies' },
    { value: 'market-strategy', label: 'Market positioning and pricing strategies' },
    { value: 'risk-mitigation', label: 'Weather and market risk mitigation plans' }
  ],
  
  energy: [
    { value: 'efficiency-improvements', label: 'Energy efficiency improvement strategies' },
    { value: 'renewable-transition', label: 'Renewable energy transition plans' },
    { value: 'grid-optimization', label: 'Grid management and optimization recommendations' },
    { value: 'cost-reduction', label: 'Energy cost reduction strategies' },
    { value: 'sustainability-goals', label: 'Sustainability and carbon reduction plans' }
  ],
  
  transportation: [
    { value: 'route-optimization', label: 'Route and logistics optimization strategies' },
    { value: 'cost-efficiency', label: 'Transportation cost reduction recommendations' },
    { value: 'supply-chain', label: 'Supply chain improvement strategies' },
    { value: 'technology-integration', label: 'Technology adoption and integration plans' },
    { value: 'sustainability-logistics', label: 'Sustainable logistics recommendations' }
  ],
  
  // New Emerging/Specialized Fields
  cybersecurity: [
    { value: 'security-assessment', label: 'Security posture assessment and recommendations' },
    { value: 'threat-response', label: 'Threat response and mitigation strategies' },
    { value: 'compliance-roadmap', label: 'Compliance and regulatory roadmaps' },
    { value: 'risk-prioritization', label: 'Security risk prioritization and remediation' },
    { value: 'security-architecture', label: 'Security architecture and controls recommendations' }
  ],
  
  sustainability: [
    { value: 'impact-reduction', label: 'Environmental impact reduction strategies' },
    { value: 'esg-improvement', label: 'ESG performance improvement recommendations' },
    { value: 'carbon-neutrality', label: 'Carbon neutrality and net-zero roadmaps' },
    { value: 'circular-economy', label: 'Circular economy implementation strategies' },
    { value: 'sustainability-reporting', label: 'Sustainability reporting and disclosure recommendations' }
  ],
  
  cryptocurrency: [
    { value: 'investment-strategy', label: 'Crypto investment and portfolio strategies' },
    { value: 'risk-management', label: 'Risk management and security recommendations' },
    { value: 'defi-strategies', label: 'DeFi protocol and yield farming strategies' },
    { value: 'trading-signals', label: 'Trading signals and market analysis' },
    { value: 'compliance-guidance', label: 'Regulatory compliance and tax guidance' }
  ],
  
  gaming: [
    { value: 'game-design', label: 'Game design and mechanics recommendations' },
    { value: 'monetization-strategy', label: 'Monetization and revenue optimization' },
    { value: 'player-engagement', label: 'Player engagement and retention strategies' },
    { value: 'content-strategy', label: 'Content creation and update strategies' },
    { value: 'community-building', label: 'Community building and management recommendations' }
  ],
  
  nonprofit: [
    { value: 'impact-maximization', label: 'Impact measurement and maximization strategies' },
    { value: 'fundraising-strategy', label: 'Fundraising and donor engagement strategies' },
    { value: 'program-optimization', label: 'Program effectiveness and optimization recommendations' },
    { value: 'volunteer-engagement', label: 'Volunteer recruitment and engagement strategies' },
    { value: 'sustainability-planning', label: 'Organizational sustainability and growth plans' }
  ],
  
  government: [
    { value: 'policy-recommendations', label: 'Evidence-based policy recommendations' },
    { value: 'stakeholder-engagement', label: 'Stakeholder consultation and engagement strategies' },
    { value: 'service-improvement', label: 'Public service delivery improvements' },
    { value: 'regulatory-guidance', label: 'Regulatory framework and compliance guidance' },
    { value: 'performance-optimization', label: 'Government performance and efficiency recommendations' }
  ],
  
  // New Professional Services
  architecture: [
    { value: 'design-solutions', label: 'Design solutions and architectural recommendations' },
    { value: 'sustainability-design', label: 'Sustainable and green building strategies' },
    { value: 'project-optimization', label: 'Project timeline and cost optimization' },
    { value: 'compliance-guidance', label: 'Building code and regulatory compliance' },
    { value: 'technology-integration', label: 'Technology and BIM integration recommendations' }
  ],
  
  accounting: [
    { value: 'financial-analysis', label: 'Financial analysis and performance recommendations' },
    { value: 'compliance-guidance', label: 'Regulatory compliance and audit recommendations' },
    { value: 'tax-optimization', label: 'Tax planning and optimization strategies' },
    { value: 'process-improvement', label: 'Accounting process and controls improvements' },
    { value: 'reporting-enhancement', label: 'Financial reporting and disclosure recommendations' }
  ],
  
  'human-resources': [
    { value: 'talent-strategy', label: 'Talent acquisition and retention strategies' },
    { value: 'performance-improvement', label: 'Performance management and development plans' },
    { value: 'engagement-enhancement', label: 'Employee engagement and culture recommendations' },
    { value: 'compensation-strategy', label: 'Compensation and benefits optimization' },
    { value: 'organizational-development', label: 'Organizational development and change strategies' }
  ]
}

// Agent-type-specific recommendation patterns
export const AGENT_TYPE_RECOMMENDATION_PATTERNS = {
  consultant: {
    format: 'Strategic recommendations with implementation roadmaps',
    style: ['strategic-analysis', 'implementation-roadmap', 'stakeholder-alignment', 'change-management', 'roi-assessment']
  },
  teacher: {
    format: 'Educational guidance with learning objectives',
    style: ['step-by-step-instruction', 'learning-objectives', 'assessment-criteria', 'differentiated-approaches', 'progress-tracking']
  },
  assistant: {
    format: 'Task-oriented recommendations with clear action items',
    style: ['action-items', 'prioritized-tasks', 'resource-lists', 'time-management', 'workflow-optimization']
  },
  analyst: {
    format: 'Data-driven insights with supporting evidence',
    style: ['data-analysis', 'trend-identification', 'statistical-insights', 'comparative-analysis', 'forecasting']
  },
  creator: {
    format: 'Creative solutions with ideation and iteration',
    style: ['creative-concepts', 'iterative-refinement', 'inspiration-sources', 'content-strategy', 'brand-alignment']
  },
  developer: {
    format: 'Technical solutions with code examples and best practices',
    style: ['technical-implementation', 'code-examples', 'best-practices', 'architecture-guidance', 'troubleshooting-steps']
  },
  researcher: {
    format: 'Evidence-based findings with methodology and sources',
    style: ['research-methodology', 'evidence-synthesis', 'source-validation', 'hypothesis-testing', 'literature-review']
  },
  coach: {
    format: 'Motivational guidance with goal-setting and accountability',
    style: ['goal-setting', 'motivational-strategies', 'accountability-measures', 'skill-development', 'progress-milestones']
  },
  'product-manager': {
    format: 'Product strategy with user-focused prioritization',
    style: ['feature-prioritization', 'user-story-mapping', 'roadmap-planning', 'stakeholder-alignment', 'metrics-tracking']
  },
  'ux-designer': {
    format: 'User-centered design recommendations with prototyping',
    style: ['user-research-insights', 'design-solutions', 'prototype-recommendations', 'usability-improvements', 'accessibility-guidelines']
  },
  'project-manager': {
    format: 'Project execution plans with timeline and resource allocation',
    style: ['project-planning', 'timeline-management', 'resource-allocation', 'risk-mitigation', 'stakeholder-communication']
  },
  'sales-rep': {
    format: 'Sales strategies with relationship-building focus',
    style: ['lead-qualification', 'relationship-building', 'objection-handling', 'closing-strategies', 'follow-up-plans']
  },
  'hr-specialist': {
    format: 'People-focused strategies with policy guidance',
    style: ['talent-development', 'policy-recommendations', 'culture-building', 'compliance-guidance', 'employee-relations']
  },
  'customer-success': {
    format: 'Customer retention strategies with satisfaction metrics',
    style: ['customer-onboarding', 'retention-strategies', 'satisfaction-improvement', 'expansion-opportunities', 'churn-prevention']
  },
  'investment-advisor': {
    format: 'Investment recommendations with risk analysis',
    style: ['portfolio-allocation', 'risk-assessment', 'investment-thesis', 'diversification-strategy', 'performance-monitoring']
  },
  therapist: {
    format: 'Therapeutic guidance with evidence-based approaches',
    style: ['therapeutic-interventions', 'coping-strategies', 'treatment-planning', 'progress-assessment', 'resource-referrals']
  },
  'compliance-officer': {
    format: 'Regulatory guidance with compliance frameworks',
    style: ['regulatory-compliance', 'risk-assessment', 'policy-development', 'audit-preparation', 'training-recommendations']
  },
  'qa-specialist': {
    format: 'Quality assurance protocols with testing strategies',
    style: ['testing-strategies', 'quality-metrics', 'process-improvement', 'defect-prevention', 'standards-compliance']
  },
  'technical-writer': {
    format: 'Documentation strategies with user-focused content',
    style: ['content-strategy', 'user-documentation', 'information-architecture', 'writing-guidelines', 'review-processes']
  },
  'innovation-catalyst': {
    format: 'Innovation frameworks with creative problem-solving',
    style: ['innovation-methodology', 'creative-ideation', 'prototype-development', 'market-validation', 'scaling-strategies']
  }
}

// Agent-type framework preferences (what frameworks each agent type typically uses)
export const AGENT_TYPE_FRAMEWORK_PREFERENCES = {
  consultant: [
    'SWOT Analysis', 'Strategic Planning', 'Stakeholder Analysis', 'Change Management', 
    'Business Case Development', 'Implementation Planning', 'Performance Measurement', 'Problem-Solving Framework'
  ],
  teacher: [
    'Bloom\'s Taxonomy', 'Learning Objectives Framework', 'Instructional Design (ADDIE)', 
    'Assessment and Evaluation', 'Differentiated Instruction', 'Universal Design for Learning (UDL)'
  ],
  assistant: [
    'Project Management', 'Process Mapping', 'Workflow Optimization', 'Time Management',
    'Quality Assurance', 'Best Practices Framework', 'Resource Management'
  ],
  analyst: [
    'Data Analysis', 'Statistical Process Control', 'Performance Metrics', 'Trend Analysis',
    'Comparative Analysis', 'Root Cause Analysis', 'Risk Assessment', 'Forecasting'
  ],
  creator: [
    'Design Thinking', 'Creative Brief Framework', 'Content Strategy Framework', 
    'Brand Development Process', 'Creative Project Management', 'User Experience (UX) Design'
  ],
  developer: [
    'Agile Framework', 'DevOps Methodology', 'System Architecture Design', 'API Design Patterns',
    'Security Framework (OWASP)', 'Code Review Process', 'Testing Pyramid'
  ],
  researcher: [
    'Research Methodology', 'Evidence-Based Medicine', 'Literature Review', 'Data Analysis',
    'Statistical Analysis', 'Hypothesis Testing', 'Study Design'
  ],
  coach: [
    'Goal Setting Framework', 'Performance Management System', 'Learning and Development',
    'Motivational Strategies', 'Skills Assessment', 'Progress Tracking'
  ],
  'product-manager': [
    'User Story Mapping', 'Product Roadmap Planning', 'Feature Prioritization', 'Agile Framework',
    'Market Research Framework', 'A/B Testing Methodology', 'Customer Journey Mapping'
  ],
  'ux-designer': [
    'Design Thinking', 'User Experience (UX) Design', 'User Research', 'Information Architecture',
    'Usability Testing', 'Accessibility Standards', 'Design Systems'
  ],
  'project-manager': [
    'Project Management (PMI)', 'Agile Framework', 'Risk Management', 'Resource Planning',
    'Timeline Management', 'Stakeholder Management', 'Quality Management'
  ],
  'sales-rep': [
    'Customer Relationship Management', 'Sales Process Framework', 'Lead Qualification',
    'Customer Segmentation', 'Market Analysis', 'Competitive Analysis'
  ],
  'hr-specialist': [
    'Talent Acquisition Framework', 'Performance Management System', 'Employee Engagement',
    'Learning and Development', 'Compensation Framework', 'Diversity and Inclusion'
  ],
  'customer-success': [
    'Customer Journey Mapping', 'Customer Satisfaction Measurement', 'Retention Strategies',
    'Customer Segmentation', 'Customer Lifecycle Management', 'Customer Health Scoring'
  ],
  'investment-advisor': [
    'Portfolio Analysis', 'Risk Assessment Matrix', 'Financial Ratio Analysis', 'Asset Allocation',
    'Investment Strategy', 'Performance Measurement', 'Market Analysis'
  ],
  therapist: [
    'Clinical Practice Guidelines', 'Evidence-Based Medicine', 'Treatment Planning',
    'Assessment Frameworks', 'Therapeutic Interventions', 'Progress Monitoring'
  ],
  'compliance-officer': [
    'Regulatory Compliance Framework', 'Risk Assessment', 'Audit Framework',
    'Policy Development', 'Training Framework', 'Monitoring and Reporting'
  ],
  'qa-specialist': [
    'Quality Management Systems', 'Testing Frameworks', 'Quality Metrics',
    'Process Improvement', 'Standards Compliance', 'Defect Management'
  ],
  'technical-writer': [
    'Information Architecture', 'Documentation Framework', 'Content Strategy',
    'User-Centered Design', 'Style Guides', 'Review Processes'
  ],
  'innovation-catalyst': [
    'Innovation Framework', 'Design Thinking', 'Lean Innovation', 'Prototype Development',
    'Market Validation', 'Technology Assessment', 'Innovation Metrics'
  ]
}

// Agent-type-specific depth concepts (what "depth" means for each agent type)
export const AGENT_TYPE_DEPTH_CONCEPTS = {
  consultant: {
    concept: 'Strategic Depth',
    question: 'How comprehensive should the strategic analysis be?',
    options: [
      { value: 'high-level', label: 'High-level strategic overview' },
      { value: 'detailed', label: 'Detailed strategic analysis with recommendations' },
      { value: 'comprehensive', label: 'Comprehensive strategic deep-dive with implementation plans' },
      { value: 'exhaustive', label: 'Exhaustive analysis with multiple scenarios and risk assessment' }
    ]
  },
  teacher: {
    concept: 'Learning Depth',
    question: 'How thorough should the educational guidance be?',
    options: [
      { value: 'overview', label: 'Basic concept overview' },
      { value: 'structured', label: 'Structured learning with examples' },
      { value: 'comprehensive', label: 'Comprehensive instruction with practice exercises' },
      { value: 'mastery', label: 'Complete mastery-level instruction with assessments' }
    ]
  },
  assistant: {
    concept: 'Task Detail',
    question: 'How detailed should task guidance be?',
    options: [
      { value: 'basic', label: 'Basic task outline' },
      { value: 'step-by-step', label: 'Detailed step-by-step instructions' },
      { value: 'comprehensive', label: 'Comprehensive task management with resources' },
      { value: 'full-support', label: 'Full support with contingency planning' }
    ]
  },
  analyst: {
    concept: 'Analysis Depth',
    question: 'How deep should the data analysis be?',
    options: [
      { value: 'surface', label: 'Surface-level insights' },
      { value: 'moderate', label: 'Moderate analysis with key findings' },
      { value: 'comprehensive', label: 'Comprehensive statistical analysis' },
      { value: 'exhaustive', label: 'Exhaustive analysis with predictive modeling' }
    ]
  },
  creator: {
    concept: 'Creative Exploration',
    question: 'How extensive should the creative exploration be?',
    options: [
      { value: 'initial-concepts', label: 'Initial creative concepts' },
      { value: 'developed-ideas', label: 'Well-developed creative ideas' },
      { value: 'comprehensive-exploration', label: 'Comprehensive creative exploration with variants' },
      { value: 'full-creative-suite', label: 'Complete creative suite with multiple directions' }
    ]
  },
  developer: {
    concept: 'Technical Depth',
    question: 'How detailed should the technical guidance be?',
    options: [
      { value: 'conceptual', label: 'Conceptual technical overview' },
      { value: 'implementation', label: 'Implementation-ready technical details' },
      { value: 'comprehensive', label: 'Comprehensive technical solution with best practices' },
      { value: 'enterprise', label: 'Enterprise-level technical architecture' }
    ]
  },
  researcher: {
    concept: 'Research Depth',
    question: 'How thorough should the research be?',
    options: [
      { value: 'preliminary', label: 'Preliminary research findings' },
      { value: 'focused', label: 'Focused research with key sources' },
      { value: 'comprehensive', label: 'Comprehensive research with methodology' },
      { value: 'academic', label: 'Academic-level research with full citations' }
    ]
  },
  coach: {
    concept: 'Coaching Intensity',
    question: 'How intensive should the coaching support be?',
    options: [
      { value: 'motivational', label: 'Motivational guidance and encouragement' },
      { value: 'structured', label: 'Structured coaching with clear goals' },
      { value: 'comprehensive', label: 'Comprehensive coaching with skill development' },
      { value: 'transformation', label: 'Transformational coaching with accountability' }
    ]
  },
  'product-manager': {
    concept: 'Product Strategy Depth',
    question: 'How comprehensive should product strategy be?',
    options: [
      { value: 'feature-level', label: 'Feature-level product guidance' },
      { value: 'roadmap', label: 'Product roadmap and prioritization' },
      { value: 'comprehensive', label: 'Comprehensive product strategy with market analysis' },
      { value: 'full-lifecycle', label: 'Full product lifecycle management' }
    ]
  },
  'ux-designer': {
    concept: 'Design Depth',
    question: 'How detailed should the design process be?',
    options: [
      { value: 'concept', label: 'Design concept and direction' },
      { value: 'wireframes', label: 'Wireframes and user flow design' },
      { value: 'comprehensive', label: 'Comprehensive design system and prototypes' },
      { value: 'full-experience', label: 'Complete user experience ecosystem' }
    ]
  },
  'project-manager': {
    concept: 'Project Management Scope',
    question: 'How comprehensive should project management be?',
    options: [
      { value: 'basic-planning', label: 'Basic project planning and tracking' },
      { value: 'structured', label: 'Structured project management with milestones' },
      { value: 'comprehensive', label: 'Comprehensive PM with risk and resource management' },
      { value: 'enterprise', label: 'Enterprise-level project portfolio management' }
    ]
  },
  'sales-rep': {
    concept: 'Sales Engagement Depth',
    question: 'How comprehensive should sales support be?',
    options: [
      { value: 'lead-qualification', label: 'Lead qualification and initial outreach' },
      { value: 'relationship-building', label: 'Relationship building and needs assessment' },
      { value: 'comprehensive', label: 'Comprehensive sales process with objection handling' },
      { value: 'account-management', label: 'Full account management and expansion' }
    ]
  },
  'hr-specialist': {
    concept: 'HR Support Depth',
    question: 'How comprehensive should HR guidance be?',
    options: [
      { value: 'policy-guidance', label: 'Basic policy guidance and compliance' },
      { value: 'people-management', label: 'People management and employee relations' },
      { value: 'comprehensive', label: 'Comprehensive HR strategy and development' },
      { value: 'organizational', label: 'Organizational transformation and culture change' }
    ]
  },
  'customer-success': {
    concept: 'Customer Success Depth',
    question: 'How comprehensive should customer success support be?',
    options: [
      { value: 'onboarding', label: 'Customer onboarding and initial success' },
      { value: 'relationship', label: 'Ongoing relationship management and support' },
      { value: 'comprehensive', label: 'Comprehensive success planning and expansion' },
      { value: 'strategic-partnership', label: 'Strategic partnership and advocacy development' }
    ]
  },
  'investment-advisor': {
    concept: 'Investment Analysis Depth',
    question: 'How thorough should investment analysis be?',
    options: [
      { value: 'basic-screening', label: 'Basic investment screening and recommendations' },
      { value: 'fundamental', label: 'Fundamental analysis with risk assessment' },
      { value: 'comprehensive', label: 'Comprehensive analysis with portfolio optimization' },
      { value: 'institutional', label: 'Institutional-level analysis with quantitative modeling' }
    ]
  },
  therapist: {
    concept: 'Therapeutic Depth',
    question: 'How comprehensive should therapeutic support be?',
    options: [
      { value: 'supportive', label: 'Supportive guidance and coping strategies' },
      { value: 'structured', label: 'Structured therapeutic interventions' },
      { value: 'comprehensive', label: 'Comprehensive treatment planning and progress tracking' },
      { value: 'intensive', label: 'Intensive therapeutic support with multi-modal approaches' }
    ]
  },
  'compliance-officer': {
    concept: 'Compliance Depth',
    question: 'How comprehensive should compliance guidance be?',
    options: [
      { value: 'basic-requirements', label: 'Basic regulatory requirements and guidelines' },
      { value: 'policy-development', label: 'Policy development and implementation' },
      { value: 'comprehensive', label: 'Comprehensive compliance framework and monitoring' },
      { value: 'enterprise', label: 'Enterprise-wide compliance and risk management' }
    ]
  },
  'qa-specialist': {
    concept: 'Quality Assurance Depth',
    question: 'How comprehensive should quality assurance be?',
    options: [
      { value: 'basic-testing', label: 'Basic testing and quality checks' },
      { value: 'systematic', label: 'Systematic testing with documented procedures' },
      { value: 'comprehensive', label: 'Comprehensive QA with process improvement' },
      { value: 'enterprise', label: 'Enterprise-level quality management systems' }
    ]
  },
  'technical-writer': {
    concept: 'Documentation Depth',
    question: 'How comprehensive should documentation be?',
    options: [
      { value: 'basic-guides', label: 'Basic user guides and instructions' },
      { value: 'structured', label: 'Structured documentation with examples' },
      { value: 'comprehensive', label: 'Comprehensive documentation suite with tutorials' },
      { value: 'enterprise', label: 'Enterprise-level documentation ecosystem' }
    ]
  },
  'innovation-catalyst': {
    concept: 'Innovation Exploration',
    question: 'How extensive should innovation exploration be?',
    options: [
      { value: 'ideation', label: 'Creative ideation and concept generation' },
      { value: 'development', label: 'Concept development and feasibility assessment' },
      { value: 'comprehensive', label: 'Comprehensive innovation pipeline with prototyping' },
      { value: 'transformation', label: 'Organizational innovation transformation' }
    ]
  }
}

// Agent-type-specific question variations
export const AGENT_TYPE_QUESTIONS = {
  consultant: {
    primaryGoal: "What strategic business outcomes should this consultant help clients achieve?",
    tasks: {
      label: "What consulting services should this agent provide?",
      options: [
        'Strategic planning and analysis',
        'Business process improvement',
        'Organizational change management',
        'Market analysis and competitive intelligence',
        'Financial analysis and planning',
        'Risk assessment and mitigation',
        'Performance optimization',
        'Stakeholder engagement'
      ]
    },
    targetAudience: {
      label: "Who are the primary clients?",
      options: [
        { value: 'executives', label: 'C-Suite Executives and Senior Leadership' },
        { value: 'managers', label: 'Department Managers and Team Leaders' },
        { value: 'entrepreneurs', label: 'Entrepreneurs and Business Owners' },
        { value: 'consultants', label: 'Other Consultants and Advisors' },
        { value: 'mixed-clients', label: 'Mixed Client Base - Adapt to Level' }
      ]
    }
  },
  
  teacher: {
    primaryGoal: "What learning outcomes should this educational agent help students achieve?",
    tasks: {
      label: "What teaching services should this agent provide?",
      options: [
        'Explain concepts and theories',
        'Provide guided practice exercises',
        'Create learning assessments',
        'Develop personalized study plans',
        'Offer feedback and improvement suggestions',
        'Design interactive learning activities',
        'Support exam preparation',
        'Foster critical thinking skills'
      ]
    },
    targetAudience: {
      label: "Who are the primary learners?",
      options: [
        { value: 'students', label: 'Students (K-12 or University)' },
        { value: 'professionals', label: 'Working Professionals Seeking Skills' },
        { value: 'beginners', label: 'Complete Beginners to the Subject' },
        { value: 'advanced', label: 'Advanced Learners Seeking Mastery' },
        { value: 'mixed-levels', label: 'Mixed Ability Levels - Differentiate Instruction' }
      ]
    }
  },

  'product-manager': {
    primaryGoal: "What product success metrics should this agent help achieve?",
    tasks: {
      label: "What product management activities should this agent support?",
      options: [
        'Product roadmap planning and prioritization',
        'User story creation and backlog management',
        'Market research and competitive analysis',
        'User feedback analysis and insights',
        'Feature specification and requirements',
        'Stakeholder communication and alignment',
        'Performance metrics and analytics review',
        'Go-to-market strategy development'
      ]
    },
    targetAudience: {
      label: "Who are the primary stakeholders?",
      options: [
        { value: 'product-teams', label: 'Product Teams and Development Teams' },
        { value: 'executives', label: 'Executive Leadership and Decision Makers' },
        { value: 'customers', label: 'End Users and Customer Representatives' },
        { value: 'cross-functional', label: 'Cross-functional Teams (Sales, Marketing, Support)' },
        { value: 'mixed-stakeholders', label: 'Mixed Stakeholder Groups - Adapt Communication' }
      ]
    }
  },

  'ux-designer': {
    primaryGoal: "What user experience improvements should this agent help deliver?",
    tasks: {
      label: "What UX design services should this agent provide?",
      options: [
        'User research and persona development',
        'Information architecture and user flows',
        'Wireframing and prototyping',
        'Usability testing and analysis',
        'Design system creation and maintenance',
        'Accessibility compliance and guidelines',
        'User interface design and visual design',
        'Design feedback and iteration recommendations'
      ]
    },
    targetAudience: {
      label: "Who are the primary collaborators?",
      options: [
        { value: 'designers', label: 'Other Designers and Design Teams' },
        { value: 'developers', label: 'Developers and Engineering Teams' },
        { value: 'product-managers', label: 'Product Managers and Product Teams' },
        { value: 'stakeholders', label: 'Business Stakeholders and Clients' },
        { value: 'mixed-teams', label: 'Cross-functional Teams - Adapt to Role' }
      ]
    }
  },

  'sales-rep': {
    primaryGoal: "What sales performance outcomes should this agent help achieve?",
    tasks: {
      label: "What sales activities should this agent support?",
      options: [
        'Lead qualification and prospecting',
        'Customer needs assessment and discovery',
        'Proposal development and presentation',
        'Objection handling and negotiation',
        'Relationship building and account management',
        'Sales pipeline management and forecasting',
        'Competitive positioning and differentiation',
        'Customer onboarding and success'
      ]
    },
    targetAudience: {
      label: "Who are the primary prospects and customers?",
      options: [
        { value: 'b2b-decision-makers', label: 'B2B Decision Makers and Executives' },
        { value: 'technical-buyers', label: 'Technical Buyers and Evaluators' },
        { value: 'small-business', label: 'Small Business Owners and Entrepreneurs' },
        { value: 'enterprise', label: 'Enterprise Accounts and Large Organizations' },
        { value: 'mixed-segments', label: 'Mixed Customer Segments - Adapt Approach' }
      ]
    }
  },

  analyst: {
    primaryGoal: "What analytical insights should this agent help deliver?",
    tasks: {
      label: "What analytical services should this agent provide?",
      options: [
        'Data collection and cleaning',
        'Statistical analysis and modeling',
        'Trend identification and forecasting',
        'Performance metrics and KPI tracking',
        'Report generation and visualization',
        'Hypothesis testing and validation',
        'Comparative analysis and benchmarking',
        'Recommendations based on data insights'
      ]
    },
    targetAudience: {
      label: "Who are the primary data consumers?",
      options: [
        { value: 'executives', label: 'Executives and Senior Leadership' },
        { value: 'managers', label: 'Department Managers and Team Leaders' },
        { value: 'analysts', label: 'Other Analysts and Data Teams' },
        { value: 'stakeholders', label: 'Business Stakeholders and Decision Makers' },
        { value: 'mixed-audience', label: 'Mixed Audience - Adapt Technical Level' }
      ]
    }
  },

  'investment-advisor': {
    primaryGoal: "What investment outcomes should this agent help clients achieve?",
    tasks: {
      label: "What investment advisory services should this agent provide?",
      options: [
        'Portfolio analysis and optimization',
        'Investment research and recommendations',
        'Risk assessment and management',
        'Market analysis and economic outlook',
        'Asset allocation and diversification',
        'Performance monitoring and reporting',
        'Tax-efficient investment strategies',
        'Financial planning and goal setting'
      ]
    },
    targetAudience: {
      label: "Who are the primary investment clients?",
      options: [
        { value: 'individual-investors', label: 'Individual Retail Investors' },
        { value: 'high-net-worth', label: 'High Net Worth Individuals and Families' },
        { value: 'institutional', label: 'Institutional Investors and Fund Managers' },
        { value: 'financial-advisors', label: 'Financial Advisors and Wealth Managers' },
        { value: 'mixed-clients', label: 'Mixed Client Base - Adapt to Sophistication Level' }
      ]
    }
  },

  // Adding remaining agent types
  creator: {
    primaryGoal: "What creative outputs should this agent help produce?",
    tasks: {
      label: "What creative services should this agent provide?",
      options: [
        'Generate creative concepts and ideas',
        'Develop content strategies and frameworks',
        'Create copy and written content',
        'Design visual and multimedia content',
        'Provide creative feedback and iteration',
        'Build brand messaging and positioning',
        'Develop creative briefs and guidelines',
        'Support creative project management'
      ]
    },
    targetAudience: {
      label: "Who are the primary creative collaborators?",
      options: [
        { value: 'creative-teams', label: 'Creative Teams and Content Creators' },
        { value: 'marketing-teams', label: 'Marketing Teams and Brand Managers' },
        { value: 'clients', label: 'Clients and External Stakeholders' },
        { value: 'cross-functional', label: 'Cross-functional Teams (Product, Sales, PR)' },
        { value: 'mixed-creative', label: 'Mixed Creative Audiences - Adapt Style' }
      ]
    }
  },

  developer: {
    primaryGoal: "What technical problems should this agent help solve?",
    tasks: {
      label: "What development support should this agent provide?",
      options: [
        'Code review and optimization suggestions',
        'Architecture design and technical planning',
        'Debugging and troubleshooting assistance',
        'Best practices and coding standards guidance',
        'API design and integration support',
        'Performance optimization recommendations',
        'Security analysis and vulnerability assessment',
        'Documentation and technical writing'
      ]
    },
    targetAudience: {
      label: "Who are the primary technical collaborators?",
      options: [
        { value: 'junior-developers', label: 'Junior Developers and New Team Members' },
        { value: 'senior-developers', label: 'Senior Developers and Tech Leads' },
        { value: 'cross-functional', label: 'Cross-functional Teams (Product, QA, DevOps)' },
        { value: 'technical-stakeholders', label: 'Technical Stakeholders and Architects' },
        { value: 'mixed-technical', label: 'Mixed Technical Levels - Adapt Complexity' }
      ]
    }
  },

  researcher: {
    primaryGoal: "What research insights should this agent help uncover?",
    tasks: {
      label: "What research services should this agent provide?",
      options: [
        'Literature review and source analysis',
        'Data collection and methodology design',
        'Statistical analysis and interpretation',
        'Hypothesis development and testing',
        'Research synthesis and reporting',
        'Peer review and academic writing support',
        'Grant proposal development',
        'Research ethics and compliance guidance'
      ]
    },
    targetAudience: {
      label: "Who are the primary research stakeholders?",
      options: [
        { value: 'academic-researchers', label: 'Academic Researchers and Faculty' },
        { value: 'graduate-students', label: 'Graduate Students and Research Assistants' },
        { value: 'industry-researchers', label: 'Industry Researchers and R&D Teams' },
        { value: 'policy-makers', label: 'Policy Makers and Decision Makers' },
        { value: 'mixed-research', label: 'Mixed Research Community - Adapt Rigor' }
      ]
    }
  },

  coach: {
    primaryGoal: "What personal or professional growth should this agent help achieve?",
    tasks: {
      label: "What coaching services should this agent provide?",
      options: [
        'Goal setting and action planning',
        'Performance feedback and improvement',
        'Skill development and training guidance',
        'Motivation and accountability support',
        'Career development and planning',
        'Personal effectiveness and productivity',
        'Leadership development and mentoring',
        'Conflict resolution and communication skills'
      ]
    },
    targetAudience: {
      label: "Who are the primary coaching clients?",
      options: [
        { value: 'individual-clients', label: 'Individual Clients and Coachees' },
        { value: 'team-members', label: 'Team Members and Direct Reports' },
        { value: 'leaders', label: 'Leaders and Managers' },
        { value: 'professionals', label: 'Working Professionals Seeking Growth' },
        { value: 'mixed-clients', label: 'Mixed Client Base - Adapt Approach' }
      ]
    }
  },

  assistant: {
    primaryGoal: "What tasks and processes should this agent help streamline?",
    tasks: {
      label: "What assistance should this agent provide?",
      options: [
        'Task organization and prioritization',
        'Schedule management and coordination',
        'Information research and compilation',
        'Process documentation and optimization',
        'Communication and correspondence support',
        'Project tracking and follow-up',
        'Resource management and allocation',
        'Workflow automation and efficiency'
      ]
    },
    targetAudience: {
      label: "Who are the primary users needing assistance?",
      options: [
        { value: 'busy-professionals', label: 'Busy Professionals and Executives' },
        { value: 'team-leaders', label: 'Team Leaders and Project Managers' },
        { value: 'small-business', label: 'Small Business Owners and Entrepreneurs' },
        { value: 'remote-workers', label: 'Remote Workers and Freelancers' },
        { value: 'mixed-users', label: 'Mixed User Base - Adapt Support Level' }
      ]
    }
  }
}