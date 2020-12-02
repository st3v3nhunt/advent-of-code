const { getDayInputAsLines } = require('../lib/utils')

async function getInput () {
  return getDayInputAsLines(2)
}

async function partOne () {
  const input = await getInput()
  let count = 0

  for (const line of input) {
    const data = line.split(':')
    const [pattern, password] = [data[0], data[1]]
    const req = pattern.split(' ')
    const [reqOccurs, reqChar] = [req[0], req[1]]
    const occurs = password.split(reqChar).length - 1
    const [min, max] = reqOccurs.split('-')
    // console.log(pattern, password, reqOccurs, reqChar, min, max, occurs)

    if (occurs >= min && occurs <= max) {
      count++
    }
  }
  console.log('part 1 answer:', count)
}

async function partTwo () {
  const input = await getInput()
  let count = 0

  for (const line of input) {
    const data = line.split(':')
    const [pattern, password] = [data[0], data[1]]
    const req = pattern.split(' ')
    const [reqPositions, reqChar] = [req[0], req[1]]
    const [posOne, posTwo] = reqPositions.split('-')
    // console.log(pattern, password, reqPositions, reqChar, posOne, posTwo)

    // if (password[posOne] === reqChar ^ password[posTwo] === reqChar) {
    if (((password[posOne] === reqChar) !== (password[posTwo] === reqChar))) {
      count++
    }
  }
  console.log('part 2 answer:', count)
}

(async function run () {
  await partOne()
  await partTwo()
}())
