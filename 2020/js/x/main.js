const assert = require('assert')
const { getDayInputAsLines } = require('../lib/utils')

async function getInput () {
  return getDayInputAsLines(0)
}

async function partOne () {
  const input = await getInput()
  console.log('part 1 answer:', input.length)
  assert.equal(input.length, 0)
}

async function partTwo () {
  const input = await getInput()
  console.log('part 2 answer:', input.length)
  assert.equal(input.length, 0)
}

(async function run () {
  await partOne()
  await partTwo()
}())
