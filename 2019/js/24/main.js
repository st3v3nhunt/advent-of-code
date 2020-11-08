const path = require('path')
const { getInputAsLines } = require('../lib/utils')

async function getInput (filename) {
  const inputPath = path.join(__dirname, `./${filename}.txt`)
  return getInputAsLines(inputPath)
}

function drawGrid (grid) {
  console.log('-'.repeat(5))
  grid.forEach((x) => console.log(x.join('')))
}

function calcBugs (grid, y, x) {
  // referencing location in array that doesn't exist returns undefined
  let [r, l, u, d] = [0, 0, 0, 0]
  if (y >= 0 || y < grid.length) {
    r = grid[y][x + 1] === '#' ? 1 : 0
    l = grid[y][x - 1] === '#' ? 1 : 0
  }
  if (y - 1 >= 0) {
    u = grid[y - 1][x] === '#' ? 1 : 0
  }
  if (y + 1 < grid.length) {
    d = grid[y + 1][x] === '#' ? 1 : 0
  }

  return r + l + u + d
}

function part1 (input) {
  let grid = input.reduce((acc, cur) => {
    acc.push(cur.split(''))
    return acc
  }, [])

  const gridSigs = []
  gridSigs.push(grid.flat().join(''))
  while (true) {
    drawGrid(grid)
    const newGrid = []
    grid.forEach(() => newGrid.push([]))
    for (let i = 0; i < input.length; i++) {
      for (let j = 0; j < input.length; j++) {
        const adjacentBugs = calcBugs(grid, i, j)
        const currentState = grid[i][j]
        let newState
        switch (adjacentBugs) {
          case 1:
            newState = '#'
            break
          case 2:
            newState = currentState === '.' ? '#' : '.'
            break
          case 0:
          case 3:
          case 4:
            newState = '.'
            break
          default:
            throw new Error(`Unknow number of adjacent bugs: ${adjacentBugs}`)
        }
        newGrid[i][j] = newState
      }
    }
    const gridSig = newGrid.flat().join('')
    if (gridSigs.includes(gridSig)) {
      gridSigs.push(gridSig)
      drawGrid(newGrid)
      break
    } else {
      gridSigs.push(gridSig)
      grid = newGrid.map((x) => [...x])
    }
  }

  const [gridSig] = gridSigs.slice(-1)
  console.log(`Gridsig length: ${gridSig.length}. Content: '${gridSig}'`)
  return gridSig.split('').reduce((acc, cur, idx) => (cur === '#' ? acc + (2 ** idx) : acc), 0)
}

function part2 (input) {
  return 'PENDING...'
}

async function answers () {
  const filename = 'input'
  // const filename = 'test1';
  const input = (await getInput(filename))
  console.log(input)
  return {
    part1: part1(input),
    part2: part2(input)
  }
}

module.exports = {
  answers
}
