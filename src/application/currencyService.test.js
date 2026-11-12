import { describe, expect, it, vi } from 'vitest'
import { createCurrencyService } from './currencyService'

describe('currencyService', () => {
  it('converts with the rate given by the API adapter', async () => {
    const getRate = vi.fn().mockResolvedValue(0.9)
    const result = await createCurrencyService(getRate).convert('10 usd to eur')
    expect(getRate).toHaveBeenCalledWith('USD', 'EUR')
    expect(result).toMatchObject({ suggestion: '9 EUR', type: 'currency' })
  })

  it('returns null when the rate is unavailable', async () => {
    expect(await createCurrencyService(async () => null).convert('10 usd to eur')).toBeNull()
  })
})
