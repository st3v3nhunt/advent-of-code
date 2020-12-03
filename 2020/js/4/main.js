const { getDayInputAsLines } = require('../lib/utils')

async function getInput () {
  return getDayInputAsLines(4)
}

async function partOne () {
  const input = await getInput()
  console.log('part 1 answer:', 'answer')
}

async function partTwo () {
  const input = await getInput()
  console.log('part 2 answer:', 'answer')
}

(async function run () {
  await partOne()
  await partTwo()
}())
