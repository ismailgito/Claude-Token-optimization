# Token Optimizer

<sub>Convert files to token-efficient markdown for LLM context</sub>

[![React](https://img.shields.io/badge/React-18.3-blue.svg?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF.svg?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC.svg?logo=tailwind-css)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Auth-3ECF8E.svg?logo=supabase)](https://supabase.com/)

A modern, browser-based tool designed to convert PDFs, Word documents, spreadsheets, code, JSON, data structures, and images into clean, LLM-optimized markdown. **All conversion happens client-side in the browser** — ensuring 100% data privacy since your files never leave your machine.

---

## ⚡ Features

- **📄 Universal File Conversion** — Converts PDFs, `.docx`, `.xlsx`, HTML, JSON, CSV, vector/raster images, and plain text to Markdown.
- **🛡️ 100% Client-Side Processing** — No servers, no APIs, no third-party uploads. Your data remains secure on your device.
- **💸 Token & Size Optimization** — Strips binary bloat, metadata, and CSS styles, resulting in up to **90%+ size reduction** and significant savings on LLM prompt costs.
- **🔒 Tiered Access & Authentication** — 
  - **Guest Mode:** Perform up to `5` conversions with instant client-side local tracking.
  - **Supabase Integration:** Create a free account via passwordless **Email OTP** and secure password confirmation to unlock unlimited, forever-free conversions.
- **📊 Real-time Analytics** — Instantly estimates tokens, compares raw file size against output markdown size, and calculates exact reduction percentages.
- **👁️ Interactive Preview** — Toggle dynamically between rich rendered markdown style sheets and raw markdown source.
- **📋 Direct Actions** — One-click copy to clipboard or immediate download as a `.md` file.
- **⚠️ Safety Features** — Integrated file size warning systems to prevent browser-memory blockages during heavy conversion pipelines.
- **🌓 Adaptive Theme** — High-fidelity dark mode matching the aesthetic of modern LLM interfaces like Anthropic's Claude.

---

## 📂 Supported Formats

| Category | Supported Formats | Engine/Library |
| :--- | :--- | :--- |
| **Documents** | `PDF`, `DOCX`, `DOC`, `ODT`, `RTF` | `pdfjs-dist` & `mammoth` |
| **Spreadsheets** | `XLSX`, `XLS`, `CSV`, `TSV`, `ODS` | `SheetJS (xlsx)` |
| **Presentations** | `PPTX`, `PPT`, `ODP` | Native text parser |
| **Web & Markup** | `HTML`, `HTM`, `XHTML` | `Turndown` |
| **Data** | `JSON`, `XML`, `YAML`, `YML`, `TOML` | Native serializing formatters |
| **Images (OCR/Meta)** | `PNG`, `JPG`, `JPEG`, `GIF`, `SVG`, `WEBP`, `BMP`, `ICO` | Custom local file rendering |
| **Code** | `.js`, `.jsx`, `.ts`, `.tsx`, `.py`, `.rb`, `.java`, `.cpp`, `.go`, `.rs`, `.php`, `.sql`, etc. | Syntax-highlighted codeblocks |

---

## 🏗️ Architecture

```mermaid
graph TD
    App[src/App.jsx] --> Header[components/Header.jsx]
    App --> FileUploader[components/FileUploader.jsx]
    App --> Summary[components/OptimizationSummary.jsx]
    App --> Preview[components/MarkdownPreview.jsx]
    App --> AuthModal[components/AuthModal.jsx]
    
    FileUploader --> SizeWarning[components/FileSizeWarning.jsx]
    FileUploader --> Progress[components/ProcessingProgress.jsx]
    
    App --> useFileConversion[hooks/useFileConversion.js]
    App --> useUsage[hooks/useUsage.js]
    
    useFileConversion --> pdfjs[pdfjs-dist - Lazy Loaded]
    useFileConversion --> mammoth[mammoth.js - Lazy Loaded]
    useFileConversion --> turndown[turndown.js - Lazy Loaded]
    useFileConversion --> xlsx[xlsx / SheetJS - Lazy Loaded]
    
    useUsage --> Supabase[lib/supabase.js]
    AuthModal --> Supabase
```

### File Structure & Roles
- **[src/App.jsx](file:///C:/Users/Mohamed%20Ismail/Documents/Projects_German/Claude-Token-optimization/src/App.jsx)** — Root coordinator. Manages global states (theme, active files, visibility of modals) and ties state transitions between the conversion hooks and UI wrappers.
- **[src/hooks/useFileConversion.js](file:///C:/Users/Mohamed%20Ismail/Documents/Projects_German/Claude-Token-optimization/src/hooks/useFileConversion.js)** — The processing core. Uses **lazy dynamic imports** to load heavy libraries (like `pdfjs-dist` or `xlsx`) only when a user uploads that specific file type. Uses `AbortController` for clean conversion cancellations.
- **[src/hooks/useUsage.js](file:///C:/Users/Mohamed%20Ismail/Documents/Projects_German/Claude-Token-optimization/src/hooks/useUsage.js)** — Local storage usage tracker. Enforces the guest conversion threshold (up to 5) and bridges session state.
- **[src/components/AuthModal.jsx](file:///C:/Users/Mohamed%20Ismail/Documents/Projects_German/Claude-Token-optimization/src/components/AuthModal.jsx)** — Handles the Supabase auth state machine. Supports signup, standard OTP checks, multiple token verification triggers (`email`, `signup`, `magiclink`), new user password initialization, and secure credentials login.
- **[src/components/FileSizeWarning.jsx](file:///C:/Users/Mohamed%20Ismail/Documents/Projects_German/Claude-Token-optimization/src/components/FileSizeWarning.jsx)** — Visual alerts when files exceed target size limits to prevent browser crashes.
- **[src/components/ProcessingProgress.jsx](file:///C:/Users/Mohamed%20Ismail/Documents/Projects_German/Claude-Token-optimization/src/components/ProcessingProgress.jsx)** — Shows progress indicators for multi-phase operations.
- **[src/lib/supabase.js](file:///C:/Users/Mohamed%20Ismail/Documents/Projects_German/Claude-Token-optimization/src/lib/supabase.js)** — Connects to the Supabase backend utilizing env configurations.
- **[src/utils/fileUtils.js](file:///C:/Users/Mohamed%20Ismail/Documents/Projects_German/Claude-Token-optimization/src/utils/fileUtils.js)** — Utility helpers for parsing raw text, estimating Claude-friendly LLM token lengths, and formatting file sizes.

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js** v18.0.0 or higher
- **npm** v9.0.0 or higher

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/Mirza-Glitch/markitdown-js.git
cd Claude-Token-optimization

# Install dependencies
npm install
```

### 3. Environment Variables
Create a file named `.env` in the root folder of the project (copying the structure from [`.env.example`](file:///C:/Users/Mohamed%20Ismail/Documents/Projects_German/Claude-Token-optimization/.env.example)):
```env
VITE_SUPABASE_URL=https://your-supabase-url.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key-here
```

### 4. Setup Custom SMTP / Resend in Supabase (Recommended)
To ensure reliable passwordless signups and OTP delivery:
1. Go to the **Supabase Dashboard** -> **Project Settings** -> **Auth** -> **Email Settings**.
2. Turn **Enable Custom SMTP** to **ON**.
3. Configure your SMTP provider (e.g., [Resend](https://resend.com/)):
   - **SMTP Host:** `smtp.resend.com`
   - **SMTP Port:** `465` or `587`
   - **SMTP Username:** `resend`
   - **SMTP Password:** *Your Resend API Key*
   - **Sender Email:** A verified domain sender email in Resend (e.g., `onboarding@yourdomain.com`).
4. Ensure the domain chosen matches the sender address perfectly to prevent empty auth errors.

### 5. Running the Application
```bash
# Launch the development server
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 6. Building for Production
To bundle the optimized assets:
```bash
npm run build
```
Preview the production build locally:
```bash
npm run preview
```

---

## 💡 Why Optimize Tokens?

Large language models process text in units called **tokens**. Feeding raw, formatted files (like `.pdf` or `.docx`) into a chat window includes a massive volume of invisible XML metadata, styling markup, and binary overhead. 

Optimizing your context:
1. **Reduces API Billing:** Smaller prompt packages mean you pay less per API query.
2. **Preserves Context Limits:** Fit more actual information inside the context window.
3. **Enhances Reasoning Quality:** Eliminates distracting noise, letting the model focus solely on clean text structures.

---

## 📄 License

This project is for personal and educational use.
