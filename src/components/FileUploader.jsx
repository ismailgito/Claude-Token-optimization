import { useCallback, useRef, useState } from 'react';
import {
  Upload,
  FileText,
  FileSpreadsheet,
  FileImage,
  FileCode,
  File,
  AlertCircle,
  Loader2,
  X,
  CheckCircle2,
} from 'lucide-react';

const SUPPORTED_TYPES = [
  { ext: 'PDF', icon: FileText, color: 'text-red-400 bg-red-500/10' },
  { ext: 'DOCX', icon: FileText, color: 'text-blue-400 bg-blue-500/10' },
  { ext: 'XLSX', icon: FileSpreadsheet, color: 'text-emerald-400 bg-emerald-500/10' },
  { ext: 'TXT', icon: FileText, color: 'text-slate-400 bg-slate-500/10' },
  { ext: 'HTML', icon: FileCode, color: 'text-orange-400 bg-orange-500/10' },
  { ext: 'MD', icon: FileText, color: 'text-purple-400 bg-purple-500/10' },
  { ext: 'JSON', icon: FileCode, color: 'text-yellow-400 bg-yellow-500/10' },
  { ext: 'CSV', icon: FileSpreadsheet, color: 'text-green-400 bg-green-500/10' },
  { ext: 'IMG', icon: FileImage, color: 'text-pink-400 bg-pink-500/10' },
  { ext: 'CODE', icon: File, color: 'text-cyan-400 bg-cyan-500/10' },
];

export default function FileUploader({ onFileSelect, status, fileName, onReset }) {
  const [isDragActive, setIsDragActive] = useState(false);
  const inputRef = useRef(null);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragIn = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  }, []);

  const handleDragOut = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    const files = e.dataTransfer?.files;
    if (files?.length > 0) {
      onFileSelect(files[0]);
    }
  }, [onFileSelect]);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e) => {
    const files = e.target.files;
    if (files?.length > 0) {
      onFileSelect(files[0]);
    }
    // Reset so user can select same file again
    e.target.value = '';
  };

  const isProcessing = status === 'converting';

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div
        onClick={isProcessing ? undefined : handleClick}
        onDragEnter={isProcessing ? undefined : handleDragIn}
        onDragLeave={isProcessing ? undefined : handleDragOut}
        onDragOver={isProcessing ? undefined : handleDrag}
        onDrop={isProcessing ? undefined : handleDrop}
        className={`
          relative overflow-hidden rounded-2xl transition-all duration-500 cursor-pointer
          ${isProcessing ? 'cursor-default pointer-events-none' : ''}
          ${status === 'done' || status === 'error'
            ? 'border-2 border-slate-700/50 bg-slate-900/50 backdrop-blur-sm p-6'
            : `file-drop-zone ${isDragActive ? 'active scale-[1.01]' : 'bg-slate-900/30'}`}
        `}
      >
        {/* Animated gradient background when idle */}
        {status === 'idle' && (
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-cyan-500/5 animate-pulse-slow" />
        )}

        {/* Success state */}
        {status === 'done' && (
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-500/10 rounded-xl">
              <CheckCircle2 className="w-8 h-8 text-emerald-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-200 truncate">{fileName}</p>
              <p className="text-xs text-emerald-400 mt-0.5">File processed successfully</p>
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); onReset?.(); }}
              className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-slate-400 hover:text-slate-200" />
            </button>
          </div>
        )}

        {/* Error state */}
        {status === 'error' && (
          <div className="flex items-center gap-4">
            <div className="p-3 bg-red-500/10 rounded-xl">
              <AlertCircle className="w-8 h-8 text-red-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-red-300">Conversion failed</p>
              <p className="text-xs text-red-400/80 mt-0.5 truncate">{fileName}</p>
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); onReset?.(); }}
              className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-slate-400 hover:text-slate-200" />
            </button>
          </div>
        )}

        {/* Converting state */}
        {isProcessing && (
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-500/10 rounded-xl">
              <Loader2 className="w-8 h-8 text-indigo-400 animate-spin" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-200">Converting {fileName}...</p>
              <div className="mt-2 flex gap-1">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Idle state - the main upload prompt */}
        {status === 'idle' && (
          <>
            <div className="relative z-10 flex flex-col items-center gap-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur-xl opacity-30 animate-pulse-slow" />
                <div className="relative p-5 bg-slate-900/80 rounded-full border border-slate-700/50">
                  <Upload className="w-12 h-12 text-indigo-400" />
                </div>
              </div>
              <div>
                <p className="text-xl font-semibold text-slate-200">
                  {isDragActive ? 'Drop your file here' : 'Drop a file here or click to browse'}
                </p>
                <p className="text-sm text-slate-500 mt-2">
                  Convert PDF, DOCX, XLSX, HTML, JSON, CSV, code files & more to clean markdown
                </p>
              </div>
            </div>

            {/* Supported file types grid */}
            <div className="relative z-10 mt-8 flex flex-wrap justify-center gap-2">
              {SUPPORTED_TYPES.map(({ ext, icon: Icon, color }) => (
                <span
                  key={ext}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium ${color}`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {ext}
                </span>
              ))}
            </div>
          </>
        )}

        <input
          ref={inputRef}
          type="file"
          onChange={handleChange}
          className="hidden"
          accept=".pdf,.docx,.doc,.xlsx,.xls,.csv,.tsv,.txt,.md,.markdown,.html,.htm,.json,.xml,.yaml,.yml,.js,.jsx,.ts,.tsx,.py,.rb,.java,.c,.cpp,.h,.hpp,.go,.rs,.swift,.kt,.php,.sh,.bash,.css,.scss,.less,.png,.jpg,.jpeg,.gif,.svg,.webp,.bmp,.ico,.log,.ini,.cfg,.env,.toml,.odt,.rtf,.ppt,.pptx,.ods,.odp"
        />
      </div>
    </div>
  );
}
