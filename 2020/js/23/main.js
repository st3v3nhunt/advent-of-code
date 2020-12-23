const assert = require('assert')

function run () {
  console.time('part 1 duration')
  const answerOne = partOne()
  console.timeEnd('part 1 duration')
  const expectedOne = '26354798'
  console.log(`part 1 answers. expected: ${expectedOne}, actual: ${answerOne}.`)
  assert.equal(answerOne, expectedOne)

  // console.time('part 2 duration')
  // const answerTwo = partTwo()
  // console.timeEnd('part 2 duration')
  // const expectedTwo = 0
  // console.log(`part 2 answers. expected: ${expectedTwo}, actual: ${answerTwo}.`)
  // assert.equal(answerTwo, expectedTwo)
}
run()

function partOne () {
  const input = '284573961'
  let cur = Number(input[0])

  const cupMap = new Map()
  for (let i = 0; i < input.length; i++) {
    const val = Number(input[i])
    const next = i === input.length - 1 ? input[0] : input[i + 1]
    cupMap.set(val, Number(next))
  }
  const moves = 100
  let i = 0
  const takeSize = 3
  const lowestCup = 1 // cupMap.reduce((acc, cur) => acc < cur ? acc : cur, Number(input))
  const highestCup = cupMap.size // cupMap.reduce((acc, cur) => acc > cur ? acc : cur, 0)

  while (i < moves) {
    console.log('move', i + 1, 'cups', cupMap, 'cur', cur)
    // take cups
    const takenCups = []
    let curTemp = cur
    for (let i = 0; i < takeSize; i++) {
      const cup = cupMap.get(curTemp)
      takenCups.push(cup)
      curTemp = cup
    }
    // update cur to point to next available i.e. after taken cups
    cupMap.set(cur, cupMap.get(takenCups[takeSize - 1]))

    console.log('taken', takenCups.join(','))
    // add to destination
    let destLabel = cur - 1
    let destFound = false
    while (!destFound) {
      if (destLabel < lowestCup) {
        destLabel = highestCup
      }
      if (takenCups.includes(destLabel)) {
        destLabel--
      } else {
        destFound = true
      }
    }

    // place cups
    const destNext = cupMap.get(destLabel)
    console.log('destlabel', destLabel, 'destNext', destNext)
    cupMap.set(takenCups[takeSize - 1], destNext)
    cupMap.set(destLabel, takenCups[0])

    // new cur
    cur = cupMap.get(cur)
    console.log('cur', cur)

    // next move
    i++
  }

  // collect cups
  let acc = cupMap.get(1)
  const order = []
  while (acc !== 1) {
    const next = acc
    order.push(next)
    acc = cupMap.get(next)
  }
  const ans = order.join('')
  console.log(ans)

  return ans
}

function partTwo () {
  // const input = '284573961'
  const input = '389125467'
  const initialCups = input.split('').map(Number)
  const cups = genAllCups(initialCups)
  let cur = initialCups[0]
  const moves = 10000000
  const cupCount = cups.length
  let i = 0
  const takeSize = 3
  const lowestCup = 1
  const highestCup = 1000000

  while (i < moves) {
    // console.log('move', i + 1, 'cups', cups.join(','), 'cur', cur)
    // take cups
    const takenCups = []
    let ccIndex = cups.indexOf(cur)
    if (ccIndex + takeSize < cupCount) { // enough cups available for a take)
      takenCups.push(...cups.splice(ccIndex + 1, 3))
    } else { // need to wrap to start
      const availableCupCount = (cupCount - 1) - ccIndex
      takenCups.push(...cups.splice(ccIndex + 1, availableCupCount))
      takenCups.push(...cups.splice(0, takeSize - availableCupCount))
    }
    // console.log('taken', takenCups.join(','))

    // add to destination
    let dest = cur - 1
    let destFound = false
    while (!destFound) {
      if (dest < lowestCup) {
        dest = highestCup
      }
      if (takenCups.includes(dest)) {
        dest--
      } else {
        destFound = true
      }
    }

    // add cups
    const dcIndex = cups.indexOf(dest)
    cups.splice(dcIndex + 1, 0, ...takenCups)

    // new cur
    ccIndex = cups.indexOf(cur)
    if (ccIndex + 1 === cupCount) { // cur at end
      cur = cups[0]
    } else {
      cur = cups[ccIndex + 1]
    }
    i++
  }

  // collect cups
  const oneIndex = cups.indexOf(1)
  const finalCups = cups.splice(oneIndex + 1, 2)
  console.log(finalCups)
  const ans = finalCups[0] * finalCups[1]

  return ans
}

function genAllCups (initialCups) {
  const cups = [...Array(1000001).keys()]
  cups.shift()
  cups.splice(0, initialCups.length, ...initialCups)
  return cups
}
