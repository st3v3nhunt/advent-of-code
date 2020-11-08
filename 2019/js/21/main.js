const path = require('path')
const { getInputAsLines } = require('../lib/utils')

async function getInput (filename) {
  const inputPath = path.join(__dirname, `./${filename}.txt`)
  return getInputAsLines(inputPath)
}

function part1 (input) {
  return 'PENDING...'
}

function part2 (input) {
  return 'PENDING...'
}

async function answers () {
  const filename = 'input'
  const [input] = (await getInput(filename))
  console.log(input)
  return {
    part1: part1(input),
    part2: part2(input)
  }
}

module.exports = {
  answers
}
