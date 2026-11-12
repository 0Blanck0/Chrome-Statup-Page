import { describe, expect, it } from 'vitest'
import { formatConversion, parseCurrencyQuery } from './currencyQuery'

describe('parseCurrencyQuery', () => {
  it('reads the amount (1 by default) and the currencies', () => {
    expect(parseCurrencyQuery('100 usd to eur')).toEqual({ amount: 100, from: 'USD', to: 'EUR' })
    expect(parseCurrencyQuery('GBP to JPY')).toEqual({ amount: 1, from: 'GBP', to: 'JPY' })
    expect(parseCurrencyQuery('2.5 eur to usd')).toEqual({ amount: 2.5, from: 'EUR', to: 'USD' })
  })

  it('ignores text that only looks like a conversion', () => {
    expect(parseCurrencyQuery('how to fix')).toBeNull()
    expect(parseCurrencyQuery('car to bus')).toBeNull()
  })

  it('formats with two decimals', () => {
    expect(formatConversion(92.456, 'EUR')).toBe('92.46 EUR')
  })
})
