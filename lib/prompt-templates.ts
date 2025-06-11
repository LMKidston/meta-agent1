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