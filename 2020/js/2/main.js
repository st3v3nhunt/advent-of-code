const { getDayInputAsLines } = require('../lib/utils')

async function getInput () {
  return getDayInputAsLines(2)
}

async function answers () {
  const input = await getInput()
  let count = 0

  for (const line of input) {
    const data = line.split(':')
    // console.log(data)
    const [pattern, password] = [data[0], data[1]]
    console.log(pattern, password)
    const req = pattern.split(' ')
    const [reqOccurs, reqChar] = [req[0], req[1]]
    const occurs = password.split(reqChar).length - 1
    const [min, max] = reqOccurs.split('-')
    console.log(pattern, password, reqOccurs, reqChar, min, max, occurs)
    if (occurs >= min && occurs <= max) {
      // requirements met
      count++
    }
  }
  console.log(count)
}

(async function run () {
  await answers()
}())
