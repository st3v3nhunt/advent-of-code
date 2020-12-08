const assert = require('assert')
const { getDayInputAsLines } = require('../lib/utils')

async function getInput () {
  return getDayInputAsLines(8)
}

function partTwo (input) {
  const inputLength = input.length
  let acc = 0
  let offset = 0
  const monitor = new Set()

  while (true) {
    const ins = input[offset]
    const key = `${offset}-${ins}`
    if (monitor.has(key)) {
      console.log('Infinite loop detected, exiting...')
      break
    } else if (monitor.size === inputLength) {
      console.log('everything ran OK')
      return acc
    } else {
      monitor.add(key)
    }
    const [op, arg] = ins.split(' ')
    const val = Number(arg)
    console.log('key', key)
    console.log('instruction', ins)
    console.log('op, arg', op, arg)
    console.log('offset', offset)
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
  console.log('acc', acc)
  return acc
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
    console.log('key', key)
    console.log('instruction', ins)
    console.log('op, arg', op, arg)
    console.log('offset', offset)
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
  console.log('acc', acc)
  return acc
}

function runInstruction (ins, input) {
}

function partTwo (input) {
  return input.length
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
  console.log('part 2 answers. expected: TBC, actual:', answerTwo)
  assert.equal(answerTwo, 0)
}())
