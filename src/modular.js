/**
 * Get a modular font size (mfs) value.
 *
 * @param {number} value Modular font size value to replace.
 * @param {object} options Plugin options.
 * @returns {string}
 */
function fontSize(value, options) {
  const size = options.fontSize * scale(value, options.ratio, options.normal.bases)

  return parseFloat(size.toFixed(options.round)) + options.fontUnit
}

/**
 * Get line height values.
 *
 * @param {number} value Modular line height value to replace.
 * @param {object} options Plugin options.
 * @returns {object}
 */
function lineHeight(value, options) {
  const baseHeight = options.normal.lineHeight / scale(value, options.ratio, options.normal.bases)
  let height = baseHeight

  while (height < options.lineMin) {
    height += baseHeight
  }

  return {
    height: parseFloat(height.toFixed(options.round)),
    multiplier: parseInt(height / baseHeight),
  }
}

/**
 * Get a modular size unit (msu) value.
 *
 * @param {number} value Modular size unit value to replace.
 * @param {object} options Plugin options.
 * @returns {number}
 */
function scaleUnit(value, options) {
  return parseFloat(scale(value, options.ratio, options.normal.bases).toFixed(options.round))
}

/**
 * Calculate a modular scale value.
 *
 * @param {number} power Power of the modular scale value.
 * @param {number} ratio Modular scale ratio.
 * @param {Array} normalBases One or more normalized modular scale bases.
 * @returns {number}
 */
function scale(power, ratio, normalBases) {
  if (normalBases.length === 1) {
    return normalBases * ratio ** power
  }

  const step = power / normalBases.length
  const floor = Math.floor(step)
  const base = Math.round(normalBases.length * (step - floor))

  return normalBases[base] * ratio ** floor
}

/**
 * Get a vertical rhythm unit (vru) value.
 *
 * @param {number} value Vertical rhythm unit value to replace.
 * @param {object} options Plugin options.
 * @returns {string}
 */
function rhythmUnit(value, options) {
  const rhythm = value * options.lineHeight

  return parseFloat(rhythm.toFixed(options.round)) + options.rhythmUnit
}

module.exports = {
  fontSize,
  lineHeight,
  rhythmUnit,
  scale,
  scaleUnit,
}
