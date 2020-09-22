const modular = require('./modular.js')
const normalize = require('./normalize.js')

module.exports = (options = {})=> { // eslint-disable-line import/group-exports
  const defaults = {
    bases: [1],
    fontSize: 1,
    fontUnit: 'em',
    lineHeight: 1.5,
    lineMin: -1,
    normal: {},
    ratio: 1.2,
    rhythmUnit: 'rem',
    round: 5,
  }

  options = {...defaults, ...options}

  return {
    postcssPlugin: '@mgsisk/postcss-modular-rhythm',
    Declaration: {
      '--font-size': (decl)=> {
        if (decl.parent.selector !== ':root') {
          return
        }

        options.fontSize = parseFloat(decl.value)
        options.fontUnit = decl.value.replace(/[-\d.]+/u, '')
      },
      '--line-height': (decl)=> {
        if (decl.parent.selector !== ':root') {
          return
        }

        options.lineHeight = parseFloat(decl.value)
        options.rhythmUnit = decl.value.replace(/[-\d.]+/u, '')
      },
      '--modular-scale': (decl, {list})=> {
        if (decl.parent.selector !== ':root') {
          return
        }

        const [ratio, ...bases] = list.space(decl.value)

        options.ratio = parseFloat(ratio)
        options.bases = Array.from(new Set(bases)).map(value=> parseFloat(value)) // eslint-disable-line no-undef

        if (!options.bases.length) {
          options.bases.push(1)
        }
      },
    },
    RootExit(root) {
      if (options.lineMin === -1) {
        options.lineMin = options.ratio
      }

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
      root.replaceValues(/(-?\d*\.?\d+)mlh\b/gu, value=> modular.lineHeight(parseFloat(value), options).height)
      root.replaceValues(/(-?\d*\.?\d+)msu\b/gu, value=> modular.scaleUnit(parseFloat(value), options))
      root.replaceValues(/(-?\d*\.?\d+)vrl\b/gu, value=> modular.rhythmUnit(modular.lineHeight(parseFloat(value), options).multiplier, options))
      root.replaceValues(/(-?\d*\.?\d+)vru\b/gu, value=> modular.rhythmUnit(parseFloat(value), options))
      root.replaceValues(/(-?\d*\.?\d+)xlh\b/gu, value=> modular.lineHeight(parseFloat(value), options).multiplier)
    },
  }
}
module.exports.postcss = true // eslint-disable-line import/group-exports
