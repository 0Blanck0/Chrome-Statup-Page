const DEFAULT_ENGINE = {
  name: 'DuckDuckGo',
  bgColor: { type: 'solid', color: '#e37151' },
  textColor: '#e8e8e8',
  types: { query: { template: 'https://duckduckgo.com/?q={$}' } },
}

/**
 * User configuration loaded by /config.js and /icons.js (editable without rebuilding the app).
 */
export function loadAppConfig(source = globalThis) {
  const config = source.CONFIG ?? {}

  return {
    macros: Array.isArray(config.macros) ? config.macros.filter(m => m?.name && m?.url) : [],
    commands: Array.isArray(config.commands) ? config.commands : [],
    engine: config.engine?.types?.query ? config.engine : DEFAULT_ENGINE,
    icons: source.ICONS ?? {},
  }
}
