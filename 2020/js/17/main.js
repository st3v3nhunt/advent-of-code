const assert = require('assert')
const { getDayInputAsLines } = require('../lib/utils')

async function getInput () {
  return getDayInputAsLines(17)
}

(async function run () {
  const input = await getInput()
  console.time('part 1 duration')
  const answerOne = partOne(input)
  console.timeEnd('part 1 duration')
  const expectedOne = 401
  console.log(`part 1 answers. expected: ${expectedOne}, actual: ${answerOne}.`)
  assert.equal(answerOne, expectedOne)

  console.time('part 2 duration')
  const answerTwo = partTwo(input)
  console.timeEnd('part 2 duration')
  const expectedTwo = 2224
  console.log(`part 2 answers. expected: ${expectedTwo}, actual: ${answerTwo}.`)
  assert.equal(answerTwo, expectedTwo)
}())

function partOne (input) {
  const inputSize = input.length
  const iterationCount = 6
  const size = 2 * (iterationCount + 1) + inputSize
  const grid = createEmptyGrid(size)

  addInitialLayer(grid, input, iterationCount)

  for (let n = 0; n < iterationCount; n++) {
    const mutations = {}
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        for (let k = 0; k < size; k++) {
          const coord = `${i},${j},${k}`
          let activeCount = 0
          let count = -1
          while (count < 2) {
            const layer = i + count
            if (layer >= 0 && layer < size) {
              if (j - 1 >= 0) { // top row
                const top = grid[layer][j - 1].slice(k - 1 < 0 ? 0 : k - 1, k + 1 >= size ? size + 1 : k + 1 + 1)
                activeCount += top.reduce((acc, cur) => cur === '#' ? acc + 1 : acc, 0)
              }
              // middle row
              const mid = grid[layer][j].slice(k - 1 < 0 ? 0 : k - 1, k + 1 >= size ? size + 1 : k + 1 + 1)
              activeCount += mid.reduce((acc, cur) => cur === '#' ? acc + 1 : acc, 0)
              if (j + 1 < size) { // bottom row
                const bot = grid[layer][j + 1].slice(k - 1 < 0 ? 0 : k - 1, k + 1 >= size ? size + 1 : k + 1 + 1)
                activeCount += bot.reduce((acc, cur) => cur === '#' ? acc + 1 : acc, 0)
              }
            }
            count++
          }
          const cube = grid[i][j][k]
          // subtract from count if middle item is '#'
          const nbActiveCount = cube === '#' ? activeCount - 1 : activeCount
          // mutate based on the active count
          if (cube === '#') {
            if (nbActiveCount !== 2 && nbActiveCount !== 3) {
              mutations[coord] = '.'
            }
          } else if (cube === '.' && nbActiveCount === 3) {
            mutations[coord] = '#'
          }
        }
      }
    }
    // mutate
    for (const [key, v] of Object.entries(mutations)) {
      const [i, j, k] = key.split(',').map(Number)
      grid[i][j][k] = v
    }
  }
  return countActiveCells(grid)
}

function partTwo (input) {
  const inputSize = input.length
  const iterationCount = 6
  const size = 2 * (iterationCount + 2) + inputSize
  const grid = createEmpty4dGrid(size)

  addInitialLayer4d(grid, input, iterationCount)

  for (let n = 0; n < iterationCount; n++) {
    const mutations = {} // Map is marginally slower than a plain object!
    for (let i = 0; i < size; i++) {
      for (let n = 0; n < size; n++) {
        for (let j = 0; j < size; j++) {
          for (let k = 0; k < size; k++) {
            const coord = `${i},${n},${j},${k}`
            let activeCount = 0
            let iCount = -1
            while (iCount < 2) {
              const iLayer = i + iCount
              if (iLayer >= 0 && iLayer < size) {
                let nCount = -1
                while (nCount < 2) {
                  const nLayer = n + nCount
                  if (nLayer >= 0 && nLayer < size) {
                    if (j - 1 >= 0) { // top row
                      const top = grid[iLayer][nLayer][j - 1].slice(k - 1 < 0 ? 0 : k - 1, k + 1 >= size ? size + 1 : k + 1 + 1)
                      activeCount += top.reduce((acc, cur) => cur === '#' ? acc + 1 : acc, 0)
                    }
                    // middle row
                    const mid = grid[iLayer][nLayer][j].slice(k - 1 < 0 ? 0 : k - 1, k + 1 >= size ? size + 1 : k + 1 + 1)
                    activeCount += mid.reduce((acc, cur) => cur === '#' ? acc + 1 : acc, 0)
                    if (j + 1 < size) { // bottom row
                      const bot = grid[iLayer][nLayer][j + 1].slice(k - 1 < 0 ? 0 : k - 1, k + 1 >= size ? size + 1 : k + 1 + 1)
                      activeCount += bot.reduce((acc, cur) => cur === '#' ? acc + 1 : acc, 0)
                    }
                  }
                  nCount++
                }
              }
              iCount++
            }
            const cube = grid[i][n][j][k]
            // subtract from count if middle item is '#'
            const nbActiveCount = cube === '#' ? activeCount - 1 : activeCount
            if (cube === '#') {
              if (nbActiveCount !== 2 && nbActiveCount !== 3) {
                mutations[coord] = '.'
              }
            } else if (cube === '.' && nbActiveCount === 3) {
              mutations[coord] = '#'
            }
          }
        }
      }
    }
    // mutate
    for (const [key, v] of Object.entries(mutations)) {
      const [i, n, j, k] = key.split(',').map(Number)
      grid[i][n][j][k] = v
    }
  }
  return countActiveCells4d(grid)
}

function addInitialLayer4d (grid, input, iterationCount) {
  const inputSize = input.length
  const size = 2 * (iterationCount + 1) + inputSize
  const midLayerIndex = Math.floor(size / 2)
  for (let i = 0; i < inputSize; i++) {
    for (let j = 0; j < inputSize; j++) {
      grid[midLayerIndex][midLayerIndex][i + midLayerIndex - 1][j + midLayerIndex - 1] = input[i][j]
    }
  }
}

function addInitialLayer (grid, input, iterationCount) {
  const inputSize = input.length
  const size = 2 * iterationCount + inputSize
  const midLayerIndex = Math.floor(size / 2)
  for (let i = 0; i < inputSize; i++) {
    for (let j = 0; j < inputSize; j++) {
      grid[midLayerIndex][i + midLayerIndex - 1][j + midLayerIndex - 1] = input[i][j]
    }
  }
}

function createEmptyGrid (size) {
  const grid = []
  for (let i = 0; i < size; i++) {
    const layer = []
    for (let j = 0; j < size; j++) {
      layer.push([...'.'.repeat(size).split('')])
    }
    grid.push([...layer])
  }
  return grid
}

function countActiveCells (grid) {
  const size = grid.length
  let activeCount = 0
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      for (let k = 0; k < size; k++) {
        if (grid[i][j][k] === '#') {
          activeCount++
        }
      }
    }
  }
  return activeCount
}

function createEmpty4dGrid (size) {
  const hgrid = []
  for (let n = 0; n < size; n++) {
    const grid = []
    for (let i = 0; i < size; i++) {
      const layer = []
      for (let j = 0; j < size; j++) {
        layer.push([...'.'.repeat(size).split('')])
      }
      grid.push([...layer])
    }
    hgrid.push([...grid])
  }
  return hgrid
}

function countActiveCells4d (grid) {
  const size = grid.length
  let activeCount = 0
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      for (let k = 0; k < size; k++) {
        for (let n = 0; n < size; n++) {
          if (grid[i][j][k][n] === '#') {
            activeCount++
          }
        }
      }
    }
  }
  return activeCount
}
