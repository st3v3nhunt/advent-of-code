const assert = require('assert')
const { getDayInputAsLines } = require('../lib/utils')

async function getInput () {
  return getDayInputAsLines(6)
}

function partOne (input) {
  input.push('')

  let groupAnswers = new Set()
  const groupAnswerCount = []

  input.forEach((line) => {
    if (line === '') {
      groupAnswerCount.push(groupAnswers.size)
      groupAnswers = new Set()
    } else {
      line.split('').forEach(item => groupAnswers.add(item))
    }
  })
  return groupAnswerCount.reduce((a, b) => a + b)
}

function partTwo (input) {
  input.push('')

  let groupAnswers = {}
  const groupAnswerCount = []
  let groupSize = 0

  input.forEach((line) => {
    if (line === '') {
      let count = 0
      Object.entries(groupAnswers).forEach(([k, v]) => {
        if (v === groupSize) {
          count++
        }
      })
      groupAnswerCount.push(count)
      groupAnswers = {}
      groupSize = 0
    } else {
      groupSize++
      line.split('').forEach(item => {
        if (groupAnswers[item]) {
          groupAnswers[item] = groupAnswers[item] + 1
        } else {
          groupAnswers[item] = 1
        }
      })
    }
  })
  return groupAnswerCount.reduce((a, b) => a + b)
}

(async function run () {
  const input = await getInput()
  console.time('part 1 duration')
  const answerOne = partOne(input)
  console.timeEnd('part 1 duration')
  console.log('part 1 answers. expected: 6534, actual:', answerOne)
  assert.equal(answerOne, 6534)

  console.time('part 2 duration')
  const answerTwo = partTwo(input)
  console.timeEnd('part 2 duration')
  console.log('part 2 answers. expected: 3402, actual:', answerTwo)
  assert.equal(answerTwo, 3402)
}())
