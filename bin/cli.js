#! /usr/bin/env node
const R = require('ramda')
const genTriangle = require('../src/genTriangle')
const getPrettyString = require('../src/getPrettyString')
const getMinimalPath = require('../src/getMinimalPath')

const stdin = process.stdin
const stdout = process.stdout
const inputChunks = []

stdin.resume()
// stdin.setEncoding('utf8')

stdin.on('data', (chunk) => {
  inputChunks.push(chunk)
})

/**
 * @type {(raw: Buffer<>) => String}
 */
const getPrettyMinPath = R.compose(getPrettyString, getMinimalPath, genTriangle)

stdin.on('end', () => {
  const prettyMinPath = getPrettyMinPath(inputChunks.toString())
  const out = `Minimal path is: : ${prettyMinPath}`
  stdout.write(out)
  stdout.write('\n')
})
