import { useState, useEffect, useRef } from 'react';
import {
  FileText,
  HardDrive,
  Type,
  Zap,
  TrendingDown,
  Layers,
  Sparkles,
} from 'lucide-react';

function AnimatedValue({ value, suffix = '' }) {
  const [displayed, setDisplayed] = useState('0');
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const numValue = parseInt(String(value).replace(/[^0-9]/g, '')) || 0;
          if (!numValue) {
            setDisplayed(String(value));
            return;
          }
          const duration = 800;
          const steps = 30;
          const stepTime = duration / steps;
          let current = 0;
          const interval = setInterval(() => {
            current++;
            const progress = current / steps;
            const eased = 1 - Math.pow(1 - progress, 3);
            const currentVal = Math.round(eased * numValue);
            setDisplayed(String(value).replace(/[0-9]+/, currentVal.toLocaleString()));
            if (current >= steps) {
              setDisplayed(String(value));
              clearInterval(interval);
            }
          }, stepTime);
          return () => clearInterval(interval);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return <span ref={ref}>{displayed}{suffix}</span>;
}

function StatCard({ icon: Icon, label, value, sub, accent = 'indigo' }) {
  const accentColors = {
    indigo: 'from-indigo-500/20 to-purple-500/20 border-indigo-500/20',
    emerald: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/20',
    amber: 'from-amber-500/20 to-orange-500/20 border-amber-500/20',
    cyan: 'from-cyan-500/20 to-blue-500/20 border-cyan-500/20',
    rose: 'from-rose-500/20 to-pink-500/20 border-rose-500/20',
    violet: 'from-violet-500/20 to-purple-500/20 border-violet-500/20',
  };

  const iconColors = {
    indigo: 'text-indigo-400', emerald: 'text-emerald-400', amber: 'text-amber-400',
    cyan: 'text-cyan-400', rose: 'text-rose-400', violet: 'text-violet-400',
  };

  return (
    <div className={`stat-card relative overflow-hidden bg-gradient-to-br ${accentColors[accent]} backdrop-blur-xl border animate-[fadeInUp_0.5s_ease-out]`}>
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-full -translate-y-1/2 translate-x-1/2" />
      <Icon className={`w-8 h-8 ${iconColors[accent]}`} />
      <span className="stat-value text-2xl">
        {typeof value === 'string' && (value.includes('%') || value.includes('KB') || value.includes('Optimized'))
          ? value
          : <AnimatedValue value={value} />
        }
      </span>
      <span className="stat-label">{label}</span>
      {sub && <span className="text-[10px] text-slate-600 -mt-1">{sub}</span>}
    </div>
  );
}

export default function OptimizationSummary({ stats }) {
  if (!stats) return null;

  const {
    fileName,
    fileSize,
    fileType,
    category,
    markdownLength,
    optimizedTokens,
    reductionPercent,
  } = stats;

  const originalSizeKB = (stats.originalSize / 1024).toFixed(1);
  const markdownSizeKB = markdownLength ? (markdownLength / 1024).toFixed(1) : '0';

  return (
    <div className="w-full max-w-5xl mx-auto animate-[fadeIn_0.5s_ease-out]">
      {/* File info bar */}
      <div className="glass-card p-4 mb-6 flex items-center gap-3 flex-wrap animate-[fadeInUp_0.4s_ease-out]">
        <div className="p-2 bg-indigo-500/10 rounded-lg">
          <FileText className="w-5 h-5 text-indigo-400" />
        </div>
        <span className="text-sm font-medium text-slate-200 truncate max-w-[200px] sm:max-w-sm">{fileName}</span>
        <span className="px-2 py-0.5 text-xs font-medium bg-slate-800 rounded-md text-slate-400">{fileType}</span>
        <span className="px-2 py-0.5 text-xs font-medium bg-purple-500/10 text-purple-300 rounded-md capitalize">{category}</span>
        <span className="text-xs text-slate-500 ml-auto">{fileSize}</span>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
        <StatCard
          icon={HardDrive}
          label="Original Size"
          value={`${originalSizeKB} KB`}
          accent="amber"
        />
        <StatCard
          icon={Type}
          label="Markdown Size"
          value={`${markdownSizeKB} KB`}
          accent="cyan"
        />
        <StatCard
          icon={Zap}
          label="Optimized Tokens"
          value={optimizedTokens?.toLocaleString()}
          sub="~1 token / 4 chars"
          accent="indigo"
        />
        <StatCard
          icon={TrendingDown}
          label="Size Reduction"
          value={`${reductionPercent}%`}
          sub={reductionPercent > 0 ? `${(originalSizeKB - markdownSizeKB).toFixed(1)} KB saved` : 'Minimal'}
          accent={reductionPercent > 30 ? 'emerald' : reductionPercent > 10 ? 'amber' : 'rose'}
        />
        <StatCard
          icon={Layers}
          label="Markdown Chars"
          value={markdownLength?.toLocaleString()}
          accent="violet"
        />
        <StatCard
          icon={Sparkles}
          label="LLM-Ready"
          value="Optimized ✓"
          accent="emerald"
        />
      </div>

      {/* Reduction bar */}
      <div className="glass-card p-4 mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-slate-400 font-medium">Token optimization efficiency</span>
          <span className="text-xs text-emerald-400 font-bold">{reductionPercent}% reduction</span>
        </div>
        <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full bg-gradient-to-r transition-all duration-1000 ease-out ${
              reductionPercent > 50
                ? 'from-emerald-500 to-teal-400'
                : reductionPercent > 20
                ? 'from-amber-500 to-orange-400'
                : 'from-rose-500 to-pink-400'
            }`}
            style={{ width: '0%' }}
            ref={(el) => {
              if (el) setTimeout(() => { el.style.width = `${Math.min(reductionPercent, 100)}%`; }, 100);
            }}
          />
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-[10px] text-slate-600">Original: {fileSize}</span>
          <span className="text-[10px] text-slate-600">Markdown: {markdownSizeKB} KB</span>
        </div>
      </div>
    </div>
  );
}
