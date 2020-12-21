const assert = require('assert')
const { getDayInputAsLines } = require('../lib/utils')

async function getInput () {
  return getDayInputAsLines(21)
}

(async function run () {
  const input = await getInput()
  console.time('part 1 duration')
  const answerOne = partOne(input)
  console.timeEnd('part 1 duration')
  const expectedOne = 2211
  console.log(`part 1 answers. expected: ${expectedOne}, actual: ${answerOne}.`)
  assert.equal(answerOne, expectedOne)

  console.time('part 2 duration')
  const answerTwo = partTwo(input)
  console.timeEnd('part 2 duration')
  const expectedTwo = 'vv,nlxsmb,rnbhjk,bvnkk,ttxvphb,qmkz,trmzkcfg,jpvz'
  console.log(`part 2 answers. expected: ${expectedTwo}, actual: ${answerTwo}.`)
  assert.equal(answerTwo, expectedTwo)
}())

function partOne (input) {
  const alegIngMap = new Map()
  const allAlegs = new Set()
  const allIngs = new Map()

  for (let i = 0; i < input.length; i++) {
    const line = input[i]
    const lSplit = line.split(' (contains ')
    const [tempIngs, tempAlegs] = [lSplit[0], lSplit[1]]
    const ings = new Set(tempIngs.split(' '))
    const alegs = tempAlegs.split(' ').map(x => x.slice(0, -1))

    ings.forEach(x => {
      let ingCount = 0
      if (allIngs.has(x)) {
        ingCount = allIngs.get(x)
      }
      ingCount += 1
      allIngs.set(x, ingCount)
    })

    for (let j = 0; j < alegs.length; j++) {
      const aleg = alegs[j]
      allAlegs.add(aleg)
      if (alegIngMap.has(aleg)) {
        const alegIngs = alegIngMap.get(aleg)
        const intersection = new Set([...ings].filter(x => alegIngs.has(x)))
        if (intersection.size === 0) {
          alegIngMap.set(aleg, new Set([[...ings], [...alegIngs]]))
        } else if (intersection.size > 0) {
          alegIngMap.set(aleg, intersection)
        }
      } else {
        alegIngMap.set(aleg, ings) // add ingres to map and remove from noAls list
      }
    }
  }
  const ingsWithAlegs = new Set()
  alegIngMap.forEach((v, k) => v.forEach(x => ingsWithAlegs.add(x)))

  console.log('confirmed', ingsWithAlegs)
  console.log('alegIngMap:', alegIngMap)
  console.log('allAlegs:', allAlegs)
  console.log('allIngs:', allIngs)
  const ingsNoAlegs = new Set()
  let ingCount = 0
  allIngs.forEach((v, k) => {
    if (!ingsWithAlegs.has(k)) {
      ingsNoAlegs.add(k)
      ingCount += v
    }
  })
  console.log('ings with no alegs', ingsNoAlegs)

  return ingCount
}

function partTwo (input) {
  const alegIngMap = new Map()
  const allAlegs = new Set()
  const allIngs = new Map()

  for (let i = 0; i < input.length; i++) {
    const line = input[i]
    const lSplit = line.split(' (contains ')
    const [tempIngs, tempAlegs] = [lSplit[0], lSplit[1]]
    const ings = new Set(tempIngs.split(' '))
    const alegs = tempAlegs.split(' ').map(x => x.slice(0, -1))

    ings.forEach(x => {
      let ingCount = 0
      if (allIngs.has(x)) {
        ingCount = allIngs.get(x)
      }
      ingCount += 1
      allIngs.set(x, ingCount)
    })

    for (let j = 0; j < alegs.length; j++) {
      const aleg = alegs[j]
      allAlegs.add(aleg)
      if (alegIngMap.has(aleg)) {
        const alegIngs = alegIngMap.get(aleg)
        const intersection = new Set([...ings].filter(x => alegIngs.has(x)))
        if (intersection.size === 0) {
          alegIngMap.set(aleg, new Set([[...ings], [...alegIngs]]))
        } else if (intersection.size > 0) {
          alegIngMap.set(aleg, intersection)
        }
      } else {
        alegIngMap.set(aleg, ings) // add ingres to map and remove from noAls list
      }
    }
  }
  const ingsWithAlegs = new Set()
  alegIngMap.forEach((v, k) => v.forEach(x => ingsWithAlegs.add(x)))

  console.log('confirmed', ingsWithAlegs)
  console.log('alegIngMap:', alegIngMap)
  console.log('allAlegs:', allAlegs)
  console.log('allIngs:', allIngs)
  const ingsNoAlegs = new Set()
  let ingCount = 0
  allIngs.forEach((v, k) => {
    if (!ingsWithAlegs.has(k)) {
      ingsNoAlegs.add(k)
      ingCount += v
    }
  })
  console.log('ings with no alegs', ingsNoAlegs)

  console.log('alegIngMap:', alegIngMap)
  // figure out which ing causes which aleg
  // find the aleg with a count of 1

  let alegToProcess = []
  // let aAlegCount = 0
  const finalMap = new Map()
  alegIngMap.forEach((v, k) => {
    if (v.size === 1) {
      alegToProcess.push([...v][0])
      finalMap.set(k, [...v][0])
      alegIngMap.delete(k)
      // aAlegCount++
    }
  })
  // if (aAlegCount > 1) {
  //   Error('More than one aleg found with a single ing')
  // }
  console.log(alegToProcess)
  // const processed = []
  // processed.push(1)
  while (alegIngMap.size > 0) { // TODO: sort this condition out
    const tempProcessingPot = []
    alegIngMap.forEach((v, k) => {
      for (let i = 0; i < alegToProcess.length; i++) {
        const alegProcessing = alegToProcess[i]
        if (v.has(alegProcessing)) {
          // remove it from set
          v.delete(alegProcessing)
          if (v.size === 1) {
            tempProcessingPot.push([...v][0])
            alegIngMap.delete(k)
            finalMap.set(k, [...v][0])
          // } else {
          //   alegIngMap.delete(k)
          }
        }
      }
    })
    alegToProcess = tempProcessingPot
  }

  console.log('FINAL:', finalMap)
  // alphabetise by keys (aleg) and join ings for answer
  const sortedMap = new Map([...finalMap.entries()].sort())
  const ans = [...sortedMap.values()].join(',')
  console.log(sortedMap)
  return ans
}
