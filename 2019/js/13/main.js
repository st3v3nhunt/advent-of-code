const path = require('path')
const { getInputAsLines } = require('../lib/utils')
const Cabinet = require('./Cabinet')

async function getInput () {
  const inputPath = path.join(__dirname, './input.txt')
  return (await getInputAsLines(inputPath))[0]
}

function part1 (program) {
  return new Cabinet(program).remainingBlocks
}

function part2 (program) {
  const cabinet = new Cabinet(program, true)
  const result = cabinet.play(true)
  if (!result.done || cabinet.remainingBlocks > 0) {
    throw new Error('The cabinet has broken...')
  }

  const { score } = cabinet
  return score
}

async function answers () {
  const program = await getInput()

  return {
    part1: part1(program),
    part2: part2(program)
  }
}

module.exports = {
  answers
}
