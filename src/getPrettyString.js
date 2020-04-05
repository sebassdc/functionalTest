const R = require('ramda')

/**
 * @type {(path: number[]) => String}
 */
const sumInitialPart = R.compose(
  R.join(''),
  R.map(e => `${e} + `),
  R.init,
)

/**
 * @type {(path: number[]) => String}
 */
const sumLastPart = R.compose(String, R.last)

/**
 * @type {(path: number[]) => String}
 */
const sumStringFromArray = R.converge(R.concat, [sumInitialPart, sumLastPart])

/**
 * @type {(path: number[]) => String}
 */
const getPrettyString = path => `${sumStringFromArray(path)} = ${R.sum(path)}`

module.exports = getPrettyString
