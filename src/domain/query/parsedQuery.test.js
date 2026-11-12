import { describe, expect, it } from 'vitest'
import ParsedQuery from './parsedQuery'
import normaliseUrl from './normaliseUrl'
import { testConfig } from '../../test/config'

const parse = (value, extra = {}) =>
  new ParsedQuery({ value, origin: value, engine: testConfig.engine, config: testConfig, colorScheme: 'dark', ...extra })

describe('ParsedQuery', () => {
  it('searches on DuckDuckGo with every special character encoded', () => {
    const query = parse('c++ & rust #1')
    expect(query.type).toBe('query')
    expect(query.label).toBe('search')
    expect(query.marquee).toBe('DuckDuckGo')
    expect(query.url).toBe('https://duckduckgo.com/?q=c%2B%2B%20%26%20rust%20%231')
  })

  it('opens the closest website and its commands', () => {
    expect(parse('netf').url).toBe('https://www.netflix.com/browse')
    expect(parse('netf').type).toBe('macro')

    const command = parse('github/kholmogorov27/chevron')
    expect(command.type).toBe('command')
    expect(command.label).toBe('go to repository')
    expect(command.url).toBe('https://github.com/kholmogorov27%2Fchevron')

    expect(parse('netflix?stranger things').url).toBe('https://www.netflix.com/search?q=stranger%20things')
  })

  it('redirects to URLs that are not websites of the config', () => {
    const query = parse('example.com/page')
    expect(query.type).toBe('redirect')
    expect(query.url).toBe('example.com/page')
    expect(query.marquee).toBe('example.com')
  })

  it('ignores websites when the search engine is forced (Ctrl)', () => {
    const query = parse('github', { forceSearchEngine: true })
    expect(query.type).toBe('query')
    expect(query.url).toBe('https://duckduckgo.com/?q=github')
  })

  it('uses the template of special suggestion types', () => {
    const query = parse('42', { type: 'calculator', origin: '40+2' })
    expect(query.label).toBe('calculator')
    expect(query.url).toBe('https://duckduckgo.com/?q=40%2B2')
  })
})

describe('normaliseUrl', () => {
  it('keeps the second and first level domains', () => {
    expect(normaliseUrl('https://www.github.com/x')).toBe('github.com')
    expect(normaliseUrl('not an url')).toBeNull()
  })
})
