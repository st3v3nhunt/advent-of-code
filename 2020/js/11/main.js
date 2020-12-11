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
        mutatingLayout[i] = mutateSeats(mutatingLayout[i], j, occSeatCount, 3)
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

function partTwo (input) {
  const len = input.length
  let loop = true

  // initially all seats are filled?!?!?
  let layout = input.map(line => line.replace(/L/g, '#'))
  console.log(layout)
  let count = 1
  let curSeatCount = 0
  const rowLen = layout[0].length

  while (loop) {
    console.log(layout)
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
          // const topRow = layout[i - 1]
          if (j > 0) { // only count when not at left edge
            let itl = i - 1
            let jtl = j - 1
            let topLeft = layout[itl][jtl]
            while (jtl > 0 && itl > 0 && topLeft === '.') {
              itl--
              jtl--
              topLeft = layout[itl][jtl]
            }
            seats += topLeft
          }
          let it = i - 1
          let top = layout[it][j]
          while (it > 0 && top === '.') {
            it--
            top = layout[it][j]
          }
          seats += top
          if (j < rowLen) {
            let itr = i - 1
            let jtr = j + 1
            let topRight = layout[itr][jtr]
            while (itr > 0 && jtr < rowLen && topRight === '.') {
              itr--
              jtr++
              topRight = layout[itr][jtr]
            }
            seats += topRight
          }
        }

        const currentRow = layout[i]
        if (j > 0) { // left seat
          let jl = j - 1
          let left = currentRow[jl]
          while (jl > 0 && left === '.') {
            jl--
            left = currentRow[jl]
          }
          seats += left
        }
        if (j < rowLen) { // right seat
          let jr = j + 1
          let right = currentRow[jr]
          while (jr < rowLen && right === '.') {
            jr++
            right = currentRow[jr]
          }
          // const right = currentRow[j + 1]
          // if right is floor (.) move until not floor or end of row
          seats += right
        }

        if (i < len - 1) { // bottom row only when available
          if (j > 0) { // only count when not at right edge
            let ibl = i + 1
            let jbl = j - 1
            let bottomLeft = layout[ibl][jbl]
            while (ibl < len - 1 && jbl > 0 && bottomLeft === '.') {
              ibl++
              jbl--
              bottomLeft = layout[ibl][jbl]
            }
            seats += bottomLeft
          }
          let ib = i + 1
          let bottom = layout[ib][j]
          while (ib < len - 1 && bottom === '.') {
            ib++
            bottom = layout[ib][j]
          }
          seats += bottom
          if (j < rowLen) {
            let ibr = i + 1
            let jbr = j + 1
            let bottomRight = layout[ibr][jbr]
            while (ibr < len - 1 && jbr < rowLen && bottomRight === '.') {
              ibr++
              jbr++
              bottomRight = layout[ibr][jbr]
            }
            seats += bottomRight
          }
        }
        const occSeatCount = (seats.match(/#/g) ?? []).length

        // const aboveSeats = i > 0 ? layout[i - 1].slice(j > 0 ? j - 1 : 0, j < rowLen - 1 ? j + 2 : rowLen) : ''
        // const belowSeats = i < len - 1 ? layout[i + 1].slice(j > 0 ? j - 1 : 0, j < rowLen - 1 ? j + 2 : rowLen) : ''
        // const leftSeat = j > 0 ? layout[i][j - 1] : ''
        // const rightSeat = j < rowLen ? layout[i][j + 1] : ''
        // const occSeatCount = (`${aboveSeats}${belowSeats}${leftSeat}${rightSeat}`.match(/#/g) ?? []).length

        // MUTATE SEATS
        mutatingLayout[i] = mutateSeats(mutatingLayout[i], j, occSeatCount, 4)
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
  // console.time('part 1 duration')
  // const answerOne = partOne(input)
  // console.timeEnd('part 1 duration')
  // const expectedOne = 2164
  // console.log(`part 1 answers. expected: ${expectedOne}, actual: ${answerOne}.`)
  // assert.equal(answerOne, expectedOne)

  console.time('part 2 duration')
  const answerTwo = partTwo(input)
  console.timeEnd('part 2 duration')
  const expectedTwo = 1974
  console.log(`part 2 answers. expected: ${expectedTwo}, actual: ${answerTwo}.`)
  assert.equal(answerTwo, expectedTwo)
}())
