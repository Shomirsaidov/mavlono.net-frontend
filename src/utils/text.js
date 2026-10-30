// Stored poems/bios may contain literal <br> tags (legacy data); the UI renders
// text with newlines, so convert them before display.
export const normalizeBreaks = (s) => (s ? String(s).replace(/<br\s*\/?>/gi, '\n') : '')

export const escapeHtml = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
