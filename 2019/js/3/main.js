const path = require('path')

const { getInputAsLines } = require('../lib/utils')

async function getInput () {
  const inputPath = path.join(__dirname, './input.txt')
  return getInputAsLines(inputPath)
}

function getNewPoint (point, direction) {
  const [p0, p1] = point.split(',')
  switch (direction) {
    case 'L':
      return `${parseInt(p0, 10) - 1},${p1}`
    case 'R':
      return `${parseInt(p0, 10) + 1},${p1}`
    case 'U':
      return `${p0},${parseInt(p1, 10) + 1}`
    case 'D':
      return `${p0},${parseInt(p1, 10) - 1}`
    default:
      throw new Error(`Invalid direction: ${direction}`)
  }
}

function createPointMap (wire) {
  const points = {}
  let totalSteps = 0
  let point = '0,0'

  wire.forEach((section) => {
    const direction = section.slice(0, 1)
    const distance = section.slice(1)

    for (let step = 0; step < distance; step++) {
      totalSteps += 1
      point = getNewPoint(point, direction)
      // eslint-disable-next-line no-prototype-builtins
      if (!points.hasOwnProperty(point)) {
        points[point] = totalSteps
      }
    }
  })
  return points
}

function calcManhattanDistance (point) {
  // point is string co-ord in format 'x,y'
  // manhattan distance is x+y
  return point.split(',').map(Math.abs).reduce((acc, cur) => acc + cur, 0)
}

async function answers () {
  const input = await getInput()
  const wire1 = input[0].split(',')
  const wire2 = input[1].split(',')

  const pointMap1 = createPointMap(wire1)
  const pointMap2 = createPointMap(wire2)
  console.log(pointMap1)

  const s2 = new Set(Object.keys(pointMap2))
  const intersections = Object.keys(pointMap1).filter((x) => s2.has(x))

  const stepTotals = intersections.map((x) => pointMap1[x] + pointMap2[x])

  const distances = intersections.map(calcManhattanDistance)
  return {
    part1: Math.min(...distances),
    part2: Math.min(...stepTotals)
  }
}

module.exports = {
  answers
}
