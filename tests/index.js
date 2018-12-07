/* eslint-disable no-undefined */
const tap = require('tap')
const plugin = require('../src/index.js') // eslint-disable-line import/no-internal-modules
const postcss = require('postcss')

postcss([plugin])
  .process(`

  small {
    font: -1mfs/-1mlh serif;
  }`, {from: undefined})
  .then((result)=> {
    console.log(`\n\n${result.css}\n\n`)
    tap.match(result.css, /9px - 2\.48832/u, 'It scales values up')
  })

postcss([plugin])
  .process('a{width:calc(9px - 5msu)}', {from: undefined})
  .then((result)=> {
    tap.match(result.css, /9px - 2\.48832/u, 'It scales values up')
  })

postcss([plugin])
  .process('a{width:calc(9px - -5msu)}', {from: undefined})
  .then((result)=> {
    tap.match(result.css, /9px - 0\.40188/u, 'It scales values down')
  })

postcss([plugin])
  .process('a{font-size:0mfs}', {from: undefined})
  .then((result)=> {
    tap.match(result.css, /font-size:1em/u, 'It converts mfs values')
  })

postcss([plugin])
  .process('a{line-height:0mlh}', {from: undefined})
  .then((result)=> {
    tap.match(result.css, /line-height:1.5/u, 'It converts mlh values')
  })

postcss([plugin])
  .process('a{width:calc(9px - 0msu)}', {from: undefined})
  .then((result)=> {
    tap.match(result.css, /9px - 1/u, 'It converts msu values')
  })

postcss([plugin])
  .process('a{margin:1vru}', {from: undefined})
  .then((result)=> {
    tap.match(result.css, /margin:1.5rem/u, 'It converts vru values')
  })

postcss([plugin])
  .process('a{line-height:9mlh}', {from: undefined})
  .then((result)=> {
    tap.match(result.css, /line-height:1\.16284/u, 'It ensures a minimum line-height of 1')
  })

postcss([plugin])
  .process(':root{--font-size:12px}a{font-size:1mfs}', {from: undefined})
  .then((result)=> {
    tap.match(result.css, /font-size:14\.4px/u, 'It uses the correct font size unit')
  })

postcss([plugin])
  .process(':root{--line-height:16px}a{margin:1vru}', {from: undefined})
  .then((result)=> {
    tap.match(result.css, /margin:16px/u, 'It uses the correct rhythm unit')
  })

postcss([plugin])
  .process(':root{--modular-scale:1.1 2.2}a{width:calc(9px - 1msu)}', {from: undefined})
  .then((result)=> {
    tap.match(result.css, /9px - 2\.42/u, 'It uses custom modular scale values')
  })

postcss([plugin])
  .process(':root{--modular-scale:1.5}a{width:calc(9px - 0msu)}', {from: undefined})
  .then((result)=> {
    tap.match(result.css, /9px - 1/u, 'It uses a default base when none is provided')
  })

postcss([plugin])
  .process(':root{--bogus:1.5rem}a{margin:0vru}', {from: undefined})
  .then((result)=> {
    tap.match(result.css, /margin:0/u, 'It ignores unknown root parameters')
  })
