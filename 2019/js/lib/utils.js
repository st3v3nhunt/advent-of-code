const fs = require('fs')
const util = require('util')

const readFile = util.promisify(fs.readFile)

async function getInputAsLines (path) {
  const contents = await readFile(path, 'utf8')
  const data = contents.trim().split('\n')
  return data
}

function createGrid (size, char = '.') {
  const row = char.repeat(size).split('')
  const grid = []
  for (let i = 0; i < size; i++) {
    grid[i] = [...row]
  }
  return grid
}

function drawGrid (grid) {
  grid.forEach((x) => console.log(x.join('')))
}

module.exports = {
  createGrid,
  drawGrid,
  getInputAsLines
}
