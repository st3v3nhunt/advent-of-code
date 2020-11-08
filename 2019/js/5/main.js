const path = require('path')
const { getInputAsLines } = require('../lib/utils')
const { Comp } = require('../lib/intcodeComputerClass')

async function getInput () {
  const inputPath = path.join(__dirname, './input.txt')
  return (await getInputAsLines(inputPath))[0]
}

function runProg (program, mode) {
  return new Comp(program, [mode]).runner().next().value.map(Number)
}

function part1 (program) {
  const outputs = runProg(program, 1)
  const nonZero = outputs.filter((x) => x !== 0)
  if (nonZero.length > 1) {
    throw new Error('More than a single non-zero error code was returned')
  }
  return nonZero[0]
}

function part2 (program) {
  const outputs = runProg(program, 5)
  const nonZero = outputs.filter((x) => x !== 0)
  if (nonZero.length > 1) {
    throw new Error('More than a single non-zero error code was returned')
  }
  return nonZero[0]
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
