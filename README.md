# Meta Agent Creator

**A sophisticated AI agent prompt generation platform built with Next.js 14 and TypeScript.**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FLMKidston%2Fmeta-agent1)
[![Live Demo](https://img.shields.io/badge/demo-live-green)](https://meta-agent1.vercel.app)

## 🚀 Overview

Meta Agent Creator is an intelligent form-based application that helps users create custom AI agent prompts tailored to specific roles and industries. It features dynamic framework filtering, agent-specific questionnaires, and comprehensive prompt generation for use with ChatGPT, Claude, or any AI platform.

## ✨ Key Features

- **🎯 Dynamic Agent Types**: 20+ professional agent types (Consultant, Developer, Teacher, etc.)
- **🏭 Industry-Specific Frameworks**: 26+ industries with curated methodology frameworks
- **🧠 Intelligent Filtering**: Advanced whitelist system ensuring only relevant frameworks appear
- **📝 Custom Prompt Generation**: Comprehensive prompts with role-specific configurations
- **🎨 Professional UI**: Clean, responsive design built with Tailwind CSS
- **⚡ Performance Optimized**: Built on Next.js 14 with App Router

## 🛠 Technology Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Lucide React icons
- **Deployment**: Vercel
- **Development**: ESLint, PostCSS

## 📁 Project Structure

```
meta-agent1/
├── app/                    # Next.js 14 app directory
│   ├── layout.tsx         # Root layout component
│   └── page.tsx          # Home page
├── components/            # React components
│   └── meta-agent-form.tsx # Main form component
├── lib/                   # Utility libraries
│   └── prompt-templates.ts # Prompt generation logic
├── types/                 # TypeScript definitions
│   └── form-data.ts      # Form data interfaces
├── public/               # Static assets
└── Configuration files
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/LMKidston/meta-agent1.git
cd meta-agent1

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:3000` to see the application.

### Deployment

Deploy instantly to Vercel:

```bash
npm run build
npm run start
```

Or use the Vercel CLI:

```bash
vercel deploy
```

## 🎨 Features Deep Dive

### Dynamic Framework Filtering

The application implements a sophisticated whitelist system that ensures users only see frameworks relevant to their selected agent type and industry:

```typescript
// Example: HR Specialist + Cybersecurity only shows relevant frameworks
'hr-specialist': {
  'cybersecurity': ['Risk Assessment Matrix (Cyber)', 'Security Awareness Training']
}
```

### Agent-Specific Questionnaires

Each agent type has customized questions and options:

- **Consultants**: Strategic analysis depth, stakeholder alignment
- **Developers**: Technical depth, architecture patterns  
- **Teachers**: Learning objectives, assessment methods
- **Therapists**: Clinical guidelines, therapeutic interventions

### Intelligent Prompt Generation

Generated prompts include:

- Role-specific responsibilities and expertise
- Industry-appropriate frameworks and methodologies  
- Communication style and formality preferences
- Behavioral guidelines and decision-making approaches
- Output format and structure specifications

## 🧩 Core Components

### MetaAgentForm Component

The main form component handles:
- Dynamic question rendering based on agent type
- Framework filtering with whitelist validation
- Real-time form state management
- Prompt generation and copy-to-clipboard functionality

### Prompt Templates System

Centralized system managing:
- 20+ agent type definitions with descriptions
- 26+ industry frameworks and methodologies
- Agent-specific recommendation patterns
- Dynamic depth concepts (e.g., "Analysis Depth" vs "Creative Exploration")

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Guidelines

1. Follow TypeScript best practices
2. Use Tailwind CSS for styling
3. Maintain component modularity
4. Add appropriate type definitions
5. Test framework filtering logic thoroughly

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Credits

Built with [Claude Code](https://claude.ai/code) by [Lilian Kidston](https://github.com/LMKidston).

## 🔗 Links

- **Live Demo**: [meta-agent1.vercel.app](https://meta-agent1.vercel.app)
- **Repository**: [github.com/LMKidston/meta-agent1](https://github.com/LMKidston/meta-agent1)
- **Vercel**: [Deploy your own](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FLMKidston%2Fmeta-agent1)

---

*Create intelligent AI agents with precision and ease.*