import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createHistoryService } from './application/historyService'
import { createSettingsService } from './application/settingsService'
import { createCurrencyService } from './application/currencyService'
import { loadAppConfig } from './infrastructure/appConfig'
import { createLocalStorageStore } from './infrastructure/localStorageStore'
import { googleAutocomplete } from './infrastructure/googleAutocomplete'
import { getExchangeRate } from './infrastructure/exchangeRateApi'
import { createSettingsSchema } from './presentation/settings/settings'
import { ServicesContext } from './presentation/contexts/Services'
import SettingsProvider from './presentation/contexts/SettingsProvider'
import { StoreProvider } from './presentation/contexts/StoreProvider'
import App from './presentation/App'

// Composition root: the only place where the layers are wired together.
const config = loadAppConfig()
const settingsSchema = createSettingsSchema()
const settingsService = createSettingsService(createLocalStorageStore('settings'), settingsSchema.defaults)

const services = {
  config,
  history: createHistoryService(createLocalStorageStore('history')),
  currency: createCurrencyService(getExchangeRate),
  autocomplete: googleAutocomplete,
  settings: settingsService,
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ServicesContext value={services}>
      <SettingsProvider service={settingsService} schema={settingsSchema}>
        <StoreProvider>
          <App />
        </StoreProvider>
      </SettingsProvider>
    </ServicesContext>
  </StrictMode>
)
