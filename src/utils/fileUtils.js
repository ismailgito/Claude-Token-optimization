export function formatFileSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export function getFileCategory(filename) {
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

export function estimateTokens(text) {
  return Math.ceil(text.length / 4);
}

export const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25MB
