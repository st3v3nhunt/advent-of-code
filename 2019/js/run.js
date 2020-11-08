/* eslint-disable no-console */
const day = process.argv.slice(2, 3)

if (Number.isNaN(parseInt(day, 10))) {
  throw new Error(`Arg '${day}' must be an int!`)
}

// eslint-disable-next-line import/no-dynamic-require
const { answers } = require(`./${day}/main`);

(async function run () {
  try {
    console.time('answers')
    const answer = await answers()
    console.timeEnd('answers')
    console.log(`Part 1 answer is: '${answer.part1}'.`)
    console.log(`Part 2 answer is: '${answer.part2}'.`)
  } catch (err) {
    console.log('Something has gone wrong...')
    console.log(err)
    throw new Error(err)
  }
}())
/* eslint-enable no-console */
