import MiniSearch from 'minisearch'

const LIMIT = 5000

/**
 * Search history: stores typed queries and suggests them back.
 * @param {{ read(): unknown, write(value: unknown): void }} store
 */
export function createHistoryService(store) {
  const read = () => {
    const entries = store.read()
    return Array.isArray(entries) ? entries.filter(e => typeof e?.id === 'string') : []
  }

  const index = new MiniSearch({ fields: ['id'] })
  index.addAll(read())

  return {
    add(query) {
      const entries = read()
      if (entries.some(entry => entry.id === query)) return

      const entry = { id: query, type: 'query' }
      const kept = [entry, ...entries].slice(0, LIMIT)
      store.write(kept)

      index.removeAll()
      index.addAll(kept)
    },

    suggest(query, limit) {
      return index
        .search(query, { prefix: term => term.length > 3, fuzzy: 0.2, combineWith: 'AND' })
        .slice(0, limit)
        .map(result => ({ suggestion: result.id, type: 'query', relevance: result.score * 1000 }))
    },

    clear() {
      store.write([])
      index.removeAll()
    },
  }
}
