/** Converts a config color ({ type: 'solid' | 'gradient', ... }) to a CSS value. */
export default function getCssGradient(options) {
  switch (options.type) {
    case 'solid':
      return options.color
    case 'gradient': {
      let angle = options.angle ?? (options.gradientType === 'linear' ? 45 : '')
      if (typeof angle === 'number') angle += 'deg'
      if (angle) angle += ','

      const colors = options.colors.map((color, i) => (options.stops ? `${color} ${options.stops[i]}%` : color))

      return `${options.gradientType}-gradient(${angle}${colors.join(',')})`
    }
    default:
      throw new Error('unknown color type: ' + options.type)
  }
}
