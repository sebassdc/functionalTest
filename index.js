const R = require('ramda')
const fs = require('fs')

const data = fs.readFileSync('./data.1.txt')

const genConnections = triangle => {
  const list = []
  triangle.forEach((line, i) => {
    line.forEach((_, j) => {
      list.push([[i, j], [i, j + 1]])
      list.push([[i, j], [i + 1, j + 1]])
    })
  });
  return new Map(list)
}



const makeGraph = list => {
  // console.log(list)
  // Key is position
  // Generate conections
  const conections = list.map((e, i) => e.map((f, j) => [
    [`${i}-${j} ${i+1}-${j}`],
    [`${i}-${j} ${i+1}-${j+1}`],
  ]))

  return new Map(conections)
}

const shortestPath = R.compose(
  genConnections,
  R.map(e => R.map(Number, R.split(' ', e))),
  R.split('\n'),
  e => e.toString()
)

console.log(
  shortestPath(data)
)

console.log('test')
