const R = require('ramda')
const fs = require('fs')

const data = fs.readFileSync('./data.1.txt')

const makeGraph = list => {
  // console.log(list)
  // Key is position
  // Generate conections
  const conections = list.map((e, i) => e.map((f, j) => [
    [`${i}-${j} ${i+1}-${j}`],
    [`${i}-${j} ${i+1}-${j+1}`],
  ]))

  return R.flatten(conections)
}

const shortestPath = R.compose(
  makeGraph,
  R.map(e => R.map(Number, R.split(' ', e))),
  R.split('\n'),
  e => e.toString()
)

console.log(
  shortestPath(data)
)