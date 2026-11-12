export default function ensureProtocol(url, protocol = 'https') {
  return /^https?:\/\//i.test(url) ? url : `${protocol}://${url}`
}
