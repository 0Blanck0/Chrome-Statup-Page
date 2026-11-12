import { describe, expect, it } from 'vitest'
import { findCommand, findMacro } from './macros'
import { testConfig } from '../../test/config'

describe('findCommand', () => {
  it('splits the website, the command and its argument', () => {
    expect(findCommand('netflix?stranger things', testConfig.commands)).toEqual({
      type: 'search', trigger: '?', target: 'netflix', args: 'stranger things',
    })
  })

  it('needs something before the command symbol', () => {
    expect(findCommand('?hello', testConfig.commands)).toBeNull()
  })
})

describe('findMacro', () => {
  it('matches a name, a name with a command, or a URL', () => {
    expect(findMacro('github', testConfig)).toMatchObject({ options: { name: 'GitHub' }, command: null })
    expect(findMacro('gith?react', testConfig).command).toMatchObject({ type: 'search', args: 'react' })
    expect(findMacro('netflix.com/title/1', testConfig)).toMatchObject({ options: { name: 'Netflix' } })
  })

  it('ignores commands the website does not have, and empty commands', () => {
    expect(findMacro('netflix/x', testConfig)).toBeNull()
    expect(findMacro('github?', testConfig)).toMatchObject({ options: { name: 'GitHub' }, command: null })
  })

  it('does not confuse a domain with its sub-domains', () => {
    expect(findMacro('google.com', testConfig)).toBeNull()
    expect(findMacro('drive.google.com', testConfig)).toMatchObject({ options: { name: 'Google Drive' } })
  })

  it('returns null for searches', () => {
    expect(findMacro('meteo paris', testConfig)).toBeNull()
  })
})
