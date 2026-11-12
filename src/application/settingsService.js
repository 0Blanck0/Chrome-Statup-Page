import { mergeSettings } from '../domain/settings/mergeSettings'

/**
 * @param {{ read(): unknown, write(value: unknown): void, remove(): void }} store
 * @param {object} defaults
 */
export function createSettingsService(store, defaults) {
  return {
    load: () => mergeSettings(defaults, store.read()),
    save: settings => store.write(settings),
    reset: () => store.remove(),
  }
}
