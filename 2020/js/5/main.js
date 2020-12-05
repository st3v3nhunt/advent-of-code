const assert = require('assert')
const { getDayInputAsLines } = require('../lib/utils')

async function getInput () {
  return getDayInputAsLines(5)
}

function decodeRow (raw) {
  const binary = []
  for (const c of raw) {
    if (c === 'B') {
      binary.push('1')
    } else {
      binary.push('0')
    }
  }
  return parseInt(binary.join(''), 2)
}

function decodeSeat (raw) {
  const binary = []
  for (const c of raw) {
    if (c === 'R') {
      binary.push('1')
    } else {
      binary.push('0')
    }
  }
  return parseInt(binary.join(''), 2)
}

function decodeSeatIds (input) {
  return input.map((line) => {
    const rawRow = line.slice(0, 7)
    const rawSeat = line.slice(7)
    const decodedRow = decodeRow(rawRow)
    const decodedSeat = decodeSeat(rawSeat)
    return decodedRow * 8 + decodedSeat
  })
}

async function partOne () {
  const input = await getInput()

  const seatIds = decodeSeatIds(input)
  const maxSeatId = Math.max(...seatIds)

  console.log('part 1 answer:', maxSeatId)
  assert.equal(maxSeatId, 828)
}

async function partTwo () {
  const input = await getInput()

  const seatIds = decodeSeatIds(input)
  const sortedSeats = seatIds.sort((a, b) => a - b)

  let seatId = 0
  for (let i = 0; i < sortedSeats.length - 1; i++) {
    const cur = sortedSeats[i]
    const next = sortedSeats[i + 1]
    if (cur + 1 !== next) {
      seatId = cur + 1
      break
    }
  }

  console.log('part 2 answer:', seatId)
  assert.equal(seatId, 565)
}

(async function run () {
  await partOne()
  await partTwo()
}())
