const assert = require('assert')
const { IncomingMessage } = require('http')
const { getDayInputAsLines } = require('../lib/utils')

async function getInput () {
  return getDayInputAsLines(14)
}

(async function run () {
  const input = await getInput()
  console.time('part 1 duration')
  const answerOne = partOne(input)
  console.timeEnd('part 1 duration')
  const expectedOne = 0
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
  // const mem = [...initMem]
  // for (let i = 0; i < 64; i++) {
  //   register[i] = [...initMem]
  // }
  for (let i = 0; i < input.length; i++) {
    // console.log('mem', mem.join(''))
    const [ins, val] = input[i].split(' = ')
    console.log(ins, val)
    if (ins === 'mask') {
      mask = val
      console.log('mask', mask)
    } else {
      const start = ins.indexOf('[') + 1
      const end = ins.indexOf(']')
      const loc = ins.substr(start, end - start)
      console.log('mem loc:', loc, start, end)
      const numToApply = [...initMem]
      const num = Number(val).toString(2).split('')
      for (let j = 1; j <= num.length; j++) {
        numToApply[numToApply.length - j] = num[num.length - j]
      }
      const mem = [...initMem]

      const nLen = numToApply.length
      console.log('numToApply before mask', numToApply.join(''))
      // apply mask
      for (let j = 1; j <= memLength; j++) {
        const maskIndex = mask.length - j
        if (mask[maskIndex] === 'X') {
          mem[memLength - j] = numToApply[nLen - j]
        } else {
          console.log('changing maskIndex', maskIndex, mask[maskIndex], nLen, numToApply[nLen - j])
          mem[nLen - j] = mask[maskIndex]
        }
      }
      register[loc] = mem
      // for (let j = 1; j <= memLength; j++) {
      //   mem[memLength - j] = numToApply[nLen - j]
      // }
      console.log('numToApply after mask', numToApply.join(''))
      // write to memory
      // console.log('mem before apply', mem.join(''))
      // console.log('mem after apply', mem.join(''))
    }
  }
  let ans = 0
  for (const val of Object.values(register)) {
    console.log(val)
    ans += parseInt(val.join(''), 2)
    console.log('ans:', ans)
  }
  console.log('ans:', ans)
  return ans
}

function partTwo (input) {
  return input.length
}
