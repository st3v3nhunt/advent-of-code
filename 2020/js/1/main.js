const { getDayInputAsLines } = require('../lib/utils')

async function getInput () {
  return getDayInputAsLines(1)
}

async function answers () {
  const input = await getInput()

  outer:
  for (const i of input) {
    for (const j of input) {
      if (parseInt(i, 10) + parseInt(j, 10) === 2020) {
        console.log(`i: ${i}, j: ${j}. i * j = ${i * j}`)
        break outer
      }
    }
  }

  outer:
  for (const i of input) {
    for (const j of input) {
      for (const k of input) {
        if (parseInt(i, 10) + parseInt(j, 10) + parseInt(k, 10) === 2020) {
          console.log(`i: ${i}, j: ${j}, k: ${k}. i * j * k = ${i * j * k}`)
          break outer
        }
      }
    }
  }
}

(async function run () {
  await answers()
}())
