const normalize = require('../src/normalize.js')
const plugin = require('../src')
const postcss = require('postcss')
const tap = require('tap')

const data = `
a {
  font: 0mfs/0mlh a;
  font: 2mfs/2mlh b;
  font: -2mfs/-2mlh c;
  font: 9mfs/9mlh d;
  font: 2mfs/2vrl e;
  font: -2mfs/-2vrl f;
  font: 9mfs/9vrl g;
  line-height: calc(9mlh * 1em + 1vw * 9xlh);
  margin: -0.5vru -1vru -2vru;
  padding: 0.5vru 1vru 2vru;
  transform: scaleX(0msu) scaleY(2msu) scaleZ(-2msu);
}`

/**
 * Check several font sizes and line heights to ensure proper calculations.
 *
 * @param {string} testData Test CSS data.
 * @returns {void}
 */
function testBattery(testData) {
  const regex = /(\S+)\/(\S+) c/u
  const fontBattery = ['%', 'ch', 'cm', 'em', 'ex', 'in', 'mm', 'pc', 'pt', 'px', 'rem']
  const lineBattery = ['%', 'cm', 'in', 'mm', 'pc', 'pt', 'px']

  for (const fontUnit of fontBattery) {
    const testSize = Math.random() * 99 + 1

    for (const lineUnit of lineBattery) {
      const testHeight = Math.random() * 99 + 101

      const rootData = `:root {
        --font-size: ${testSize}${fontUnit};
        --line-height: ${testHeight}${lineUnit};
        --modular-scale: 1.2 2.3 3.4 4.5;
      } ${testData}`

      postcss([plugin]).process(rootData, {from: undefined}) // eslint-disable-line no-undefined
        .then((result)=> {
          const match = regex.exec(result.css)
          const normalLineHeight = normalize.lineHeight(
            testHeight,
            lineUnit,
            2.3,
            normalize.fontSize(testSize, fontUnit, 2.3),
            fontUnit,
          )
          const check = parseFloat(match[1]) * parseFloat(match[2]) / testSize / normalLineHeight % 1

          if ([0, 1].indexOf(Math.round(check + Number.EPSILON)) === -1) {
            tap.equal(0, 1, `It ensures mlh values are correct with '${fontUnit}' font and '${lineUnit}' line height`)
          }
        })
        .then(()=> tap.equal(1, 1, `It ensures mlh values are correct with '${fontUnit}' font and '${lineUnit}' line height`))
    }
  }
}

postcss([plugin]).process(data, {from: undefined}) // eslint-disable-line no-undefined
  .then((result)=> { // eslint-disable-line max-statements
    tap.match(result.css, /line-height: calc\(1\.45355 \* 1em \+ 1vw \* 5\);/u, 'It converts xlh values')
    tap.match(result.css, /font: 1em.+ a;/u, 'It converts mfs values')
    tap.match(result.css, /font: 1\.44em.+ b;/u, 'It scales mfs values up')
    tap.match(result.css, /font: 0\.69444em.+ c;/u, 'It scales mfs values down')
    tap.match(result.css, /font: .+\/1\.5 a;/u, 'It converts mlh values')
    tap.match(result.css, /font: .+\/2\.08333 b;/u, 'It scales mlh values up')
    tap.match(result.css, /font: .+\/2\.16 c;/u, 'It scales mlh values down')
    tap.match(result.css, /font: 5\.15978em\/1\.45355 d;/u, 'It ensures a minimum mlh value of 1')
    tap.match(result.css, /transform: scaleX\(1\) .+;/u, 'It converts msu values')
    tap.match(result.css, /transform: .+ scaleY\(1\.44\) .+;/u, 'It scales msu values up')
    tap.match(result.css, /transform: .+ scaleZ\(0\.69444\);/u, 'It scales msu values down')
    tap.match(result.css, /padding: .+ 1.5rem .+;/u, 'It converts vru values')
    tap.match(result.css, /padding: 0\.75rem 1\.5rem 3rem;/u, 'It scales vru values up')
    tap.match(result.css, /margin: -0\.75rem -1\.5rem -3rem;/u, 'It scales vru values down')
    tap.match(result.css, /font: .+\/3rem e;/u, 'It converts vrl values')
    tap.match(result.css, /font: .+\/1\.5rem f;/u, 'It scales vrl values up')
    tap.match(result.css, /font: .+\/7\.5rem g;/u, 'It scales vrl values down')
  })

let rootData = `:root {
  --modular-scale: 1.618;
} body {
  --font-size: 100%;
  --line-height: 2;
  --modular-scale: 3;
} ${data}`

postcss([plugin({lineMin: 1})]).process(rootData, {from: undefined}) // eslint-disable-line no-undefined
  .then((result)=> {
    tap.match(result.css, /font: 1em.+ a;/u, 'It uses the correct mfs value with a default base')
    tap.match(result.css, /font: .+\/1\.5 a;/u, 'It uses the correct mlh value with a default base')
    tap.match(result.css, /transform: scaleX\(1\) scaleY\(2\.61792\) scaleZ\(0\.38198\);/u, 'It uses the correct msu ratio with a default base')
    tap.match(result.css, /padding: 0.75rem 1.5rem 3rem;/u, 'It uses the correct vru value with a default base')
  })

rootData = `:root {
  --modular-scale: 1.2 4 3 5;
} ${data}`

postcss([plugin]).process(rootData, {from: undefined}) // eslint-disable-line no-undefined
  .then((result)=> {
    tap.match(result.css, /font: 4em.+ a;/u, 'It uses the correct mfs value with custom bases')
    tap.match(result.css, /font: .+\/1\.21875 a;/u, 'It uses the correct mlh value with custom bases')
    tap.match(result.css, /transform: scaleX\(4\) scaleY\(4\.32\) scaleZ\(3\.47222\);/u, 'It uses the correct msu value with custom bases')
    tap.match(result.css, /padding: 0.75rem 1.5rem 3rem;/u, 'It uses the correct vru value with custom bases')
  })

testBattery(data)
