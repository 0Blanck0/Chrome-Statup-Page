import { useContext, useEffect, useMemo, useState } from 'react'
import { SettingsContext } from '../contexts/Settings'
import { useServices } from '../contexts/Services'
import { mergeSuggestions, WEBSITE_RELEVANCE } from '../../domain/suggestions/mergeSuggestions'
import { closestMacros } from '../../domain/query/closestMacros'

const EMPTY = []
const WEBSITES_LIMIT = 4

/**
 * Suggestions for a query: closest websites and history (sync),
 * autocomplete and currency converter (async).
 */
function useSuggestions(query) {
  const { autocomplete, history, currency, config } = useServices()
  const settings = useContext(SettingsContext)

  const locale = settings.general.locale
  const searchHistory = settings.general.searchHistory
  const { autocompleteLimit, historyLimit } = settings.query.suggestions

  const fromWebsites = useMemo(
    () =>
      query
        ? closestMacros(query, config.macros, WEBSITES_LIMIT).map(({ macro, score }) => ({
            suggestion: macro.name,
            type: 'macro',
            relevance: WEBSITE_RELEVANCE + score * 900,
          }))
        : EMPTY,
    [query, config]
  )

  const fromHistory = useMemo(
    () => (query && searchHistory ? history.suggest(query, historyLimit) : EMPTY),
    [query, searchHistory, history, historyLimit]
  )

  // async results, tagged with the query they belong to
  const [remote, setRemote] = useState({ query: '', autocomplete: EMPTY, currency: EMPTY })

  useEffect(() => {
    if (!query) return
    let outdated = false
    const save = (key, value) => {
      if (outdated) return
      setRemote(state => ({
        ...(state.query === query ? state : { query, autocomplete: EMPTY, currency: EMPTY }),
        [key]: value,
      }))
    }

    autocomplete(query, locale).then(found => save('autocomplete', found.slice(0, autocompleteLimit)))
    if (currency.isConversion(query)) currency.convert(query).then(found => found && save('currency', [found]))

    return () => {
      outdated = true
    }
  }, [query, locale, autocompleteLimit, autocomplete, currency])

  return useMemo(() => {
    if (!query) return EMPTY
    // never show the async results of a previous query
    const current = remote.query === query ? remote : { autocomplete: EMPTY, currency: EMPTY }

    let suggestions = mergeSuggestions(EMPTY, fromWebsites, 'websites')
    suggestions = mergeSuggestions(suggestions, fromHistory, 'history')
    suggestions = mergeSuggestions(suggestions, current.autocomplete, 'autocomplete')
    return mergeSuggestions(suggestions, current.currency, 'currency')
  }, [query, fromWebsites, fromHistory, remote])
}

export default useSuggestions
