const path = require('path')
const bresenham = require('bresenham')
const { getInputAsLines } = require('../lib/utils')

async function getInput (filename) {
  const inputPath = path.join(__dirname, `./${filename}.txt`)
  return getInputAsLines(inputPath)
}

function part1 (input) {
  const map = input.map((x) => x.split(''))
  console.log(map)

  const asteroids = input.reduce((acc, cur, idx) => {
    console.log(cur)
    const { length } = cur
    for (let i = 0; i < length; i++) {
      if (cur[i] === '#') {
        acc.push(`${i},${idx}`) // = {};
      }
    }
    return acc
  }, [])
  console.log('*'.repeat(25))
  console.log(`${asteroids.length} have been found!`)
  console.log(asteroids)

  const recorder = {}
  const numAsteroids = asteroids.length
  for (let i = 0; i < numAsteroids; i++) {
    const [xo, yo] = asteroids[i].split(',')
    const visibleAsteroids = []
    for (let j = 0; j < numAsteroids; j++) {
      const [xt, yt] = asteroids[j].split(',')
      if (i !== j) { // skip comparing to self
        const points = bresenham(parseInt(xo, 10), parseInt(yo, 10),
          parseInt(xt, 10), parseInt(yt, 10))
        // map to same format as in asteroids
        const pathCoordKeys = points.map((x) => `${x.x},${x.y}`)
        // get list of common coords - these are the ones with the asteroids in
        const pointsToCompare = pathCoordKeys.filter((x) => asteroids.includes(x))
        // calc the distances between points
        const origin = pointsToCompare.shift()
        const [ox, oy] = origin.split(',')
        const dest = pointsToCompare.pop()
        const [dx, dy] = dest.split(',')
        // add dest if nothing in the way
        if (pointsToCompare.length === 0) {
          visibleAsteroids.push(dest)
        }

        let blocked = false
        pointsToCompare.forEach((x) => {
          const [bx, by] = x.split(',')
          const obdist = Math.sqrt((bx - ox) ** 2 + (by - oy) ** 2)
          const bddist = Math.sqrt((dx - bx) ** 2 + (dy - by) ** 2)
          const oddist = Math.sqrt((dx - ox) ** 2 + (dy - oy) ** 2)

          const sidesdist = parseFloat((obdist + bddist).toFixed(10))
          const actualdist = parseFloat(oddist.toFixed(10))

          if (sidesdist === actualdist) {
            blocked = true
          }
        })
        if (!blocked) {
          visibleAsteroids.push(dest)
        }
      }
    }
    const asteroidSet = new Set(visibleAsteroids)
    recorder[asteroids[i]] = { asteroidSet, count: asteroidSet.size }
  }
  console.log(recorder)
  console.log('*'.repeat(25))

  const best = Object.entries(recorder).sort((a, b) => a[1].count - b[1].count).slice(-1)
  console.log('*'.repeat(25))
  return `Best location is ${best[0][0]}. It can see ${best[0][1].count} asteroids.`
}

function part2 () {
  return 'PENDING...'
}

async function answers () {
  const filename = 'input'
  // const filename = 'test5';
  const input = await getInput(filename)
  console.log(input)
  input.forEach((x) => {
    console.log(x)
  })
  return {
    part1: part1(input),
    part2: part2()
  }
}

module.exports = {
  answers
}
