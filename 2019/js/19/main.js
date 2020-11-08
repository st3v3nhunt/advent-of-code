const path = require('path')
const { createGrid, drawGrid, getInputAsLines } = require('../lib/utils')
const { Comp } = require('../lib/intcodeComputerClass')

async function getInput (filename) {
  const inputPath = path.join(__dirname, `./${filename}.txt`)
  return getInputAsLines(inputPath)
}

function part1 (input) {
  // const runner = new Comp(input).runner()
  const gridSize = 10
  const grid = createGrid(gridSize)

  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      // TODO: Next is returning done - check the instructions
      // debugger
      const runner = new Comp(input).runner()
      // start it up
      let result = runner.next()
      console.log(`Running command: '${i},${j}'`)
      // result = runner.next([i, j]);
      result = runner.next([1, 1])

      if (result.value.map(Number)[0] === 0) {
        // no effect from the tractor beam
      }

      if (result.value.map(Number)[0] === 1) {
        // there is an effect from the tractor beam
        grid[i][j] = '#'
        console.log(`Tractor beam engaged at: '${i},${j}'`)
      }
    }
  }
  const rows = []
  const fullGrid = ''
  grid.forEach((s) => {
    const row = s.join('')
    rows.push(row)
    fullGrid.concat(row)
  })
  drawGrid(grid)
  const numberOfAffectedGrids = fullGrid.match(/#/g).length
  console.log(numberOfAffectedGrids)
  return numberOfAffectedGrids
}

function part2 (input) {
  return 'PENDING...'
}

async function answers () {
  const filename = 'input'
  // const filename = 'test1';
  const [input] = (await getInput(filename))
  console.log(input)
  return {
    part1: part1(input),
    part2: part2(input)
  }
}

module.exports = {
  answers
}
