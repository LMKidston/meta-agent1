import MetaAgentForm from '@/components/meta-agent-form'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23f1f5f9" fill-opacity="0.4"%3E%3Ccircle cx="12" cy="12" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-60"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-200/30 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-indigo-200/30 to-transparent rounded-full blur-3xl"></div>
      
      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-100 mb-6 shadow-sm">
            <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-slate-600">AI-Powered Prompt Generation</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-6 leading-tight">
            Meta Agent Creator
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-light">
            Craft sophisticated AI agents with precision. Transform your requirements into 
            <span className="font-medium text-blue-700"> expertly tailored prompts</span> ready for any AI platform.
          </p>
          
          {/* Feature highlights */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {['20+ Agent Types', '26+ Industries', 'Smart Framework Filtering', 'Professional Prompts'].map((feature, index) => (
              <div key={index} className="bg-white/60 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/40 shadow-sm">
                <span className="text-sm font-medium text-slate-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <MetaAgentForm />
        
        {/* Enhanced Footer */}
        <footer className="mt-20 text-center">
          <div className="inline-flex items-center space-x-1 text-slate-500 text-sm bg-white/40 backdrop-blur-sm px-6 py-3 rounded-full border border-white/30 shadow-sm">
            <span>Crafted with</span>
            <a 
              href="https://claude.ai/code" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200 hover:underline"
            >
              Claude Code
            </a>
            <span>by</span>
            <a 
              href="https://github.com/LMKidston" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200 hover:underline"
            >
              Lilian Kidston
            </a>
          </div>
        </footer>
      </div>
    </main>
  )
}