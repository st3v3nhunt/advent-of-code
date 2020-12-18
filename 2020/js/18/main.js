const assert = require('assert')
const { getDayInputAsLines } = require('../lib/utils')

async function getInput () {
  return getDayInputAsLines(18)
}

(async function run () {
  const input = await getInput()
  console.time('part 1 duration')
  const answerOne = partOne(input)
  console.timeEnd('part 1 duration')
  const expectedOne = 3348222486398
  console.log(`part 1 answers. expected: ${expectedOne}, actual: ${answerOne}.`)
  assert.equal(answerOne, expectedOne)

  // console.time('part 2 duration')
  // const answerTwo = partTwo(input)
  // console.timeEnd('part 2 duration')
  // const expectedTwo = 0
  // console.log(`part 2 answers. expected: ${expectedTwo}, actual: ${answerTwo}.`)
  // assert.equal(answerTwo, expectedTwo)
}())

function partOne (input) {
  const rowResults = []
  for (let i = 0; i < input.length; i++) {
    const row = input[i]
    console.log('expression:', row)
    const chars = row.split('')
    const calcResults = []
    calcResults.push(p1Calc(chars)[0])

    console.log('result:    ', calcResults[0])
    console.log('-'.repeat(20))
    rowResults.push(calcResults.pop())
  }
  const ans = rowResults.reduce((acc, cur) => acc + cur, 0)
  console.log('results:', ans)
  return ans
}

function partTwo (input) {
  const rowResults = []
  for (let i = 0; i < input.length; i++) {
    const row = input[i]
    console.log('expression:', row)
    const chars = row.split('')
    const calcResults = []
    calcResults.push(p2Calc(chars)[0])

    console.log('result:    ', calcResults[0])
    console.log('-'.repeat(20))
    rowResults.push(calcResults.pop())
  }
  const ans = rowResults.reduce((acc, cur) => acc + cur, 0)
  console.log('results:', ans)
  return ans
}

function p1Calc (chars) {
  const nums = []
  const operators = []
  const calcResults = []
  let j = 0

  for (; j < chars.length; j++) {
    const c = chars[j]
    if (/\(/.test(c)) { // start of block
      if (nums.length > 0) { // transfer num to calcResults so it will be included
        calcResults.push(nums.pop())
      }
      const [res, skip] = p1Calc(chars.slice(j + 1))
      j += skip
      if (operators.length > 0) {
        calcResults.push(eval(`${calcResults.pop()} ${operators.pop()} ${res}`))
      } else {
        calcResults.push(res)
      }
    } else if (/\)/.test(c)) { // end of block
      return [calcResults.pop(), j + 1]
    } else if (/\d/.test(c)) { // number
      if (calcResults.length > 0) {
        calcResults.push(eval(`${calcResults.pop()} ${operators.pop()} ${c}`))
      } else {
        if (nums.length === 0) { // empty, add num
          nums.push(Number(c))
        } else { // got a num thus _should_ have an operator!
          calcResults.push(eval(`${nums.pop()} ${operators.pop()} ${c}`))
        }
      }
    } else if (/(\+|\*)/.test(c)) { // operators
      operators.push(c)
    } else if (/ /.test(c)) { // space
    } else {
      Error(`Unhandled char: ${c}`)
    }
  }
  return [calcResults.reduce((acc, cur) => acc + cur, 0), j + 1]
}

function p2Calc (chars) {
  const nums = []
  const operators = []
  // const mop = []
  const calcResults = []
  let j = 0

  for (; j < chars.length; j++) {
    const c = chars[j]
    if (/\(/.test(c)) { // start of block
      if (nums.length > 0) { // transfer num to calcResults so it will be included
        calcResults.push(nums.pop())
      }
      const [res, skip] = p1Calc(chars.slice(j + 1))
      j += skip
      if (operators.length > 0) {
        calcResults.push(`${calcResults.pop()} ${operators.pop()} ${res}`)
      } else {
        calcResults.push(res)
      }
    } else if (/\)/.test(c)) { // end of block
      return [calcResults.pop(), j + 1]
    } else if (/\d/.test(c)) { // number
      if (calcResults.length > 0) {
        calcResults.push(eval(`${calcResults.pop()} ${operators.pop()} ${c}`))
      } else {
        if (nums.length === 0) { // empty, add num
          nums.push(Number(c))
        } else { // got a num thus _should_ have an operator!
          calcResults.push(eval(`${nums.pop()} ${operators.pop()} ${c}`))
        }
      }
    } else if (/\+/.test(c)) { // addition
      operators.push(c)
    } else if (/\*/.test(c)) { // multiply
      operators.push(c)
    } else if (/ /.test(c)) { // space
    } else {
      Error(`Unhandled char: ${c}`)
    }
  }
  return [calcResults.reduce((acc, cur) => acc + cur, 0), j + 1]
}
