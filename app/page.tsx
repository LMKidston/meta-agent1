import MetaAgentForm from '@/components/meta-agent-form'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Meta Agent Creator
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Build your own AI agent in minutes. Answer a few questions and get a 
            custom prompt ready for ChatGPT, Claude, or any AI platform.
          </p>
        </div>
        <MetaAgentForm />
        
        {/* Footer */}
        <footer className="mt-16 text-center text-gray-500 text-sm">
          <p>
            Built with{' '}
            <a 
              href="https://claude.ai/code" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 underline"
            >
              Claude Code
            </a>
            {' '}by{' '}
            <a 
              href="https://github.com/LMKidston" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 underline"
            >
              Lilian Kidston
            </a>
          </p>
        </footer>
      </div>
    </main>
  )
}