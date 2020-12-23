const assert = require('assert')

function run () {
  console.time('part 1 duration')
  const answerOne = partOne()
  console.timeEnd('part 1 duration')
  const expectedOne = '26354798'
  console.log(`part 1 answers. expected: ${expectedOne}, actual: ${answerOne}.`)
  assert.equal(answerOne, expectedOne)

  console.time('part 2 duration')
  const answerTwo = partTwo()
  console.timeEnd('part 2 duration')
  const expectedTwo = '166298218695'
  console.log(`part 2 answers. expected: ${expectedTwo}, actual: ${answerTwo}.`)
  assert.equal(answerTwo, expectedTwo)
}
run()

function partOne () {
  const input = '284573961'
  const cur = Number(input[0])

  const startCups = new Map()
  for (let i = 0; i < input.length; i++) {
    const val = Number(input[i])
    const next = i === input.length - 1 ? input[0] : input[i + 1]
    startCups.set(val, Number(next))
  }
  const moves = 100

  const endCups = play(startCups, moves, cur)

  // collect cups
  let acc = endCups.get(1)
  const order = []
  while (acc !== 1) {
    const next = acc
    order.push(next)
    acc = endCups.get(next)
  }
  return order.join('')
}

function play (cups, moves, cur) {
  const takeSize = 3
  const lowestCup = 1
  const highestCup = cups.size
  let i = 0

  while (i < moves) {
    // take cups
    const takenCups = []
    let next = cur
    for (let i = 0; i < takeSize; i++) {
      const nextTemp = cups.get(next)
      takenCups.push(nextTemp)
      next = nextTemp
    }
    // update cur to point to next available i.e. after taken cups
    cups.set(cur, cups.get(takenCups[takeSize - 1]))

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

    // place cups
    const destNext = cups.get(dest)
    cups.set(takenCups[takeSize - 1], destNext)
    cups.set(dest, takenCups[0])

    // new cur
    cur = cups.get(cur)

    i++
  }
  return cups
}

function partTwo () {
  const input = '284573961'
  const cur = Number(input[0])

  const startCups = genAllCups(input)
  const moves = 10000000

  const endCups = play(startCups, moves, cur)

  // collect cups
  const first = endCups.get(1)
  const second = endCups.get(first)
  console.log('cup 1', first)
  console.log('cup 2', second)

  return first * second
}

function genAllCups (input) {
  const cSize = 1000000
  const cups = new Map()
  const head = Number(input[0])
  for (let i = 0; i < input.length; i++) {
    const val = Number(input[i])
    const next = i === input.length - 1 ? input.length + 1 : input[i + 1]
    cups.set(val, Number(next))
  }
  for (let i = input.length + 1; i <= cSize; i++) {
    const next = i === cSize ? head : i + 1
    cups.set(i, next)
  }
  return cups
}
