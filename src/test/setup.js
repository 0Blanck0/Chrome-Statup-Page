import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, vi } from 'vitest'

// jsdom does not implement matchMedia
if (!window.matchMedia)
  window.matchMedia = query => ({
    matches: false,
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
  })

// jsdom does not implement ResizeObserver (used by the marquee)
if (!window.ResizeObserver)
  window.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  }

afterEach(() => {
  cleanup()
  localStorage.clear()
  vi.restoreAllMocks()
})
