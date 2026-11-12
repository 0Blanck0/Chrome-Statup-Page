import { describe, expect, it } from 'vitest'
import { mergeSettings } from './mergeSettings'

const defaults = { general: { locale: 'en', history: true }, menu: { rows: 2 } }

describe('mergeSettings', () => {
  it('returns the defaults when nothing valid is saved', () => {
    expect(mergeSettings(defaults, null)).toEqual(defaults)
    expect(mergeSettings(defaults, 'corrupted')).toEqual(defaults)
  })

  it('keeps saved values of the right type only', () => {
    const saved = { general: { locale: 'fr', history: 'yes' }, menu: null }
    expect(mergeSettings(defaults, saved)).toEqual({ general: { locale: 'fr', history: true }, menu: { rows: 2 } })
  })

  it('keeps extra saved objects such as custom themes', () => {
    expect(mergeSettings(defaults, { custom: { a: 1 } }).custom).toEqual({ a: 1 })
  })
})
