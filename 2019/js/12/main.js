const path = require('path')
const { getInputAsLines } = require('../lib/utils')

async function getInput (filename) {
  const inputPath = path.join(__dirname, `./${filename}.txt`)
  return getInputAsLines(inputPath)
}

function simulate (input, maxSteps = Infinity) {
  const moonarr = []
  const moons = input.map((x) => {
    const coords = x.slice(1, -1).split(',').map((c) => c.split('=')).map((d) => parseInt(d[1], 10))
    moonarr.push([coords, [0, 0, 0]])
    return { pos: { x: coords[0], y: coords[1], z: coords[2] }, vel: { x: 0, y: 0, z: 0 } }
  })
  console.log('moons origin pos')
  console.log(moons)
  console.log(moonarr)
  const numMoons = input.length
  const moonPairs = {}

  // const moonPos = moons.map((x) => ['x', 'y', 'z'].forEach((c) => x.pos[c]

  // TODO: Look at making the pos and vel an array
  console.log(maxSteps)
  let currentState = ''
  const initialState = (JSON.stringify(moons))
  console.log(`initialState: ${initialState}`)
  let steps = 0
  while ((initialState !== currentState) && steps < maxSteps) {
    // calculate velocity
    for (let i = 0; i < numMoons; i++) {
      moonPairs[i] = []
      const mo = moons[i]
      for (let j = 0; j < numMoons; j++) {
        if (i !== j) {
          // compare pos and alter vel
          ['x', 'y', 'z'].forEach((c) => {
            const o = moons[i].pos[c]
            const t = moons[j].pos[c]
            if (o < t) {
              mo.vel[c] += 1
            }
            if (o > t) {
              mo.vel[c] -= 1
            }
          })
        }
      }
    }
    // console.log('moons updated pos');
    // console.log(moons);

    // apply velocity
    moons.forEach((x) => {
      ['x', 'y', 'z'].forEach((c) => {
        x.pos[c] += x.vel[c]
      })
    })
    steps += 1
    currentState = (JSON.stringify(moons))
  }
  // console.log(`currentState: ${currentState}`);

  console.log(`Number of steps: ${steps}`)
  console.log('moons with gravity applied')
  console.log(moons)
  // calc system energy
  const moonEnergy = moons.map((x) => {
    const pot = ['x', 'y', 'z'].reduce((acc, cur) => Math.abs(x.pos[cur]) + acc, 0)
    const kin = ['x', 'y', 'z'].reduce((acc, cur) => Math.abs(x.vel[cur]) + acc, 0)
    return pot * kin
  })
  console.log(moonEnergy)
  const systemEnergy = moonEnergy.reduce((acc, cur) => acc + cur, 0)
  return `System energy: ${systemEnergy} after ${steps} steps.`
}

function part1 (input) {
  return simulate(input, 1000)
}

function part2 (input) {
  return simulate(input)
}

async function answers () {
  // const filename = 'input';
  const filename = 'test1'
  const input = await getInput(filename)
  console.log(input)
  return {
    part1: part1(input),
    part2: part2(input)
  }
}

module.exports = {
  answers
}
