const assert = require('assert')
const { getDayInputAsLines } = require('../lib/utils')

async function getInput () {
  return getDayInputAsLines(6)
}

async function partOne () {
  const input = await getInput()
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
  const sum = groupAnswerCount.reduce((a, b) => a + b)

  console.log('part 1 answer:', sum)
  assert.equal(sum, 6534)
}

async function partTwo () {
  const input = await getInput()
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
  const sum = groupAnswerCount.reduce((a, b) => a + b)

  console.log('part 2 answer:', sum)
  assert.equal(sum, 3402)
}

(async function run () {
  await partOne()
  await partTwo()
}())
