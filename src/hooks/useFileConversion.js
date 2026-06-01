import { useState, useCallback, useRef } from 'react';
import { formatFileSize, getFileCategory, estimateTokens } from '../utils/fileUtils';

// Dynamic imports for large libraries — only loaded when needed
let pdfjsLib = null;
async function getPdfJs() {
  if (!pdfjsLib) {
    const pdfjs = await import('pdfjs-dist');
    const pdfjsWorkerUrl = await import('pdfjs-dist/build/pdf.worker.min.mjs?url');
    pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorkerUrl.default;
    pdfjsLib = pdfjs;
  }
  return pdfjsLib;
}

let mammoth = null;
async function getMammoth() {
  if (!mammoth) {
    const m = await import('mammoth');
    mammoth = m.default || m;
  }
  return mammoth;
}

let TurndownService = null;
async function getTurndown() {
  if (!TurndownService) {
    const td = await import('turndown');
    TurndownService = td.default || td;
  }
  return TurndownService;
}

let XLSX = null;
async function getXLSX() {
  if (!XLSX) {
    const x = await import('xlsx');
    XLSX = x.default || x;
  }
  return XLSX;
}

const INITIAL_STATE = {
  file: null,
  status: 'idle', // idle | converting | done | error
  markdown: '',
  error: null,
  stats: null,
  progress: { phase: '', current: 0, total: 0 },
};

export default function useFileConversion() {
  const [state, setState] = useState(INITIAL_STATE);
  const abortRef = useRef(null);
  // Use a ref for progress so the convertFile callback doesn't need to be
  // recreated every time progress updates (which would cause stale closures).
  const progressRef = useRef(INITIAL_STATE.progress);

  const updateProgress = useCallback((phase, current, total) => {
    const p = { phase, current, total };
    progressRef.current = p;
    setState(prev => ({ ...prev, progress: p }));
  }, []);

  const reset = useCallback(() => {
    if (abortRef.current) {
      abortRef.current.abort();
    }
    progressRef.current = INITIAL_STATE.progress;
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
    const startTime = performance.now();

    // Reset progress
    progressRef.current = { phase: 'Reading file...', current: 0, total: 1 };

    setState({
      file,
      status: 'converting',
      markdown: '',
      error: null,
      stats: null,
      progress: { phase: 'Reading file...', current: 0, total: 1 },
    });

    try {
      let markdown = '';

      if (signal.aborted) throw new DOMException('Aborted', 'AbortError');

      // Read file as ArrayBuffer once for reuse
      let arrayBuffer;
      try {
        arrayBuffer = await file.arrayBuffer();
      } catch (e) {
        throw new Error(`Failed to read file (${formatFileSize(originalSize)}). The file may be too large for your browser's memory. Try a smaller file or compress it.`);
      }

      updateProgress('Reading file...', 1, 1);

      if (signal.aborted) throw new DOMException('Aborted', 'AbortError');

      switch (ext) {
        case 'pdf': {
          const pdfjs = await getPdfJs();
          updateProgress('Loading PDF...', 0, 1);
          const pdf = await pdfjs.getDocument({ data: arrayBuffer.slice(0) }).promise;
          const numPages = pdf.numPages;
          updateProgress('Loading PDF pages...', 0, numPages);

          const pages = [];
          for (let i = 1; i <= numPages; i++) {
            if (signal.aborted) throw new DOMException('Aborted', 'AbortError');
            updateProgress(`Processing page ${i} of ${numPages}`, i, numPages);
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();
            const text = content.items.map(item => item.str).join(' ');
            pages.push(`## Page ${i}\n\n${text}`);
          }
          updateProgress('Finalizing...', numPages, numPages);
          markdown = pages.join('\n\n');
          break;
        }

        case 'docx': {
          updateProgress('Loading Word document...', 0, 3);
          const m = await getMammoth();
          updateProgress('Converting to HTML...', 1, 3);
          const result = await m.convertToHtml({ arrayBuffer: arrayBuffer.slice(0) });
          updateProgress('Converting to Markdown...', 2, 3);
          const Turndown = await getTurndown();
          const turndownService = new Turndown({ headingStyle: 'atx', codeBlockStyle: 'fenced' });
          markdown = turndownService.turndown(result.value);
          updateProgress('Done', 3, 3);
          break;
        }

        case 'html':
        case 'htm': {
          updateProgress('Parsing HTML...', 0, 2);
          const decoder = new TextDecoder('utf-8');
          const html = decoder.decode(arrayBuffer);
          updateProgress('Converting to Markdown...', 1, 2);
          const Turndown = await getTurndown();
          const turndownService = new Turndown({ headingStyle: 'atx', codeBlockStyle: 'fenced' });
          markdown = turndownService.turndown(html);
          updateProgress('Done', 2, 2);
          break;
        }

        case 'xlsx':
        case 'xls': {
          const XLSX_LIB = await getXLSX();
          updateProgress('Reading spreadsheet...', 0, 1);
          const workbook = XLSX_LIB.read(arrayBuffer, { type: 'array' });
          const sheetNames = workbook.SheetNames;
          const numSheets = sheetNames.length;
          updateProgress(`Processing sheets...`, 0, numSheets);

          const sheets = [];
          for (let i = 0; i < numSheets; i++) {
            if (signal.aborted) throw new DOMException('Aborted', 'AbortError');
            const name = sheetNames[i];
            updateProgress(`Processing sheet ${i + 1} of ${numSheets}: ${name}`, i + 1, numSheets);
            const sheet = workbook.Sheets[name];
            const csv = XLSX_LIB.utils.sheet_to_csv(sheet);
            sheets.push(`## Sheet: ${name}\n\n\`\`\`csv\n${csv}\n\`\`\``);
          }
          markdown = sheets.join('\n\n');
          break;
        }

        case 'csv': {
          updateProgress('Reading CSV...', 0, 1);
          const decoder = new TextDecoder('utf-8');
          const text = decoder.decode(arrayBuffer);
          updateProgress('Formatting...', 1, 1);
          markdown = `\`\`\`csv\n${text}\n\`\`\``;
          break;
        }

        case 'json': {
          updateProgress('Parsing JSON...', 0, 1);
          const decoder = new TextDecoder('utf-8');
          const text = decoder.decode(arrayBuffer);
          try {
            const parsed = JSON.parse(text);
            markdown = `\`\`\`json\n${JSON.stringify(parsed, null, 2)}\n\`\`\``;
          } catch {
            markdown = `\`\`\`json\n${text}\n\`\`\``;
          }
          updateProgress('Done', 1, 1);
          break;
        }

        case 'md':
        case 'markdown': {
          updateProgress('Reading Markdown...', 0, 1);
          const decoder = new TextDecoder('utf-8');
          markdown = decoder.decode(arrayBuffer);
          updateProgress('Done', 1, 1);
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
          updateProgress('Reading file...', 0, 1);
          const decoder = new TextDecoder('utf-8');
          const text = decoder.decode(arrayBuffer);

          // Auto-detect format for syntax highlighting
          let lang = ext;
          if (ext === 'cfg' || ext === 'ini') lang = 'ini';
          if (ext === 'env') lang = 'bash';
          if (ext === 'yaml' || ext === 'yml') lang = 'yaml';
          if (ext === 'toml') lang = 'toml';

          markdown = `\`\`\`${lang}\n${text}\n\`\`\``;
          updateProgress('Done', 1, 1);
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
          updateProgress('Reading source code...', 0, 1);
          const decoder = new TextDecoder('utf-8');
          const text = decoder.decode(arrayBuffer);
          markdown = `\`\`\`${ext}\n${text}\n\`\`\``;
          updateProgress('Done', 1, 1);
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
          updateProgress('Processing image...', 0, 1);
          markdown = `*Image file: ${file.name} (${formatFileSize(originalSize)})*`;
          updateProgress('Done', 1, 1);
          break;
        }

        default: {
          updateProgress('Reading file...', 0, 1);
          // Try reading as text
          try {
            const decoder = new TextDecoder('utf-8');
            const text = decoder.decode(arrayBuffer);
            markdown = `\`\`\`\n${text}\n\`\`\``;
          } catch {
            markdown = `*Unsupported file type: ${ext}. File: ${file.name} (${formatFileSize(originalSize)})*\n\n\`\`\`\n${arrayBuffer.byteLength} bytes of binary data\n\`\`\``;
          }
          updateProgress('Done', 1, 1);
        }
      }

      if (signal.aborted) throw new DOMException('Aborted', 'AbortError');

      const endTime = performance.now();
      const elapsedMs = Math.round(endTime - startTime);
      const optimizedTokens = estimateTokens(markdown);
      const reduction = originalSize > 0
        ? Math.round((1 - (markdown.length / originalSize)) * 100)
        : 0;

      const estimatedOriginalTokens = estimateTokens(
        new TextDecoder('utf-8').decode(arrayBuffer.slice(0, Math.min(arrayBuffer.byteLength, 100000)))
      );

      setState({
        file,
        status: 'done',
        markdown,
        error: null,
        progress: { phase: 'Complete', current: 1, total: 1 },
        stats: {
          fileName: file.name,
          originalSize: formatFileSize(originalSize),
          optimizedSize: formatFileSize(markdown.length),
          reduction: Math.max(0, reduction),
          originalTokens: estimatedOriginalTokens,
          optimizedTokens,
          fileType: ext.toUpperCase(),
          category,
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
        progress: { phase: 'Failed', current: 0, total: 1 },
      }));
    }
  }, []);

  return { state, convertFile, reset };
}
