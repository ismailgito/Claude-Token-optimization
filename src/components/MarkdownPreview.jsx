import { useState, useCallback, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Copy, Check, Download, Maximize2, Minimize2, Eye, Code, FileText } from 'lucide-react';

export default function MarkdownPreview({ markdown, fileName }) {
  const [copied, setCopied] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [viewMode, setViewMode] = useState('preview'); // 'preview' | 'source'
  const preRef = useRef(null);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(markdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = markdown;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [markdown]);

  const handleDownload = useCallback(() => {
    const baseName = fileName?.replace(/\.[^.]+$/, '') || 'optimized';
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${baseName}_optimized.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [markdown, fileName]);

  if (!markdown) return null;

  const lines = markdown.split('\n').length;

  return (
    <div className={`w-full transition-all duration-300 ${isFullscreen ? 'fixed inset-4 z-50' : 'animate-fade-in'}`}>
      <div className={`claude-card overflow-hidden bg-white dark:bg-claude-darkCard ${isFullscreen ? 'h-[calc(100vh-2rem)] flex flex-col' : 'shadow-lg border-claude-border dark:border-claude-darkBorder'}`}>
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-claude-border dark:border-claude-darkBorder bg-claude-bg/30 dark:bg-claude-darkSecondary/30 gap-3 sm:gap-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="p-2 bg-claude-accent/10 rounded-lg shrink-0">
              <FileText className="w-4 h-4 text-claude-accent" />
            </div>
            <div className="min-w-0">
              <span className="text-xs sm:text-sm font-semibold text-claude-text dark:text-claude-darkText block leading-none truncate">{fileName || 'optimized_content.md'}</span>
              <span className="text-[10px] text-claude-muted dark:text-claude-darkMuted font-bold uppercase tracking-widest mt-1 block">
                {lines} lines • Markdown
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-2">
            {/* View toggle */}
            <div className="flex bg-claude-secondary dark:bg-claude-darkSecondary rounded-full p-1 border border-claude-border dark:border-claude-darkBorder">
              <button
                onClick={() => setViewMode('preview')}
                className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  viewMode === 'preview'
                    ? 'bg-white dark:bg-claude-darkCard text-claude-accent shadow-sm'
                    : 'text-claude-muted dark:text-claude-darkMuted hover:text-claude-text dark:hover:text-claude-darkText'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Preview</span>
              </button>
              <button
                onClick={() => setViewMode('source')}
                className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  viewMode === 'source'
                    ? 'bg-white dark:bg-claude-darkCard text-claude-accent shadow-sm'
                    : 'text-claude-muted dark:text-claude-darkMuted hover:text-claude-text dark:hover:text-claude-darkText'
                }`}
              >
                <Code className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Source</span>
              </button>
            </div>

            <div className="flex items-center gap-0.5 sm:gap-1 border-l border-claude-border dark:border-claude-darkBorder pl-2 sm:pl-4 sm:ml-2">
              <button
                onClick={handleCopy}
                className="p-2 sm:p-2.5 hover:bg-claude-bg dark:hover:bg-claude-darkSecondary rounded-full transition-colors text-claude-muted dark:text-claude-darkMuted hover:text-claude-accent"
                title="Copy to clipboard"
              >
                {copied ? (
                  <Check className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-green-600 dark:text-green-500" />
                ) : (
                  <Copy className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                )}
              </button>

              <button
                onClick={handleDownload}
                className="p-2 sm:p-2.5 hover:bg-claude-bg dark:hover:bg-claude-darkSecondary rounded-full transition-colors text-claude-muted dark:text-claude-darkMuted hover:text-claude-accent"
                title="Download .md file"
              >
                <Download className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
              </button>

              <button
                onClick={() => setIsFullscreen(v => !v)}
                className="hidden sm:block p-2.5 hover:bg-claude-bg dark:hover:bg-claude-darkSecondary rounded-full transition-colors text-claude-muted dark:text-claude-darkMuted hover:text-claude-accent"
                title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
              >
                {isFullscreen ? (
                  <Minimize2 className="w-[18px] h-[18px]" />
                ) : (
                  <Maximize2 className="w-[18px] h-[18px]" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className={`${isFullscreen ? 'flex-1 overflow-auto' : 'max-h-[700px] overflow-auto'} bg-white dark:bg-claude-darkCard transition-colors duration-300`}>
          {viewMode === 'preview' ? (
            <div className="p-4 sm:p-8 md:p-12 markdown-body-claude max-w-4xl mx-auto selection:bg-claude-accent/10">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={{
                  pre: ({ children, ...props }) => (
                    <div className="relative group my-8">
                      <pre {...props} className="!bg-claude-secondary dark:!bg-claude-darkSecondary !border !border-claude-border dark:!border-claude-darkBorder !rounded-2xl p-6 overflow-x-auto shadow-inner">
                        {children}
                      </pre>
                    </div>
                  ),
                  code: ({ children, className, ...props }) => {
                    const isInline = !className;
                    if (isInline) {
                      return (
                        <code {...props} className="text-claude-accent bg-claude-accent/5 px-2 py-0.5 rounded-lg text-sm font-semibold border border-claude-accent/10">
                          {children}
                        </code>
                      );
                    }
                    return (
                      <code {...props} className="text-sm font-mono leading-relaxed block dark:text-claude-darkText">
                        {children}
                      </code>
                    );
                  },
                  table: ({ children }) => (
                    <div className="my-8 overflow-hidden rounded-2xl border border-claude-border dark:border-claude-darkBorder">
                      <table className="min-w-full divide-y divide-claude-border dark:divide-claude-darkBorder">{children}</table>
                    </div>
                  ),
                  th: ({ children }) => (
                    <th className="px-6 py-4 bg-claude-bg dark:bg-claude-darkSecondary text-left text-xs font-bold text-claude-muted dark:text-claude-darkMuted uppercase tracking-wider">
                      {children}
                    </th>
                  ),
                  td: ({ children }) => (
                    <td className="px-6 py-4 text-sm text-claude-text dark:text-claude-darkText border-t border-claude-border dark:border-claude-darkBorder bg-white dark:bg-claude-darkCard">
                      {children}
                    </td>
                  ),
                  h1: ({children}) => <h1 className="text-3xl font-serif font-bold text-claude-text dark:text-claude-darkText mt-12 mb-6">{children}</h1>,
                  h2: ({children}) => <h2 className="text-2xl font-serif font-bold text-claude-text dark:text-claude-darkText mt-10 mb-4">{children}</h2>,
                  h3: ({children}) => <h3 className="text-xl font-serif font-bold text-claude-text dark:text-claude-darkText mt-8 mb-4">{children}</h3>,
                  p: ({children}) => <p className="text-claude-text dark:text-claude-darkText leading-relaxed mb-6 font-light text-lg">{children}</p>,
                }}
              >
                {markdown}
              </ReactMarkdown>
            </div>
          ) : (
            <div className="p-4 sm:p-8 bg-claude-secondary/30 dark:bg-claude-darkSecondary/30 min-h-full" ref={preRef}>
              <pre className="text-sm text-claude-text dark:text-claude-darkText font-mono whitespace-pre-wrap break-all leading-relaxed max-w-4xl mx-auto">
                {markdown}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
