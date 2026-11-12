import { useCallback } from 'react'
import createOptimizedContext from './createOptimisedContext'

/*
app modes:
  - default
  - opened
  - searching
*/

export function createInitialState() {
  return {
    mode: 'default',
    query: '',
    selectedSuggestion: null,
    redirected: false,
    timestamp: Date.now(),
  }
}

const {
  Provider,
  useStateSelector,
  useStore,
} = createOptimizedContext()

function useUpdate() {
  const store = useStore()

  return useCallback(partialNewState => {
    const state = store.getState()
    if (state.redirected) return
    
    const newState = { ...state, ...partialNewState }
    
    if ('query' in partialNewState)
      newState.mode = partialNewState.query ? 'searching' : 'default'
    if (newState.mode !== 'searching')
      newState.selectedSuggestion = null

    store.update(newState)
  }, [store])
}

function useReset() {
  const store = useStore()
  return () => store.update(createInitialState())
}

export { Provider, useStateSelector, useUpdate, useReset }