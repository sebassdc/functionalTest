const getMinimalPath = require('./src/getMinimalPath')

const matrix = [
  [1],
  [1, 2],
  [1, 2, 3],
  [1, 2, 3, 4],
  [1, 2, 3, 4, 5],
  [1, 2, 3, 4, 5, 6],
]

console.log('getMinimalPath(matrix): ', getMinimalPath(matrix))
