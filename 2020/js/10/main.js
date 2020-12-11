const assert = require('assert')
const { getDayInputAsLines } = require('../lib/utils')

async function getInput () {
  return getDayInputAsLines(10)
}

function sortInput (input) {
  const inputCopy = [...input]
  // add the charging outlet (in the wall) with a joltage rating of 0
  inputCopy.push(0)
  // add the device (has an inbuild joltage adapter of 3)
  inputCopy.push(Math.max(...inputCopy) + 3)

  return inputCopy.sort((a, b) => a - b).map(Number)
}

function partOne (input) {
  const adapters = sortInput(input)
  const jolts = { 1: 0, 2: 0, 3: 0 }

  for (let i = 1; i < adapters.length; i++) {
    const prev = adapters[i - 1]
    const cur = adapters[i]
    const diff = cur - prev
    if (diff === 1) {
      jolts[1]++
    } else if (diff === 2) {
      jolts[2]++
    } else if (diff === 3) {
      jolts[3]++
    }
    // console.log(i, prev, cur, diff, jolts)
  }
  console.log(jolts)
  return jolts[1] * jolts[3]
}

function partTwo (input) {
  const adapters = sortInput(input)
  return calcPermutations(adapters, {})
}

function calcPermutations (adapters, memo) {
  const key = adapters.join('')
  if (key in memo) {
    return memo[key]
  }

  let result = 1
  for (let i = 1; i < adapters.length - 1; i++) {
    const prev = adapters[i - 1]
    if (adapters[i + 1] - prev <= 3) {
      const slice = [...[prev], ...adapters.slice(i + 1)]
      result += calcPermutations(slice, memo)
    }
  }
  memo[key] = result
  return result
}

(async function run () {
  const input = await getInput()
  console.time('part 1 duration')
  const answerOne = partOne(input)
  console.timeEnd('part 1 duration')
  const expectedOne = 2176
  console.log(`part 1 answers. expected: ${expectedOne}, actual: ${answerOne}.`)
  assert.equal(answerOne, expectedOne)

  console.time('part 2 duration')
  const answerTwo = partTwo(input)
  console.timeEnd('part 2 duration')
  const expectedTwo = 18512297918464
  console.log(`part 2 answers. expected: ${expectedTwo}, actual: ${answerTwo}.`)
  assert.equal(answerTwo, expectedTwo)
}())
