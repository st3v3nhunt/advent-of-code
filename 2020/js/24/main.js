const assert = require('assert')
const { getDayInputAsLines } = require('../lib/utils')

async function getInput () {
  return getDayInputAsLines(24)
}

(async function run () {
  const input = await getInput()
  console.time('part 1 duration')
  const answerOne = partOne(input)
  console.timeEnd('part 1 duration')
  const expectedOne = 528
  console.log(`part 1 answers. expected: ${expectedOne}, actual: ${answerOne}.`)
  assert.equal(answerOne, expectedOne)

  console.time('part 2 duration')
  const answerTwo = partTwo(input)
  console.timeEnd('part 2 duration')
  const expectedTwo = 0
  console.log(`part 2 answers. expected: ${expectedTwo}, actual: ${answerTwo}.`)
  assert.equal(answerTwo, expectedTwo)
}())

function getDirections (input) {
  const directions = []
  for (let i = 0; i < input.length; i++) {
    const line = input[i]
    const lds = []
    for (let j = 0; j < line.length; j++) {
      const d = line.slice(j, j + 2)

      if (/(se|sw|nw|ne)/.test(d)) {
        lds.push(d)
        j++
      } else if (/(e|w)/.test(d)) {
        lds.push(d[0])
      }
    }
    directions.push(lds)
  }
  return directions
}

function move (directions) {
  const tiles = new Map() // loc, color : string, bool
  for (let i = 0; i < directions.length; i++) {
    const moves = directions[i]
    const coords = [0, 0]
    for (let j = 0; j < moves.length; j++) {
      const move = moves[j]
      if (move === 'e') {
        coords[0] += 1
      } else if (move === 'w') {
        coords[0] -= 1
      } else if (move === 'se') {
        coords[1] -= 1
      } else if (move === 'sw') {
        coords[0] -= 1
        coords[1] -= 1
      } else if (move === 'nw') {
        coords[1] += 1
      } else if (move === 'ne') {
        coords[0] += 1
        coords[1] += 1
      }
    }
    const key = coords.join(',')
    const color = tiles.get(key)
    if (color === undefined || color === false) {
      tiles.set(key, true)
    } else {
      tiles.set(key, false)
    }
  }
  return tiles
}

function countBlackTiles (tiles) {
  let blackTileCount = 0
  tiles.forEach((v, k) => {
    if (v === true) {
      blackTileCount++
    }
  })
  return blackTileCount
}

function partOne (input) {
  const directions = getDirections(input)

  const tiles = move(directions)

  return countBlackTiles(tiles)
}

function partTwo (input) {
  return input.length
}
