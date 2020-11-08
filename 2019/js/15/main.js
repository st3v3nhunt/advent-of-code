const path = require('path')
const { getInputAsLines } = require('../lib/utils')
const RepairDroid = require('./repairDroid')

async function getInput (filename) {
  const inputPath = path.join(__dirname, `./${filename}.txt`)
  return getInputAsLines(inputPath)
}

function part1 (input) {
  const mazeSize = 43 // the smallest the maze can be with a border around it

  const lmoveStrategy = 'left'
  const droidL = new RepairDroid(input, lmoveStrategy, mazeSize)
  const lmoves = droidL.map('left')

  const rmoveStrategy = 'right'
  const droidR = new RepairDroid(input, rmoveStrategy, mazeSize)
  const rmoves = droidR.map('right')

  // if (false) {
  // draw the individual mazes
  console.log(droidL.maze.forEach((x) => console.log(x.join(''))))
  console.log(droidR.maze.forEach((x) => console.log(x.join(''))))

  // merge the mazes for visualation purposes
  const lmaze = droidL.maze
  const rmaze = droidR.maze
  const mergedMaze = lmaze.map((lmrow, ridx) => lmrow.map((r, cidx) => {
    if (r === ' ') {
      const rc = rmaze[ridx][cidx]
      if (rc === ' ') { console.log(`Both left and right mazes have ${ridx},${cidx} as blank`) }
      return rc
    }
    return r
  }))
  console.log(mergedMaze.forEach((x) => console.log(x.join(''))))
  // }

  return lmoves < rmoves ? lmoves : rmoves
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
