import { findMacro } from './macros'
import normaliseUrl from './normaliseUrl'
import randomHSLColor from '../colors/randomHSLColor'

const URL_REDIRECT_TEXT_COLOR = '#f2f2f2'
const SPECIAL_TYPES = ['calculator', 'currency']

/**
 * What the user typed, interpreted: a search, a macro, a macro command or a direct URL.
 */
export default class ParsedQuery {
  /**
   * @param {object} params
   * @param {string} params.value          text to interpret (query or selected suggestion)
   * @param {string} [params.type]         suggestion type ('query', 'calculator', 'currency'...)
   * @param {string} params.origin         what the user actually typed
   * @param {object} params.engine         search engine from the config
   * @param {{ macros: object[], commands: object[] }} params.config
   * @param {'light'|'dark'} params.colorScheme
   * @param {boolean} [params.forceSearchEngine] ignore macros and URLs
   */
  constructor({ value, type = 'query', origin, engine, config, colorScheme, forceSearchEngine = false }) {
    this.value = value
    this.rawType = type
    this.origin = origin
    this.engine = engine
    this.colorScheme = colorScheme
    this.normalisedURL = null
    this.macro = null

    if (!forceSearchEngine) {
      this.normalisedURL = normaliseUrl(value)
      this.macro = findMacro(value, config)
    }
  }

  get isDirectUrl() {
    return Boolean(this.normalisedURL) && !this.macro
  }

  get command() {
    return this.macro?.command ? this.macro.options.commands[this.macro.command.type] : null
  }

  get type() {
    if (this.isDirectUrl) return 'redirect'
    if (this.command) return 'command'
    if (this.macro) return 'macro'
    return this.rawType
  }

  get url() {
    if (this.normalisedURL) return this.value

    if (this.command)
      return this.command.template
        .replaceAll('{@}', this.macro.options.url)
        .replaceAll('{$}', encodeURIComponent(this.macro.command.args))

    if (this.macro) return this.macro.options.url

    const template = (this.engine.types[this.rawType] ?? this.engine.types.query).template
    return template
      .replaceAll('{@}', encodeURIComponent(this.origin))
      .replaceAll('{$}', encodeURIComponent(this.value))
  }

  get label() {
    if (this.isDirectUrl) return 'redirect'
    if (this.command) return this.command.description || this.macro.command.type
    if (this.macro) return this.macro.options.name
    return SPECIAL_TYPES.includes(this.type) ? this.type : 'search'
  }

  get marquee() {
    if (this.isDirectUrl) return this.normalisedURL
    if (this.macro) return this.macro.options.name
    return this.engine.name
  }

  get bgColor() {
    if (this.isDirectUrl) {
      const dark = this.colorScheme === 'dark'
      return {
        type: 'gradient',
        gradientType: 'linear',
        colors: [randomHSLColor(this.normalisedURL, dark), randomHSLColor(this.normalisedURL + '1', dark)],
      }
    }
    if (this.macro) return this.macro.options.bgColor
    return this.engine.bgColor
  }

  get textColor() {
    if (this.isDirectUrl) return URL_REDIRECT_TEXT_COLOR
    if (this.macro) return this.macro.options.textColor
    return this.engine.textColor
  }
}
