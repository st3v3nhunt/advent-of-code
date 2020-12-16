const assert = require('assert')
const { getDayInputAsLines } = require('../lib/utils')

async function getInput () {
  return getDayInputAsLines(16)
}

(async function run () {
  const input = await getInput()
  console.time('part 1 duration')
  const answerOne = partOne(input)
  console.timeEnd('part 1 duration')
  const expectedOne = 23044
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
  let blanks = 0
  let skip = true
  const missingNearby = []
  const nearby = new Set()
  const valid = new Set()
  for (let i = 0; i < input.length; i++) {
    const line = input[i]
    if (line === '') {
      blanks++
    }
    if (blanks === 0) { // valid vals
      const split = line.split(' ')
      const candidates = []
      candidates.push(split[1].split('-').map(Number))
      candidates.push(split[3].split('-').map(Number))
      // const [r1, r2] = [split[1].split('-').map(Number), split[3].split('-').map(Number)]
      // console.log('candidates:', candidates)
      // console.log(r1, r2)
      candidates.forEach(arr => {
        for (let j = arr[0]; j <= arr[1]; j++) {
          valid.add(j)
        }
      })
      // const [r1l, r1u, r2l, r2u] = [r1.split('-'), r2.split('-')]
      console.log(valid)
    } else if (blanks === 1) { // your ticket
    } else if (blanks === 2) { // nearby tickets
      // skip on
      if (skip) {
        i += 1
        skip = false
      }
      blanks = 4
    } else if (blanks === 4) { // nearby tickets
      const tickets = line.split(',').map(Number)
      console.log('tickets', tickets)
      for (let j = 0; j < tickets.length; j++) {
        const ticket = tickets[j]
        nearby.add(ticket)
        if (!valid.has(ticket)) {
          console.log()
          missingNearby.push(ticket)
        }
      }
    }
  }
  console.log('number missing:', missingNearby.length)
  console.log('missing:', missingNearby)
  return missingNearby.reduce((acc, cur) => acc + cur, 0)
}

function partTwo (input) {
  return input.length
}
