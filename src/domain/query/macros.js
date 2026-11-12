import { bestMacro, hostnameOf } from './closestMacros'
import isValidUrl from './isValidUrl'
import ensureProtocol from './ensureProtocol'

/**
 * Finds the website (macro) designated by a query:
 * - a URL of a configured website ("netflix.com/browse"),
 * - a website name followed by a command ("netflix?stranger things"),
 * - a website name, even partial or misspelled ("netf", "yotube").
 * @param {string} query
 * @param {{ macros: object[], commands: object[] }} config
 * @returns {{ options: object, command: object|null } | null}
 */
export function findMacro(query, { macros, commands }) {
  if (isValidUrl(query)) {
    const macro = findMacroByUrl(query, macros)
    return macro ? { options: macro, command: null } : null
  }

  const command = findCommand(query, commands)
  if (command?.args) {
    const macro = bestMacro(command.target, macros)
    if (macro?.commands && Object.hasOwn(macro.commands, command.type)) return { options: macro, command }
  }

  const macro = bestMacro(query, macros)
  return macro ? { options: macro, command: null } : null
}

/** "youtube/abc" -> { type: 'go', target: 'youtube', args: 'abc' }. The longest trigger wins. */
export function findCommand(query, commands) {
  let found = null
  for (const command of commands) {
    const index = query.indexOf(command.trigger)
    if (index <= 0) continue
    const better = !found || index < found.index || (index === found.index && command.trigger.length > found.trigger.length)
    if (better) found = { ...command, index }
  }
  if (!found) return null

  return {
    type: found.type,
    trigger: found.trigger,
    target: query.slice(0, found.index).trim(),
    args: query.slice(found.index + found.trigger.length).trim(),
  }
}

// "netflix.com/x" matches https://www.netflix.com/browse, but "google.com" does not match mail.google.com
function findMacroByUrl(query, macros) {
  const typedHost = hostnameOf(ensureProtocol(query))
  return macros.find(macro => hostnameOf(macro.url) === typedHost) ?? null
}
