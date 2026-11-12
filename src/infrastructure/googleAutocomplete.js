import { jsonp } from './jsonp'

const API_URL = 'https://www.google.com/complete/search'

/** Google search suggestions: [{ suggestion, type, relevance }]. Returns [] on any failure. */
export async function googleAutocomplete(query, locale) {
  try {
    const response = await jsonp(callback => {
      const params = new URLSearchParams({ q: query, client: 'chrome-omni', hl: locale, callback })
      return `${API_URL}?${params}`
    })

    const [, phrases = [], , , details = {}] = response
    const types = details['google:suggesttype'] ?? []
    const relevances = details['google:suggestrelevance'] ?? []

    return phrases.map((phrase, i) => {
      const type = (types[i] ?? 'query').toLowerCase()
      return {
        // calculator results look like "= 43"
        suggestion: type === 'calculator' ? phrase.replace(/^=\s*/, '') : phrase,
        type,
        relevance: relevances[i] ?? 0,
      }
    })
  } catch {
    return []
  }
}
