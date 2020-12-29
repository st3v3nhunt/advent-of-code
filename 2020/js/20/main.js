const assert = require('assert')
const { getDayInputAsLines } = require('../lib/utils')

async function getInput () {
  return getDayInputAsLines(20)
}

(async function run () {
  const input = await getInput()
  // console.time('part 1 duration')
  // const answerOne = partOne(input)
  // console.timeEnd('part 1 duration')
  // const expectedOne = 17148689442341
  // console.log(`part 1 answers. expected: ${expectedOne}, actual: ${answerOne}.`)
  // assert.equal(answerOne, expectedOne)

  console.time('part 2 duration')
  const answerTwo = partTwo(input)
  console.timeEnd('part 2 duration')
  const expectedTwo = 0
  console.log(`part 2 answers. expected: ${expectedTwo}, actual: ${answerTwo}.`)
  assert.equal(answerTwo, expectedTwo)
}())

function partOne (input) {
  const inputTiles = transformInputToTiles(input)
  const tileTranslations = createTranslations(inputTiles)
  const borders = getBorders(tileTranslations)
  const tilesAndEdges = getTilesAndEdges(borders)
  const corners = getCorners(tilesAndEdges)
  return [...corners.values()].reduce((acc, cur) => acc * cur, 1)
}

function partTwo (input) {
  const inputTiles = transformInputToTiles(input)
  const tileTranslations = createTranslations(inputTiles)
  const borders = getBorders(tileTranslations)
  const tilesAndEdges = getTilesAndEdges(borders)
  const corners = getCorners(tilesAndEdges)
  const edges = getEdges(tilesAndEdges)
  const centers = getCenters(tilesAndEdges)

  console.log('tilesAndEdges:', tilesAndEdges)
  console.log('corners:', corners)
  console.log('edges:', edges)
  console.log('centers:', centers)

  // const row1 = []
  // const row2 = []
  // start with a corner
  // based on the grid size there are:
  // - 4 corners (always)
  // - (gridSize - 2) edges
  // create the first row based on any corner
  const gridSize = Math.sqrt(inputTiles.size)
  const grid = [...new Array(gridSize)].map(x => [])
  const edgeCount = gridSize - 2

  // take a corner and look up the connectors it has
  // then for as many edges tiles as there are, take one
  // when at the other corner, do the same
  let c1 = corners.values().next().value // get corner - 1951
  const c1cs = tilesAndEdges.get(c1) // find conns - 2311, 2729
  const e1 = c1cs.values().next().value // take a conn - 2311
  c1cs.delete(e1) // remove conn from corner
  const e1cs = tilesAndEdges.get(e1) // get conns of edge - 1427, 1951, 3079
  e1cs.delete(c1) // delete current c1 from list, new list - 1427, 3079
  let cur
  for (const val of e1cs.values()) { // check if any of them are edges
    // if (col !== gridSize) { // if not at edge of grid
    let edgeFound = false
    for (const edge of edges.values()) {
      if (edge === val) {
        cur = tilesAndEdges.get(val) // next tile to lay - 3079
        cur.delete(e1)
        edgeFound = true
        corners.delete(val)
        break
      }
    }
    if (!edgeFound) { // must be a corner!??!
      for (const edge of corners.values()) {
        if (edge === val) {
          cur = tilesAndEdges.get(val) // next tile to lay - 3079
          cur.delete(e1)
          corners.delete(val)
          break
        }
      }
    }
  }

  grid[0].push(c1)
  let row = 0
  while (true) {
    for (let i = 0; i < edgeCount; i++) { // + 1 for the last corner
      const c1conns = tilesAndEdges.get(c1)
      for (const e1 of c1conns.values()) {
        if (edges.delete(e1)) { // got edge
          c1conns.delete(e1)
          grid[row].push(e1)
          c1 = e1
          break
        }
      }
    }
    // find next corner
    const c2 = tilesAndEdges.get(c1)
    for (const corner of c2.values()) {
      if (corners.delete(corner)) {
        c2.delete(corner)
        grid[row].push(corner)
        c1 = corner
        break
      }
    }
    row++
  }

  while (true) {
    const ref = tilesAndEdges.get(c1)
    grid[0].push(c1)
    for (const tile of ref.values()) {
      if (edges.delete(tile)) { // got edge
        grid[0].push(tile) // TODO: change the index of the grid!
        ref.delete(tile) // remove tile ref
        c1 = tile
        break
      } else if (corners.delete(tile)) { // got corner
        grid[0].push(tile) // TODO: change the index of the grid!
        ref.delete(tile) // remove tile ref
        c1 = tile
        break
      }
    }
  }

  corners.delete(c1)
  // can now add the 2 this connects too
  const c1edges = tilesAndEdges.get(c1).values()
  console.log(c1edges)
  const nextEdge = c1edges.next().value
  // get next in row, look in edges
  grid[0].push(nextEdge)
  if (edges.delete(nextEdge)) { // if this is an edge, add it as such
    // moving along the row
  } else if (corners.delete(nextEdge)) {
    // at the corner, need to move to next row
  }
  tilesAndEdges.get(nextEdge)

  const nextCol = c1edges.next().value
  grid[1].push(nextCol)
  // c1 is done now - could remove it

  console.log(grid)
  grid.forEach(x => console.log(x.join(',')))
  // start with a corner i.e. a key with only 2 values
  // work across
  //
  // figure out tile order, must be the specific translation
  // remove borders from tiles
  // stitch together
  // create translations
  // search for monsters
  // calculate the roughness
  return input.length
}

function transformInputToTiles (input) {
  const inputTiles = new Map()
  let tileId
  let tile = []
  for (let i = 0; i < input.length; i++) {
    const line = input[i]
    if (line === '') {
      continue
    } else if (line.startsWith('Tile')) {
      tileId = Number(line.split(' ')[1].split(':')[0])
    } else { // tile input
      tile.push(line)
      if ((i - (inputTiles.size * 2)) % 10 === 0) {
        inputTiles.set(tileId, tile)
        tile = []
      }
    }
  }
  return inputTiles
}

function getTilesAndEdges (borders) {
  const tiles = new Map()
  borders.forEach((tileIdsSet, border) => {
    const tileIds = [...tileIdsSet]
    const len = tileIds.length
    if (len === 2) {
      for (let i = 0; i < len; i++) {
        const k = tileIds[i]
        const val = tileIds[1 - i]
        if (tiles.has(k)) {
          tiles.get(k).add(val)
        } else {
          tiles.set(k, new Set([val]))
        }
      }
    }
  })
  return tiles
}

// returns a map of all borders (as the key) and the tile(s) each border belongs too
function getBorders (inputTiles) {
  const borders = new Map()
  inputTiles.forEach((tileTranslationMap, tileMapId) => {
    tileTranslationMap.forEach((tileTranslation, tileId) => {
      const tileBorders = []
      const len = tileTranslation.length - 1
      tileBorders.push('h' + tileTranslation[0])
      tileBorders.push('h' + tileTranslation[len])

      const left = []
      const right = []
      for (let i = 0; i <= len; i++) {
        left.push(tileTranslation[0][i])
        right.push(tileTranslation[len][i])
      }
      tileBorders.push('v' + left.join(''))
      tileBorders.push('v' + right.join(''))

      tileBorders.forEach(x => {
        if (borders.has(x)) {
          borders.get(x).add(tileMapId)
        } else {
          borders.set(x, new Set([tileMapId]))
        }
      })
    })
  })
  return borders
}

function createTranslations (tiles) {
  const tileTranslations = new Map()
  tiles.forEach((tile0, tileId) => {
    const translations = new Map()
    translations.set(`${tileId}.0`, tile0)
    const tile0Flip = flipHorizontal(tile0)
    translations.set(`${tileId}.1`, tile0Flip)
    const tile90 = rotateRight(tile0)
    translations.set(`${tileId}.2`, tile90)
    const tile90Flip = rotateRight(tile90)
    translations.set(`${tileId}.3`, tile90Flip)
    const tile180 = rotateRight(tile90)
    translations.set(`${tileId}.4`, tile180)
    const tile180Flip = rotateRight(tile180)
    translations.set(`${tileId}.5`, tile180Flip)
    const tile270 = rotateRight(tile180)
    translations.set(`${tileId}.6`, tile270)
    const tile270Flip = rotateRight(tile270)
    translations.set(`${tileId}.7`, tile270Flip)
    tileTranslations.set(tileId, translations)
  })
  return tileTranslations
}

function getCorners (tiles) {
  return getTilesWithConnectedEdges(tiles, 2)
}

function getEdges (tiles) {
  return getTilesWithConnectedEdges(tiles, 3)
}

function getCenters (tiles) {
  return getTilesWithConnectedEdges(tiles, 4)
}

function getTilesWithConnectedEdges (tiles, connections) {
  const tileIds = new Set()
  tiles.forEach((v, k) => {
    if (v.size === connections) {
      tileIds.add(k)
    }
  })
  return tileIds
}

// returns a new array with the contents translated by 90 degrees right
function rotateRight (tile) {
  const len = tile.length
  const temp = [...Array(len)].map(a => Array(a))
  for (let i = 0; i < len; i++) {
    const chars = tile[i].split('')
    for (let j = 0; j < chars.length; j++) {
      temp[j][len - i] = chars[j]
    }
  }
  const out = []
  for (let i = 0; i < temp.length; i++) {
    out[i] = temp[i].join('')
  }
  return out
}

function flipHorizontal (tile) {
  const len = tile.length
  const temp = [...Array(len)].map(a => Array(a))
  const out = []
  for (let i = 0; i < len; i++) {
    const chars = tile[i].split('')
    for (let j = 0; j < chars.length; j++) {
      temp[i][len - j] = chars[j]
    }
    out[i] = temp[i].join('')
  }
  return out
}
