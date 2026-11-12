import isValidUrl from './isValidUrl'
import ensureProtocol from './ensureProtocol'

/** Returns "secondLevel.firstLevel" domain of a valid URL (e.g. "github.com"), or null. */
export default function normaliseUrl(value) {
  if (!isValidUrl(value)) return null

  let hostname
  try {
    hostname = new URL(ensureProtocol(value)).hostname
  } catch {
    return null
  }

  const withoutTld = hostname.slice(0, hostname.lastIndexOf('.'))
  return hostname.slice(withoutTld.lastIndexOf('.') + 1)
}
