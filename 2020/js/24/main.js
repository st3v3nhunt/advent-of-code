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
  const expectedTwo = 4200
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
    if (color) {
      tiles.set(key, false)
    } else {
      tiles.set(key, true)
    }
  }
  return tiles
}

function countActiveTiles (tiles) {
  let activeTileCount = 0
  tiles.forEach((v, k) => {
    if (v) {
      activeTileCount++
    }
  })
  return activeTileCount
}

function partOne (input) {
  const directions = getDirections(input)

  const tiles = move(directions)

  return countActiveTiles(tiles)
}

function getAdjKeys (k) {
  const coord = k.split(',').map(Number)

  const adj = []
  adj.push([coord[0] + 1, coord[1]].join(','))
  adj.push([coord[0] - 1, coord[1]].join(','))
  adj.push([coord[0], coord[1] - 1].join(','))
  adj.push([coord[0] - 1, coord[1] - 1].join(','))
  adj.push([coord[0], coord[1] + 1].join(','))
  adj.push([coord[0] + 1, coord[1] + 1].join(','))
  return adj
}

function getUpdates (tiles) {
  const tileUpdates = new Map()

  tiles.forEach((v, k) => {
    let activeTileCount = 0
    getAdjKeys(k).forEach(adj => {
      activeTileCount += tiles.get(adj) ? 1 : 0
    })

    if (v && (activeTileCount === 0 || activeTileCount > 2)) {
      tileUpdates.set(k, false)
    } else if (!v && activeTileCount === 2) {
      tileUpdates.set(k, true)
    }
  })
  return tileUpdates
}

function partTwo (input) {
  const directions = getDirections(input)

  const tiles = move(directions)
  // init inactive tiles for ease of adjacent calcs
  const size = 70 // lowest size required for 100 iterations to grow into
  for (let i = -size; i < size; i++) {
    for (let j = -size; j < size; j++) {
      const coord = `${i},${j}`
      if (!tiles.has(coord)) {
        tiles.set(coord, false)
      }
    }
  }

  for (let i = 0; i < 100; i++) {
    const tileUpdates = getUpdates(tiles)
    tileUpdates.forEach((v, k) => {
      tiles.set(k, v)
    })
    console.log(`Day ${i + 1}: ${countActiveTiles(tiles)}`)
  }
  return countActiveTiles(tiles)
}
