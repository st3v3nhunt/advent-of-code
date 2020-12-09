const assert = require('assert')
const { getDayInputAsLines } = require('../lib/utils')

async function getInput () {
  return getDayInputAsLines(7)
}

function cleanContent (item) {
  return item.slice(0, item.indexOf(' bag')).trim()
}

function createColorBagMap (input) {
  const map = {}
  input.forEach((line) => {
    const split = line.split(' bags contain ')
    const [container, rawContents] = [split[0], split[1].split(',').map(cleanContent)]

    rawContents.forEach((content) => {
      if (content !== 'no other') {
        const cLessSplit = content.split(' ')
        const key = `${cLessSplit[1]} ${cLessSplit[2]}`
        if (map[key]) {
          map[key].add(container)
        } else {
          const set = new Set()
          set.add(container)
          map[key] = set
        }
      }
    })
  })
  return map
}

function createBagMap (input) {
  const map = {}
  input.forEach((line) => {
    const split = line.split(' bags contain ')
    const [container, rawContents] = [split[0], split[1].split(',').map(cleanContent)]

    map[container] = rawContents
  })
  return map
}

function bagColorCount (bagName, map, set) {
  const bags = map[bagName]
  if (!bags) { return }

  for (const bag of bags.keys()) {
    set.add(bag)
    bagColorCount(bag, map, set)
  }
  return set
}

function bagInCount (bagName, map, count, multiplyer) {
  const bags = map[bagName]
  for (const bag of bags) {
    if (bag === 'no other') { return count }
    const index = bag.indexOf(' ')
    const num = Number(bag.slice(0, index)) * multiplyer
    const newBagName = bag.slice(index + 1)
    count += bagInCount(newBagName, map, num, num)
  }
  return count
}

function partOne (input) {
  const map = createColorBagMap(input)
  return bagColorCount('shiny gold', map, new Set()).size
}

function partTwo (input) {
  const map = createBagMap(input)
  return bagInCount('shiny gold', map, 0, 1)
}

(async function run () {
  const input = await getInput()
  console.time('part 1 duration')
  const answerOne = partOne(input)
  console.timeEnd('part 1 duration')
  console.log('part 1 answers. expected: 246, actual:', answerOne)
  assert.equal(answerOne, 246)

  console.time('part 2 duration')
  const answerTwo = partTwo(input)
  console.timeEnd('part 2 duration')
  console.log('part 2 answers. expected: 2976, actual:', answerTwo)
  assert.equal(answerTwo, 2976)
}())
