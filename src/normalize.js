'use strict'

/**
 * Normalize modular bases.
 *
 * @param {number} ratio Modular scale ratio.
 * @param {Array} baseArray One or more modular scale bases.
 *
 * @returns {Array}
 */
function bases(ratio, baseArray) {
  if (baseArray.length === 1) {
    return baseArray
  }

  const max = ratio * baseArray[0]

  for (let i = 0; i < baseArray.length; i++) {
    while (baseArray[i] < baseArray[0]) {
      baseArray[i] *= ratio
    }

    while (baseArray[i] >= max) {
      baseArray[i] /= ratio
    }
  }

  baseArray.sort()

  return baseArray
}

/**
 * Normalize font size for mlh calculations.
 *
 * @param {number} size Font size.
 * @param {string} unit Font unit.
 * @param {number} base Modular rhythm base.
 * @returns {number}
 */
function fontSize(size, unit, base) { // eslint-disable-line complexity
  const normalSize = size * base

  switch (unit) {
    case '%': return normalSize / 6.25
    case 'ch': return normalSize * 8
    case 'cm': return normalSize * 96 / 2.54
    case 'em': return normalSize * 16
    case 'ex': return normalSize * 8
    case 'in': return normalSize * 96
    case 'mm': return normalSize * 96 / 2.54 / 10
    case 'pc': return normalSize * 96 / 6
    case 'pt': return normalSize * 96 / 72
    case 'rem': return normalSize * 16
    default: return normalSize
  }
}

/**
 * Normalize line height for mlh values.
 *
 * @param {number} height Line height.
 * @param {string} unit Vertical rhythm unit.
 * @param {number} base Modular rhythm base.
 * @param {number} normalFontSize Normalized font size.
 * @param {string} fontUnit Font unit.
 * @returns {number}
 */
function lineHeight(height, unit, base, normalFontSize, fontUnit) { // eslint-disable-line complexity
  if (fontUnit === unit) {
    return height / normalFontSize
  }

  switch (unit) {
    case '%': return height / 100 / base
    case 'cm': return height * 96 / 2.54 / normalFontSize
    case 'in': return height * 96 / normalFontSize
    case 'mm': return height * 96 / 2.54 / 10 / normalFontSize
    case 'pc': return height * 96 / 6 / normalFontSize
    case 'pt': return height * 96 / 72 / normalFontSize
    case 'px': return height / normalFontSize
    default: return height / base
  }
}

module.exports = {
  bases,
  fontSize,
  lineHeight,
}
