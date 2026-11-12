/**
 * JSON value stored in localStorage under one key.
 * Never throws: corrupted data reads as null, write failures (quota, private mode) are logged.
 */
export function createLocalStorageStore(key, storage = globalThis.localStorage) {
  return {
    read() {
      try {
        const raw = storage.getItem(key)
        return raw === null ? null : JSON.parse(raw)
      } catch {
        return null
      }
    },
    write(value) {
      try {
        storage.setItem(key, JSON.stringify(value))
      } catch (error) {
        console.warn(`Unable to save "${key}"`, error)
      }
    },
    remove() {
      storage.removeItem(key)
    },
  }
}
