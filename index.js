const R = require('ramda')
const fs = require('fs')

const data = fs.readFileSync('./data.1.txt')

const genGraph = triangle => {
  const edges = {}
  const vertices = []
  const lastLine = []
  triangle.forEach((line, i) => {
    line.forEach((e, j) => {
      vertices.push(`${i}-${j}`)
      if (i < triangle.length - 1) {
        edges[`${i}-${j}`] = [`${i + 1}-${j}`, `${i + 1}-${j + 1}`]
      } else {
        lastLine.push(`${i}-${j}`)
      }
    })
  });
  return {
    edges,
    vertices,
    lastLine
  }
}

const genPaths = R.curry(({edges, vertices}, start, end) => {
  // Mark all vertices as not visited with a dictionary aka Object.
  let visited = R.fromPairs(
    R.zip(vertices)(
      R.map(R.F)(vertices)
    )
  )
  // Create array to store the paths
  let paths = []
  let path = []
  const genPathsUtil = (edges, start, end, visited, path) => {
    visited[start] = true
    path.push(start)
    // Mark the current node as visited then store in the path
    if (start === end) {
      paths.push([...path])
    }
    else {
      for (let i of (edges[start] || [])) {
        if (!visited[i]) { // This will check for circular paths. Not necesary for this case
          genPathsUtil(edges, i, end, visited, path)
        }
      }
    }
    path.pop()
    visited[start] = false
  }
  genPathsUtil(edges, start, end, visited, path)
  return paths
})

const genAllPathIndexes = graph => R.compose(
  R.unnest,
  R.map(
    genPaths(graph, '0-0')
  ),
  R.prop('lastLine')
)(graph)


const genTriangle = R.compose(
  R.map(e => R.map(Number, R.split(' ', e))),
  R.split('\n'),
  e => e.toString()
)


const shortestPath = data => {
  const triangle = genTriangle(data)
  const pathIndexes = R.compose(
    genAllPathIndexes,
    genGraph,
  )(triangle)
  const paths = R.map(
    R.map(
      R.compose(
        e => triangle[(e[0])][e[1]],
        R.map(Number),
        R.split('-')
      )
    )
  )(pathIndexes)
  const pathsWithSums = R.zip(R.map(R.sum, paths), paths)
  return R.reduce(R.minBy(R.prop(0)), [Infinity], pathsWithSums)
}

console.log(
  shortestPath(data)
)
