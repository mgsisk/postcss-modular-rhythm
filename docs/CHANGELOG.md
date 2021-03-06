# Changelog

Notable project changes. Versions are [semantic][].

## [Unreleased][]

No unreleased changes.

## [0.4.1][] - 2020-09-22

### Fixed
- Deployment configuration

## [0.4.0][] - 2020-09-22

### Added
- `lineMin` option
- `vrl` unit
- `xlh` unit
- GithHub Packages deployment

### Changed
- `mlh` calculations are now limited by the `lineMin` option, which defaults to
  `ratio`
- `postcss` to a peer dependency
- `postcss` peer dependency to `>= 8`

## [0.3.0][] - 2020-04-11

### Changed
- Project structure
- `lineHeightScale` now factors in `fontSize` to generate more consistent `lhu`
  values

### Fixed
- `modularScale` now calculates the correct scale when using more than one base

## [0.2.2][] - 2019-07-03

### Changed
- Updated package dependencies

## [0.2.1][] - 2019-03-19

### Changed
- Replaced `jsonlint-cli` with `jsonlint`

### Fixed
- Inline documentation

## [0.2.0][] - 2018-12-10

### Fixed
- Plugin name

## [0.1.2][] - 2018-12-09

### Changed
- Replaced `js-yaml` with `yaml-lint`
- Replaced `jsonlint` with `jsonlint-cli`

## [0.1.1][] - 2018-12-07

### Changed
- Moved npm deployment to Travis configuration
- Package script names
- Replaced `markdownlint-cli` with `remark-cli`

## [0.1.0][] - 2018-12-06

### Added
- `mfs` unit
- `mlh` unit
- `msu` unit
- `vru` unit

[unreleased]: https://github.com/mgsisk/eslint-config/compare/v0.4.1...HEAD
[0.4.1]: https://github.com/mgsisk/eslint-config/compare/v0.4.0...v0.4.1
[0.4.0]: https://github.com/mgsisk/eslint-config/compare/v0.3.0...v0.4.0
[0.3.0]: https://github.com/mgsisk/eslint-config/compare/v0.2.2...v0.3.0
[0.2.2]: https://github.com/mgsisk/eslint-config/compare/v0.2.1...v0.2.2
[0.2.1]: https://github.com/mgsisk/eslint-config/compare/v0.2.0...v0.2.1
[0.2.0]: https://github.com/mgsisk/eslint-config/compare/v0.1.2...v0.2.0
[0.1.2]: https://github.com/mgsisk/eslint-config/compare/v0.1.1...v0.1.2
[0.1.1]: https://github.com/mgsisk/eslint-config/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/mgsisk/postcss-modular-rhythm/tree/v0.1.0
[semantic]: https://semver.org
