const path = require('path')
const { getInputAsLines } = require('../lib/utils')
const ASCII = require('./ASCII')

async function getInput (filename) {
  const inputPath = path.join(__dirname, `./${filename}.txt`)
  return getInputAsLines(inputPath)
}

function part1 (input) {
  const ascii = new ASCII(input)
  ascii.drawView()
  return ascii.sumOfAlignmentParams()
}

function part2 (input) {
  const ascii = new ASCII(input, true)
  const inputs = []

  const moveRoutine = 'A,B,B,C,B,C,B,C,A,A'
  const moveFuncA = 'L,6,R,8,L,4,R,8,L,12'
  const moveFuncB = 'L,12,R,10,L,4'
  const moveFuncC = 'L,12,L,6,L,4,L,4'

  inputs.push(moveRoutine)
  inputs.push(moveFuncA)
  inputs.push(moveFuncB)
  inputs.push(moveFuncC)

  return ascii.play(inputs, false)
}

async function answers () {
  const filename = 'input'
  const [input] = (await getInput(filename))
  return {
    part1: part1(input),
    part2: part2(input)
  }
}

module.exports = {
  answers
}
