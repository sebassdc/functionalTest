#! /usr/bin/env node
const R = require('ramda')
const getMinimalPath = require('../index.js')

const stdin = process.stdin
const stdout = process.stdout
const inputChunks = []

stdin.resume()
// stdin.setEncoding('utf8')

stdin.on('data', chunk => {
  inputChunks.push(chunk)
})

const genPrettyString = minPath => {
  return `${
    R.compose(
      R.join(''),
      R.map(e => `${e} + `),
      R.init
    )(minPath[1])
  }${R.last(minPath[1])} = ${minPath[0]}`
}

stdin.on('end', () => {
  const out = R.compose(
    R.concat('Minimal path is: '),
    genPrettyString,
    getMinimalPath
  )(inputChunks.toString())
  stdout.write(out)
  stdout.write('\n')
})