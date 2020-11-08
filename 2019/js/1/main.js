const path = require('path')

const { getInputAsLines } = require('../lib/utils')

async function getInput () {
  const inputPath = path.join(__dirname, './input.txt')
  return getInputAsLines(inputPath)
}

function fuelForMass (mass) {
  return Math.floor(parseInt(mass, 10) / 3) - 2
}

function fuelForFuel (mass) {
  if (mass < 0) { return 0 }
  const fuel = fuelForMass(mass)
  const fuelForFuelMass = fuelForFuel(fuel)
  return fuel < 0 ? fuelForFuelMass : fuel + fuelForFuelMass
}

function modulesFuelReq (acc, cur) {
  const moduleFuel = fuelForMass(cur)
  return parseInt(acc, 10) + moduleFuel
}

function modulesAndFuelFuelReq (acc, cur) {
  const moduleFuel = fuelForMass(cur)
  const fuelForFuelMass = fuelForFuel(moduleFuel)
  return parseInt(acc, 10) + moduleFuel + fuelForFuelMass
}

async function answers () {
  const input = await getInput()
  return {
    part1: input.reduce(modulesFuelReq, 0),
    part2: input.reduce(modulesAndFuelFuelReq, 0)
  }
}

module.exports = {
  answers
}
