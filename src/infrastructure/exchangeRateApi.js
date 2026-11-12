// Free API, no key required: https://www.exchangerate-api.com/docs/free
const API_URL = 'https://open.er-api.com/v6/latest/'
const CACHE_DURATION = 60 * 60 * 1000

const cache = new Map()

/** Returns the exchange rate between two ISO 4217 currencies, or null. */
export async function getExchangeRate(from, to) {
  try {
    let entry = cache.get(from)
    if (!entry || Date.now() - entry.time > CACHE_DURATION) {
      const response = await fetch(API_URL + encodeURIComponent(from))
      const data = await response.json()
      if (data.result !== 'success') return null

      entry = { time: Date.now(), rates: data.rates }
      cache.set(from, entry)
    }
    return entry.rates[to] ?? null
  } catch {
    return null
  }
}
