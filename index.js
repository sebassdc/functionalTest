const R = require('ramda')
const fs = require('fs')

/**
 * @template T1
 * @template T2
 * @template T3
 * @template R
 * @typedef {import('ramda').CurriedFunction3<T1, T2, T3, R>} CurriedFunction3
 */

/**
 * @typedef {object} Graph
 * @prop {{[k: string]: [ string , string ]}} edges
 * @prop {string[]} vertices
 * @prop {string[]} lastLine
 */

/**
 * This function will take a triangle in the form of array of arrays and
 * will return a graph described by the edges and vertices
 *
 * @param {number[][]} triangle
 * @returns {Graph} the graph object
 */
const genGraph = triangle => {
  const edges = {}
  const vertices = []
  triangle.forEach((line, i) => {
    line.forEach((e, j) => {
      vertices.push(`${i}-${j}`)
      if (i < triangle.length - 1) { // Si no es la ultima linea
        // 
        edges[`${i}-${j}`] = [`${i + 1}-${j}`, `${i + 1}-${j + 1}`]
      }
    })
  });
  return {
    edges,
    vertices,
    lastLine: R.takeLast(triangle.length, vertices)
  }
}
/**
 * This function will take a graph object a start node and an end node
 * will return an array of the posible paths to reach the node
 *
 * @param {Graph} graph
 * @param {string} start
 * @param {string} end
 * @returns {string[][]} An array with the posible paths
 */
/**
 * @type {CurriedFunction3<Graph, string, string>}
 */
const genPaths = R.curry(({edges, vertices}, start, end) => {
  // Mark all vertices as not visited with a dictionary aka Object.
  let visited = R.compose(
    R.fromPairs,
    R.converge(R.zip, [R.identity, R.map(R.F)])
  )(vertices)
  // Create array to store the paths
  let paths = []
  let path = []
  // Inner recursive function
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
/**
 * This function will take a graph object a start node and an end node
 * will return an array of the posible paths to reach the node
 *
 * @param {Graph} graph
 * @param {string} start
 * @param {string} end
 * @returns {string[][]} An array with the posible paths
 */
/**
 * @type {CurriedFunction3<Graph, string, string>}
 */

const genAllPathIndexes = graph => R.compose(
  R.unnest,
  R.map(
    genPaths(graph, '0-0')
  ),
  R.prop('lastLine')
)(graph)
/**
 * @type {(raw: Buffer<>) => number[][]}
 */
const genTriangle = R.compose(
  R.map(R.compose(
    R.map(Number),
    R.split(' ')
  )),
  R.split('\n'),
  R.trim,
)

const genPathsfromIndexes = triangle => R.map(
  R.map(
    R.compose(
      e => triangle[e[0]][e[1]],
      R.map(Number),
      R.split('-')
    )
  )
)
const minListByHead = R.reduce(R.minBy(R.head), [Infinity],)
const withSums = R.converge(R.zip, [R.map(R.sum), R.identity])


// The main function
const getMinimalPath = data => {
  const triangle = genTriangle(data)
  const minimalPath = R.compose(
    minListByHead,
    withSums,
    genPathsfromIndexes(triangle),
    genAllPathIndexes,
    genGraph,
  )(triangle)
  return minimalPath
}

module.exports = getMinimalPath