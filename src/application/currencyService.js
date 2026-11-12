import { formatConversion, parseCurrencyQuery } from '../domain/currency/currencyQuery'
import { HIGHEST_RELEVANCE } from '../domain/suggestions/mergeSuggestions'

/**
 * @param {(from: string, to: string) => Promise<number|null>} getRate
 */
export function createCurrencyService(getRate) {
  return {
    isConversion: query => parseCurrencyQuery(query) !== null,

    /** Returns a suggestion such as "92.5 EUR", or null. */
    async convert(query) {
      const parsed = parseCurrencyQuery(query)
      if (!parsed) return null

      const rate = await getRate(parsed.from, parsed.to)
      if (typeof rate !== 'number') return null

      return {
        suggestion: formatConversion(parsed.amount * rate, parsed.to),
        type: 'currency',
        relevance: HIGHEST_RELEVANCE,
      }
    },
  }
}
