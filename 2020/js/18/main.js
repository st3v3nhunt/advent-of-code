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

  console.time('part 2 duration')
  const answerTwo = partTwo(input)
  console.timeEnd('part 2 duration')
  const expectedTwo = 0
  console.log(`part 2 answers. expected: ${expectedTwo}, actual: ${answerTwo}.`)
  assert.equal(answerTwo, expectedTwo)
}())

function partOne (input) {
  const rowResults = []
  for (let i = 0; i < input.length; i++) {
    const row = input[i]
    console.log(row)
    const chars = row.split('')
    // const nums = []
    // const operators = []
    // const parens = []
    const calcResults = []
    calcResults.push(calc(chars)[0])

    console.log('calcResults:', calcResults)
    rowResults.push(calcResults.pop())
  }
  const ans = rowResults.reduce((acc, cur) => acc + cur, 0)
  console.log('results:', ans)
  return ans
}

function calc (chars) {
  const nums = []
  const operators = []
  // const parens = []
  const calcResults = []
  let j = 0

  for (; j < chars.length; j++) {
    const c = chars[j]
    // console.log(c)
    if (/\(/.test(c)) {
      // parens.push(c)
      // call function with rest of string
      // transfer the num to the calcResults so it will be included
      if (nums.length > 0) {
        calcResults.push(nums.pop())
      }
      const [out, skip] = calc(chars.slice(j + 1))
      if (operators.length > 0) {
        const exp = `${calcResults.pop()} ${operators.pop()} ${out}`
        const result = eval(exp)
        calcResults.push(result)
      } else {
        calcResults.push(out)
      }
      j += skip
    } else if (/\)/.test(c)) {
      // parens.pop()
      return [calcResults.pop(), j + 1] // possibly + 1
      // return with result
    } else if (/\d/.test(c)) { // number
      // if (parens.length > 0) {
      // }
      // if (parens.length > 0) { // need to skip the last result
      //   if (calcResults.length > 0) { // recursion
      //     const calc = `${nums.pop()} ${operators.pop()} ${c}`
      //     console.log('running calc with result:', calc)
      //     const result = eval(calc)
      //     calcResults.push(result)
      //   } else {
      //     nums.push(c)
      //   }
      // } else
      if (calcResults.length > 0) { // normally a result is available
        const calc = `${calcResults.pop()} ${operators.pop()} ${c}`
        // console.log('running calc with result:', calc)
        const result = eval(calc)
        calcResults.push(result)
      } else if (nums.length === 0) { // empty, add num
        nums.push(Number(c))
      } else if (nums.length === 1) { // got a num thus _should_ have an operator!
        const calc = `${nums.pop()} ${operators.pop()} ${c}`
        // console.log('running calc:', calc)
        const result = eval(calc)
        calcResults.push(result)
      }
    } else if (/\+/.test(c)) { // addition - could combine with multiply
      operators.push(c)
    } else if (/\*/.test(c)) { // multiply
      operators.push(c)
    } else if (/ /.test(c)) { // space
      // console.log('space')
    } else {
      Error(`Unhandled char: ${c}`)
    }
  }
  return [calcResults.reduce((acc, cur) => acc + cur, 0), j + 1]
}

function partTwo (input) {
  return input.length
}
