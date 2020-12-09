const assert = require('assert')
const { getDayInputAsLines } = require('../lib/utils')

async function getInput () {
  return getDayInputAsLines(9)
}

function partOne (input) {
  const preambleSize = 25
  const preamble = input.slice(0, preambleSize)

  let cur
  for (let i = preambleSize; i < input.length; i++) {
    cur = input[i]
    if (!isValid(preamble, cur)) {
      break
    }
    preamble.shift()
    preamble.push(cur)
  }
  return cur
}

function isValid (arr, val) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (i !== j && Number(arr[i]) + Number(arr[j]) === Number(val)) {
        return true
      }
    }
  }
  return false
}

function partTwo (input) {
  const nums = partTwoRunner(input)
  const max = Math.max(...nums)
  const min = Math.min(...nums)
  return max + min
}

function partTwoRunner (input) {
  const target = 217430975

  for (let i = 0; i < input.length; i++) {
    let acc = 0
    const nums = []
    for (let j = i; j < input.length; j++) {
      const num = Number(input[j])
      acc += num
      if (acc === target) {
        return nums
      } else if (acc > target) {
        break
      }
      nums.push(num)
    }
  }

  return []
}

(async function run () {
  const input = await getInput()
  console.time('part 1 duration')
  const answerOne = partOne(input)
  console.timeEnd('part 1 duration')
  const expectedOne = 217430975
  console.log(`part 1 answers. expected: ${expectedOne}, actual: ${answerOne}.`)
  assert.equal(answerOne, expectedOne)

  console.time('part 2 duration')
  const answerTwo = partTwo(input)
  console.timeEnd('part 2 duration')
  const expectedTwo = 28509180
  console.log(`part 2 answers. expected: ${expectedTwo}, actual: ${answerTwo}.`)
  assert.equal(answerTwo, expectedTwo)
}())
