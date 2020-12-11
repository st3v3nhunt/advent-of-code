const assert = require('assert')
const { getDayInputAsLines } = require('../lib/utils')

async function getInput () {
  return getDayInputAsLines(11)
}

function partOne (input) {
  const len = input.length

  // initially all seats are filled?!?!?
  let layout = input.map(line => line.replace(/L/g, '#'))
  // console.log(layout)
  let iteration = 1
  let curSeatCount = 0
  let prevSeatCount = -1
  const rowLen = layout[0].length

  while (curSeatCount !== prevSeatCount) {
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
        const occSeatCount = ((aboveSeats + belowSeats + leftSeat + rightSeat).match(/#/g) ?? []).length

        mutatingLayout[i] = mutateSeats(mutatingLayout[i], j, occSeatCount, 3)
      }
    }
    prevSeatCount = curSeatCount
    curSeatCount = countOccuSeats(mutatingLayout)
    layout = [...mutatingLayout]
    iteration++
  }
  console.log('iteration:', iteration)

  return curSeatCount
}

function partTwo (input) {
  const len = input.length

  // initially all seats are filled?!?!?
  let layout = input.map(line => line.replace(/L/g, '#'))
  let iteration = 1
  let prevSeatCount = -1
  let curSeatCount = 0
  const rowLen = layout[0].length

  while (curSeatCount !== prevSeatCount) {
    // console.log(layout)
    const mutatingLayout = [...layout]
    for (let i = 0; i < len; i++) {
      for (let j = 0; j < rowLen; j++) {
        const chair = layout[i][j]

        if (chair === '.') {
          continue
        }
        let seats = ''
        // COUNT SEATS
        if (i > 0) { // only count seats above when not on the top row
          if (j > 0) { // only count when not at left edge
            let itl = i
            let jtl = j
            let topLeft
            do {
              itl--
              jtl--
              topLeft = layout[itl][jtl]
            } while (jtl > 0 && itl > 0 && topLeft === '.')
            seats += topLeft
          }

          let it = i
          let top
          do {
            it--
            top = layout[it][j]
          } while (it > 0 && top === '.')
          seats += top

          if (j < rowLen) {
            let itr = i
            let jtr = j
            let topRight
            do {
              itr--
              jtr++
              topRight = layout[itr][jtr]
            } while (itr > 0 && jtr < rowLen && topRight === '.')
            seats += topRight
          }
        }

        const currentRow = layout[i]
        if (j > 0) { // left seat
          let jl = j
          let left
          do {
            jl--
            left = currentRow[jl]
          } while (jl > 0 && left === '.')
          seats += left
        }

        if (j < rowLen) { // right seat
          let jr = j
          let right
          do {
            jr++
            right = currentRow[jr]
          } while (jr < rowLen && right === '.')
          seats += right
        }

        if (i < len - 1) { // bottom row only when available
          if (j > 0) { // only count when not at right edge
            let ibl = i
            let jbl = j
            let bottomLeft
            do {
              ibl++
              jbl--
              bottomLeft = layout[ibl][jbl]
            } while (ibl < len - 1 && jbl > 0 && bottomLeft === '.')
            seats += bottomLeft
          }

          let ib = i
          let bottom
          do {
            ib++
            bottom = layout[ib][j]
          } while (ib < len - 1 && bottom === '.')
          seats += bottom

          if (j < rowLen) {
            let ibr = i
            let jbr = j
            let bottomRight
            do {
              ibr++
              jbr++
              bottomRight = layout[ibr][jbr]
            } while (ibr < len - 1 && jbr < rowLen && bottomRight === '.')
            seats += bottomRight
          }
        }
        const occSeatCount = (seats.match(/#/g) ?? []).length

        mutatingLayout[i] = mutateSeats(mutatingLayout[i], j, occSeatCount, 4)
      }
    }
    prevSeatCount = curSeatCount
    curSeatCount = countOccuSeats(mutatingLayout)
    layout = [...mutatingLayout]
    iteration++
  }
  console.log('iteration:', iteration)

  return curSeatCount
}

function mutateSeats (row, j, seatCount, tolerance) {
  const seat = row[j]
  if (seat === 'L' && seatCount === 0) {
    return updateRow(row, j, '#')
  } else if (seat === '#' && seatCount > tolerance) {
    return updateRow(row, j, 'L')
  }
  return row
}

function updateRow (row, j, c) {
  return row.substr(0, j) + c + row.substr(j + 1, row.length)
}

function countOccuSeats (arr) {
  return arr.reduce((acc, cur) => {
    return acc + (cur.match(/#/g) ?? []).length
  }, 0)
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
  const expectedTwo = 1974
  console.log(`part 2 answers. expected: ${expectedTwo}, actual: ${answerTwo}.`)
  assert.equal(answerTwo, expectedTwo)
}())
