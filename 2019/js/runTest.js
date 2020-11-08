/* eslint-disable no-console */
const day = process.argv.slice(2, 3)

if (Number.isNaN(parseInt(day, 10))) {
  throw new Error(`Arg '${day}' must be an int!`)
}

// eslint-disable-next-line import/no-dynamic-require
require(`./${day}/test`)
