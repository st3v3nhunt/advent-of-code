const assert = require('assert')
const { getDayInputAsLines } = require('../lib/utils')

async function getInput () {
  return getDayInputAsLines(12)
}

function partOne (input) {
  const pos = [0, 0]
  let deg = 90

  input.forEach(move => {
    let dir
    const action = move.slice(0, 1)
    const val = Number(move.slice(1))
    // console.log('pos, dir', pos, deg)
    // console.log(action, val)

    switch (action) {
      case 'N':
        pos[1] += val
        break
      case 'S':
        pos[1] -= val
        break
      case 'E':
        pos[0] += val
        break
      case 'W':
        pos[0] -= val
        break
      case 'L':
        deg -= val
        break
      case 'R':
        deg += val
        break
      case 'F':
        dir = deg % 360
        if (dir === 90 || dir === -270) {
          pos[0] += val
        } else if (dir === -90 || dir === 270) {
          pos[0] -= val
        } else if (dir === 180 || dir === -180) {
          pos[1] -= val
        } else if (dir === 0) {
          pos[1] += val
        } else {
          Error(`Unknown dir: ${dir}, deg: ${deg}`)
        }
        break
      default:
        Error(`Unknown instruction ${move}`)
    }
  })
  console.log('Final coordinates', pos)
  return Math.abs(pos[0]) + Math.abs(pos[1])
}

function partTwo (input) {
  let wp = [10, 1]
  const pos = [0, 0]

  input.forEach(move => {
    const action = move.slice(0, 1)
    const val = Number(move.slice(1))
    // console.log('pos, wp', pos, wp)
    // console.log(action, val)

    switch (action) {
      case 'N':
        wp[1] += val
        break
      case 'S':
        wp[1] -= val
        break
      case 'E':
        wp[0] += val
        break
      case 'W':
        wp[0] -= val
        break
      case 'L':
        wp = rotateLeft(wp, val)
        break
      case 'R':
        wp = rotateRight(wp, val)
        break
      case 'F':
        pos[0] += wp[0] * val
        pos[1] += wp[1] * val
        break
      default:
        Error(`Unknown instruction ${move}`)
    }
  })
  console.log('Final coordinates', pos)
  return Math.abs(pos[0]) + Math.abs(pos[1])
}

function rotateLeft (wp, val) {
  const dir = val % 360

  if (dir === 90 || dir === -270) {
    return [wp[1] * -1, wp[0]]
  } else if (dir === -90 || dir === 270) {
    return [wp[1], wp[0] * -1]
  } else if (dir === 180 || dir === -180) {
    return [wp[0] * -1, wp[1] * -1]
  }
  Error('Unable to rotateLeft')
}

function rotateRight (wp, val) {
  const dir = val % 360

  if (dir === 90 || dir === -270) {
    return [wp[1], wp[0] * -1]
  } else if (dir === -90 || dir === 270) {
    return [wp[1] * -1, wp[0]]
  } else if (dir === 180 || dir === -180) {
    return [wp[0] * -1, wp[1] * -1]
  }
  Error('Unable to rotateRight')
}

(async function run () {
  const input = await getInput()
  console.time('part 1 duration')
  const answerOne = partOne(input)
  console.timeEnd('part 1 duration')
  const expectedOne = 938
  console.log(`part 1 answers. expected: ${expectedOne}, actual: ${answerOne}.`)
  assert.equal(answerOne, expectedOne)

  console.time('part 2 duration')
  const answerTwo = partTwo(input)
  console.timeEnd('part 2 duration')
  const expectedTwo = 54404
  console.log(`part 2 answers. expected: ${expectedTwo}, actual: ${answerTwo}.`)
  assert.equal(answerTwo, expectedTwo)
}())
