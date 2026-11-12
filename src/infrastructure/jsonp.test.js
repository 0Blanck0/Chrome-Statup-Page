import { describe, expect, it, vi } from 'vitest'
import { jsonp } from './jsonp'

describe('jsonp', () => {
  it('resolves with the callback data and cleans up', async () => {
    let name
    const promise = jsonp(callback => {
      name = callback
      return 'https://example.invalid/data'
    })
    window[name](['ok'])

    await expect(promise).resolves.toEqual(['ok'])
    expect(window[name]).toBeUndefined()
    expect(document.querySelector('script[src="https://example.invalid/data"]')).toBeNull()
  })

  it('rejects after the timeout and cleans up', async () => {
    vi.useFakeTimers()
    let name
    const promise = jsonp(callback => ((name = callback), 'https://example.invalid/slow'), { timeout: 100 })
    vi.advanceTimersByTime(100)

    await expect(promise).rejects.toThrow('timed out')
    expect(window[name]).toBeUndefined()
    vi.useRealTimers()
  })
})
