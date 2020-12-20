const assert = require('assert')
const { getDayInputAsLines } = require('../lib/utils')

async function getInput () {
  return getDayInputAsLines(20)
}

(async function run () {
  const input = await getInput()
  console.time('part 1 duration')
  const answerOne = partOne(input)
  console.timeEnd('part 1 duration')
  const expectedOne = 17148689442341
  console.log(`part 1 answers. expected: ${expectedOne}, actual: ${answerOne}.`)
  assert.equal(answerOne, expectedOne)

  console.time('part 2 duration')
  const answerTwo = partTwo(input)
  console.timeEnd('part 2 duration')
  const expectedTwo = 0
  console.log(`part 2 answers. expected: ${expectedTwo}, actual: ${answerTwo}.`)
  assert.equal(answerTwo, expectedTwo)
}())

function partOne (input) {
  const tilesAndEdges = processInputIntoTiles(input)
  const corners = getCorners(tilesAndEdges)
  return corners.reduce((acc, cur) => acc * cur, 1)
}

function partTwo (input) {
  return input.length
}

function processInputIntoTiles (input) {
  const inputTiles = transformInputToTiles(input)
  const tileTranslations = createTranslations(inputTiles)
  const borders = getBorders(tileTranslations)
  return getTilesAndEdges(borders)
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
  const corners = new Map()
  borders.forEach((tileIdsSet, border) => {
    const tileIds = [...tileIdsSet]
    const len = tileIds.length
    if (len === 2) {
      for (let i = 0; i < len; i++) {
        const k = tileIds[i]
        const val = tileIds[1 - i]
        if (corners.has(k)) {
          corners.get(k).add(val)
        } else {
          corners.set(k, new Set([val]))
        }
      }
    }
  })
  console.log('tiles in image:', corners.size)
  return corners
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

function getCorners (tilesAndEdges) {
  const cornerTileIds = []
  tilesAndEdges.forEach((v, k) => {
    if (v.size === 2) {
      cornerTileIds.push(k)
    }
  })
  return cornerTileIds
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
