import { useContext, useMemo, useState } from 'react'
import useIsKeyPressed from './useIsKeyPressed'
import { SettingsContext, ColorSchemeContext } from '../contexts/Settings'
import { useServices } from '../contexts/Services'
import ParsedQuery from '../../domain/query/parsedQuery'

function useParseQuery(value, type = 'query', origin, persist = false) {
  const { config } = useServices()
  const settings = useContext(SettingsContext)
  const colorScheme = useContext(ColorSchemeContext)

  const engine = config.engine

  const isCtrlPressed = useIsKeyPressed('Control')
  const forceSearchEngine = settings.query.forceSearchEngineOnCtrl && isCtrlPressed

  const parsedQuery = useMemo(
    () => new ParsedQuery({ value, type, origin, engine, config, colorScheme, forceSearchEngine }),
    [value, type, origin, engine, config, colorScheme, forceSearchEngine]
  )

  // keep the query displayed while the redirect animation plays
  const [persisted, setPersisted] = useState(parsedQuery)
  if (!persist && persisted !== parsedQuery) setPersisted(parsedQuery)

  return [persist ? persisted : parsedQuery, isCtrlPressed]
}

export default useParseQuery
