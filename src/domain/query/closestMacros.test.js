import { describe, expect, it } from 'vitest'
import { bestMacro, closestMacros, normaliseText, similarity } from './closestMacros'
import { testConfig } from '../../test/config'

const names = typed => closestMacros(typed, testConfig.macros).map(m => m.macro.name)

describe('normaliseText', () => {
  it('ignores case, accents and symbols', () => {
    expect(normaliseText('Wikipédia')).toBe('wikipedia')
    expect(normaliseText('Disney+')).toBe('disney')
  })
})

describe('similarity', () => {
  it('ranks exact > prefix > typo > skipped letters > unrelated', () => {
    const scores = ['netflix', 'netf', 'netlfix', 'ntflx', 'zzz'].map(q => similarity(q, 'Netflix'))
    expect([...scores].sort((a, b) => b - a)).toEqual(scores)
    expect(scores.at(-1)).toBe(0)
  })
})

describe('closestMacros', () => {
  it('finds websites from a partial, misspelled or alternative name', () => {
    expect(names('netf')[0]).toBe('Netflix')
    expect(names('netlfix')[0]).toBe('Netflix')
    expect(names('wiki')[0]).toBe('Wikipédia')
    expect(names('drive')[0]).toBe('Google Drive')
    expect(names('disney')[0]).toBe('Disney+')
  })

  it('ignores search queries', () => {
    expect(names('recette de crêpes')).toEqual([])
    expect(names('netflix stranger things')).toEqual([])
  })
})

describe('bestMacro', () => {
  it('opens the website whose name starts with the typed text, even a single letter', () => {
    expect(bestMacro('gith', testConfig.macros).name).toBe('GitHub')
    expect(bestMacro('n', testConfig.macros).name).toBe('Netflix')
  })

  it('prefers the name over keywords, then the config order', () => {
    const macros = [
      { name: 'Claude', url: 'https://claude.ai', keywords: ['ai'] },
      { name: 'Amazon', url: 'https://www.amazon.fr' },
      { name: 'Canal+', url: 'https://www.canalplus.com' },
    ]
    expect(bestMacro('a', macros).name).toBe('Amazon')
    expect(bestMacro('c', macros).name).toBe('Claude')
    expect(closestMacros('c', macros).map(m => m.macro.name)).toEqual(['Claude', 'Canal+'])
  })

  it('only suggests (never opens) on typos and skipped letters', () => {
    expect(bestMacro('gthb', testConfig.macros)).toBeNull()
    expect(bestMacro('netlfix', testConfig.macros)).toBeNull()
    expect(closestMacros('netlfix', testConfig.macros)[0].macro.name).toBe('Netflix')
  })
})
