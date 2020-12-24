const assert = require('assert')
const { getDayInputAsLines } = require('../lib/utils')

async function getInput () {
  return getDayInputAsLines(18)
}

(async function run () {
  const input = await getInput()
  // console.time('part 1 duration')
  // const answerOne = partOne(input)
  // console.timeEnd('part 1 duration')
  // const expectedOne = 3348222486398
  // console.log(`part 1 answers. expected: ${expectedOne}, actual: ${answerOne}.`)
  // assert.equal(answerOne, expectedOne)

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

// what are the rules?
// if there is a '+':
// - with numbers either side, add parens
// - with an open paren in front and nothing behind do nothing
// - with an open paren in front and a multiplication behind - add open before num and find where that closes and add one after
// - with an nothing in front in front and an open paren behind - add open next to open and close that after

function partTwo (input) {
  const rowResults = []
  for (let i = 0; i < input.length; i++) {
    const row = input[i]
    console.log('raw    :', row)
    const chars = row.split('')

    for (let j = 0; j < chars.length; j++) {
      const c = chars[j]
      if (c === '+') {
        // does a paren need adding? look ahead 4
        const head = chars[j + 2]
        const tail = chars[j - 2]
        // if (head === '*' || head === undefined) { // parens need adding when a multiply or undefined which means the end of the array
        if (/\d/g.test(tail) && /\d/g.test(head)) { // number, number
          // check if in a paren
          let inparen = false
          if (chars[j - 2] === '(') {
            inparen = true
          }
          chars.splice(j - 2, 0, '(')

          if (inparen) {
            for (let k = j + 4; k < chars.length; k++) {
              if (chars[k] === ')') {
                chars.splice(k + 1, 0, ')')
                break
              }
            }
            j += 3
          } else {
            if (chars[j + 5] === '+') {
              chars.splice(j + 8, 0, ')')
              j += 8
            } else {
              chars.splice(j + 4, 0, ')')
              j += 4
            }
          }
        } else if (/\d/g.test(tail) && /\(/g.test(head)) { // number, (
          chars.splice(j - 2, 0, '(')
          // find next closing paren
          for (let k = j + 4; k < chars.length; k++) {
            if (chars[k] === ')') {
              chars.splice(k + 1, 0, ')')
              break
            }
          }
          j += 3
        } else if (/\)/g.test(tail) && /\d/g.test(head)) { // ), number
          // need to attach this + to the paren, go back to find the start
          let pcount = 1
          for (let k = j - 3; k >= 0; k--) {
            const ck = chars[k]
            if (ck === ')') {
              pcount++
            } else if (ck === '(') {
              pcount--
            }
            if (pcount === 0) {
              chars.splice(k + 1, 0, '(')
              break
            }
          }
          // add closing paren
          if (chars[j + 5] === '+') {
            chars.splice(j + 8, 0, ')')
            j += 8
          } else {
            chars.splice(j + 4, 0, ')')
            j += 4
          }
        }
        // TODO: with searching for parens, there might be several
      }
    }
    const expression = chars.join('')
    console.log('updated:', expression)
    const result = eval(expression)
    console.log('result :', result)
    rowResults.push(result)
  }
  const ans = rowResults.reduce((acc, cur) => acc + cur, 0)
  console.log('results:', ans)
  return ans
}
