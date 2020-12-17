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
  const expectedTwo = 3435342392262
  console.log(`part 2 answers. expected: ${expectedTwo}, actual: ${answerTwo}.`)
  assert.equal(answerTwo, expectedTwo)
}())

function partOne (input) {
  const register = new Map()
  let mask = ''

  for (let i = 0; i < input.length; i++) {
    const [ins, val] = input[i].split(' = ')
    if (ins === 'mask') {
      mask = val
    } else {
      const start = ins.indexOf('[') + 1
      const end = ins.indexOf(']')
      const addr = ins.substr(start, end - start)
      const binVal = decToPaddedBinary(val, mask.length)
      const binValAfterMaskApply = applyMask(mask, binVal, 'X')

      register.set(addr, binValAfterMaskApply)
    }
  }

  let ans = 0
  for (const val of register.values()) {
    ans += parseInt(val.join(''), 2)
  }
  return ans
}

function partTwo (input) {
  const register = new Map()
  let mask = ''

  for (let i = 0; i < input.length; i++) {
    const [ins, val] = input[i].split(' = ')
    if (ins === 'mask') {
      mask = val
    } else { // mem[addr] = val
      const start = ins.indexOf('[') + 1
      const end = ins.indexOf(']')
      const decAddr = ins.substr(start, end - start)
      const binAddr = decToPaddedBinary(decAddr, mask.length)

      const result = applyMask(mask, binAddr, '0')
      const floatingBitCount = result.reduce((acc, cur) => cur === 'X' ? acc + 1 : acc, 0)
      const perms = getPermutations(floatingBitCount)

      // calc mem addresses to write to
      const addrs = perms.map((p, i) => {
        return result.map(r => {
          if (r === 'X') {
            return p.shift()
          }
          return r
        })
      })

      addrs.forEach(x => {
        register.set(x.join(''), Number(val))
      })
    }
  }

  let ans = 0
  for (const x of register.values()) {
    ans += x
  }
  return ans
}

function getPermutations (n) {
  const perms = []
  const pCount = 2 ** n
  for (let i = 0; i < pCount; i++) {
    perms.push(Number(i).toString(2).padStart(n, '0').split(''))
  }
  return perms
}

function applyMask (mask, target, c) {
  const result = []
  for (let i = 0; i < mask.length; i++) {
    const maskValue = mask[i]
    if (maskValue === c) {
      result.push(target[i])
    } else {
      result.push(maskValue)
    }
  }
  return result
}

function decToPaddedBinary (dec, length) {
  return Number(dec).toString(2).padStart(length, '0')
}
