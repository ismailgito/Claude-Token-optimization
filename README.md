# Token Optimizer

<sub>Convert files to token-efficient markdown for LLM context</sub>

A browser-based tool that converts PDFs, Word documents, spreadsheets, code files, and more into clean, LLM-optimized markdown. **All processing happens client-side** — your files never leave your machine.

## Features

- **📄 Universal file support** — Convert PDF, DOCX, XLSX, HTML, JSON, CSV, code files, images, and plain text to markdown.
- **⚡ Token optimization** — Strips binary overhead and formatting bloat to reduce token count, saving on LLM API costs.
- **🔒 100% client-side** — All file processing happens in your browser. Nothing is uploaded to any server.
- **📊 Optimization analytics** — See real-time stats: original vs. markdown size, token estimates, and reduction percentages.
- **👁️ Live preview** — Toggle between rendered markdown preview and raw source view.
- **📋 Copy & download** — One-click copy to clipboard or download as `.md` file.
- **🎨 Beautiful UI** — Dark-mode interface with smooth animations and glass-morphism design.

## Supported File Formats

| Category     | Formats                                                                                   |
| ------------ | ----------------------------------------------------------------------------------------- |
| Documents    | `PDF`, `DOCX`, `DOC`, `ODT`, `RTF`                                                        |
| Spreadsheets | `XLSX`, `XLS`, `CSV`, `TSV`, `ODS`                                                         |
| Presentations| `PPTX`, `PPT`, `ODP`                                                                       |
| Markup       | `HTML`, `HTM`, `XHTML`                                                                     |
| Code         | `JS`, `JSX`, `TS`, `TSX`, `PY`, `RB`, `JAVA`, `C`, `CPP`, `GO`, `RS`, `SWIFT`, `KT`, `PHP`, `SH`, `BASH`, `SQL`, `CSS`, `SCSS`, `LESS`, and more |
| Data         | `JSON`, `XML`, `YAML`, `YML`, `TOML`                                                       |
| Text         | `TXT`, `MD`, `MARKDOWN`, `LOG`, `INI`, `CFG`, `ENV`                                        |
| Images       | `PNG`, `JPG`, `JPEG`, `GIF`, `SVG`, `WEBP`, `BMP`, `ICO`                                   |

## How It Works

1. **Upload** — Drag & drop any supported file onto the upload zone, or click to browse.
2. **Convert** — The file is parsed client-side into clean, structured markdown using specialized libraries (pdf.js for PDFs, mammoth for DOCX, Turndown for HTML, SheetJS for spreadsheets, etc.).
3. **Review** — View optimization statistics (token counts, size reduction) and toggle between rendered preview and raw source.
4. **Use** — Copy the markdown to your clipboard or download it as a `.md` file for use as an LLM context payload.

## Tech Stack

- **Framework:** [React 18](https://react.dev/) + [Vite 6](https://vitejs.dev/)
- **Styling:** [Tailwind CSS 3](https://tailwindcss.com/) with `@tailwindcss/typography`
- **Icons:** [Lucide React](https://lucide.dev/)
- **File Conversion:**
  - [pdfjs-dist](https://www.npmjs.com/package/pdfjs-dist) — PDF text extraction
  - [mammoth](https://github.com/mwilliamson/mammoth.js) — DOCX → HTML conversion
  - [Turndown](https://github.com/mixmark-io/turndown) — HTML → Markdown conversion
  - [SheetJS (xlsx)](https://sheetjs.com/) — Spreadsheet parsing
  - [react-markdown](https://github.com/remarkjs/react-markdown) — Markdown rendering
  - [remark-gfm](https://github.com/remarkjs/remark-gfm) — GitHub Flavored Markdown support
  - [rehype-raw](https://github.com/rehypejs/rehype-raw) — HTML in markdown support

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+
- npm (ships with Node.js)

### Installation

```bash
# Clone the repository
git clone https://github.com/Mirza-Glitch/markitdown-js.git
cd token-optimizer-app

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173` (or the next available port).

### Build for Production

```bash
npm run build
```

The output will be in the `dist/` directory and can be served with any static file server.

```bash
npm run preview  # Preview the production build locally
```

## Architecture

- **`src/App.jsx`** — Main application shell with state management, background effects, and layout.
- **`src/hooks/useFileConversion.js`** — Custom hook managing the file conversion pipeline. Dynamically imports heavy libraries (pdf.js, mammoth, Turndown, SheetJS) only when needed to keep initial bundle sizes small.
- **`src/components/FileUploader.jsx`** — Drag-and-drop file upload zone with visual states (idle, converting, done, error).
- **`src/components/OptimizationSummary.jsx`** — Statistics dashboard showing token estimates, size comparisons, and animated reduction bars.
- **`src/components/MarkdownPreview.jsx`** — Rendered preview and raw source view with copy/download/fullscreen controls.
- **`src/components/HowItWorks.jsx`** — Informational section explaining the tool's value proposition.
- **`src/components/Header.jsx`** — App header with navigation.

All conversion logic runs entirely in the browser using `AbortController` for cancellation support and dynamic imports for lazy-loading heavy dependencies.

## Why Optimize Tokens?

LLM pricing is per-token. Binary file formats like PDF, DOCX, and XLSX contain enormous amounts of formatting data, embedded fonts, metadata, and other overhead that inflates token counts when fed directly to an LLM. By converting files to clean markdown:

- **📉 Lower costs** — Fewer tokens means lower API costs per prompt.
- **📏 Larger context windows** — Fit more content into context limits by removing redundant binary overhead.
- **🧠 Better comprehension** — Clean markdown is easier for models to parse and understand than raw binary formats.

## License

This project is for personal and educational use.
