<p align="center">
  <!-- Animated Hero SVG -->
  <svg width="640" height="260" viewBox="0 0 640 260" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="640" y2="260" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="#f5f2ed"/>
        <stop offset="100%" stop-color="#f0ede8"/>
      </linearGradient>
      <linearGradient id="accent" x1="0" y1="0" x2="640" y2="0" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="#d97757"/>
        <stop offset="50%" stop-color="#c05a3a"/>
        <stop offset="100%" stop-color="#d97757"/>
      </linearGradient>
      <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="#d97757" flood-opacity="0.18"/>
      </filter>
    </defs>
    <rect width="640" height="260" rx="24" fill="url(#bg)"/>
    <!-- Floating document shapes -->
    <g filter="url(#shadow)">
      <rect x="60" y="50" width="120" height="160" rx="12" fill="#fff" stroke="#e5e5e5" stroke-width="1.5">
        <animate attributeName="y" values="50;44;50" dur="4s" repeatCount="indefinite"/>
      </rect>
      <rect x="72" y="72" width="80" height="6" rx="3" fill="#d97757" opacity="0.5">
        <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite"/>
      </rect>
      <rect x="72" y="90" width="90" height="4" rx="2" fill="#d97757" opacity="0.25"/>
      <rect x="72" y="104" width="75" height="4" rx="2" fill="#d97757" opacity="0.25"/>
      <rect x="72" y="118" width="85" height="4" rx="2" fill="#d97757" opacity="0.25"/>
      <rect x="72" y="132" width="50" height="4" rx="2" fill="#d97757" opacity="0.25"/>
    </g>
    <!-- Sparkle stars -->
    <circle cx="220" cy="40" r="3" fill="#d97757" opacity="0.6">
      <animate attributeName="opacity" values="0.6;1;0.6" dur="1.5s" repeatCount="indefinite"/>
    </circle>
    <circle cx="460" cy="70" r="2" fill="#d97757" opacity="0.4">
      <animate attributeName="opacity" values="0.4;1;0.4" dur="2.3s" repeatCount="indefinite"/>
    </circle>
    <circle cx="520" cy="190" r="2.5" fill="#d97757" opacity="0.5">
      <animate attributeName="opacity" values="0.5;1;0.5" dur="1.8s" repeatCount="indefinite"/>
    </circle>
    <!-- Arrow transformation -->
    <g filter="url(#shadow)">
      <rect x="230" y="100" width="180" height="60" rx="16" fill="#fff" stroke="#e5e5e5" stroke-width="1.5"/>
      <text x="320" y="120" text-anchor="middle" font-family="Georgia,serif" font-size="13" fill="#666">Messy Source</text>
      <rect x="248" y="134" width="30" height="5" rx="2.5" fill="#fca5a5"/>
      <rect x="248" y="144" width="50" height="5" rx="2.5" fill="#fecaca"/>
      <rect x="248" y="154" width="40" height="5" rx="2.5" fill="#fca5a5"/>
      <!-- Arrow -->
      <path d="M305 130 L315 130 L315 115 L335 130 L315 145 L315 130 L305 130Z" fill="#d97757">
        <animate attributeName="opacity" values="0.7;1;0.7" dur="1.2s" repeatCount="indefinite"/>
      </path>
    </g>
    <!-- Output document -->
    <g filter="url(#shadow)">
      <rect x="410" y="50" width="120" height="160" rx="12" fill="#fff" stroke="#d97757" stroke-width="2" stroke-dasharray="6 3">
        <animate attributeName="stroke-dashoffset" values="0;-18" dur="1.5s" repeatCount="indefinite"/>
      </rect>
      <text x="470" y="72" text-anchor="middle" font-family="Georgia,serif" font-size="13" fill="#d97757" font-weight="bold">Clean MD</text>
      <rect x="428" y="90" width="84" height="5" rx="2.5" fill="#a3e635" opacity="0.6"/>
      <rect x="428" y="102" width="65" height="5" rx="2.5" fill="#a3e635" opacity="0.4"/>
      <rect x="428" y="114" width="78" height="5" rx="2.5" fill="#a3e635" opacity="0.5"/>
    </g>
    <!-- % badge -->
    <g filter="url(#shadow)">
      <circle cx="320" cy="210" r="36" fill="#fff"/>
      <text x="320" y="208" text-anchor="middle" font-family="Georgia,serif" font-size="22" font-weight="bold" fill="#d97757">−72%</text>
      <text x="320" y="226" text-anchor="middle" font-family="Inter,system-ui,sans-serif" font-size="7" fill="#999" letter-spacing="1">TOKEN SAVE</text>
    </g>
    <!-- Animated accent line at bottom -->
    <rect x="80" y="244" width="480" height="3" rx="1.5" fill="url(#accent)">
      <animate attributeName="width" values="480;520;480" dur="3s" repeatCount="indefinite"/>
      <animate attributeName="x" values="80;60;80" dur="3s" repeatCount="indefinite"/>
    </rect>
  </svg>
</p>

<p align="center">
  <a href="https://github.com">
    <img src="https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react" alt="React">
  </a>
  <a href="https://vitejs.dev">
    <img src="https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite" alt="Vite">
  </a>
  <a href="https://tailwindcss.com">
    <img src="https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=for-the-badge&logo=tailwindcss" alt="Tailwind">
  </a>
  <a href="https://supabase.com">
    <img src="https://img.shields.io/badge/Supabase-Auth-3ECF8E?style=for-the-badge&logo=supabase" alt="Supabase">
  </a>
</p>

---

## ✨ What is TokenOptimizer?

**Turn any document into lean, LLM-ready markdown.** PDFs, Word files, Excel sheets, code — converted client-side into clean, token-efficient markdown optimized for Claude, ChatGPT, and every major model.

> 🔒 **100% private** — all processing happens in your browser. Nothing uploads to a server.

---

## 🚀 Quick Start

```bash
# Clone & install
git clone https://github.com/<user>/token-optimizer.git
cd token-optimizer
npm install

# Run dev server
npm run dev
```

Open `http://localhost:5173` — upload a file and watch the magic happen.

---

## 🎯 Features

| | Feature | Detail |
|---|---|---|
| 📄 | **10+ Formats** | PDF, DOCX, XLSX, TXT, CSV, MD, and source code |
| ⚡ | **Token Efficient** | Average **72% size reduction** vs raw input |
| 🔐 | **Private & Secure** | Zero server-side processing — everything stays local |
| 🌙 | **Dark Mode** | Automatic + manual toggle with smooth transitions |
| 📊 | **Context Tracker** | Simulate conversation turns against a 200k window |
| 🧠 | **Smart Tips** | Real-time token-saving strategies per conversation |

---

## 📸 How It Works

```
┌──────────────┐     ┌───────────────────┐     ┌─────────────────┐
│   Upload     │────▶│  Smart Optimize   │────▶│  Clean Markdown │
│   & Parse    │     │   Client-Side     │     │  Ready for LLMs │
└──────────────┘     └───────────────────┘     └─────────────────┘
       01                    02                        03
```

1. **Upload & Parse** — Drag & drop any supported file
2. **Smart Optimization** — Strip redundancy, compress tables, preserve structure
3. **Ready for Claude** — Semantic Markdown with minimal token footprint

---

## 📐 Before vs After

<div align="center">

| 🔴 Messy Source | 🟢 Clean Markdown |
|:---:|:---:|
| ~4,200 tokens | ~1,150 tokens |
| Raw layout, hidden tables | Semantic headings, clean lists |
| 3,800 wasted tokens | 72% reduction |

</div>

---

## 🛠 Tech Stack

<p align="center">
  <img src="https://img.shields.io/badge/React-18.3-61DAFB?style=flat-square&logo=react" alt="React">
  <img src="https://img.shields.io/badge/Vite-6.0-646CFF?style=flat-square&logo=vite" alt="Vite">
  <img src="https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=flat-square&logo=tailwindcss" alt="Tailwind">
  <img src="https://img.shields.io/badge/Supabase-Auth-3ECF8E?style=flat-square&logo=supabase" alt="Supabase">
  <img src="https://img.shields.io/badge/PDF.js-4.0-FF0000?style=flat-square" alt="PDF.js">
  <img src="https://img.shields.io/badge/Mammoth-1.8-4C1D95?style=flat-square" alt="Mammoth">
  <img src="https/img.shields.io/badge/Turndown-7.2-333?style=flat-square" alt="Turndown">
  <img src="https://img.shields.io/badge/XLSX-0.18-217346?style=flat-square&logo=apache" alt="XLSX">
</p>

---

## 🎨 Design Tokens

| Token | Light | Dark |
|:---|:---:|:---:|
| Background | `#f5f2ed` | `#0e0e10` |
| Card | `#ffffff` | `#1a1a1c` |
| Accent | `#d97757` | `#d97757` |
| Text | `#1d1d1f` | `#e8e8e8` |
| Font | Inter / Georgia | Inter / Georgia |

---

## 📜 Scripts

```bash
npm run dev       # Start dev server (http://localhost:5173)
npm run build     # Production build → dist/
npm run preview   # Preview production build locally
```

---

## 📜 License

MIT © TokenOptimizer
