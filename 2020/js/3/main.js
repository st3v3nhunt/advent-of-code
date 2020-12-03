const { getDayInputAsLines } = require('../lib/utils')

async function getInput () {
  return getDayInputAsLines(3)
}

async function partOne () {
  const input = await getInput()

  const _31 = traverseForest(input, 3, 1)

  console.log('part 1 answer:', _31)
}

// returns the number of trees ('#') encountered whilst traversing
// the given input with the given x, y movement
function traverseForest (input, xMove, yMove) {
  let x = 0
  let y = 0
  let treeCount = 0
  const rowWidth = input[0].length
  while (y < input.length) {
    if (input[y][x % rowWidth] === '#') {
      treeCount++
    }
    x += xMove
    y += yMove
  }
  return treeCount
}

async function partTwo () {
  const input = await getInput()

  const _11 = traverseForest(input, 1, 1)
  const _31 = traverseForest(input, 3, 1)
  const _51 = traverseForest(input, 5, 1)
  const _71 = traverseForest(input, 7, 1)
  const _12 = traverseForest(input, 1, 2)

  console.log('part 2 answer:', _11 * _31 * _51 * _71 * _12)
}

(async function run () {
  await partOne() // 282
  await partTwo() // 958815792
}())
