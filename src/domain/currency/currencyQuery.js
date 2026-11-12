import CURRENCY_CODES from './currencyCodes'

// "100 usd to eur", "usd to eur", "-2.5 GBP to JPY"
const CURRENCY_QUERY = /^\s*(?:([+-]?\d*\.?\d+)\s+)?([a-z]{3})\s+to\s+([a-z]{3})\s*$/i

/** Returns { amount, from, to } when the query is a currency conversion, null otherwise. */
export function parseCurrencyQuery(query) {
  const match = CURRENCY_QUERY.exec(query)
  if (!match) return null

  const amount = match[1] === undefined ? 1 : Number(match[1])
  const from = match[2].toUpperCase()
  const to = match[3].toUpperCase()

  if (!CURRENCY_CODES.has(from) || !CURRENCY_CODES.has(to)) return null
  return { amount, from, to }
}

export function formatConversion(value, currency) {
  return `${Math.round((value + Number.EPSILON) * 100) / 100} ${currency}`
}
