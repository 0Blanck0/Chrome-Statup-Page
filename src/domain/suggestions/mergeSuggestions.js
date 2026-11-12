export const HIGHEST_RELEVANCE = 5000
// websites are listed above the search suggestions
export const WEBSITE_RELEVANCE = 4000

// The lower the index, the higher the priority when two sources suggest the same text.
const PRIORITY = ['currency', 'websites', 'history', 'autocomplete']

const priority = suggestion => {
  const index = PRIORITY.indexOf(suggestion.source)
  return index === -1 ? PRIORITY.length : index
}

/**
 * Adds suggestions coming from a source to the current list (immutably):
 * duplicates keep the highest priority entry, the result is sorted by relevance.
 * @param {object[]} current
 * @param {object[]} incoming  suggestions: { suggestion, type, relevance }
 * @param {string} source      'websites' | 'autocomplete' | 'history' | 'currency'
 */
export function mergeSuggestions(current, incoming, source) {
  const byText = new Map(current.map(s => [s.suggestion, s]))

  for (const suggestion of incoming) {
    const candidate = { ...suggestion, source }
    const existing = byText.get(candidate.suggestion)
    if (!existing || priority(candidate) < priority(existing)) byText.set(candidate.suggestion, candidate)
  }

  return [...byText.values()].sort((a, b) => b.relevance - a.relevance)
}
