import { useState, useCallback, useEffect } from 'react';
import Header from './components/Header';
import FileUploader from './components/FileUploader';
import OptimizationSummary from './components/OptimizationSummary';
import MarkdownPreview from './components/MarkdownPreview';
import HowItWorks from './components/HowItWorks';
import AuthModal from './components/AuthModal';
import useFileConversion from './hooks/useFileConversion';
import useUsage from './hooks/useUsage';
import { Sparkles, Shield, FileText, Zap, BarChart3 } from 'lucide-react';
import ContextWindowTracker from './components/ContextWindowTracker';

function App() {
  const { state, convertFile, reset } = useFileConversion();
  const { isLimitReached, incrementUsage, isSignedIn, usageCount, limit } = useUsage();
  const [showResults, setShowResults] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('optimization');
  const [authModalView, setAuthModalView] = useState('login');
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = useCallback(() => {
    setIsDark(prev => !prev);
  }, []);

  const handleFileSelect = useCallback((file) => {
    if (isLimitReached) {
      setAuthModalView('signup');
      setIsAuthModalOpen(true);
      return;
    }
    
    setShowResults(true);
    convertFile(file);
    incrementUsage();
  }, [convertFile, isLimitReached, incrementUsage]);

  const handleReset = useCallback(() => {
    reset();
    setShowResults(false);
  }, [reset]);

  const openAuthModal = useCallback((view = 'login') => {
    setAuthModalView(view);
    setIsAuthModalOpen(true);
  }, []);

  return (
    <div className="min-h-screen bg-claude-bg dark:bg-claude-darkBg selection:bg-claude-accent/20 transition-colors duration-300">
      <Header 
        isDark={isDark} 
        toggleTheme={toggleTheme} 
        openAuthModal={openAuthModal}
      />

      <main className="px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
        {/* Usage banner for guests — only on optimization tab */}
        {!isSignedIn && !showResults && activeTab === 'optimization' && (
          <div className="max-w-4xl mx-auto mt-4 text-center">
            <p className="text-xs font-medium text-claude-muted dark:text-claude-darkMuted bg-white/50 dark:bg-claude-darkCard/50 py-2 px-4 rounded-full inline-block border border-claude-border dark:border-claude-darkBorder">
              Guest mode: {Math.max(0, limit - usageCount)} free conversions remaining. <button onClick={() => openAuthModal('signup')} className="text-claude-accent hover:underline ml-1 font-semibold">Sign up for unlimited access</button>
            </p>
          </div>
        )}

        {/* Tab selector */}
        {!showResults && (
          <section className="max-w-4xl mx-auto pt-8 sm:pt-12 lg:pt-20 pb-6 sm:pb-8">
            <div className="flex items-center justify-center animate-fade-in">
              <div className="inline-flex items-center gap-1 p-1 bg-claude-bg dark:bg-claude-darkSecondary border border-claude-border dark:border-claude-darkBorder rounded-2xl shadow-sm">
                <button
                  onClick={() => setActiveTab('optimization')}
                  className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    activeTab === 'optimization'
                      ? 'bg-white dark:bg-claude-darkCard text-claude-text dark:text-claude-darkText shadow-sm border border-claude-border dark:border-claude-darkBorder'
                      : 'text-claude-muted dark:text-claude-darkMuted hover:text-claude-text dark:hover:text-claude-darkText'
                  }`}
                >
                  <Sparkles className={`w-4 h-4 ${activeTab === 'optimization' ? 'text-claude-accent' : ''}`} />
                  <span>Token Optimization</span>
                </button>
                <button
                  onClick={() => setActiveTab('calculator')}
                  className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    activeTab === 'calculator'
                      ? 'bg-white dark:bg-claude-darkCard text-claude-text dark:text-claude-darkText shadow-sm border border-claude-border dark:border-claude-darkBorder'
                      : 'text-claude-muted dark:text-claude-darkMuted hover:text-claude-text dark:hover:text-claude-darkText'
                  }`}
                >
                  <BarChart3 className={`w-4 h-4 ${activeTab === 'calculator' ? 'text-claude-accent' : ''}`} />
                  <span>Tokens Calculator</span>
                </button>
              </div>
            </div>
          </section>
        )}

        {/* ========== TOKEN OPTIMIZATION TAB ========== */}
        {activeTab === 'optimization' && (
          <>
            {/* Hero section */}
            {!showResults && (
              <section className="max-w-4xl mx-auto pb-8 sm:pb-12 text-center">
                <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 bg-claude-accent/10 rounded-full border border-claude-accent/20 mb-6 sm:mb-8 animate-fade-in">
                  <Sparkles className="w-4 h-4 text-claude-accent" />
                  <span className="text-xs font-semibold text-claude-accent uppercase tracking-wider">Token Optimization</span>
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-medium text-claude-text dark:text-claude-darkText leading-[1.1] mb-5 sm:mb-8 animate-fade-in [animation-delay:100ms]">
                  Stop Burning Tokens <br />
                  <span className="text-claude-accent">Start saving</span>
                </h1>

                <p className="text-lg sm:text-xl md:text-2xl text-claude-muted dark:text-claude-darkMuted max-w-2xl mx-auto text-balance mb-8 sm:mb-12 animate-fade-in [animation-delay:200ms] font-light px-2">
                  PDFs, documents, and code — converted into clean, 
                  LLM-optimized markdown. Ready for Claude, ChatGPT, and beyond.
                </p>

                {/* Feature badges */}
                <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-10 sm:mb-16 animate-fade-in [animation-delay:300ms]">
                  {[
                    { icon: Zap, text: 'Token efficient', color: 'text-claude-text dark:text-claude-darkText bg-white dark:bg-claude-darkCard border-claude-border dark:border-claude-darkBorder' },
                    { icon: Shield, text: 'Private & Secure', color: 'text-claude-text dark:text-claude-darkText bg-white dark:bg-claude-darkCard border-claude-border dark:border-claude-darkBorder' },
                    { icon: FileText, text: '10+ Formats', color: 'text-claude-text dark:text-claude-darkText bg-white dark:bg-claude-darkCard border-claude-border dark:border-claude-darkBorder' },
                  ].map(({ icon: Icon, text, color }) => (
                    <span key={text} className={`inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium border shadow-sm ${color}`}>
                      <Icon className="w-4 h-4 text-claude-accent" />
                      {text}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Upload section */}
            <section className={`${showResults ? 'pt-8' : 'pb-16'} max-w-4xl mx-auto`}>
              <FileUploader
                onFileSelect={handleFileSelect}
                status={state.status}
                fileName={state.file?.name}
                onReset={handleReset}
                file={state.file}
                progress={state.progress}
              />
            </section>

            {/* Results section */}
            {showResults && state.status !== 'idle' && (
              <section className="space-y-12 pt-4 pb-16 max-w-5xl mx-auto">
                {state.stats && <OptimizationSummary stats={state.stats} />}

                {state.markdown && (
                  <MarkdownPreview
                    markdown={state.markdown}
                    fileName={state.file?.name}
                  />
                )}

                {state.status === 'error' && (
                  <div className="max-w-3xl mx-auto claude-card p-8 text-center animate-fade-in">
                    <p className="text-red-600 font-semibold mb-2 text-lg">Conversion Error</p>
                    <p className="text-claude-muted dark:text-claude-darkMuted">{state.error}</p>
                    <button 
                      onClick={handleReset}
                      className="mt-6 btn-claude-secondary"
                    >
                      Try another file
                    </button>
                  </div>
                )}
              </section>
            )}

            {/* How it works section */}
            {!showResults && <HowItWorks />}
          </>
        )}

        {/* ========== TOKENS CALCULATOR TAB ========== */}
        {activeTab === 'calculator' && !showResults && (
          <section className="pb-16">
            <ContextWindowTracker />
          </section>
        )}
      </main>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        view={authModalView}
        setView={setAuthModalView}
      />

      {/* Footer */}
      <footer className="border-t border-claude-border dark:border-claude-darkBorder py-12 px-4 bg-white/50 dark:bg-claude-darkCard/50">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm text-claude-muted dark:text-claude-darkMuted">
            Built for efficiency. All processing happens locally in your browser.
          </p>
          <div className="mt-4 flex justify-center gap-6">
            <span className="text-xs text-claude-muted/60 dark:text-claude-darkMuted/60 hover:text-claude-accent cursor-pointer transition-colors">Privacy Policy</span>
            <span className="text-xs text-claude-muted/60 dark:text-claude-darkMuted/60 hover:text-claude-accent cursor-pointer transition-colors">Terms of Service</span>
            <span className="text-xs text-claude-muted/60 dark:text-claude-darkMuted/60 hover:text-claude-accent cursor-pointer transition-colors">GitHub</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
