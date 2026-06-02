import { useState, useEffect, useRef } from 'react';
import { Loader2, Clock, Zap, Snail } from 'lucide-react';
import { formatFileSize } from '../utils/fileUtils';

function getSpeedCategory(fileSize) {
  if (fileSize < 500 * 1024) return { label: 'Blazing Fast', icon: Zap, color: 'text-green-600 bg-green-50 dark:bg-green-900/20' };
  if (fileSize < 2 * 1024 * 1024) return { label: 'Fast', icon: Clock, color: 'text-claude-accent bg-claude-accent/5 dark:bg-claude-accent/10' };
  if (fileSize < 10 * 1024 * 1024) return { label: 'Standard', icon: Snail, color: 'text-amber-600 bg-amber-50 dark:bg-amber-900/20' };
  return { label: 'Intensive', icon: Snail, color: 'text-red-600 bg-red-50 dark:bg-red-900/20' };
}

function computeDisplayProgress(progress) {
  if (!progress || progress.total === 0) return 0;
  const ratio = progress.current / progress.total;
  return Math.min(ratio * 100, 98);
}

export default function ProcessingProgress({ file, status, progress }) {
  const [elapsed, setElapsed] = useState(0);
  const [displayProgress, setDisplayProgress] = useState(0);
  const [smoothProgress, setSmoothProgress] = useState(0);
  const startTimeRef = useRef(null);
  const intervalRef = useRef(null);

  const fileSize = file?.size || 0;
  const speed = getSpeedCategory(fileSize);
  const SpeedIcon = speed.icon;

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (status === 'converting') {
      if (!startTimeRef.current) {
        startTimeRef.current = Date.now();
      }
      intervalRef.current = setInterval(() => {
        const now = Date.now();
        setElapsed((now - startTimeRef.current) / 1000);
      }, 200);
    }

    if (status === 'done') {
      setDisplayProgress(100);
      setTimeout(() => {
        setElapsed(0);
        startTimeRef.current = null;
      }, 800);
    }

    if (status === 'idle' || status === 'error') {
      startTimeRef.current = null;
      setDisplayProgress(0);
      setElapsed(0);
      setSmoothProgress(0);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [status]);

  useEffect(() => {
    if (status === 'converting' && progress) {
      setDisplayProgress(computeDisplayProgress(progress));
    }
  }, [status, progress]);

  useEffect(() => {
    if (status !== 'converting') return;

    const target = displayProgress;
    let animFrame;

    const tick = () => {
      setSmoothProgress(prev => {
        const diff = target - prev;
        const step = diff * 0.15;
        if (Math.abs(diff) < 0.3) return target;
        return prev + step;
      });
      animFrame = requestAnimationFrame(tick);
    };

    animFrame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animFrame);
  }, [status, displayProgress]);

  if (status !== 'converting') return null;

  const currentStep = progress?.current || 0;
  const totalSteps = progress?.total || 0;
  const phase = progress?.phase || 'Processing...';

  return (
    <div className="w-full max-w-4xl mx-auto mt-6 animate-fade-in">
      <div className="relative overflow-hidden claude-card bg-white dark:bg-claude-darkCard p-4 sm:p-6 shadow-md border-claude-border dark:border-claude-darkBorder">
        <div className="relative z-10">
          {/* Header row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-3">
            <div className="flex items-center gap-3 sm:gap-4 min-w-0">
              <div className="p-2 bg-claude-bg dark:bg-claude-darkSecondary rounded-lg shrink-0">
                <Loader2 className="w-5 h-5 text-claude-accent animate-spin" />
              </div>
              <div className="min-w-0">
                <p className="text-sm sm:text-base font-bold text-claude-text dark:text-claude-darkText">
                  Processing <span className="text-claude-accent underline decoration-claude-accent/30 decoration-2 underline-offset-4 truncate inline-block max-w-full align-bottom">{file?.name}</span>
                </p>
                <p className="text-[10px] sm:text-xs text-claude-muted dark:text-claude-darkMuted mt-1 uppercase tracking-widest font-bold">
                  {formatFileSize(fileSize)} • {phase}
                </p>
              </div>
            </div>
            <div className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border border-claude-border dark:border-claude-darkBorder shadow-sm shrink-0 self-start ${speed.color}`}>
              <SpeedIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span className="text-[10px] sm:text-xs font-bold tracking-tight">{speed.label}</span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="relative h-2.5 sm:h-3 bg-claude-bg dark:bg-claude-darkSecondary rounded-full overflow-hidden shadow-inner border border-claude-border dark:border-claude-darkBorder">
            <div
              className="absolute inset-y-0 left-0 rounded-full transition-all duration-300 shadow-sm"
              style={{
                width: `${smoothProgress}%`,
                background: `#d97757`,
              }}
            />
            {/* Shimmer effect */}
            <div
              className="absolute inset-y-0 left-0 rounded-full opacity-30"
              style={{
                width: `${smoothProgress}%`,
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)',
                animation: 'shimmer 2s infinite',
              }}
            />
          </div>

          {/* Status row */}
          <div className="flex items-center justify-between mt-3 sm:mt-4">
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              <span className="text-[10px] sm:text-xs font-bold text-claude-muted dark:text-claude-darkMuted bg-claude-bg dark:bg-claude-darkSecondary px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md">
                {elapsed > 0 && `${Math.round(elapsed)}s ELAPSED`}
              </span>
              {totalSteps > 1 && currentStep > 0 && (
                <span className="text-[10px] sm:text-xs font-bold text-claude-accent bg-claude-accent/5 dark:bg-claude-accent/10 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md">
                  STEP {currentStep} / {totalSteps}
                </span>
              )}
            </div>
            <p className="text-base sm:text-lg font-serif font-bold text-claude-text dark:text-claude-darkText">
              {Math.round(smoothProgress)}%
            </p>
          </div>

          {/* Size-specific tips */}
          {fileSize > 5 * 1024 * 1024 && (
            <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-claude-bg dark:bg-claude-darkSecondary rounded-xl border border-claude-border dark:border-claude-darkBorder flex gap-2.5 sm:gap-3">
              <div className="mt-0.5">
                <span className="text-sm">💡</span>
              </div>
              <p className="text-xs text-claude-muted dark:text-claude-darkMuted leading-relaxed font-medium transition-colors">
                Larger files require intensive client-side analysis. Rest assured, your data remains secure and never leaves this device.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
