const R = require('ramda')

/**
 * @type {(arr: String[]) => number[]}
 */
const parseArrayToNumber = R.map(Number)

/**
 * @type {(fileText: String) => String[]}
 */
const splitByReturnChar = R.split('\n')

/**
 * @type {(line: String) => number[]}
 */
const splitLineAndParse = R.compose(parseArrayToNumber, R.split(' '))

/**
 * @type {(raw: Buffer<>) => number[][]}
 */
const genTriangle = R.compose(
  R.map(splitLineAndParse),
  splitByReturnChar,
  R.trim,
)

module.exports = genTriangle
