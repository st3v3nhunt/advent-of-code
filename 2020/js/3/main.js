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
  const currentLength = input.length
  const currentWidth = input[0].length
  const requiredWidth = Math.ceil(currentLength / currentWidth) * xMove

  return input.map(line => line.repeat(requiredWidth))
}

// returns the number of trees ('#') encountered whilst traversing the given
// forest with the given x, y movement
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
