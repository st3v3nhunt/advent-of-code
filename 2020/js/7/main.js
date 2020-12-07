const assert = require('assert')
const { getDayInputAsLines } = require('../lib/utils')

async function getInput () {
  return getDayInputAsLines(7)
}

function cleanContent (item) {
  return item.slice(0, item.indexOf(' bag')).trim()
}

function partOne (input) {
  const map = {}
  input.forEach((line) => {
    const split = line.split(' bags contain ')
    const [container, rawContents] = [split[0], split[1].split(',').map(cleanContent)]

    rawContents.forEach((content) => {
      if (content === 'no other') {
        // ignore
      } else {
        const cLessSplit = content.split(' ')
        const key = `${cLessSplit[1]} ${cLessSplit[2]}`
        if (map.hasOwnProperty(key)) {
          map[key].add(container)
        } else {
          const set = new Set()
          set.add(container)
          map[key] = set
        }
      }
    })
  })
  // console.log(map)

  const bagSet = countBags('shiny gold', map, new Set())
  console.log('END:', bagSet)

  return bagSet.size
}

function countBags (bagName, map, set) {
  const bags = map[bagName]
  if (!bags || bags.size === 0) { return }

  for (const bag of bags.keys()) {
    set.add(bag)
    countBags(bag, map, set)
  }
  return set
}

function partTwo (input) {
  return input.length
}

(async function run () {
  const input = await getInput()
  console.time('part 1 duration')
  const answerOne = partOne(input)
  console.timeEnd('part 1 duration')
  console.log('part 1 answers. expected: TBC, actual:', answerOne)
  assert.equal(input.length, 0)

  console.time('part 2 duration')
  const answerTwo = partTwo(input)
  console.timeEnd('part 2 duration')
  console.log('part 2 answers. expected: TBC, actual:', answerTwo)
  assert.equal(input.length, 0)
}())
