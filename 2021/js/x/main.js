const assert = require('assert')
const { getDayInputAsLines } = require('../lib/utils')

async function getInput () {
  // TODO: Update day number.
  return await getDayInputAsLines('x')
}

(async function run () {
  const input = await getInput()
  console.time('part 1 duration')
  const answerOne = partOne(input)
  console.timeEnd('part 1 duration')
  // TODO: Update expected answer when known.
  const expectedOne = 0
  console.log(`part 1 answers. expected: ${expectedOne}, actual: ${answerOne}.`)
  assert.equal(answerOne, expectedOne)

  console.time('part 2 duration')
  const answerTwo = partTwo(input)
  console.timeEnd('part 2 duration')
  // TODO: Update expected answer when known.
  const expectedTwo = 0
  console.log(`part 2 answers. expected: ${expectedTwo}, actual: ${answerTwo}.`)
  assert.equal(answerTwo, expectedTwo)
}())

function partOne (input) {
  return input.length
}

function partTwo (input) {
  return input.length
}
