const assert = require('assert')
const { getDayInputAsLines } = require('../lib/utils')

async function getInput () {
  return getDayInputAsLines(25)
}

(async function run () {
  const input = await getInput()
  console.time('part 1 duration')
  const answerOne = partOne(input)
  console.timeEnd('part 1 duration')
  const expectedOne = 15217943
  console.log(`part 1 answers. expected: ${expectedOne}, actual: ${answerOne}.`)
  assert.equal(answerOne, expectedOne)

  console.time('part 2 duration')
  const answerTwo = partTwo(input)
  console.timeEnd('part 2 duration')
  const expectedTwo = 0
  console.log(`part 2 answers. expected: ${expectedTwo}, actual: ${answerTwo}.`)
  assert.equal(answerTwo, expectedTwo)
}())

function transform (sn, snInit) {
  const div = 20201227
  sn *= snInit
  return sn % div
}

function getEnKey (snInit, pk) {
  let csn = snInit
  let cls = 1
  while (csn !== pk) {
    csn = transform(csn, snInit)
    cls++
  }
  return cls
}

function getFinalEnKey (cpk, dpk, cls, dls) {
  let enkey = 1
  if (dls < cls) {
    for (let i = 0; i < dls; i++) {
      enkey = transform(enkey, cpk)
    }
  } else {
    for (let i = 0; i < cls; i++) {
      enkey = transform(enkey, dpk)
    }
  }
  return enkey
}

function partOne (input) {
  const subjectNumber = 7
  const cpk = Number(input[0])
  const dpk = Number(input[1])

  const cls = getEnKey(subjectNumber, cpk)
  const dls = getEnKey(subjectNumber, dpk)

  const enkey = getFinalEnKey(cpk, dpk, cls, dls)

  console.log('enkey', enkey)
  return enkey
}

function partTwo (input) {
  return input.length
}
