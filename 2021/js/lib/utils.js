const fs = require('fs/promises')
const path = require('path')

async function getDayInputAsLines (day) {
  return (await fs.readFile(path.join(__dirname, `/../../input/${day}.txt`), 'utf8')).trim().split('\n')
}

module.exports = {
  getDayInputAsLines
}
