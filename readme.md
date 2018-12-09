# @mgsisk/postcss-modular-rhythm

[![Version 0.1.1][img-version]][url-version]
[![Build status][img-build]][url-build]
[![Maintainability grade][img-maintainability]][url-maintainability]
[![Test coverage][img-coverage]][url-coverage]
[![Support development][img-support]][url-support]

> PostCSS plugin that adds modular scale and vertical rhythm units to CSS.

The @mgsisk/postcss-modular-rhythm package is a [PostCSS][] plugin that adds
modular scale and vertical rhythm units to CSS.

- `msu` – Modular Scale Unit, converted to a unitless value using the scale
  step, ratio, and bases.
- `mlh` – Modular Line Height, converted to a unitless value appropriate for
  `line-height` that will maintain vertical rhythm using the base line height
  and scale step, ratio, and bases.
- `mfs` – Modular Font Size, converted to a scaled value appropriate for `font`
  or `font-size` using the base font size and scale step, ratio, and bases.
- `vru` – Vertical Rhythm Unit, converted to a multiple of the base line height,
  appropriate for use with a variety of sizing properties (`height`, `margin`,
  `padding`, etc.)

[PostCSS]: https://postcss.org/

## Installation

```sh
npm install --save-dev @mgsisk/postcss-modular-rhythm
```

## Usage

```js
// postcss.config.js

module.exports = {
  plugins: [
    …
    require('@mgsisk/postcss-modular-rhythm'),
    …
  ]
}
```

```css
/* input-style.css */

body {
  font: 0mfs/0mlh sans-serif;
}

h1 {
  font-size: 5mfs;
  line-height: 5mlh;
  margin: 0.5vru 1vru 2vru;
}

small {
  font: -1mfs/-1mlh serif;
}
```

```css
/* output-style.css */

body {
  font: 1em/1.5 sans-serif;
}

h1 {
  font-size: 2.48832em;
  line-height: 1.20563;
  margin: 0.75rem 1.5rem 3rem;
}

small {
  font: 0.83333em/1.8 sans-serif;
}
```

> To maintain vertical rhythm, elements should have the same `mfs` and `mlh`
> values (i.e. an `h2` with `font-size: 4mfs;` should have
> `line-height: 4mlh;`).

### Options

#### `--font-size`

Set the base font size and unit used for `mfs` values. Mapped to the `fontSize`
and `fontUnit` properties in the JavaScript API.

```css
:root {
  --font-size: 12px; /* Default: 1em */
}
```

#### `--line-height`

Set the base line height and vertical rhythm unit for `mlh` and `vru` values.
Mapped to the `lineHeight` and `rhythmUnit` properties in the JavaScript API.

```css
:root {
  --line-height: 24px; /* Default: 1.5rem */
}
```

#### `--modular-scale`

Set the ratio and bases used to calculate `mfs`, `mlh`, and `msu` values. The
first number sets the scale ratio; following numbers set optional bases. Use
`msu` values to get the scale value for a given step in the defined scale. For
example, on the default scale – which [looks something like this][default-scale]
– `2msu` would produce a value of `1.44`. Mapped to the `ratio` and `bases`
properties in the JavaScript API.

```css
:root {
  --modular-scale: 1.68 1.1 1.4; /* Default: 1.2 1 */
}
```

[default-scale]: https://modularscale.com/?1&em&1.2

#### `round`

You can set the number of decimal places values are rounded to in the JavaScript
API using the `round` option.

```js
// postcss.config.js

module.exports = {
  plugins: [
    …
    require('@mgsisk/postcss-modular-rhythm')({round: 2}), // Default: 5
    …
  ]
}
```

## Support

[Support][] resources are available.

[support]: https://github.com/mgsisk/postcss-modular-rhythm/blob/master/support.md

## Contribute

[Contributions][] are always welcome.

[Contributions]: https://github.com/mgsisk/postcss-modular-rhythm/blob/master/contributing.md

[img-version]: https://img.shields.io/npm/v/@mgsisk/postcss-modular-rhythm.svg?logo=npm
[img-build]: https://img.shields.io/travis/mgsisk/postcss-modular-rhythm.svg?logo=travis
[img-maintainability]: https://api.codeclimate.com/v1/badges/8b8f81bb59d88cea1e89/maintainability
[img-coverage]: https://api.codeclimate.com/v1/badges/8b8f81bb59d88cea1e89/test_coverage
[img-support]: https://img.shields.io/badge/donate-coffee-darkorange.svg?logo=gratipay&logoColor=fff

[url-version]: https://npmjs.com/package/@mgsisk/postcss-modular-rhythm
[url-build]: https://travis-ci.org/mgsisk/postcss-modular-rhythm
[url-maintainability]: https://codeclimate.com/github/mgsisk/postcss-modular-rhythm/maintainability
[url-coverage]: https://codeclimate.com/github/mgsisk/postcss-modular-rhythm/test_coverage
[url-support]: https://buymeacoffee.com/mgsisk
