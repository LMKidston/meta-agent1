import MetaAgentForm from '@/components/meta-agent-form'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23f1f5f9%22%20fill-opacity%3D%220.4%22%3E%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%221%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-60"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-200/30 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-indigo-200/30 to-transparent rounded-full blur-3xl"></div>
      
      <div className="relative z-10 container mx-auto px-6 py-8 md:py-16">
        {/* Header Section */}
        <div className="text-center mb-16 max-w-5xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-100 mb-8 shadow-sm">
            <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-slate-600">AI-Powered Prompt Generation</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-8 px-4">
            <span className="block bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent leading-tight pb-2">
              Meta Agent Creator
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-light px-4">
            Craft sophisticated AI agents with precision. Transform your requirements into 
            <span className="font-medium text-blue-700"> expertly tailored prompts</span> ready for any AI platform.
          </p>
          
          {/* Feature highlights */}
          <div className="flex flex-wrap justify-center gap-3 mt-10 px-4">
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