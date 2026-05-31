import { useState, useCallback } from 'react';
import Header from './components/Header';
import FileUploader from './components/FileUploader';
import OptimizationSummary from './components/OptimizationSummary';
import MarkdownPreview from './components/MarkdownPreview';
import HowItWorks from './components/HowItWorks';
import useFileConversion from './hooks/useFileConversion';
import { ArrowDown, Sparkles, Shield, FileText, Zap } from 'lucide-react';

function App() {
  const { state, convertFile, reset } = useFileConversion();
  const [showResults, setShowResults] = useState(false);

  const handleFileSelect = useCallback((file) => {
    setShowResults(true);
    convertFile(file);
  }, [convertFile]);

  const handleReset = useCallback(() => {
    reset();
    setShowResults(false);
  }, [reset]);

  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        <Header />

        <main className="px-4 sm:px-6 lg:px-8 pb-20">
          {/* Hero section */}
          {!showResults && (
            <section className="max-w-4xl mx-auto pt-16 sm:pt-24 pb-12 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-500/10 rounded-full border border-indigo-500/20 mb-6 animate-[fadeInUp_0.6s_ease-out]">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <span className="text-xs font-medium text-indigo-300">Token Optimization Tool</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-balance leading-tight mb-6 animate-[fadeInUp_0.6s_ease-out_0.1s_both]">
                Convert Files to{' '}
                <span className="gradient-text">Token-Efficient</span>{' '}
                Markdown
              </h1>

              <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto text-balance mb-10 animate-[fadeInUp_0.6s_ease-out_0.2s_both]">
                PDFs, Word docs, spreadsheets, code, and more — converted into clean, 
                LLM-optimized markdown. Reduce token usage and save on API costs.
              </p>

              {/* Feature badges */}
              <div className="flex flex-wrap justify-center gap-3 mb-12 animate-[fadeInUp_0.6s_ease-out_0.3s_both]">
                {[
                  { icon: Zap, text: 'Reduce token count', color: 'text-amber-400 bg-amber-500/10' },
                  { icon: Shield, text: '100% client-side', color: 'text-emerald-400 bg-emerald-500/10' },
                  { icon: FileText, text: '10+ formats supported', color: 'text-blue-400 bg-blue-500/10' },
                ].map(({ icon: Icon, text, color }) => (
                  <span key={text} className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium ${color}`}>
                    <Icon className="w-3.5 h-3.5" />
                    {text}
                  </span>
                ))}
              </div>

              {/* Scroll indicator */}
              <div className="animate-bounce mt-8">
                <ArrowDown className="w-5 h-5 text-slate-600 mx-auto" />
              </div>
            </section>
          )}

          {/* Upload section */}
          <section className={`${showResults ? 'pt-8' : 'pb-16'}`}>
            <FileUploader
              onFileSelect={handleFileSelect}
              status={state.status}
              fileName={state.file?.name}
              onReset={handleReset}
            />
          </section>

          {/* Results section */}
          {showResults && state.status !== 'idle' && (
            <section className="space-y-8 pt-4 pb-16">
              {/* Stats */}
              {state.stats && <OptimizationSummary stats={state.stats} />}

              {/* Markdown preview */}
              {state.markdown && (
                <MarkdownPreview
                  markdown={state.markdown}
                  fileName={state.file?.name}
                />
              )}

              {/* Error display */}
              {state.status === 'error' && (
                <div className="max-w-3xl mx-auto glass-card p-6 text-center">
                  <p className="text-red-400 font-medium mb-2">Conversion Error</p>
                  <p className="text-sm text-slate-400">{state.error}</p>
                </div>
              )}
            </section>
          )}

          {/* How it works section */}
          {!showResults && <HowItWorks />}
        </main>

        {/* Footer */}
        <footer className="border-t border-slate-800/50 py-8 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-xs text-slate-600">
              Built with React + Tailwind CSS. File conversion happens entirely in your browser — nothing is uploaded to any server.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
