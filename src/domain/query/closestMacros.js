/**
 * "Nearest neighbour" matching between what the user types and the configured websites:
 * no shortcut to learn, the closest names are suggested while typing.
 * Ties are broken by the order of the websites in config.js (first = preferred).
 */

// a website whose name (or keyword) starts with the typed text is opened directly with Enter
export const STRONG_MATCH = 0.85
const MIN_SCORE = 0.55
// keywords and domains are less relevant than the name itself
const ALIAS_PENALTY = 0.05

/** Lower case, no accents, letters and digits only ("Wikipédia" -> "wikipedia", "Disney+" -> "disney"). */
export function normaliseText(text) {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')
}

/** Similarity between a typed text and a candidate name, from 0 (unrelated) to 1 (identical). */
export function similarity(typed, candidate) {
  const q = normaliseText(typed)
  const c = normaliseText(candidate)
  if (!q || !c) return 0

  if (q === c) return 1
  // "netf" -> "netflix"
  if (c.startsWith(q)) return 0.9
  // typos: "netlfix", "yotube"
  if (q.length >= 3) {
    const tolerance = q.length >= 6 ? 2 : 1
    const distance = Math.min(editDistance(q, c.slice(0, q.length)), editDistance(q, c))
    if (distance <= tolerance) return 0.8 - 0.05 * distance
  }
  // skipped letters: "ytb" -> "youtube", "gdrive" -> "googledrive"
  if (q.length >= 2 && q[0] === c[0] && isSubsequence(q, c)) return 0.6 + (0.15 * q.length) / c.length

  return 0
}

/**
 * Websites sorted from the closest to the farthest (only relevant ones).
 * @returns {{ macro: object, score: number }[]}
 */
export function closestMacros(typed, macros, limit = Infinity) {
  return macros
    .map(macro => ({ macro, score: score(typed, macro) }))
    .filter(match => match.score >= MIN_SCORE)
    .sort((a, b) => b.score - a.score) // stable: equal scores keep the config order
    .slice(0, limit)
}

/** The website to open directly: the first one whose name starts with the typed text. */
export function bestMacro(typed, macros) {
  const [best] = closestMacros(typed, macros, 1)
  return best && best.score >= STRONG_MATCH ? best.macro : null
}

function score(typed, macro) {
  const aliases = [...(macro.keywords ?? [])]
  // words of a multi-word name ("Google Drive" -> "drive")
  const words = macro.name.split(/\s+/).filter(word => word.length >= 3)
  if (words.length > 1) aliases.push(...words)
  const host = hostnameOf(macro.url)
  if (host) aliases.push(host.slice(0, host.lastIndexOf('.')))

  return Math.max(similarity(typed, macro.name), ...aliases.map(alias => similarity(typed, alias) - ALIAS_PENALTY))
}

export function hostnameOf(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return null
  }
}

function isSubsequence(q, c) {
  let i = 0
  for (const char of c) if (char === q[i]) i++
  return i === q.length
}

// Damerau-Levenshtein (optimal string alignment): swapped letters count as one typo
function editDistance(a, b) {
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)])
  for (let j = 1; j <= b.length; j++) d[0][j] = j

  for (let i = 1; i <= a.length; i++)
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost)
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1)
    }
  return d[a.length][b.length]
}
