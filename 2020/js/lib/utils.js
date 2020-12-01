const fs = require('fs')
const util = require('util')

const readFile = util.promisify(fs.readFile)

async function getDayInputAsLines (day) {
  const contents = await readFile(`../../input/${day}.txt`, 'utf8')
  return contents.trim().split('\n')
}

module.exports = {
  getDayInputAsLines
}
