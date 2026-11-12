import { Provider, createInitialState } from './Store'

export function StoreProvider({ children }) {
  return <Provider initialState={createInitialState()}>{children}</Provider>
}
