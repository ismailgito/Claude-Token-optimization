import { useState, useCallback, useRef } from 'react';

// Dynamic imports for large libraries — only loaded when needed
let pdfjsLib = null;
async function getPdfJs() {
  if (!pdfjsLib) {
    const pdfjs = await import('pdfjs-dist');
    pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.0.379/pdf.worker.min.mjs`;
    pdfjsLib = pdfjs;
  }
  return pdfjsLib;
}

let mammoth = null;
async function getMammoth() {
  if (!mammoth) {
    mammoth = await import('mammoth');
  }
  return mammoth;
}

let TurndownService = null;
async function getTurndown() {
  if (!TurndownService) {
    const td = await import('turndown');
    TurndownService = td.default;
  }
  return TurndownService;
}

let XLSX = null;
async function getXLSX() {
  if (!XLSX) {
    XLSX = await import('xlsx');
  }
  return XLSX;
}

function estimateTokens(text) {
  return Math.ceil(text.length / 4);
}

function getFileCategory(filename) {
  const ext = filename.split('.').pop().toLowerCase();
  const categories = {
    document: ['pdf', 'docx', 'doc', 'odt', 'rtf'],
    spreadsheet: ['xlsx', 'xls', 'csv', 'tsv', 'ods'],
    presentation: ['pptx', 'ppt', 'odp'],
    text: ['txt', 'md', 'markdown', 'json', 'xml', 'yaml', 'yml', 'log', 'ini', 'cfg', 'env'],
    markup: ['html', 'htm', 'xhtml'],
    code: ['js', 'jsx', 'ts', 'tsx', 'py', 'rb', 'java', 'c', 'cpp', 'h', 'hpp', 'go', 'rs', 'swift', 'kt', 'php', 'sh', 'bash', 'zsh', 'sql', 'css', 'scss', 'less'],
    image: ['png', 'jpg', 'jpeg', 'gif', 'svg', 'webp', 'bmp', 'ico'],
    data: ['json', 'xml', 'yaml', 'yml', 'toml'],
  };
  for (const [category, exts] of Object.entries(categories)) {
    if (exts.includes(ext)) return category;
  }
  return 'unknown';
}

function formatFileSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

const INITIAL_STATE = {
  file: null,
  status: 'idle', // idle | converting | done | error
  markdown: '',
  error: null,
  stats: null,
};

export default function useFileConversion() {
  const [state, setState] = useState(INITIAL_STATE);
  const abortRef = useRef(null);

  const reset = useCallback(() => {
    if (abortRef.current) {
      abortRef.current.abort();
    }
    setState(INITIAL_STATE);
  }, []);

  const convertFile = useCallback(async (file) => {
    if (abortRef.current) {
      abortRef.current.abort();
    }
    abortRef.current = new AbortController();
    const signal = abortRef.current.signal;

    const ext = file.name.split('.').pop().toLowerCase();
    const category = getFileCategory(file.name);
    const originalSize = file.size;

    setState({
      file,
      status: 'converting',
      markdown: '',
      error: null,
      stats: { fileName: file.name, fileSize: formatFileSize(originalSize), fileType: ext.toUpperCase(), category, originalSize },
    });

    try {
      let markdown = '';

      if (signal.aborted) throw new DOMException('Aborted', 'AbortError');

      // Read file as ArrayBuffer once for reuse
      const arrayBuffer = await file.arrayBuffer();

      if (signal.aborted) throw new DOMException('Aborted', 'AbortError');

      switch (ext) {
        case 'pdf': {
          const pdfjs = await getPdfJs();
          const pdf = await pdfjs.getDocument({ data: arrayBuffer.slice(0) }).promise;
          const pages = [];
          for (let i = 1; i <= pdf.numPages; i++) {
            if (signal.aborted) throw new DOMException('Aborted', 'AbortError');
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();
            const text = content.items.map(item => item.str).join(' ');
            pages.push(`## Page ${i}\n\n${text}`);
          }
          markdown = pages.join('\n\n');
          break;
        }

        case 'docx': {
          const m = await getMammoth();
          const result = await m.convertToHtml({ arrayBuffer: arrayBuffer.slice(0) });
          const Turndown = await getTurndown();
          const turndownService = new Turndown({ headingStyle: 'atx', codeBlockStyle: 'fenced' });
          markdown = turndownService.turndown(result.value);
          break;
        }

        case 'html':
        case 'htm': {
          const decoder = new TextDecoder('utf-8');
          const html = decoder.decode(arrayBuffer);
          const Turndown = await getTurndown();
          const turndownService = new Turndown({ headingStyle: 'atx', codeBlockStyle: 'fenced' });
          markdown = turndownService.turndown(html);
          break;
        }

        case 'xlsx':
        case 'xls': {
          const x = await getXLSX();
          const workbook = XLSX.read(arrayBuffer, { type: 'array' });
          const sheets = [];
          workbook.SheetNames.forEach(name => {
            const sheet = workbook.Sheets[name];
            const csv = XLSX.utils.sheet_to_csv(sheet);
            sheets.push(`## Sheet: ${name}\n\n\`\`\`csv\n${csv}\n\`\`\``);
          });
          markdown = sheets.join('\n\n');
          break;
        }

        case 'csv': {
          const decoder = new TextDecoder('utf-8');
          const text = decoder.decode(arrayBuffer);
          markdown = `\`\`\`csv\n${text}\n\`\`\``;
          break;
        }

        case 'json': {
          const decoder = new TextDecoder('utf-8');
          const text = decoder.decode(arrayBuffer);
          try {
            const parsed = JSON.parse(text);
            markdown = `\`\`\`json\n${JSON.stringify(parsed, null, 2)}\n\`\`\``;
          } catch {
            markdown = `\`\`\`json\n${text}\n\`\`\``;
          }
          break;
        }

        case 'md':
        case 'markdown': {
          const decoder = new TextDecoder('utf-8');
          markdown = decoder.decode(arrayBuffer);
          break;
        }

        case 'txt':
        case 'log':
        case 'ini':
        case 'cfg':
        case 'env':
        case 'yaml':
        case 'yml':
        case 'toml':
        case 'xml': {
          const decoder = new TextDecoder('utf-8');
          const text = decoder.decode(arrayBuffer);

          // Auto-detect format for syntax highlighting
          let lang = ext;
          if (ext === 'cfg' || ext === 'ini') lang = 'ini';
          if (ext === 'env') lang = 'bash';
          if (ext === 'yaml' || ext === 'yml') lang = 'yaml';
          if (ext === 'toml') lang = 'toml';

          markdown = `\`\`\`${lang}\n${text}\n\`\`\``;
          break;
        }

        case 'js':
        case 'jsx':
        case 'ts':
        case 'tsx':
        case 'py':
        case 'rb':
        case 'java':
        case 'c':
        case 'cpp':
        case 'h':
        case 'hpp':
        case 'go':
        case 'rs':
        case 'swift':
        case 'kt':
        case 'php':
        case 'sh':
        case 'bash':
        case 'zsh':
        case 'sql':
        case 'css':
        case 'scss':
        case 'less': {
          const decoder = new TextDecoder('utf-8');
          const text = decoder.decode(arrayBuffer);
          markdown = `\`\`\`${ext}\n${text}\n\`\`\``;
          break;
        }

        case 'png':
        case 'jpg':
        case 'jpeg':
        case 'gif':
        case 'svg':
        case 'webp':
        case 'bmp':
        case 'ico': {
          markdown = `![${file.name}](file:///${file.name})\n\n*Image file: ${file.name} (${formatFileSize(originalSize)})*`;
          break;
        }

        default: {
          // Try reading as text
          try {
            const decoder = new TextDecoder('utf-8');
            const text = decoder.decode(arrayBuffer);
            markdown = `\`\`\`\n${text}\n\`\`\``;
          } catch {
            markdown = `*Unsupported file type: ${ext}. File: ${file.name} (${formatFileSize(originalSize)})*\n\n\`\`\`\n${arrayBuffer.byteLength} bytes of binary data\n\`\`\``;
          }
        }
      }

      if (signal.aborted) throw new DOMException('Aborted', 'AbortError');

      const elapsedMs = state.stats?.elapsedMs || 0;
      const optimizedTokens = estimateTokens(markdown);
      const reductionPercent = originalSize > 0
        ? Math.round((1 - (markdown.length / originalSize)) * 100)
        : 0;

      setState({
        file,
        status: 'done',
        markdown,
        error: null,
        stats: {
          fileName: file.name,
          fileSize: formatFileSize(originalSize),
          originalSize,
          fileType: ext.toUpperCase(),
          category,
          markdownLength: markdown.length,
          optimizedTokens,
          estimatedOriginalTokens: estimateTokens(
            new TextDecoder('utf-8').decode(arrayBuffer.slice(0, Math.min(arrayBuffer.byteLength, 100000)))
          ),
          reductionPercent: Math.max(0, reductionPercent),
          elapsedMs,
        },
      });
    } catch (err) {
      if (err.name === 'AbortError') return;
      setState(prev => ({
        ...prev,
        status: 'error',
        error: err.message || 'Failed to convert file',
        markdown: '',
      }));
    }
  }, []);

  return { state, convertFile, reset };
}
