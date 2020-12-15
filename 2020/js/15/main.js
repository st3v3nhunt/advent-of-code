const assert = require('assert')
const { getDayInputAsLines } = require('../lib/utils')

async function getInput () {
  return getDayInputAsLines(15)
}

(async function run () {
  const input = await getInput()
  console.time('part 1 duration')
  const answerOne = partOne(input)
  console.timeEnd('part 1 duration')
  const expectedOne = 257
  console.log(`part 1 answers. expected: ${expectedOne}, actual: ${answerOne}.`)
  assert.equal(answerOne, expectedOne)

  console.time('part 2 duration')
  const answerTwo = partTwo(input)
  console.timeEnd('part 2 duration')
  const expectedTwo = 8546398
  console.log(`part 2 answers. expected: ${expectedTwo}, actual: ${answerTwo}.`)
  assert.equal(answerTwo, expectedTwo)
}())

function calc (input, length) {
  const nums = input[0].split(',').map(Number)
  const initialLen = nums.length - 1
  const memo = {}
  for (let i = 0; i < initialLen; i++) {
    const num = nums[i]
    memo[num] = i
  }

  let last = nums[initialLen]
  for (let i = initialLen; i < length - 1; i++) {
    const lastPos = memo[last]
    memo[last] = i
    if (lastPos !== undefined) {
      last = i - lastPos
    } else {
      last = 0
    }
  }
  return last
}

function partOne (input) {
  const length = 2020
  return calc(input, length)
}

function partTwo (input) {
  const length = 30000000
  return calc(input, length)
}
