const assert = require('assert')
const { getDayInputAsLines } = require('../lib/utils')

async function getInput () {
  return getDayInputAsLines(13)
}

function partOne (input) {
  const time = Number(input[0])
  const buses = input[1].split(',')
  const diffs = {}
  let monitor = [-time]

  for (let i = 0; i < buses.length; i++) {
    const bus = buses[i]

    if (bus !== 'x') {
      const numBus = Number(bus)
      const nextTime = Math.ceil(time / numBus)
      const wait = time - nextTime * numBus
      diffs[numBus] = wait
      if (wait > monitor[0]) {
        monitor = [wait, bus]
      }
    }
  }
  console.log(diffs)
  console.log(monitor)
  const ans = monitor[0] * monitor[1]
  return -ans
}

function partTwo (input) {
  return input.length
}

(async function run () {
  const input = await getInput()
  console.time('part 1 duration')
  const answerOne = partOne(input)
  console.timeEnd('part 1 duration')
  const expectedOne = 171
  console.log(`part 1 answers. expected: ${expectedOne}, actual: ${answerOne}.`)
  assert.equal(answerOne, expectedOne)

  console.time('part 2 duration')
  const answerTwo = partTwo(input)
  console.timeEnd('part 2 duration')
  const expectedTwo = 0
  console.log(`part 2 answers. expected: ${expectedTwo}, actual: ${answerTwo}.`)
  assert.equal(answerTwo, expectedTwo)
}())
