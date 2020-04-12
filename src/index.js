'use strict'

const modular = require('./modular.js')
const normalize = require('./normalize.js')
const postcss = require('postcss')

module.exports = postcss.plugin('@mgsisk/postcss-modular-rhythm', (options)=> {
  const defaults = {
    bases: [1],
    fontSize: 1,
    fontUnit: 'em',
    lineHeight: 1.5,
    normal: {},
    ratio: 1.2,
    rhythmUnit: 'rem',
    round: 5,
  }

  options = {...defaults, ...options}

  return (root)=> {
    root.walkDecls((decl)=> {
      if (decl.parent.selector !== ':root') {
        return
      }

      switch (decl.prop) {
        case '--font-size':
          options.fontSize = parseFloat(decl.value)
          options.fontUnit = decl.value.replace(/[-\d.]+/u, '')
          break
        case '--line-height':
          options.lineHeight = parseFloat(decl.value)
          options.rhythmUnit = decl.value.replace(/[-\d.]+/u, '')
          break
        case '--modular-scale': {
          const [ratio, ...bases] = postcss.list.space(decl.value)

          options.ratio = parseFloat(ratio)
          options.bases = Array.from(new Set(bases)).map(value=> parseFloat(value)) // eslint-disable-line no-undef

          if (!options.bases.length) {
            options.bases.push(1)
          }

          break
        } default: // Do nothing; this isn't a property the plugin handles.
      }
    })

    options.normal.bases = normalize.bases(options.ratio, options.bases)
    options.normal.fontSize = normalize.fontSize(options.fontSize, options.fontUnit, options.bases[0])
    options.normal.lineHeight = normalize.lineHeight(
      options.lineHeight,
      options.rhythmUnit,
      options.bases[0],
      options.normal.fontSize,
      options.fontUnit,
    )

    root.replaceValues(/(-?\d*\.?\d+)mfs\b/gu, value=> modular.fontSize(parseFloat(value), options))
    root.replaceValues(/(-?\d*\.?\d+)mlh\b/gu, value=> modular.lineHeight(parseFloat(value), options))
    root.replaceValues(/(-?\d*\.?\d+)msu\b/gu, value=> modular.scaleUnit(parseFloat(value), options))
    root.replaceValues(/(-?\d*\.?\d+)vru\b/gu, value=> modular.rhythmUnit(parseFloat(value), options))
  }
})
