import { Upload, FileText, BarChart3, Download, ArrowRight, Zap, Sparkles } from 'lucide-react';

const STEPS = [
  {
    icon: Upload,
    title: 'Upload Your File',
    description: 'Drag & drop any document — PDF, Word, Excel, HTML, code files, or plain text.',
    color: 'from-blue-500 to-cyan-500',
    bg: 'bg-blue-500/10',
    textColor: 'text-blue-400',
  },
  {
    icon: FileText,
    title: 'Convert to Markdown',
    description: 'Files are parsed into clean, structured markdown — stripping away formatting bloat and binary overhead.',
    color: 'from-purple-500 to-pink-500',
    bg: 'bg-purple-500/10',
    textColor: 'text-purple-400',
  },
  {
    icon: BarChart3,
    title: 'View Optimization Stats',
    description: 'See real-time token estimates, size reduction percentages, and efficiency metrics.',
    color: 'from-amber-500 to-orange-500',
    bg: 'bg-amber-500/10',
    textColor: 'text-amber-400',
  },
  {
    icon: Download,
    title: 'Use in Your LLM',
    description: 'Copy or download the optimized markdown to use as a token-efficient LLM context payload.',
    color: 'from-emerald-500 to-teal-500',
    bg: 'bg-emerald-500/10',
    textColor: 'text-emerald-400',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="w-full max-w-5xl mx-auto py-16">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-500/10 rounded-full border border-indigo-500/20 mb-4">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <span className="text-xs font-medium text-indigo-300">How It Works</span>
        </div>
        <h2 className="text-3xl font-bold gradient-text mb-3">
          From Any File to LLM-Ready Markdown
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-balance">
          Binary files are bulky for LLMs. Converting them to markdown strips away unnecessary 
          formatting, reducing token count while preserving all the content and structure.
        </p>
      </div>

      {/* Steps */}
      <div className="grid md:grid-cols-4 gap-4 mb-12">
        {STEPS.map((step, i) => (
          <div key={i} className="relative group">
            <div className="glass-card-hover p-6 h-full flex flex-col items-center text-center">
              {/* Step number */}
              <span className="absolute top-3 right-3 text-[10px] font-bold text-slate-600 bg-slate-800 px-1.5 py-0.5 rounded-md">
                Step {i + 1}
              </span>

              <div className={`p-3 ${step.bg} rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <step.icon className={`w-7 h-7 ${step.textColor}`} />
              </div>
              <h3 className="text-sm font-semibold text-slate-200 mb-2">{step.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{step.description}</p>
            </div>

            {/* Connector arrow */}
            {i < STEPS.length - 1 && (
              <div className="hidden md:block absolute top-1/2 -right-3 z-10">
                <ArrowRight className="w-5 h-5 text-slate-600" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Benefits section */}
      <div className="glass-card p-8">
        <h3 className="text-lg font-semibold text-slate-200 mb-6 text-center">
          Why Optimize Tokens?
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="flex gap-3">
            <div className="p-2 bg-emerald-500/10 rounded-lg h-fit shrink-0">
              <Zap className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-slate-200 mb-1">Lower Costs</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                LLM pricing is per-token. Reducing tokens means lower API costs for every prompt.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="p-2 bg-blue-500/10 rounded-lg h-fit shrink-0">
              <Sparkles className="w-4 h-4 text-blue-400" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-slate-200 mb-1">Larger Context Windows</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Fit more content into context limits by removing redundant binary overhead.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="p-2 bg-purple-500/10 rounded-lg h-fit shrink-0">
              <BarChart3 className="w-4 h-4 text-purple-400" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-slate-200 mb-1">Better LLM Comprehension</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Clean markdown is easier for models to parse and understand than raw binary formats.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
