import { useEffect, useState } from 'react'
import useColorSchemeDetector from '../hooks/useColorSchemeDetector'
import {
  ColorSchemeContext,
  SetSettingsContext,
  SettingsContext,
  SettingsSchemaContext,
  ThemeContext,
} from './Settings'

/**
 * @param {object} props
 * @param {{ load(): object, save(settings: object): void }} props.service
 * @param {object} props.schema  settings template (see settings/settings.js)
 */
export default function SettingsProvider({ service, schema, children }) {
  const [settings, setSettings] = useState(() => service.load())

  const systemColorScheme = useColorSchemeDetector()
  const { colorScheme: wantedScheme, themes, activeTheme } = settings.appearance
  const colorScheme = wantedScheme === 'auto' ? systemColorScheme : wantedScheme
  const theme = (themes[activeTheme] ?? themes.default)[colorScheme]

  useEffect(() => service.save(settings), [service, settings])

  // Joy UI (settings panel) reads its color scheme from this key
  useEffect(() => {
    try {
      localStorage.setItem('joy-mode', colorScheme)
    } catch {
      /* storage unavailable: Joy UI falls back to its default */
    }
  }, [colorScheme])

  return (
    <SettingsSchemaContext value={schema}>
      <SettingsContext value={settings}>
        <SetSettingsContext value={setSettings}>
          <ThemeContext value={theme}>
            <ColorSchemeContext value={colorScheme}>{children}</ColorSchemeContext>
          </ThemeContext>
        </SetSettingsContext>
      </SettingsContext>
    </SettingsSchemaContext>
  )
}
