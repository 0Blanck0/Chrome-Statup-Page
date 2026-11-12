const isPlainObject = value => typeof value === 'object' && value !== null && !Array.isArray(value)

/**
 * Deeply merges saved settings into the defaults.
 * Values of the wrong type are ignored, so settings saved by an older
 * version (or corrupted by hand) can never break the app.
 * Extra saved objects are kept (e.g. custom themes).
 */
export function mergeSettings(defaults, saved) {
  if (!isPlainObject(saved)) return structuredClone(defaults)

  const result = {}
  for (const [key, defaultValue] of Object.entries(defaults)) {
    const value = saved[key]
    if (isPlainObject(defaultValue)) result[key] = mergeSettings(defaultValue, value)
    else result[key] = value !== undefined && typeof value === typeof defaultValue ? value : defaultValue
  }

  for (const [key, value] of Object.entries(saved))
    if (!(key in result) && isPlainObject(value)) result[key] = structuredClone(value)

  return result
}
