import { Zap, FileText, ArrowDownRight, Hash } from 'lucide-react';

export default function OptimizationSummary({ stats }) {
  if (!stats) return null;

  const { originalSize, optimizedSize, reduction, originalTokens, optimizedTokens } = stats;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
      {/* File Size Card */}
      <div className="claude-card p-6 bg-white dark:bg-claude-darkCard flex flex-col items-center text-center group">
        <div className="p-3 bg-claude-bg dark:bg-claude-darkSecondary rounded-xl mb-4 transition-colors group-hover:bg-claude-accent/10">
          <FileText className="w-6 h-6 text-claude-accent" />
        </div>
        <div className="flex flex-col">
          <span className="text-3xl font-bold text-claude-text dark:text-claude-darkText">{optimizedSize}</span>
          <span className="text-xs text-claude-muted dark:text-claude-darkMuted font-medium uppercase tracking-wider mt-1">Optimized Size</span>
        </div>
        <div className="mt-4 pt-4 border-t border-claude-border dark:border-claude-darkBorder w-full flex items-center justify-center gap-2">
          <span className="text-xs text-claude-muted dark:text-claude-darkMuted">Was {originalSize}</span>
        </div>
      </div>

      {/* Reduction Card */}
      <div className="claude-card p-6 bg-white dark:bg-claude-darkCard flex flex-col items-center text-center group">
        <div className="p-3 bg-claude-bg dark:bg-claude-darkSecondary rounded-xl mb-4 transition-colors group-hover:bg-claude-accent/10">
          <ArrowDownRight className="w-6 h-6 text-claude-accent" />
        </div>
        <div className="flex flex-col">
          <span className="text-3xl font-bold text-claude-accent">{reduction}%</span>
          <span className="text-xs text-claude-muted dark:text-claude-darkMuted font-medium uppercase tracking-wider mt-1">Size Reduction</span>
        </div>
        <div className="mt-4 pt-4 border-t border-claude-border dark:border-claude-darkBorder w-full flex items-center justify-center gap-2">
          <div className="w-24 h-1.5 bg-claude-bg dark:bg-claude-darkSecondary rounded-full overflow-hidden">
            <div 
              className="h-full bg-claude-accent rounded-full" 
              style={{ width: `${reduction}%` }}
            />
          </div>
        </div>
      </div>

      {/* Token Savings Card */}
      <div className="claude-card p-6 bg-white dark:bg-claude-darkCard flex flex-col items-center text-center group">
        <div className="p-3 bg-claude-bg dark:bg-claude-darkSecondary rounded-xl mb-4 transition-colors group-hover:bg-claude-accent/10">
          <Zap className="w-6 h-6 text-claude-accent" />
        </div>
        <div className="flex flex-col">
          <span className="text-3xl font-bold text-claude-text dark:text-claude-darkText">~{optimizedTokens}</span>
          <span className="text-xs text-claude-muted dark:text-claude-darkMuted font-medium uppercase tracking-wider mt-1">Est. Tokens</span>
        </div>
        <div className="mt-4 pt-4 border-t border-claude-border dark:border-claude-darkBorder w-full flex items-center justify-center gap-2 text-xs text-claude-muted dark:text-claude-darkMuted font-medium">
          Saved ~{originalTokens - optimizedTokens} tokens
        </div>
      </div>

      {/* Efficiency Score Card */}
      <div className="claude-card p-6 bg-white dark:bg-claude-darkCard flex flex-col items-center text-center group">
        <div className="p-3 bg-claude-bg dark:bg-claude-darkSecondary rounded-xl mb-4 transition-colors group-hover:bg-claude-accent/10">
          <Hash className="w-6 h-6 text-claude-accent" />
        </div>
        <div className="flex flex-col">
          <span className="text-3xl font-bold text-claude-text dark:text-claude-darkText">A+</span>
          <span className="text-xs text-claude-muted dark:text-claude-darkMuted font-medium uppercase tracking-wider mt-1">Efficiency</span>
        </div>
        <div className="mt-4 pt-4 border-t border-claude-border dark:border-claude-darkBorder w-full flex items-center justify-center gap-2 text-xs text-claude-muted dark:text-claude-darkMuted font-medium">
          Ready for Claude 3.5
        </div>
      </div>
    </div>
  );
}
