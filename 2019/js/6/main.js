const path = require('path')

const { getInputAsLines } = require('../lib/utils')

async function getInput () {
  // const inputPath = path.join(__dirname, './test1.txt');
  // const inputPath = path.join(__dirname, './test2.txt');
  const inputPath = path.join(__dirname, './input.txt')
  return getInputAsLines(inputPath)
}

function buildOrbits (input) {
  return input.reduce((acc, cur) => {
    const [obj1, obj2] = cur.split(')')
    acc[obj2] = obj1
    return acc
  }, {})
}

function part1 (input) {
  const orbits = buildOrbits(input)

  return Object.keys(orbits).reduce((acc, cur) => {
    let node = orbits[cur]
    while (node) {
      // eslint-disable-next-line no-param-reassign
      acc += 1
      node = orbits[node]
    }
    return acc
  }, 0)
}

function getPath (orbits, target) {
  const paths = []
  let node = orbits[target]
  while (node) {
    paths.push(node)
    node = orbits[node]
  }
  return paths
}

function part2 (input) {
  const orbits = buildOrbits(input)

  const youPath = getPath(orbits, 'YOU')
  const youSet = new Set(youPath)

  const sanPath = getPath(orbits, 'SAN')
  const sanSet = new Set(sanPath)

  const youTransfersLength = youPath.filter((x) => !sanSet.has(x)).length
  const sanTransfersLength = sanPath.filter((x) => !youSet.has(x)).length

  return youTransfersLength + sanTransfersLength
}

async function answers () {
  const input = await getInput()
  return {
    part1: part1(input),
    part2: part2(input)
  }
}

module.exports = {
  answers
}
