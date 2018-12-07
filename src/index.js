/**
 * Handle custom vertical rhythm units
 */

const postcss = require('postcss')

/**
 * Calculate a modular scale value.
 *
 * @param {number} power The power of the modular scale value.
 * @param {number} ratio The modular scale ratio.
 * @param {Array} bases One or more modular scale bases.
 * @returns {number}
 */
function modularScale(power, ratio, bases) {
  const scale = []
  let step = 0

  while (Math.abs(step) <= Math.abs(power)) {
    for (let i = 0; i < bases.length; i++) {
      scale.push(bases[i] * Math.pow(ratio, step))
    }

    step += 1

    if (power < 0) {
      step -= 2
    }
  }

  return Array.from(new Set(scale))[Math.abs(step) - 1] // eslint-disable-line no-undef
}

/**
 * Calculate a unitless line height for a given modular scale.
 *
 * @param {number} lineHeight The base, unitless line height.
 * @param {number} power The power of the modular scale value.
 * @param {number} ratio The modular scale ratio.
 * @param {Array} bases One or more modular scale bases.
 * @returns {number}
 */
function lineHeightScale(lineHeight, power, ratio, bases) {
  const baseHeight = lineHeight / modularScale(power, ratio, bases)
  let realHeight = baseHeight

  while (realHeight < 1) {
    realHeight += baseHeight
  }

  return realHeight
}

/**
 * Convert custom vertical rhythm units into valid CSS values.
 */
module.exports = postcss.plugin('.postcss.plugin.js', (options)=> {
  const defaults = {
    fontSize: 1,
    fontUnit: 'em',
    lineHeight: 1.5,
    rhythmUnit: 'rem',
    ratio: 1.2,
    bases: [1],
    round: 5,
  }

  options = {...defaults, ...options}

  return (root)=> {
    root.walkDecls((decl)=> {
      if (decl.parent.selector !== ':root') {
        return
      }

      if (decl.prop === '--font-size') {
        options.fontSize = parseFloat(decl.value)
        options.fontUnit = decl.value.replace(/(\d|\.|-)+/u, '')
      } else if (decl.prop === '--line-height') {
        options.lineHeight = parseFloat(decl.value)
        options.rhythmUnit = decl.value.replace(/(\d|\.|-)+/u, '')
      } else if (decl.prop === '--modular-scale') {
        const [ratio, ...bases] = postcss.list.space(decl.value)

        options.ratio = parseFloat(ratio)
        options.bases = Array.from(new Set(bases)).map(value=> parseFloat(value)) // eslint-disable-line no-undef

        if (!options.bases.length) {
          options.bases.push(1)
        }
      }
    })

    root.replaceValues(
      /(-?\d*\.?\d+)mfs\b/gu,
      (value)=> {
        const size = modularScale(parseFloat(value), options.ratio, options.bases) * options.fontSize

        return parseFloat(size.toFixed(options.round)) + options.fontUnit
      }
    )

    root.replaceValues(
      /(-?\d*\.?\d+)mlh\b/gu,
      (value)=> {
        const height = lineHeightScale(options.lineHeight, parseFloat(value), options.ratio, options.bases)

        return parseFloat(height.toFixed(options.round))
      }
    )

    root.replaceValues(
      /(-?\d*\.?\d+)msu\b/gu,
      value=> parseFloat(modularScale(parseFloat(value), options.ratio, options.bases).toFixed(options.round))
    )

    root.replaceValues(
      /(-?\d*\.?\d+)vru\b/gu,
      (value)=> {
        const rhythm = parseFloat(value) * options.lineHeight

        return parseFloat(rhythm.toFixed(options.round)) + options.rhythmUnit
      }
    )
  }
})
