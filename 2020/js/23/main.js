const assert = require('assert')

function run () {
  console.time('part 1 duration')
  const answerOne = partOne()
  console.timeEnd('part 1 duration')
  const expectedOne = 0
  console.log(`part 1 answers. expected: ${expectedOne}, actual: ${answerOne}.`)
  assert.equal(answerOne, expectedOne)

  console.time('part 2 duration')
  const answerTwo = partTwo()
  console.timeEnd('part 2 duration')
  const expectedTwo = 0
  console.log(`part 2 answers. expected: ${expectedTwo}, actual: ${answerTwo}.`)
  assert.equal(answerTwo, expectedTwo)
}
run()

function partOne () {
  const input = '284573961'
  const cups = input.split('').map(Number)
  let cur = cups[0]
  const moves = 100
  const cupCount = cups.length
  let i = 0
  const takeSize = 3
  const lowestCup = cups.reduce((acc, cur) => acc < cur ? acc : cur, Number(input))
  const highestCup = cups.reduce((acc, cur) => acc > cur ? acc : cur, 0)
  console.log(lowestCup, '************', highestCup)

  while (i < moves) {
    console.log('move', i + 1, 'cups', cups.join(','), 'cur', cur)
    // take cups
    const takenCups = []
    let ccIndex = cups.indexOf(cur)
    if (ccIndex + takeSize < cupCount) { // enough cups available for a take)
      takenCups.push(...cups.splice(ccIndex + 1, 3))
    } else { // need to wrap to start
      const availableCupCount = (cupCount - 1) - ccIndex
      takenCups.push(...cups.splice(ccIndex + 1, availableCupCount))
      takenCups.push(...cups.splice(0, takeSize - availableCupCount))
    }
    console.log('taken', takenCups.join(','))

    // add to destination
    let dest = cur - 1
    let destFound = false
    console.log('dest', dest, 'low', lowestCup)
    while (!destFound) {
      if (dest < lowestCup) {
        dest = highestCup
      }
      if (takenCups.includes(dest)) {
        dest--
      } else {
        console.log('dest found')
        destFound = true
      }
    }

    // add cups
    const dcIndex = cups.indexOf(dest)
    console.log('dcIndex', dcIndex, 'dest', dest)
    cups.splice(dcIndex + 1, 0, ...takenCups)

    // new cur
    ccIndex = cups.indexOf(cur)
    if (ccIndex + 1 === cupCount) { // cur at end
      cur = cups[0]
    } else {
      cur = cups[ccIndex + 1]
    }
    i++
  }

  // collect cups
  const oneIndex = cups.indexOf(1)
  const finalCups = cups.splice(oneIndex + 1)
  // remove 1
  cups.pop()
  console.log('cups', cups)
  const final = finalCups.concat(...cups)
  console.log('finalCups', final)

  const ans = final.join('')
  return ans
}

function partTwo (input) {
  return input.length
}
