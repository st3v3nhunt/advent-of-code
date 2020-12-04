const { getDayInputAsLines } = require('../lib/utils')

async function getInput () {
  return getDayInputAsLines(0)
}

async function partOne () {
  const input = await getInput()
  console.log('part 1 answer:', input.length)
}

async function partTwo () {
  const input = await getInput()
  console.log('part 2 answer:', input.length)
}

(async function run () {
  await partOne()
  await partTwo()
}())
