const assert = require('assert')
const { getDayInputAsLines } = require('../lib/utils')

async function getInput () {
  return getDayInputAsLines(11)
}

function partOne (input) {
  const len = input.length
  let loop = true

  // initially all seats are filled?!?!?
  let layout = input.map(line => line.replace(/L/g, '#'))
  console.log(layout)
  let count = 1
  let curSeatCount = 0
  const rowLen = layout[0].length

  while (loop) {
    const mutatingLayout = [...layout]
    for (let i = 0; i < len; i++) {
      for (let j = 0; j < rowLen; j++) {
        const chair = layout[i][j]

        if (chair === '.') {
          continue
        }
        // COUNT SEATS
        const aboveSeats = i > 0 ? layout[i - 1].slice(j > 0 ? j - 1 : 0, j < rowLen - 1 ? j + 2 : rowLen) : ''
        const belowSeats = i < len - 1 ? layout[i + 1].slice(j > 0 ? j - 1 : 0, j < rowLen - 1 ? j + 2 : rowLen) : ''
        const leftSeat = j > 0 ? layout[i][j - 1] : ''
        const rightSeat = j < rowLen ? layout[i][j + 1] : ''
        const occSeatCount = (`${aboveSeats}${belowSeats}${leftSeat}${rightSeat}`.match(/#/g) ?? []).length

        // MUTATE SEATS
        const seat = mutatingLayout[i][j]
        const mutRow = mutatingLayout[i]
        if (seat === 'L' && occSeatCount === 0) {
          const arr = mutRow.split('')
          arr.splice(j, 1, '#')
          mutatingLayout[i] = arr.join('')
        } else if (seat === '#' && occSeatCount > 3) {
          const arr = mutRow.split('')
          arr.splice(j, 1, 'L')
          mutatingLayout[i] = arr.join('')
        }
      }
    }
    const prevSeatCount = curSeatCount
    curSeatCount = countOccuSeats(mutatingLayout)
    count++
    if (curSeatCount === prevSeatCount) {
      loop = false
    }
    layout = [...mutatingLayout]
  }
  console.log('iteration: ', count)

  return curSeatCount
}

function countOccuSeats (arr) {
  return arr.reduce((acc, cur) => {
    return acc + (cur.match(/#/g) ?? []).length
  }, 0)
}

function partTwo (input) {
  return input.length
}

(async function run () {
  const input = await getInput()
  console.time('part 1 duration')
  const answerOne = partOne(input)
  console.timeEnd('part 1 duration')
  const expectedOne = 2164
  console.log(`part 1 answers. expected: ${expectedOne}, actual: ${answerOne}.`)
  assert.equal(answerOne, expectedOne)

  console.time('part 2 duration')
  const answerTwo = partTwo(input)
  console.timeEnd('part 2 duration')
  const expectedTwo = 0
  console.log(`part 2 answers. expected: ${expectedTwo}, actual: ${answerTwo}.`)
  assert.equal(answerTwo, expectedTwo)
}())
