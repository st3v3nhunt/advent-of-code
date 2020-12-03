const { getDayInputAsLines } = require('../lib/utils')

async function getInput () {
  return getDayInputAsLines(3)
}

async function partOne () {
  const input = await getInput()

  const _31 = traverseForest(createForest(input, 3), 3, 1)

  console.log('part 1 answer:', _31) // 282
}

function createForest (input, xMove) {
  const numLines = input.length
  const currentWidth = input[0].length
  const requiredWidth = Math.ceil(numLines / currentWidth) * xMove
  const forest = []
  // for (let i = 0; i < numLines; i++) {
  //   forest[i] = input[i].repeat(requiredWidth)
  // }
  for (const line of input) {
    forest.push(line.repeat(requiredWidth))
  }
  return forest
}

function traverseForest (forest, xMove, yMove) {
  let x = 0
  let y = 0
  let treeCount = 0
  while (y < forest.length) {
    if (forest[y][x] === '#') {
      treeCount++
    }
    x += xMove
    y += yMove
  }
  return treeCount
}

async function partTwo () {
  const input = await getInput()

  const _11 = traverseForest(createForest(input, 1), 1, 1)
  const _31 = traverseForest(createForest(input, 3), 3, 1)
  const _51 = traverseForest(createForest(input, 5), 5, 1)
  const _71 = traverseForest(createForest(input, 7), 7, 1)
  const _12 = traverseForest(createForest(input, 1), 1, 2)

  console.log('part 2 answer:', _11 * _31 * _51 * _71 * _12) // 958815792
}

(async function run () {
  await partOne()
  await partTwo()
}())
