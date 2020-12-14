const assert = require('assert')
const { getDayInputAsLines } = require('../lib/utils')

async function getInput () {
  return getDayInputAsLines(14)
}

(async function run () {
  const input = await getInput()
  console.time('part 1 duration')
  const answerOne = partOne(input)
  console.timeEnd('part 1 duration')
  const expectedOne = 9879607673316
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
  const register = {}
  const memLength = 36
  const initMem = '0'.repeat(memLength).split('')
  let mask = ''

  for (let i = 0; i < input.length; i++) {
    const [ins, val] = input[i].split(' = ')
    if (ins === 'mask') {
      mask = val
    } else {
      const start = ins.indexOf('[') + 1
      const end = ins.indexOf(']')
      const loc = ins.substr(start, end - start)
      const numToApply = [...initMem]
      const num = Number(val).toString(2).split('')
      for (let j = 1; j <= num.length; j++) {
        numToApply[memLength - j] = num[num.length - j]
      }

      // apply mask
      const mem = [...initMem]
      for (let j = 1; j <= memLength; j++) {
        const maskIndex = mask.length - j
        if (mask[maskIndex] === 'X') {
          mem[memLength - j] = numToApply[memLength - j]
        } else {
          mem[memLength - j] = mask[maskIndex]
        }
      }
      register[loc] = mem
    }
  }

  let ans = 0
  for (const val of Object.values(register)) {
    ans += parseInt(val.join(''), 2)
  }
  return ans
}

function partTwo (input) {
  return input.length
}
