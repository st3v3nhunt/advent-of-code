const assert = require('assert')
const { getDayInputAsLines } = require('../lib/utils')

async function getInput () {
  return getDayInputAsLines(0)
}

function partOne (input) {
  return input.length
}

function partTwo (input) {
  return input.length
}

(async function run () {
  const input = await getInput()
  console.time('part 1 duration')
  const answerOne = partOne(input)
  console.timeEnd('part 1 duration')
  console.log('part 1 answers. expected: TBC, actual:', answerOne)
  assert.equal(input.length, 0)

  console.time('part 2 duration')
  const answerTwo = partTwo(input)
  console.timeEnd('part 2 duration')
  console.log('part 2 answers. expected: TBC, actual:', answerTwo)
  console.log('part 2 answers. expected: TBC, actual:', answerTwo)
  assert.equal(input.length, 0)
}())
