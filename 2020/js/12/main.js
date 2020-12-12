const assert = require('assert')
const { getDayInputAsLines } = require('../lib/utils')

async function getInput () {
  return getDayInputAsLines(12)
}

function partOne (input) {
  const pos = [0, 0]
  let deg = 90 // east

  input.forEach(move => {
    console.log('position and dir', pos, deg)
    let dir
    const action = move.slice(0, 1)
    const val = Number(move.slice(1))
    console.log(action, val)

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
        // if (deg >= 0) {
        //   dir = deg % 360
        // } else {
        //   dir = Math.abs(deg % 360)
        // }
        if (dir === 90) {
          pos[0] += val
        } else if (dir === -90) {
          pos[0] -= val
        } else if (dir === 180) {
          pos[1] -= val
        } else if (dir === -180) {
          pos[1] -= val
        } else if (dir === 270) {
          pos[0] -= val
        } else if (dir === -270) {
          pos[0] += val
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
  console.log(pos)
  const ans = Math.abs(pos[0]) + Math.abs(pos[1])
  return ans
}

function partTwo (input) {
  return input.length
}

(async function run () {
  const input = await getInput()
  console.time('part 1 duration')
  const answerOne = partOne(input)
  console.timeEnd('part 1 duration')
  const expectedOne = 0
  console.log(`part 1 answers. expected: ${expectedOne}, actual: ${answerOne}.`)
  assert.equal(answerOne, expectedOne)

  console.time('part 2 duration')
  const answerTwo = partTwo(input)
  console.timeEnd('part 2 duration')
  const expectedTwo = 0
  console.log(`part 2 answers. expected: ${expectedTwo}, actual: ${answerTwo}.`)
  assert.equal(answerTwo, expectedTwo)
}())
