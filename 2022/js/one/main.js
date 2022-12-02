const assert = require('assert')
const { getDayInputAsLines, getDayTestInputAsLines } = require('../lib/utils')

const day = 'one'

async function getInput (test) {
  return test
    ? await getDayTestInputAsLines(day)
    : await getDayInputAsLines(day)
}

(async function run () {
  const test = false
  const input = await getInput(test)
  console.time('part 1 duration')
  const answerOne = partOne(input)
  console.timeEnd('part 1 duration')
  const expectedOne = 69177
  console.log(
    `part 1 answers. expected: ${expectedOne}, actual: ${answerOne}.`
  )
  assert.equal(answerOne, expectedOne)

  console.time('part 2 duration')
  const answerTwo = partTwo(input)
  console.timeEnd('part 2 duration')
  const expectedTwo = 207456
  console.log(
    `part 2 answers. expected: ${expectedTwo}, actual: ${answerTwo}.`
  )
  assert.equal(answerTwo, expectedTwo)
})()

function sortElves (input) {
  const elves = []
  let i = 0
  input.forEach((x) => {
    if (x) {
      const val = elves[i]
      if (val) {
        elves[i] += parseInt(x)
      } else {
        elves.push(parseInt(x))
      }
    } else {
      i++
    }
  })

  elves.sort((a, b) => a - b)
  return elves
}

function partOne (input) {
  return sortElves(input).pop()
}

function partTwo (input) {
  const elves = sortElves(input)
  return elves.pop() + elves.pop() + elves.pop()
}
