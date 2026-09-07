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

## ✨ Live Preview & Animations

<p align="center">
  <img src="https://img.shields.io/badge/status-optimizing-22c55e?style=for-the-badge&logo=leaflet&logoColor=white" />
  <img src="https://img.shields.io/badge/tokens-saved-90%25-3b82f6?style=for-the-badge&logo=openai&logoColor=white" />
  <img src="https://img.shields.io/badge/privacy-100%25-a855f7?style=for-the-badge&logo=shield&logoColor=white" />
</p>

### 🔄 Real-Time Conversion Pipeline
<p align="center">
  <img alt="File In" src="https://img.shields.io/badge/📁_INPUT-File-blueviolet?style=flat-square&logoColor=white" />
  <img alt="arrow" src="https://img.shields.io/badge/➡️-0ea5e9?style=flat-square" />
  <img alt="Processing" src="https://img.shields.io/badge/⚙️_PROCESS-Optimize-f59e0b?style=flat-square&logoColor=white" />
  <img alt="arrow" src="https://img.shields.io/badge/➡️-0ea5e9?style=flat-square" />
  <img alt="Output" src="https://img.shields.io/badge/📤_OUTPUT-Clean_MD-10b981?style=flat-square&logoColor=white" />
</p>

<br>

<div align="center">

### 🎬 Animated Feature Showcase

<table>
<tr>
<td align="center" width="50%">

**📥 Smart File Upload**
<div style="position:relative;width:100%;max-width:320px;height:140px;margin:14px auto;border-radius:14px;background:linear-gradient(135deg,#0f172a,#1e293b);border:1px solid #334155;overflow:hidden;">
  <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:74px;height:90px;border-radius:8px;background:linear-gradient(160deg,#ef4444,#dc2626);box-shadow:0 8px 24px rgba(239,68,68,.4);animation:docFloat 3s ease-in-out infinite;"></div>
  <div style="position:absolute;top:14px;left:14px;font-family:monospace;color:#94a3b8;font-size:11px;animation:scanLine 2s linear infinite;">scanning...</div>
  <div style="position:absolute;bottom:0;left:0;height:3px;background:linear-gradient(90deg,#22c55e,#3b82f6,#a855f7);animation:progressScan 3s ease-in-out infinite;width:100%;"></div>
  <div style="position:absolute;top:50%;left:50%;width:200px;height:200px;border:2px dashed #22c55e;border-radius:50%;transform:translate(-50%,-50%);animation:radarPulse 2.5s ease-out infinite;opacity:0.6;"></div>
  <div style="position:absolute;top:50%;left:50%;width:120px;height:120px;border:2px dashed #3b82f6;border-radius:50%;transform:translate(-50%,-50%);animation:radarPulse 2.5s ease-out infinite;animation-delay:0.8s;opacity:0.6;"></div>
</div>

</td>
<td align="center" width="50%">

**🪙 Token Compression**
<div style="position:relative;width:100%;max-width:320px;height:140px;margin:14px auto;border-radius:14px;background:radial-gradient(circle at center,#1e293b,#020617);border:1px solid #334155;overflow:hidden;">
  <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-family:'Courier New',monospace;font-size:60px;font-weight:900;color:#22c55e;text-shadow:0 0 30px #22c55e;animation:tokenCount 2s ease-in-out infinite;">90%</div>
  <div style="position:absolute;bottom:18px;left:50%;transform:translateX(-50%);font-family:monospace;color:#64748b;font-size:10px;letter-spacing:2px;">SMALLER</div>
  <div style="position:absolute;width:6px;height:6px;background:#22c55e;border-radius:50%;box-shadow:0 0 8px #22c55e;top:50%;left:50%;animation:coinBurst 2.5s ease-out infinite;"></div>
  <div style="position:absolute;width:4px;height:4px;background:#3b82f6;border-radius:50%;box-shadow:0 0 6px #3b82f6;top:50%;left:50%;animation:coinBurst 2.5s ease-out infinite;animation-delay:0.4s;"></div>
  <div style="position:absolute;width:5px;height:5px;background:#a855f7;border-radius:50%;box-shadow:0 0 7px #a855f7;top:50%;left:50%;animation:coinBurst 2.5s ease-out infinite;animation-delay:0.8s;"></div>
  <div style="position:absolute;width:3px;height:3px;background:#f59e0b;border-radius:50%;box-shadow:0 0 5px #f59e0b;top:50%;left:50%;animation:coinBurst 2.5s ease-out infinite;animation-delay:1.2s;"></div>
  <div style="position:absolute;width:4px;height:4px;background:#ec4899;border-radius:50%;box-shadow:0 0 6px #ec4899;top:50%;left:50%;animation:coinBurst 2.5s ease-out infinite;animation-delay:1.6s;"></div>
</div>

</td>
</tr>
<tr>
<td align="center">

**🔒 Privacy Shield**
<div style="position:relative;width:100%;max-width:320px;height:140px;margin:14px auto;border-radius:14px;background:linear-gradient(135deg,#1e1b4b,#312e81);border:1px solid #4f46e5;overflow:hidden;">
  <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-size:48px;animation:shieldGlow 2s ease-in-out infinite;filter:drop-shadow(0 0 12px #6366f1);">🛡️</div>
  <div style="position:absolute;width:100%;height:100%;border:2px solid #6366f1;border-radius:14px;animation:shieldRing 3s ease-out infinite;opacity:0;"></div>
  <div style="position:absolute;width:100%;height:100%;border:2px solid #a855f7;border-radius:14px;animation:shieldRing 3s ease-out infinite;animation-delay:1s;opacity:0;"></div>
  <div style="position:absolute;top:8px;left:50%;transform:translateX(-50%);font-family:monospace;color:#a5b4fc;font-size:9px;letter-spacing:3px;animation:textFlicker 4s linear infinite;">100% LOCAL</div>
</div>

</td>
<td align="center">

**⚡ Format Engine**
<div style="position:relative;width:100%;max-width:320px;height:140px;margin:14px auto;border-radius:14px;background:linear-gradient(135deg,#1a1a2e,#16213e);border:1px solid #334155;overflow:hidden;">
  <div style="position:absolute;inset:14px;display:grid;grid-template-columns:repeat(4,1fr);grid-template-rows:repeat(2,1fr);gap:6px;">
    <div style="background:linear-gradient(135deg,#ef4444,#dc2626);border-radius:6px;animation:formatPop 3s ease-in-out infinite;display:flex;align-items:center;justify-content:center;color:white;font-size:10px;font-weight:700;font-family:monospace;">PDF</div>
    <div style="background:linear-gradient(135deg,#3b82f6,#2563eb);border-radius:6px;animation:formatPop 3s ease-in-out infinite;animation-delay:0.2s;display:flex;align-items:center;justify-content:center;color:white;font-size:10px;font-weight:700;font-family:monospace;">DOCX</div>
    <div style="background:linear-gradient(135deg,#22c55e,#16a34a);border-radius:6px;animation:formatPop 3s ease-in-out infinite;animation-delay:0.4s;display:flex;align-items:center;justify-content:center;color:white;font-size:10px;font-weight:700;font-family:monospace;">XLSX</div>
    <div style="background:linear-gradient(135deg,#a855f7,#9333ea);border-radius:6px;animation:formatPop 3s ease-in-out infinite;animation-delay:0.6s;display:flex;align-items:center;justify-content:center;color:white;font-size:10px;font-weight:700;font-family:monospace;">HTML</div>
    <div style="background:linear-gradient(135deg,#f59e0b,#d97706);border-radius:6px;animation:formatPop 3s ease-in-out infinite;animation-delay:0.8s;display:flex;align-items:center;justify-content:center;color:white;font-size:10px;font-weight:700;font-family:monospace;">JSON</div>
    <div style="background:linear-gradient(135deg,#ec4899,#db2777);border-radius:6px;animation:formatPop 3s ease-in-out infinite;animation-delay:1.0s;display:flex;align-items:center;justify-content:center;color:white;font-size:10px;font-weight:700;font-family:monospace;">CSV</div>
    <div style="background:linear-gradient(135deg,#06b6d4,#0891b2);border-radius:6px;animation:formatPop 3s ease-in-out infinite;animation-delay:1.2s;display:flex;align-items:center;justify-content:center;color:white;font-size:10px;font-weight:700;font-family:monospace;">XML</div>
    <div style="background:linear-gradient(135deg,#8b5cf6,#7c3aed);border-radius:6px;animation:formatPop 3s ease-in-out infinite;animation-delay:1.4s;display:flex;align-items:center;justify-content:center;color:white;font-size:10px;font-weight:700;font-family:monospace;">PNG</div>
  </div>
</div>

</td>
</tr>
<tr>
<td colspan="2" align="center">

**🌊 Continuous Processing Flow**
<div style="position:relative;width:100%;max-width:660px;height:70px;margin:14px auto;border-radius:35px;background:linear-gradient(90deg,#0f172a,#1e293b,#0f172a);border:1px solid #334155;overflow:hidden;">
  <div style="position:absolute;inset:0;background:linear-gradient(90deg,transparent,#22c55e,transparent);animation:waveFlow 2.5s linear infinite;opacity:0.5;"></div>
  <div style="position:absolute;inset:0;background:linear-gradient(90deg,transparent,#3b82f6,transparent);animation:waveFlow 2.5s linear infinite;animation-delay:0.8s;opacity:0.4;"></div>
  <div style="position:absolute;inset:0;background:linear-gradient(90deg,transparent,#a855f7,transparent);animation:waveFlow 2.5s linear infinite;animation-delay:1.6s;opacity:0.3;"></div>
  <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-family:monospace;color:#cbd5e1;font-size:14px;letter-spacing:4px;font-weight:600;text-shadow:0 0 12px #22c55e;animation:textGlow 2s ease-in-out infinite;">PROCESSING · OPTIMIZING · STREAMING</div>
</div>

</td>
</tr>
</table>

</div>

<style>
@keyframes docFloat {
  0%, 100% { transform: translate(-50%, -50%) rotate(-3deg); }
  50% { transform: translate(-50%, -50%) rotate(3deg); }
}
@keyframes scanLine {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 1; }
}
@keyframes progressScan {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
@keyframes radarPulse {
  0% { transform: translate(-50%, -50%) scale(0.3); opacity: 0.8; }
  100% { transform: translate(-50%, -50%) scale(1.5); opacity: 0; }
}
@keyframes tokenCount {
  0%, 100% { transform: translate(-50%, -50%) scale(1); }
  50% { transform: translate(-50%, -50%) scale(1.08); }
}
@keyframes coinBurst {
  0% { transform: translate(-50%, -50%); opacity: 1; }
  100% { transform: translate(-50%, -180px); opacity: 0; }
}
@keyframes shieldGlow {
  0%, 100% { filter: drop-shadow(0 0 12px #6366f1); }
  50% { filter: drop-shadow(0 0 24px #a855f7); }
}
@keyframes shieldRing {
  0% { transform: scale(0.9); opacity: 0.8; }
  100% { transform: scale(1.3); opacity: 0; }
}
@keyframes textFlicker {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
}
@keyframes formatPop {
  0%, 100% { transform: scale(1); box-shadow: 0 0 0 currentColor; }
  50% { transform: scale(1.08); box-shadow: 0 4px 14px rgba(0,0,0,.4); }
}
@keyframes waveFlow {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
@keyframes textGlow {
  0%, 100% { text-shadow: 0 0 12px #22c55e; }
  50% { text-shadow: 0 0 24px #3b82f6, 0 0 12px #a855f7; }
}
@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; }
}
</style>

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

### 5. Setup Google & GitHub OAuth in Supabase
The frontend buttons for Google and GitHub are already configured in [src/components/AuthModal.jsx](file:///C:/Users/Mohamed%20Ismail/Documents/Projects_German/Claude-Token-optimization/src/components/AuthModal.jsx) to trigger authentication client-side. To make them work:

#### Configuring GitHub OAuth:
1. Go to GitHub -> **Settings** -> **Developer Settings** -> **OAuth Apps** -> **Register a new application**.
2. Enter a homepage URL (e.g., `http://localhost:5173` for testing).
3. Set the **Authorization callback URL** using your Supabase project callback link (found in the Supabase Dashboard at **Auth** -> **Providers** -> **GitHub**):
   `https://<your-supabase-project-ref>.supabase.co/auth/v1/callback`
4. Register the app, generate a **Client Secret**, and copy both the **Client ID** and **Client Secret**.
5. Return to the **Supabase Dashboard** -> **Auth** -> **Providers** -> **GitHub**, enable the provider, paste your credentials, and save.

#### Configuring Google OAuth:
1. Go to the **Google Cloud Console** -> **APIs & Services** -> **Credentials** -> **Create Credentials** -> **OAuth client ID**.
2. Choose **Web application** as the Application type.
3. Add the callback URL under **Authorized redirect URIs** (retrieve it from **Auth** -> **Providers** -> **Google** in Supabase):
   `https://<your-supabase-project-ref>.supabase.co/auth/v1/callback`
4. Create the client ID, and copy the generated **Client ID** and **Client Secret**.
5. Return to the **Supabase Dashboard** -> **Auth** -> **Providers** -> **Google**, enable the provider, paste your credentials, and save.

#### Syncing Authenticated Users to Public Tables (Optional)
By default, Supabase stores authenticated OAuth users inside the system schema table `auth.users`. If you wish to mirror them automatically into a public database table (e.g., a `public.profiles` or `public.users` table for querying or usage records), execute this SQL inside the **Supabase SQL Editor**:

```sql
-- 1. Create a public profiles table
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  avatar_url text,
  full_name text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Enable Row Level Security (RLS)
alter table public.profiles enable row level security;

-- 3. Create policies
create policy "Allow public read access" on public.profiles for select using (true);
create policy "Allow individual update" on public.profiles for update using (auth.uid() = id);

-- 4. Create trigger function to copy new users automatically
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, avatar_url, full_name)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'avatar_url',
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name')
  );
  return new;
end;
$$ language plpgsql security definer;

-- 5. Bind the trigger to auth.users table
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
```

### 6. Running the Application
```bash
# Launch the development server
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 7. Building for Production
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
