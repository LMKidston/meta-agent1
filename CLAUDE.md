# Meta Agent Creator - Project Instructions

## Project Overview
This is a Next.js web application that helps novice users create their own AI agents through an intuitive form-based interface. The application generates customized prompts that can be used with various AI platforms (You.com, ChatGPT, Claude, etc.).

## Key Features
- Single-page scrollable form with multiple question types
- Professional, user-friendly interface
- Responsive design for all devices
- Dynamic prompt generation based on user inputs
- Easy copy-to-clipboard functionality for generated prompts
- Optimized for Vercel deployment

## Technical Stack
- **Framework**: Next.js 14+ with App Router
- **Styling**: Tailwind CSS for professional UI/UX
- **Deployment**: Vercel
- **Repository**: https://github.com/LMKidston/meta-agent1

## Form Question Types
1. **Multiple Choice**: Radio buttons for single selection
2. **Multi-Select**: Checkboxes for multiple options
3. **Text Input**: Short text fields for specific details
4. **Textarea**: Longer text areas for descriptions
5. **Range Sliders**: For numeric preferences (e.g., creativity level)
6. **Dropdown Selects**: For categorized options

## Question Categories
1. **Agent Purpose & Domain**
   - What type of tasks should your agent help with?
   - What industry or field will it serve?
   - What's the primary goal of your agent?

2. **Communication Style**
   - Tone (Professional, Casual, Friendly, etc.)
   - Formality level
   - Response length preference

3. **Expertise Level**
   - Target audience (Beginner, Intermediate, Expert)
   - Technical depth required
   - Explanation style preference

4. **Behavior & Personality**
   - How proactive should the agent be?
   - Should it ask clarifying questions?
   - Creativity vs. accuracy balance

5. **Output Format**
   - Preferred response structure
   - Include examples in responses?
   - Step-by-step vs. summary format

## Development Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript checks

## File Structure
```
/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── select.tsx
│   │   └── textarea.tsx
│   ├── form-sections/
│   │   ├── agent-purpose.tsx
│   │   ├── communication-style.tsx
│   │   ├── expertise-level.tsx
│   │   ├── behavior-personality.tsx
│   │   └── output-format.tsx
│   ├── meta-agent-form.tsx
│   └── prompt-generator.tsx
├── lib/
│   ├── utils.ts
│   └── prompt-templates.ts
├── types/
│   └── form-data.ts
└── public/
    └── favicon.ico
```

## Prompt Generation Logic
The application should generate comprehensive prompts that include:
1. Role definition based on user selections
2. Communication guidelines
3. Expertise level and explanation style
4. Behavioral instructions
5. Output format specifications
6. Example interactions (optional)

## Design Guidelines
- Clean, modern interface with good typography
- Consistent spacing and visual hierarchy
- Smooth scrolling between sections
- Progress indicator showing completion status
- Responsive design for mobile and desktop
- Accessible form controls with proper labels
- Professional color scheme (consider blues/grays)

## Deployment Notes
- Optimized for Vercel deployment
- Environment variables for any API keys (if needed)
- Static generation where possible for performance
- Proper meta tags for SEO

## Testing Requirements
- Form validation for required fields
- Prompt generation accuracy
- Responsive design testing
- Cross-browser compatibility
- Copy-to-clipboard functionality

## Future Enhancements
- Save/load form configurations
- Template library for common agent types
- Advanced prompt customization options
- Integration with AI platforms for direct deployment