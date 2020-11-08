const path = require('path')
const { getInputAsLines } = require('../lib/utils')
const { Comp } = require('../lib/intcodeComputerClass')

async function getInput () {
  const inputPath = path.join(__dirname, './input.txt')
  return (await getInputAsLines(inputPath))[0]
}

function part1 (program) {
  return new Comp(program, [1]).runner().next().value
}

function part2 (program) {
  return new Comp(program, [2]).runner().next().value
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
