const R = require('ramda')

/**
 * @type {(data: number[][]) => number[]}
 */
const getMinBettweenArrays = ([arr1, arr2]) => {
  const sum1 = R.sum(arr1)
  const sum2 = R.sum(arr2)
  return sum1 < sum2 ? arr1 : arr2
}

/**
 * @type {(data: number[][]) => number[][]}
 */
const getMinBettweenAdyacents = R.compose(
  R.map(getMinBettweenArrays),
  R.aperture(2),
)

/**
 * @type {(value: number[] ,acc: number[][]) => number[][]}
 */
const reducer = (value, acc) =>
  R.zipWith(R.append, value, getMinBettweenAdyacents(acc))

/**
 * @type {(data: number[][]) => number[]}
 */
const getMinimalPath = (data) => {
  const last = R.last(data)
  const rest = R.init(data)
  const initialData = R.map(R.of)(last)
  const finalPath = R.reduceRight(reducer, initialData)(rest)
  return R.flatten(finalPath)
}

module.exports = getMinimalPath
