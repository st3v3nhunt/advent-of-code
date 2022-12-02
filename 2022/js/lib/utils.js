const fs = require('fs/promises')
const path = require('path')

async function getInputAsLines (source, day) {
  return (await fs.readFile(
    path.join(__dirname, `/../../${source}/${day}.txt`),
    'utf8'
  )).trim().split('\n')
}

async function getDayInputAsLines (day) {
  return getInputAsLines('input', day)
}

async function getDayTestInputAsLines (day) {
  return getInputAsLines('input/test', day)
}

module.exports = {
  getDayInputAsLines,
  getDayTestInputAsLines
}
