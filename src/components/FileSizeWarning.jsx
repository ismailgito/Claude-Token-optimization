import { AlertTriangle, X, HardDrive } from 'lucide-react';
import { MAX_FILE_SIZE, formatFileSize } from '../utils/fileUtils';

export default function FileSizeWarning({ file, onDismiss }) {
  if (!file || file.size <= MAX_FILE_SIZE) return null;

  const overBy = file.size - MAX_FILE_SIZE;

  return (
    <div className="w-full max-w-4xl mx-auto mt-6 animate-fade-in">
      <div className="relative overflow-hidden rounded-2xl border border-red-200 dark:border-red-900/30 bg-red-50 dark:bg-red-900/10 p-6 shadow-sm">
        <div className="relative z-10 flex items-start gap-4">
          <div className="p-3 bg-white dark:bg-claude-darkCard rounded-xl shadow-sm border border-red-100 dark:border-red-900/20 shrink-0">
            <AlertTriangle className="w-7 h-7 text-red-600 dark:text-red-500" />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-base font-bold text-red-900 dark:text-red-100 mb-1">
              File exceeds size limit
            </h3>
            <p className="text-sm text-red-800 dark:text-red-200 leading-relaxed font-medium">
              <span className="font-bold underline decoration-red-300 dark:decoration-red-700">{file.name}</span> is{' '}
              <span className="font-bold">{formatFileSize(file.size)}</span>.
              The maximum allowed size is <span className="font-bold">25 MB</span>.
            </p>

            <div className="mt-4 flex items-center gap-3">
              <HardDrive className="w-4 h-4 text-red-400 dark:text-red-600" />
              <div className="flex-1 h-2.5 bg-red-200 dark:bg-red-900/30 rounded-full overflow-hidden">
                <div
                  className="h-full bg-red-600 dark:bg-red-500 rounded-full"
                  style={{ width: '100%' }}
                />
              </div>
              <span className="text-xs font-bold text-red-800 dark:text-red-200 shrink-0">
                +{formatFileSize(overBy)} over
              </span>
            </div>

            <p className="mt-3 text-xs text-red-700/70 dark:text-red-300/50 font-medium italic">
              Try compressing or splitting the file to reduce its size below the limit.
            </p>
          </div>

          <button
            onClick={onDismiss}
            className="p-2 hover:bg-white/50 dark:hover:bg-red-900/20 rounded-full transition-colors shrink-0"
          >
            <X className="w-5 h-5 text-red-400 dark:text-red-600 hover:text-red-600 dark:hover:text-red-400" />
          </button>
        </div>
      </div>
    </div>
  );
}
