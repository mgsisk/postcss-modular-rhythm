# @mgsisk/postcss-modular-rhythm

PostCSS plugin that adds modular scale and vertical rhythm units to CSS.

[![Latest release][badge-release]][url-release]
[![Build status][badge-build]][url-build]
[![Code maintainability][badge-maintainability]][url-maintainability]
[![Test coverage][badge-coverage]][url-coverage]
[![Maintainer funding][badge-funding]][url-funding]

@mgsisk/postcss-modular-rhythm is a [PostCSS][] plugin that adds modular scale
and vertical rhythm units to CSS.

- `mfs` – Modular Font Size, converted to a scaled value appropriate for
  `font-size`.
- `mlh` – Modular Line Height, converted to a unitless value appropriate for
  `line-height` that will maintain vertical rhythm for an equal `mfs` value.
- `msu` – Modular Scale Unit, converted to a unitless scaled value.
- `vrl` – Vertical Rhythm Line, converted to a multiple of the base line height 
  appropriate for `line-height` that will fit an equal `mfs` value.
- `vru` – Vertical Rhythm Unit, converted to a multiple of the base line height,
  appropriate for use with a variety of sizing properties (`height`, `margin`,
  `padding`, etc.)
- `xlh` - Line Height Multiplier, converted to a unitless value equal to the
  multiples of the base line height required to comfortably fit an equal `mfs`
  value.

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
/* input.css */

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
/* output.css */

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

[Support resources][] are available if you need help with this project.

### Options

Set plugin options inside the `:root` pseudo-class:

```css
:root {
  --font-size: 12px;
  --line-height: 24px;
  --modular-scale: 1.68 1.1 1.4;
}
```

#### `--font-size`

Set the base font size and unit used for `mfs` values; defaults to `1em`. Mapped
to the `fontSize` and `fontUnit` properties in the JavaScript API.

#### `--line-height`

Set the base line height and vertical rhythm unit for `mlh`, `vrl`, and `vru`
values; defaults to `1.5rem`. Mapped to the `lineHeight` and `rhythmUnit`
properties in the JavaScript API.

#### `--modular-scale`

Set the ratio and bases used to calculate `mfs`, `mlh`, and `msu` values;
defaults to `1.2 1`. The first number sets the scale ratio; following numbers
set optional bases. Use `msu` values to get the scale value for a given step in
the defined scale. For example, on the default scale - which [looks something
like this][] - `2msu` would produce a value of `1.44`. Mapped to the `ratio`,
`bases`, and `lineMin` properties in the JavaScript API.

#### `lineMin`

You can set a specific minimum line height in the JavaScript API using the
`lineMin` option; defaults to `ratio`. This affects `mlh`, `vrl`, and `xlh`
values, with a larger `lineMin` resulting in larger line-heights as you move up
the scale. An example assuming the default options:

| `xlh` | `lineMin: 1` | `lineMin: 1.2` (default) | `lineMin: 1.5` |
| ----- | ------------ | ------------------------ | -------------- |
| 0     | 1            | 1                        | 1              |
| 1     | 1            | 1                        | 2              |
| 2     | 1            | 2                        | 2              |
| 3     | 2            | 2                        | 2              |
| 4     | 2            | 2                        | 3              |
| 5     | 2            | 2                        | 3              |
| 6     | 2            | 3                        | 3              |
| 7     | 3            | 3                        | 4              |
| 8     | 3            | 4                        | 5              |
| 9     | 4            | 5                        | 6              |

#### `round`

You can set the number of decimal places to round to in the JavaScript API using
the `round` option; defaults to `5`.

```js
// postcss.config.js

module.exports = {
  plugins: [
    …
    require('@mgsisk/postcss-modular-rhythm')({
      lineMin: 1,
      round: 2,
    }),
    …
  ]
}
```

### Line Height and Vertical Rhythm

To maintain vertical rhythm, elements should have the same `mfs` and either
`mlh` or `vrl` values (e.g. `font-size: 3mfs` should have `line-height: 3mlh`
or `line-height: 3vrl`). `mlh` returns a unitless value, but this may cause
inconsistent or imperfect rendering across browsers. If you need exact
rendering or don't care about unitless line-heights, use `vrl`.

Calculated `line-heights` get more complicated, and may require the `xlh`
value. Given the following (using default options and assuming a viewport
`320px` wide):

```css
body {
  font-size: calc(0mfs + 1vw);
  line-height: calc(0mlh * 1em + 2vw);
}

h1 {
  font-size: 5mfs;
  line-height: 5mlh;
}
```

The calculated root line height will be `35.2px`, but `h1` will have a
calculated line height of about `57px`. Changing the `h1` line height to
`calc(5mlh * 1em + 2vw)` will help, but won't fully correct the issue because
`5mlh` is a multiple of the base line height. This is where the `xlh` value
comes in; changing the `h1` line height to `calc(5mlh * 1em + 2vw * 5xlh)` will
get the correct line height.

## Contributing

[Contributions][] are always welcome; please read the [code of conduct][]
before you begin. See the [changelog][] for notable project changes, and report
any [security][] concerns you find.

## Thanks

To the [contributors][] that help to build, fund, and maintain this project;
the [other works][] that have contributed to and inspired this project; and
anyone that has found this project useful.

## License

[ISC][]

[badge-build]: https://img.shields.io/travis/com/mgsisk/postcss-modular-rhythm?link=https://travis-ci.com/mgsisk/postcss-modular-rhythm
[badge-coverage]: https://img.shields.io/codeclimate/coverage/mgsisk/postcss-modular-rhythm?link=https://codeclimate.com/github/mgsisk/postcss-modular-rhythm
[badge-funding]: https://img.shields.io/liberapay/receives/mgsisk?link=https://github.com/mgsisk/postcss-modular-rhythm/blob/master/docs/CONTRIBUTING.md%23funding
[badge-maintainability]: https://img.shields.io/codeclimate/maintainability/mgsisk/postcss-modular-rhythm?link=https://codeclimate.com/github/mgsisk/postcss-modular-rhythm
[badge-release]: https://img.shields.io/github/v/tag/mgsisk/postcss-modular-rhythm?sort=semver&link=https://github.com/mgsisk/postcss-modular-rhythm/releases
[changelog]: https://github.com/mgsisk/postcss-modular-rhythm/blob/master/docs/CHANGELOG.md
[code of conduct]: https://github.com/mgsisk/postcss-modular-rhythm/blob/master/docs/CODE_OF_CONDUCT.md
[contributions]: https://github.com/mgsisk/postcss-modular-rhythm/blob/master/docs/CONTRIBUTING.md
[contributors]: https://github.com/mgsisk/postcss-modular-rhythm/blob/master/docs/AUTHORS.md
[isc]: https://github.com/mgsisk/postcss-modular-rhythm/blob/master/LICENSE.md
[looks something like this]: https://www.modularscale.com/?1&em&1.2
[other works]: https://github.com/mgsisk/postcss-modular-rhythm/blob/master/docs/THANKS.md
[postcss]: https://postcss.org/
[security]: https://github.com/mgsisk/postcss-modular-rhythm/blob/master/docs/SECURITY.md
[support resources]: https://github.com/mgsisk/postcss-modular-rhythm/blob/master/docs/SUPPORT.md
[url-build]: https://travis-ci.com/mgsisk/postcss-modular-rhythm
[url-coverage]: https://codeclimate.com/github/mgsisk/postcss-modular-rhythm
[url-funding]: https://github.com/mgsisk/postcss-modular-rhythm/blob/master/docs/CONTRIBUTING.md#funding
[url-maintainability]: https://codeclimate.com/github/mgsisk/postcss-modular-rhythm
[url-release]: https://github.com/mgsisk/postcss-modular-rhythm/releases
