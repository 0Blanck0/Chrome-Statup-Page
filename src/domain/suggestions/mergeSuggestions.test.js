import { describe, expect, it } from 'vitest'
import { mergeSuggestions } from './mergeSuggestions'

describe('mergeSuggestions', () => {
  it('sorts by relevance and tags the source', () => {
    const result = mergeSuggestions([], [{ suggestion: 'a', relevance: 1 }, { suggestion: 'b', relevance: 5 }], 'autocomplete')
    expect(result.map(s => s.suggestion)).toEqual(['b', 'a'])
    expect(result[0].source).toBe('autocomplete')
  })

  it('keeps the history entry when autocomplete suggests the same text', () => {
    const history = mergeSuggestions([], [{ suggestion: 'chevron', relevance: 100 }], 'history')
    const merged = mergeSuggestions(history, [{ suggestion: 'chevron', relevance: 900 }], 'autocomplete')
    expect(merged).toHaveLength(1)
    expect(merged[0].source).toBe('history')
  })

  it('does not mutate its inputs', () => {
    const current = [{ suggestion: 'a', relevance: 1, source: 'history' }]
    const incoming = [{ suggestion: 'b', relevance: 2 }]
    mergeSuggestions(current, incoming, 'autocomplete')
    expect(current).toHaveLength(1)
    expect(incoming[0]).not.toHaveProperty('source')
  })
})
