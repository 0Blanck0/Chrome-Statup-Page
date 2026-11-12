import { createContext, use } from 'react'

/**
 * Application services wired in main.jsx (composition root):
 * { config, history, currency, autocomplete, settings }
 */
export const ServicesContext = createContext(null)

export function useServices() {
  const services = use(ServicesContext)
  if (!services) throw new Error('useServices must be used inside <ServicesContext>')
  return services
}
