const { getDayInputAsLines } = require('../lib/utils')

async function getInput () {
  return getDayInputAsLines(1)
}

async function answers () {
  const input = await getInput()

  input.forEach((x) => {
    input.forEach((y) => {
      if (parseInt(x, 10) + parseInt(y, 10) === 2020) {
        console.log(`x: ${x}, y: ${y}. x*y = ${x * y}`)
        return x * y
      }
    })
  })
  input.forEach((x) => {
    input.forEach((y) => {
      input.forEach((z) => {
        if (parseInt(x, 10) + parseInt(y, 10) + parseInt(z, 10) === 2020) {
          console.log(`x: ${x}, y: ${y}, z: ${z}. x*y*z = ${x * y * z}`)
          return x * y * z
        }
      })
    })
  })
}

(async function run () {
  await answers()
}())
