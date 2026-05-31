import { Sparkles, Github } from 'lucide-react';

export default function Header() {
  return (
    <header className="relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl blur-md opacity-70" />
              <div className="relative bg-slate-900 p-2.5 rounded-xl border border-slate-700/50">
                <Sparkles className="w-6 h-6 text-indigo-400" />
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold gradient-text">Token Optimizer</h1>
              <p className="text-xs text-slate-500 -mt-0.5">File → Markdown Converter</p>
            </div>
          </div>

          <nav className="flex items-center gap-4">
            <a
              href="#how-it-works"
              className="text-sm text-slate-400 hover:text-slate-200 transition-colors"
            >
              How it works
            </a>
            <a
              href="https://github.com/Mirza-Glitch/markitdown-js"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-200 transition-colors"
            >
              <Github className="w-4 h-4" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
