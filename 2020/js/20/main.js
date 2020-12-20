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
  // each tile needs to be rotated and flipped to cover all translations
  const inputTiles = new Map()
  let num
  let tile = []
  for (let i = 0; i < input.length; i++) {
    const line = input[i]
    if (line === '') {
      continue
    } else if (line.startsWith('Tile')) {
      num = Number(line.split(' ')[1].split(':')[0])
    } else { // tile input
      tile.push(line)
      if ((i - (inputTiles.size * 2)) % 10 === 0) {
        inputTiles.set(num, tile)
        tile = []
      }
    }
  }
  // console.log(inputTiles)
  console.log('inputTiles.size:', inputTiles.size)
  // do the translations. 8 in total. rotate and then either h flip or v flip
  const tts = createTranslations(inputTiles)
  console.log(tts)
  console.log('inputTiles.size:', tts.size)

  const borders = getBorders(tts)
  console.log('borders:', borders)
  console.log('borders.size:', borders.size)
  // figure out which borders match other tiles.
  // every tile has 4 borders, there are 8 tiles so 32 possible borders
  // create map with borders as the key, value is the tile number
  // go through all borders and add value if a match. With that map, take the
  // entries with there should be 4 that have a length of 2. These are the corners?!?!?

  const tilesAndEdges = getTilesAndEdges(borders)
  console.log('tilesAndEdges', tilesAndEdges)
  const corners = getCorners(tilesAndEdges)
  console.log('corners', corners)
  const ans = corners.reduce((acc, cur) => acc * cur, 1)
  // find a tile that has 2 borders wi
  // find arrangement
  return ans
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
      console.log(tileIds)
    }
  })
  return corners
}

// returns a map of all borders (as the key) and the tile(s) each border belongs too
function getBorders (inputTiles) {
  const borders = new Map()
  inputTiles.forEach((tileTranslationMap, tileMapId) => {
    tileTranslationMap.forEach((tileTranslation, tileId) => {
      const tileBorders = []
      // console.log(tile.length, tileId, tiles.length, tile, tile[0])
      const len = tileTranslation.length - 1
      tileBorders.push('h' + tileTranslation[0])
      tileBorders.push('h' + tileTranslation[len])

      // tileBorders.set(tileTranslation[0], tileId)
      // tileBorders.set(tileTranslation[len], tileId)
      const left = []
      const right = []
      for (let i = 0; i <= len; i++) {
        left.push(tileTranslation[0][i])
        right.push(tileTranslation[len][i])
      }
      tileBorders.push('v' + left.join(''))
      tileBorders.push('v' + right.join(''))
      // tileBorders.set(left.join(''), tileId)
      // tileBorders.set(right.join(''), tileId)
      tileBorders.forEach(x => {
        if (borders.has(x)) {
          borders.get(x).add(tileMapId)
        } else {
          borders.set(x, new Set([tileMapId]))
        }
      })
      // console.log(tileBorders)
    })
    // borders.set(tileId, tileBorders)
  })
  return borders
}

function createTranslations (tiles) {
  const tts = new Map() // tile translations
  tiles.forEach((tile0, tileId) => {
    // TODO: push into array rather than having the intermeditate var
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
    tts.set(tileId, translations)
  })
  return tts
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

function partTwo (input) {
  return input.length
}
