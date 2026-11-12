import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { createHistoryService } from '../application/historyService'
import { createSettingsService } from '../application/settingsService'
import { createCurrencyService } from '../application/currencyService'
import { createLocalStorageStore } from '../infrastructure/localStorageStore'
import { createSettingsSchema } from './settings/settings'
import { ServicesContext } from './contexts/Services'
import SettingsProvider from './contexts/SettingsProvider'
import { StoreProvider } from './contexts/StoreProvider'
import { testConfig } from '../test/config'
import App from './App'

function renderApp() {
  const schema = createSettingsSchema()
  const settings = createSettingsService(createLocalStorageStore('settings'), schema.defaults)
  const services = {
    config: testConfig,
    history: createHistoryService(createLocalStorageStore('history')),
    currency: createCurrencyService(async () => 0.5),
    autocomplete: vi.fn(async query => [{ suggestion: query + ' startpage', type: 'query', relevance: 600 }]),
    settings,
  }

  render(
    <ServicesContext value={services}>
      <SettingsProvider service={settings} schema={schema}>
        <StoreProvider>
          <App />
        </StoreProvider>
      </SettingsProvider>
    </ServicesContext>
  )
  return services
}

describe('App', () => {
  it('suggests from autocomplete and converts currencies while typing', async () => {
    const user = userEvent.setup()
    const services = renderApp()

    await user.keyboard('chevron')
    expect(await screen.findByText('chevron startpage')).toBeInTheDocument()
    expect(services.autocomplete).toHaveBeenLastCalledWith('chevron', 'fr')

    await user.keyboard('{Escape}')
    await user.keyboard('10 usd to eur')
    expect(await screen.findByText('5 EUR')).toBeInTheDocument()
  })

  it('suggests the closest websites first', async () => {
    const user = userEvent.setup()
    renderApp()

    await user.keyboard('netf')
    const suggestions = await screen.findAllByText(/netf/i)
    expect(suggestions[0]).toHaveTextContent('Netflix')
  })

  it('saves the settings', async () => {
    renderApp()
    await waitFor(() => expect(JSON.parse(localStorage.getItem('settings'))).toMatchObject({
      general: { locale: 'fr' },
      menu: { time: { format: 'HH:MM' } },
    }))
  })
})
