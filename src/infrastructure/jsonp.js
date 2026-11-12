let counter = 0

/**
 * Loads a JSONP resource. `buildUrl` receives the name of the callback to use.
 * Rejects on network error or timeout and always cleans up the script and the global callback.
 */
export function jsonp(buildUrl, { timeout = 5000 } = {}) {
  return new Promise((resolve, reject) => {
    const callbackName = `__jsonp_${Date.now()}_${counter++}`
    const script = document.createElement('script')

    const cleanup = () => {
      clearTimeout(timer)
      script.remove()
      delete window[callbackName]
    }
    const timer = setTimeout(() => {
      cleanup()
      reject(new Error('JSONP request timed out'))
    }, timeout)

    window[callbackName] = data => {
      cleanup()
      resolve(data)
    }
    script.onerror = () => {
      cleanup()
      reject(new Error('JSONP request failed'))
    }

    script.src = buildUrl(callbackName)
    document.head.appendChild(script)
  })
}
