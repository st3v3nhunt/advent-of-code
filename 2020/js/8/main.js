const assert = require('assert')
const { getDayInputAsLines } = require('../lib/utils')

async function getInput () {
  return getDayInputAsLines(8)
}

function partOne (input) {
  let acc = 0
  let offset = 0
  const monitor = new Set()

  while (true) {
    const ins = input[offset]
    const key = `${offset}-${ins}`
    if (monitor.has(key)) {
      console.log('Infinite loop detected, exiting...')
      break
    } else {
      monitor.add(key)
    }
    const [op, arg] = ins.split(' ')
    const val = Number(arg)
    // run instruction
    switch (op) {
      case 'acc':
        acc += val
        offset += 1
        break
      case 'jmp':
        offset += val
        break
      case 'nop':
        offset += 1
        break
      default:
        throw new Error(`Unknown operation ${op}`)
    }
  }
  return acc
}

function runInstruction (ins, input) {
}

function partTwo (input) {
  const inputLength = input.length
  const offsetMonitor = new Set()
  let isInfinite = true
  let acc = 0

  while (isInfinite) {
    // starting new go
    acc = 0
    let offset = 0
    const monitor = new Set()
    isInfinite = false
    let offsetRecorded = false

    while (offset < inputLength) {
      const ins = input[offset]
      const key = `${offset}-${ins}`
      if (monitor.has(key)) {
        isInfinite = true
        // console.log('Infinite loop detected, exiting...')
        break
      } else {
        monitor.add(key)
      }
      let [op, arg] = ins.split(' ')
      const val = Number(arg)
      if (!offsetRecorded && !offsetMonitor.has(offset)) {
        if (op === 'jmp') {
          op = 'nop'
        } else if (op === 'nop') {
          op = 'jmp'
        }
        offsetMonitor.add(offset)
        offsetRecorded = true
      }
      switch (op) {
        case 'acc':
          acc += val
          offset += 1
          break
        case 'jmp':
          offset += val
          break
        case 'nop':
          offset += 1
          break
        default:
          throw new Error(`Unknown operation ${op}`)
      }
    }
  }

  return acc
}

(async function run () {
  const input = await getInput()
  console.time('part 1 duration')
  const answerOne = partOne(input)
  console.timeEnd('part 1 duration')
  console.log('part 1 answers. expected: 1134, actual:', answerOne)
  assert.equal(answerOne, 1134)

  console.time('part 2 duration')
  const answerTwo = partTwo(input)
  console.timeEnd('part 2 duration')
  console.log('part 2 answers. expected: 1205, actual:', answerTwo)
  assert.equal(answerTwo, 1205)
}())
