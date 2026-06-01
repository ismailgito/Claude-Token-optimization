import { Search, Zap, CheckCircle, Shield, FileOutput, Smartphone, ArrowRight } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      stepNumber: '01',
      icon: Search,
      title: 'Upload & Parse',
      description: 'Drag and drop your files. We support 10+ formats including PDF, Word, Excel, and code files.',
    },
    {
      stepNumber: '02',
      icon: Zap,
      title: 'Smart Optimization',
      description: 'Our engine cleans up formatting, removes redundant data, and optimizes content for LLM token limits.',
    },
    {
      stepNumber: '03',
      icon: FileOutput,
      title: 'Ready for Claude',
      description: 'Get perfectly formatted Markdown that maintains semantic structure while using minimal tokens.',
    },
  ];

  const features = [
    {
      icon: Shield,
      title: '100% Private',
      description: 'All processing happens in your browser. Your data never leaves your device.',
    },
    {
      icon: Smartphone,
      title: 'Clean & Simple',
      description: 'No complex settings. Just upload and get your optimized content instantly.',
    },
  ];

  return (
    <div id="how-it-works" className="max-w-6xl mx-auto pt-24 pb-12 selection:bg-claude-accent/10">
      {/* Header Section */}
      <div className="text-center mb-20 animate-fade-in">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-claude-text dark:text-claude-darkText mb-6 transition-colors">
          How it works
        </h2>
        <p className="text-lg text-claude-muted dark:text-claude-darkMuted max-w-2xl mx-auto font-light transition-colors">
          TokenOptimizer uses advanced client-side processing to transform your messy documents into lean, LLM-ready markdown.
        </p>
      </div>

      {/* 3-Step Process Flow */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-24 relative">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center text-center animate-fade-in relative group" style={{ animationDelay: `${index * 100}ms` }}>
            {/* Visual Step Number Badge */}
            <span className="absolute top-0 right-1/4 text-5xl font-bold text-claude-bg dark:text-claude-darkSecondary/20 select-none group-hover:text-claude-accent/10 transition-colors z-0">
              {step.stepNumber}
            </span>
            
            <div className="w-16 h-16 bg-white dark:bg-claude-darkCard border border-claude-border dark:border-claude-darkBorder rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:border-claude-accent transition-all z-10">
              <step.icon className="w-8 h-8 text-claude-accent" />
            </div>
            <h3 className="text-xl font-semibold text-claude-text dark:text-claude-darkText mb-3 transition-colors z-10">
              {step.title}
            </h3>
            <p className="text-claude-muted dark:text-claude-darkMuted font-light leading-relaxed transition-colors z-10">
              {step.description}
            </p>
          </div>
        ))}
      </div>

      {/* Benefits & Preview Section */}
      <div className="claude-card bg-white dark:bg-claude-darkCard p-12 md:p-16 animate-fade-in transition-colors duration-300 rounded-3xl border border-claude-border dark:border-claude-darkBorder shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: Value Propositions */}
          <div>
            <h2 className="text-3xl font-serif font-bold text-claude-text dark:text-claude-darkText mb-8 transition-colors">
              Why TokenOptimizer?
            </h2>
            <div className="space-y-8">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-4">
                  <div className="mt-1 p-2 bg-claude-bg dark:bg-claude-darkSecondary rounded-xl">
                    <feature.icon className="w-5 h-5 text-claude-accent" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-claude-text dark:text-claude-darkText mb-1 transition-colors">
                      {feature.title}
                    </h4>
                    <p className="text-claude-muted dark:text-claude-darkMuted font-light leading-relaxed transition-colors">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-10 btn-claude-primary">
              Try it now
            </button>
          </div>

          {/* Right Side: Instant "Before vs After" Mental Model */}
          <div className="relative">
            <div className="bg-claude-bg dark:bg-claude-darkSecondary rounded-3xl overflow-hidden border border-claude-border dark:border-claude-darkBorder shadow-inner p-6 flex flex-col sm:flex-row gap-4 items-center justify-center min-h-[300px]">
              
              {/* Before Card */}
              <div className="w-full bg-white dark:bg-claude-darkCard rounded-xl border border-claude-border dark:border-claude-darkBorder p-4 opacity-60 relative">
                <span className="absolute top-2 right-2 text-[10px] uppercase font-mono tracking-wider text-red-500 bg-red-50 dark:bg-red-950/30 px-1.5 py-0.5 rounded">
                  Messy Source
                </span>
                <div className="w-12 h-3 bg-red-200 dark:bg-red-900 rounded mb-3" />
                <div className="space-y-2">
                  <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded" />
                  <div className="w-5/6 h-2 bg-gray-200 dark:bg-gray-700 rounded" />
                  <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded" />
                  <div className="w-2/3 h-2 bg-gray-200 dark:bg-gray-700 rounded" />
                </div>
                <div className="mt-4 pt-2 border-t border-dashed border-gray-200 dark:border-gray-700 text-[11px] text-gray-400 font-mono">
                  Tokens: ~4,200
                </div>
              </div>

              {/* Transition Arrow */}
              <div className="flex items-center justify-center transform rotate-90 sm:rotate-0 bg-claude-accent text-white w-8 h-8 rounded-full shadow-md shrink-0">
                <ArrowRight className="w-4 h-4" />
              </div>

              {/* After Card */}
              <div className="w-full bg-white dark:bg-claude-darkCard rounded-xl border-2 border-claude-accent/30 p-4 shadow-md relative">
                <span className="absolute top-2 right-2 text-[10px] uppercase font-mono tracking-wider text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 px-1.5 py-0.5 rounded font-bold">
                  Clean MD
                </span>
                <div className="w-16 h-3 bg-emerald-200 dark:bg-emerald-900 rounded mb-3" />
                <div className="space-y-2">
                  <div className="w-full h-2 bg-emerald-600/20 rounded" />
                  <div className="w-3/4 h-2 bg-emerald-600/20 rounded" />
                </div>
                <div className="mt-4 pt-2 border-t border-emerald-100 dark:border-emerald-950 text-[11px] text-emerald-600 font-bold font-mono">
                  Tokens: ~1,150 (-72%)
                </div>
              </div>

            </div>
            
            {/* Background Glow Ambiance */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-claude-accent/5 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-claude-accent/5 rounded-full blur-2xl pointer-events-none" />
          </div>

        </div>
      </div>
    </div>
  );
}