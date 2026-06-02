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
  Paperclip,
} from 'lucide-react';
import FileSizeWarning from './FileSizeWarning';
import ProcessingProgress from './ProcessingProgress';
import { MAX_FILE_SIZE } from '../utils/fileUtils';

const SUPPORTED_TYPES = [
  { ext: 'PDF', icon: FileText, color: 'text-claude-accent bg-claude-accent/5' },
  { ext: 'DOCX', icon: FileText, color: 'text-claude-accent bg-claude-accent/5' },
  { ext: 'XLSX', icon: FileSpreadsheet, color: 'text-claude-accent bg-claude-accent/5' },
  { ext: 'TXT', icon: FileText, color: 'text-claude-accent bg-claude-accent/5' },
  { ext: 'CODE', icon: FileCode, color: 'text-claude-accent bg-claude-accent/5' },
];

export default function FileUploader({ onFileSelect, status, fileName, onReset, file, progress }) {
  const [isDragActive, setIsDragActive] = useState(false);
  const [oversizedFile, setOversizedFile] = useState(null);
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

  const handleReset = useCallback(() => {
    setOversizedFile(null);
    onReset?.();
  }, [onReset]);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    const files = e.dataTransfer?.files;
    if (files?.length > 0) {
      if (files[0].size > MAX_FILE_SIZE) {
        setOversizedFile(files[0]);
      } else {
        setOversizedFile(null);
        onFileSelect(files[0]);
      }
    }
  }, [onFileSelect]);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e) => {
    const files = e.target.files;
    if (files?.length > 0) {
      if (files[0].size > MAX_FILE_SIZE) {
        setOversizedFile(files[0]);
      } else {
        setOversizedFile(null);
        onFileSelect(files[0]);
      }
    }
    e.target.value = '';
  };

  const isProcessing = status === 'converting';

  return (
    <div className="w-full">
      <div
        onClick={isProcessing ? undefined : handleClick}
        onDragEnter={isProcessing ? undefined : handleDragIn}
        onDragLeave={isProcessing ? undefined : handleDragOut}
        onDragOver={isProcessing ? undefined : handleDrag}
        onDrop={isProcessing ? undefined : handleDrop}
        className={`
          relative overflow-hidden transition-all duration-300
          ${isProcessing ? 'cursor-default pointer-events-none' : 'cursor-pointer'}
          ${status === 'done' || status === 'error'
            ? 'claude-card p-6 shadow-md'
            : `file-drop-zone-claude ${isDragActive ? 'active' : ''}`}
        `}
      >
        {/* Success state */}
        {status === 'done' && (
          <div className="flex items-center gap-3 sm:gap-5">
            <div className="p-2.5 sm:p-3 bg-green-50 dark:bg-green-900/20 rounded-xl shrink-0">
              <CheckCircle2 className="w-6 h-6 sm:w-8 sm:h-8 text-green-600 dark:text-green-500" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm sm:text-base font-semibold text-claude-text dark:text-claude-darkText truncate">{fileName}</p>
              <p className="text-xs sm:text-sm text-green-600 dark:text-green-500 mt-0.5">Ready for optimization</p>
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); handleReset(); }}
              className="p-2 hover:bg-claude-bg dark:hover:bg-claude-darkSecondary rounded-full transition-colors shrink-0"
            >
              <X className="w-5 h-5 text-claude-muted dark:text-claude-darkMuted" />
            </button>
          </div>
        )}

        {/* Error state */}
        {status === 'error' && (
          <div className="flex items-center gap-3 sm:gap-5">
            <div className="p-2.5 sm:p-3 bg-red-50 dark:bg-red-900/20 rounded-xl shrink-0">
              <AlertCircle className="w-6 h-6 sm:w-8 sm:h-8 text-red-600 dark:text-red-500" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm sm:text-base font-semibold text-red-600 dark:text-red-400">Failed to process</p>
              <p className="text-xs sm:text-sm text-red-500/80 dark:text-red-400/80 mt-0.5 truncate">{fileName}</p>
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); handleReset(); }}
              className="p-2 hover:bg-claude-bg dark:hover:bg-claude-darkSecondary rounded-full transition-colors shrink-0"
            >
              <X className="w-5 h-5 text-claude-muted dark:text-claude-darkMuted" />
            </button>
          </div>
        )}

        {/* Converting state */}
        {isProcessing && (
          <div className="flex items-center gap-4 sm:gap-6 py-3 sm:py-4">
            <div className="relative shrink-0">
              <div className="absolute inset-0 bg-claude-accent/20 rounded-full blur-md animate-pulse" />
              <div className="relative p-2.5 sm:p-3 bg-claude-accent/10 rounded-full">
                <Loader2 className="w-6 h-6 sm:w-8 sm:h-8 text-claude-accent animate-spin" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-base sm:text-lg font-medium text-claude-text dark:text-claude-darkText">Analyzing your file...</p>
              <p className="text-xs sm:text-sm text-claude-muted dark:text-claude-darkMuted mt-1 truncate">Extracting content from {fileName}</p>
            </div>
          </div>
        )}

        {/* Idle state */}
        {status === 'idle' && (
          <div className="flex flex-col items-center gap-4 sm:gap-6 py-3 sm:py-4">
            <div className="p-3 sm:p-4 bg-claude-bg dark:bg-claude-darkSecondary rounded-2xl shadow-inner transition-colors">
              <Paperclip className="w-8 h-8 sm:w-10 sm:h-10 text-claude-accent" />
            </div>
            <div className="text-center px-2">
              <p className="text-lg sm:text-xl font-medium text-claude-text dark:text-claude-darkText">
                {isDragActive ? 'Release to upload' : 'Click or drag file here'}
              </p>
              <p className="text-xs sm:text-sm text-claude-muted dark:text-claude-darkMuted mt-2 max-w-sm mx-auto">
                Upload PDFs, Word docs, spreadsheets, or code. 
                Everything is processed locally in your browser.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-2 sm:mt-4">
              {SUPPORTED_TYPES.map(({ ext, icon: Icon, color }) => (
                <span
                  key={ext}
                  className={`inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[10px] sm:text-xs font-semibold border border-claude-border dark:border-claude-darkBorder shadow-sm ${color}`}
                >
                  <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  {ext}
                </span>
              ))}
            </div>
          </div>
        )}

        <input
          ref={inputRef}
          type="file"
          onChange={handleChange}
          className="hidden"
          accept=".pdf,.docx,.doc,.xlsx,.xls,.csv,.tsv,.txt,.md,.markdown,.html,.htm,.json,.xml,.yaml,.yml,.js,.jsx,.ts,.tsx,.py,.rb,.java,.c,.cpp,.h,.hpp,.go,.rs,.swift,.kt,.php,.sh,.bash,.css,.scss,.less,.png,.jpg,.jpeg,.gif,.svg,.webp,.bmp,.ico,.log,.ini,.cfg,.env,.toml,.odt,.rtf,.ppt,.pptx,.ods,.odp"
        />
      </div>

      <FileSizeWarning file={oversizedFile} onDismiss={() => setOversizedFile(null)} />
      <ProcessingProgress file={file} status={status} progress={progress} />
    </div>
  );
}
