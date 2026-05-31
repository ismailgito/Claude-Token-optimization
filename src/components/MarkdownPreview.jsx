import { useState, useCallback, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Copy, Check, Download, Maximize2, Minimize2, Eye, Code } from 'lucide-react';

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
      // Fallback
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
    <div className={`w-full max-w-5xl mx-auto transition-all duration-300 ${isFullscreen ? 'fixed inset-4 z-50' : ''}`}>
      <div className={`glass-card overflow-hidden ${isFullscreen ? 'h-full flex flex-col' : ''}`}>
        {/* Toolbar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800/50">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-slate-200">Optimized Markdown</span>
            <span className="text-xs text-slate-500 bg-slate-800 px-2 py-0.5 rounded-md">
              {lines} lines
            </span>
          </div>

          <div className="flex items-center gap-1">
            {/* View toggle */}
            <div className="flex bg-slate-800 rounded-lg p-0.5 mr-2">
              <button
                onClick={() => setViewMode('preview')}
                className={`p-1.5 rounded-md transition-all ${
                  viewMode === 'preview'
                    ? 'bg-slate-700 text-indigo-400 shadow-sm'
                    : 'text-slate-500 hover:text-slate-300'
                }`}
                title="Preview"
              >
                <Eye className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('source')}
                className={`p-1.5 rounded-md transition-all ${
                  viewMode === 'source'
                    ? 'bg-slate-700 text-indigo-400 shadow-sm'
                    : 'text-slate-500 hover:text-slate-300'
                }`}
                title="Source"
              >
                <Code className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={handleCopy}
              className="p-2 hover:bg-slate-800 rounded-lg transition-colors group relative"
              title="Copy to clipboard"
            >
              {copied ? (
                <Check className="w-4 h-4 text-emerald-400" />
              ) : (
                <Copy className="w-4 h-4 text-slate-400 group-hover:text-slate-200" />
              )}
            </button>

            <button
              onClick={handleDownload}
              className="p-2 hover:bg-slate-800 rounded-lg transition-colors group"
              title="Download as .md file"
            >
              <Download className="w-4 h-4 text-slate-400 group-hover:text-slate-200" />
            </button>

            <button
              onClick={() => setIsFullscreen(v => !v)}
              className="p-2 hover:bg-slate-800 rounded-lg transition-colors group"
              title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
            >
              {isFullscreen ? (
                <Minimize2 className="w-4 h-4 text-slate-400 group-hover:text-slate-200" />
              ) : (
                <Maximize2 className="w-4 h-4 text-slate-400 group-hover:text-slate-200" />
              )}
            </button>
          </div>
        </div>

        {/* Content */}
        <div className={`${isFullscreen ? 'flex-1 overflow-auto' : 'max-h-[600px] overflow-auto'}`}>
          {viewMode === 'preview' ? (
            <div className="p-6 markdown-body">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={{
                  pre: ({ children, ...props }) => (
                    <pre {...props} className="!bg-slate-800 !border !border-slate-700 !rounded-xl p-4 overflow-x-auto">
                      {children}
                    </pre>
                  ),
                  code: ({ children, className, ...props }) => {
                    const isInline = !className;
                    if (isInline) {
                      return (
                        <code {...props} className="text-indigo-300 bg-slate-800 px-1.5 py-0.5 rounded-md text-sm">
                          {children}
                        </code>
                      );
                    }
                    return (
                      <code {...props} className="text-sm">
                        {children}
                      </code>
                    );
                  },
                  table: ({ children }) => (
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-slate-700">{children}</table>
                    </div>
                  ),
                  th: ({ children }) => (
                    <th className="px-4 py-2 bg-slate-800 text-left text-sm font-semibold text-slate-200">
                      {children}
                    </th>
                  ),
                  td: ({ children }) => (
                    <td className="px-4 py-2 text-sm text-slate-300 border-t border-slate-800">
                      {children}
                    </td>
                  ),
                }}
              >
                {markdown}
              </ReactMarkdown>
            </div>
          ) : (
            <div className="p-6" ref={preRef}>
              <pre className="text-sm text-slate-300 font-mono whitespace-pre-wrap break-all leading-relaxed">
                {markdown}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
