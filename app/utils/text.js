// Stored poems/bios may contain literal <br> tags (legacy data); the UI renders
// text with newlines, so convert them before display.
export const normalizeBreaks = (s) => (s ? String(s).replace(/<br\s*\/?>/gi, '\n') : '')

export const escapeHtml = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

// First `n` non-empty lines of a poem (legacy <br> tags are treated as line breaks).
export const poemLines = (content, n = 4) =>
  normalizeBreaks(content).split('\n').map((l) => l.trim()).filter(Boolean).slice(0, n)

// Collapses whitespace and cuts text to `max` characters on a word boundary.
export const truncate = (s, max) => {
  const clean = String(s || '').replace(/\s+/g, ' ').trim()
  if (clean.length <= max) return clean
  const cut = clean.slice(0, max - 1)
  const lastSpace = cut.lastIndexOf(' ')
  return (lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).replace(/[\s,.;:!?—–-]+$/, '') + '…'
}

// Deterministic DD.MM.YYYY (UTC) so server and browser render the same text and
// no locale/time-zone data is needed.
export const formatDate = (d) => {
  if (!d) return ''
  const date = new Date(d)
  if (Number.isNaN(date.getTime())) return ''
  const pad = (n) => String(n).padStart(2, '0')
  return `${pad(date.getUTCDate())}.${pad(date.getUTCMonth() + 1)}.${date.getUTCFullYear()}`
}
