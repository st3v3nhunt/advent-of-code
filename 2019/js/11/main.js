const path = require('path')
const { createGrid, drawGrid, getInputAsLines } = require('../lib/utils')
const { Comp } = require('../lib/intcodeComputerClass')

async function getInput () {
  const inputPath = path.join(__dirname, './input.txt')
  return (await getInputAsLines(inputPath))[0]
}

function painter (program, startingTile) {
  const runner = new Comp(program, [startingTile]).runner()
  let result = runner.next()
  const grid = createGrid(120, '.')

  // position the r(obot)
  let x = 60
  let y = 60
  grid[x][y] = '^'

  let currentDir = '^'
  const paintRecord = []
  while (!result.done) {
    const [color, dir] = result.value.map(Number)

    const coords = `${x},${y}`
    // PAINT
    if (color === 0) {
      grid[x][y] = '.'
    } else if (color === 1) {
      grid[x][y] = '#'
    }
    paintRecord.push(coords)

    // MOVE
    switch (currentDir) {
      case '^':
        if (dir === 0) {
          currentDir = '<'
          y -= 1
        } else {
          currentDir = '>'
          y += 1
        }
        break
      case '<':
        if (dir === 0) {
          currentDir = 'v'
          x += 1
        } else {
          currentDir = '^'
          x -= 1
        }
        break
      case '>':
        if (dir === 0) {
          currentDir = '^'
          x -= 1
        } else {
          currentDir = 'v'
          x += 1
        }
        break
      case 'v':
        if (dir === 0) {
          currentDir = '>'
          y += 1
        } else {
          currentDir = '<'
          y -= 1
        }
        break
      default:
        throw new Error(`Unknown direction: ${currentDir}`)
    }

    const newcolor = grid[x][y]
    const input = newcolor === '.' ? 0 : 1
    result = runner.next(input)
  }
  return [grid, paintRecord]
}

function part1 (program) {
  const [grid, paintRecord] = painter(program, 0)
  drawGrid(grid)
  const uniqueTilesPainted = new Set(paintRecord)
  return uniqueTilesPainted.size
}

function part2 (program) {
  const [grid] = painter(program, 1)
  drawGrid(grid)
  return 'Check image printed above'
}

async function answers () {
  const input = await getInput()
  // console.log(input);
  return {
    part1: part1(input),
    part2: part2(input)
  }
}

module.exports = {
  answers
}
