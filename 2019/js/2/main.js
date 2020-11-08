/* eslint-disable no-param-reassign */
const path = require('path')

const { getInputAsLines } = require('../lib/utils')

async function getInput () {
  const inputPath = path.join(__dirname, './input.txt')
  return getInputAsLines(inputPath)
}

function updateNounVerb (codes, n, v) {
  codes[1] = n
  codes[2] = v
  return codes
}

function opComp (codes) {
  let pos = 0
  let opcode = codes[pos]
  let val = 0
  while (opcode === 1 || opcode === 2) {
    if (opcode === 1) {
      val = codes[codes[pos + 1]] + codes[codes[pos + 2]]
    }
    if (opcode === 2) {
      val = codes[codes[pos + 1]] * codes[codes[pos + 2]]
    }
    codes[codes[pos + 3]] = val
    pos += 4
    opcode = codes[pos]
  }
  return codes[0]
}

function p1 (input) {
  const codes = input[0].split(',').map((x) => parseInt(x, 10))
  const opcodes = updateNounVerb(codes, 12, 2)

  return opComp(opcodes)
}

function p2 (input) {
  for (let i = 0; i < 100; i++) {
    for (let j = 0; j < 100; j++) {
      const codes = input[0].split(',').map((x) => parseInt(x, 10))
      const opcodes = updateNounVerb(codes, i, j)

      const endValue = opComp(opcodes)
      if (endValue === 19690720) {
        return `Noun: ${i}. Verb: ${j}`
      }
    }
  }
  throw new Error('UNSOLVED!')
}

async function answers () {
  const input = await getInput()
  return {
    part1: p1(input),
    part2: p2(input)
  }
}

module.exports = {
  answers
}
/* eslint-enable no-param-reassign */
