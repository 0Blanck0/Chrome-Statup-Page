import { describe, expect, it } from 'vitest'
import { createHistoryService } from './historyService'
import { createLocalStorageStore } from '../infrastructure/localStorageStore'

const service = () => createHistoryService(createLocalStorageStore('history'))

describe('historyService', () => {
  it('stores queries once and suggests them back (fuzzy)', () => {
    const history = service()
    history.add('chevron startpage')
    history.add('chevron startpage')
    expect(JSON.parse(localStorage.getItem('history'))).toHaveLength(1)

    expect(service().suggest('chevrom', 5)[0]).toMatchObject({ suggestion: 'chevron startpage', type: 'query' })
  })

  it('survives corrupted storage and can be cleared', () => {
    localStorage.setItem('history', '{oops')
    const history = service()
    expect(history.suggest('x', 5)).toEqual([])
    history.add('hello world')
    history.clear()
    expect(history.suggest('hello', 5)).toEqual([])
  })
})
