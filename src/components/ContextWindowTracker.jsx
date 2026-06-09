import { useState, useRef } from "react";
import { Hash, BarChart3, Lightbulb, RotateCcw, X, Plus, AlertTriangle, Gauge, Layers, Zap } from "lucide-react";

const MAX = 200000;

function est(text) {
  return Math.round((text || "").length / 4);
}

const TIPS = [
  { icon: "⚙", title: "Short system prompt", body: "Every turn re-sends the system prompt. 500 tokens there = 500 × all turns wasted. Trim ruthlessly." },
  { icon: "🗣", title: "No pleasantries", body: '"Sure! Happy to help…" wastes output tokens that become input next turn. Use caveman mode or instruct: "be terse."' },
  { icon: "📦", title: "Compress at 50%", body: 'Ask: "Summarize our conversation in 200 words, then continue." Start new sessions with that summary.' },
  { icon: "📁", title: "Avoid big file dumps", body: "Pasting whole codebases = instant bloat. Paste only the relevant section. Use line ranges." },
  { icon: "🎯", title: "One task per session", body: "Mixed topics drag irrelevant history forward. Separate sessions = clean context." },
  { icon: "🔁", title: "Don't ask Claude to repeat", body: '"Show me that again" doubles tokens. Copy from the prior message instead.' },
  { icon: "🧠", title: "Skip chain-of-thought when unneeded", body: '"Think step by step" = long output = large input next turn. Use only when accuracy matters.' },
  { icon: "🔧", title: "Summarize tool output", body: "Apify/MCP results dump 5k+ tokens. Say: \"Summarize tool output before responding\" — saves ~80%." },
  { icon: "🖼", title: "Images eat tokens", body: "Each image ≈ 1,000–2,000 tokens. Don't re-send the same image across turns." },
  { icon: "🔄", title: "Fresh session beats long one", body: "After 10+ turns on a complex topic → start new with a 3-sentence briefing. Cheaper and faster." },
];

export default function ContextWindowTracker() {
  const [turns, setTurns] = useState([]);
  const [userText, setUserText] = useState("");
  const [asstText, setAsstText] = useState("");
  const [label, setLabel] = useState("");
  const [override, setOverride] = useState("");
  const [showTips, setShowTips] = useState(false);
  const listRef = useRef(null);

  const userTok = est(userText);
  const asstTok = est(asstText);

  const cumTotal = turns.reduce((a, t) => a + t.total, 0);
  const pct = Math.min(100, Math.round((cumTotal / MAX) * 100));
  const remaining = Math.max(0, MAX - cumTotal);

  const barColor = pct >= 90 ? "#E24B4A" : pct >= 75 ? "#EF9F27" : "#d97757";

  function addTurn() {
    const total = override ? parseInt(override) : userTok + asstTok;
    if (!total) return;
    const newTurn = {
      label: label || `turn ${turns.length + 1}`,
      userTok,
      asstTok,
      total,
      override: !!override,
    };
    setTurns((prev) => [...prev, newTurn]);
    setUserText("");
    setAsstText("");
    setLabel("");
    setOverride("");
    setTimeout(() => listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" }), 50);
  }

  function removeTurn(i) {
    setTurns((prev) => prev.filter((_, idx) => idx !== i));
  }

  function resetAll() {
    if (turns.length === 0) return;
    setTurns([]);
  }

  return (
    <div className="w-full animate-fade-in">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 bg-claude-accent/10 rounded-full border border-claude-accent/20 mb-4">
            <BarChart3 className="w-4 h-4 text-claude-accent" />
            <span className="text-xs font-semibold text-claude-accent uppercase tracking-wider">Tokens Calculator</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-claude-text dark:text-claude-darkText">
            Context Window Tracker
          </h2>
          <p className="text-sm sm:text-base text-claude-muted dark:text-claude-darkMuted mt-2 font-light">
            Simulate conversation turns and estimate your token usage against the 200k context window.
          </p>
        </div>

        {/* Main stats card */}
        <div className="claude-card p-6 sm:p-8 bg-white dark:bg-claude-darkCard">
          {/* Big token display */}
          <div className="mb-5">
            <div className="font-mono text-4xl sm:text-5xl font-bold tracking-tight leading-none mb-2" style={{ color: barColor }}>
              {cumTotal.toLocaleString()}
              <span className="text-xl sm:text-2xl text-claude-muted/50 dark:text-claude-darkMuted/50 font-normal"> / 200,000</span>
            </div>
            <div className="flex gap-5 mt-3">
              <Pill label="turns" value={turns.length} />
              <Pill label="used" value={`${pct}%`} color={pct >= 90 ? "#E24B4A" : pct >= 75 ? "#EF9F27" : undefined} />
              <Pill label="remaining" value={remaining.toLocaleString()} />
            </div>
          </div>

          {/* Progress bar */}
          <div className="h-2 bg-claude-bg dark:bg-claude-darkSecondary rounded-full overflow-hidden mb-4">
            <div
              className="h-full rounded-full transition-all duration-300 ease-out"
              style={{ width: `${pct}%`, background: barColor }}
            />
          </div>

          {/* Warning banner */}
          {pct >= 75 && (
            <div className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm ${
              pct >= 90
                ? "bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/30"
                : "bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-900/30"
            }`}>
              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
              <span>
                {pct >= 90
                  ? "Critical — 90%+ used. Start a fresh session or trim early turns."
                  : "Warning — 75%+ used. Consider summarizing or starting a new session soon."}
              </span>
            </div>
          )}
        </div>

        {/* Add turn form */}
        <div className="claude-card p-6 bg-white dark:bg-claude-darkCard">
          <div className="flex items-center gap-2 mb-5">
            <Plus className="w-4 h-4 text-claude-accent" />
            <span className="text-xs font-semibold text-claude-muted dark:text-claude-darkMuted uppercase tracking-wider">Add Turn</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <TextArea
              label="User message"
              value={userText}
              onChange={setUserText}
              est={userTok}
              placeholder="Paste user message…"
            />
            <TextArea
              label="Assistant response"
              value={asstText}
              onChange={setAsstText}
              est={asstTok}
              placeholder="Paste assistant response…"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
            <LabeledInput
              label="Label (optional)"
              value={label}
              onChange={setLabel}
              placeholder="e.g. system prompt, code review"
            />
            <LabeledInput
              label="Override tokens"
              value={override}
              onChange={setOverride}
              placeholder="manual count"
              type="number"
            />
          </div>

          <button
            onClick={addTurn}
            className="w-full py-3 bg-claude-accent hover:bg-claude-accent/90 text-white font-medium rounded-xl transition-all duration-200 active:scale-[0.98] text-sm"
          >
            Add turn <Zap className="w-3.5 h-3.5 inline-block ml-1" />
          </button>
        </div>

        {/* Turns list */}
        <div
          ref={listRef}
          className={`space-y-2 ${turns.length > 4 ? "overflow-y-auto max-h-[400px] pr-1" : ""}`}
        >
          {turns.length === 0 ? (
            <div className="claude-card p-8 bg-white dark:bg-claude-darkCard border border-dashed border-claude-border dark:border-claude-darkBorder flex flex-col items-center justify-center text-center">
              <Layers className="w-8 h-8 text-claude-muted/40 dark:text-claude-darkMuted/40 mb-3" />
              <p className="text-sm text-claude-muted dark:text-claude-darkMuted">No turns yet — add one above</p>
            </div>
          ) : (() => {
            let cum = 0;
            return turns.map((t, i) => {
              cum += t.total;
              const barW = Math.min(100, Math.round((t.total / MAX) * 100));
              const cumPct = Math.min(100, Math.round((cum / MAX) * 100));
              const color = cumPct >= 90 ? "#E24B4A" : cumPct >= 75 ? "#EF9F27" : "#d97757";
              return (
                <div key={i} className="claude-card p-4 bg-white dark:bg-claude-darkCard group">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-sm font-medium text-claude-text dark:text-claude-darkText truncate">{t.label}</span>
                      <span className="text-xs text-claude-muted dark:text-claude-darkMuted hidden sm:inline whitespace-nowrap">
                        {t.override ? "(manual)" : `user ${t.userTok.toLocaleString()} + asst ${t.asstTok.toLocaleString()}`}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span className="font-mono text-sm font-semibold" style={{ color }}>
                        +{t.total.toLocaleString()}
                      </span>
                      <span className="text-xs text-claude-muted/60 dark:text-claude-darkMuted/60 font-mono hidden sm:inline">
                        cum: {cum.toLocaleString()}
                      </span>
                      <button
                        onClick={() => removeTurn(i)}
                        className="p-1 text-claude-muted/40 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-md transition-all opacity-0 group-hover:opacity-100"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <div className="h-1 bg-claude-bg dark:bg-claude-darkSecondary rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all" style={{ width: `${barW}%`, background: color }} />
                  </div>
                </div>
              );
            });
          })()}
        </div>

        {/* Footer actions */}
        <div className="flex gap-3">
          <button
            onClick={resetAll}
            className="flex-1 py-2.5 bg-transparent border border-claude-border dark:border-claude-darkBorder text-claude-muted dark:text-claude-darkMuted hover:bg-claude-bg dark:hover:bg-claude-darkSecondary rounded-xl text-sm font-medium transition-all active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset session
          </button>
          <button
            onClick={() => setShowTips(p => !p)}
            className="flex-1 py-2.5 bg-transparent border border-claude-border dark:border-claude-darkBorder text-claude-muted dark:text-claude-darkMuted hover:bg-claude-bg dark:hover:bg-claude-darkSecondary rounded-xl text-sm font-medium transition-all active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <Lightbulb className="w-3.5 h-3.5" />
            {showTips ? "Hide tips" : "Reduction tips"}
          </button>
        </div>

        {/* Tips panel */}
        {showTips && (
          <div className="space-y-3 animate-fade-in">
            <div className="flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-claude-accent" />
              <span className="text-xs font-semibold text-claude-muted dark:text-claude-darkMuted uppercase tracking-wider">Token Reduction Tips</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {TIPS.map((tip, i) => (
                <div key={i} className="claude-card p-4 bg-white dark:bg-claude-darkCard flex gap-3 items-start">
                  <span className="text-lg flex-shrink-0 mt-0.5">{tip.icon}</span>
                  <div>
                    <div className="text-sm font-medium text-claude-text dark:text-claude-darkText mb-1">{tip.title}</div>
                    <div className="text-xs text-claude-muted dark:text-claude-darkMuted leading-relaxed">{tip.body}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Pill({ label, value, color }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[10px] text-claude-muted/60 dark:text-claude-darkMuted/60 uppercase tracking-wider font-semibold">{label}</span>
      <span className="text-sm font-semibold font-mono" style={{ color: color || "inherit" }}>{value}</span>
    </div>
  );
}

function TextArea({ label, value, onChange, placeholder, est }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex justify-between items-center">
        <label className="text-xs text-claude-muted dark:text-claude-darkMuted font-medium">{label}</label>
        <span className="text-[11px] text-claude-muted/60 dark:text-claude-darkMuted/60 font-mono">≈ {est.toLocaleString()} tokens</span>
      </div>
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        rows={3}
        className="w-full bg-claude-bg dark:bg-claude-darkSecondary border border-claude-border dark:border-claude-darkBorder rounded-lg text-claude-text dark:text-claude-darkText text-sm p-3 resize-y outline-none focus:ring-2 focus:ring-claude-accent/20 focus:border-claude-accent transition-all font-[inherit] leading-relaxed placeholder:text-claude-muted/40 dark:placeholder:text-claude-darkMuted/40"
      />
    </div>
  );
}

function LabeledInput({ label, value, onChange, placeholder, type = "text" }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs text-claude-muted dark:text-claude-darkMuted font-medium">{label}</label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-claude-bg dark:bg-claude-darkSecondary border border-claude-border dark:border-claude-darkBorder rounded-lg text-claude-text dark:text-claude-darkText text-sm p-2.5 outline-none focus:ring-2 focus:ring-claude-accent/20 focus:border-claude-accent transition-all placeholder:text-claude-muted/40 dark:placeholder:text-claude-darkMuted/40"
      />
    </div>
  );
}
