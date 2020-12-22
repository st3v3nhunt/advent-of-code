const assert = require('assert')
const { getDayInputAsLines } = require('../lib/utils')

async function getInput () {
  return getDayInputAsLines(22)
}

(async function run () {
  const input = await getInput()
  console.time('part 1 duration')
  const answerOne = partOne(input)
  console.timeEnd('part 1 duration')
  const expectedOne = 32401
  console.log(`part 1 answers. expected: ${expectedOne}, actual: ${answerOne}.`)
  assert.equal(answerOne, expectedOne)

  console.time('part 2 duration')
  const answerTwo = partTwo(input)
  console.timeEnd('part 2 duration')
  const expectedTwo = 31436
  console.log(`part 2 answers. expected: ${expectedTwo}, actual: ${answerTwo}.`)
  assert.equal(answerTwo, expectedTwo)
}())

function processInput (input) {
  const p1 = []
  const p2 = []
  let playerNum

  for (let i = 0; i < input.length; i++) {
    const line = input[i]
    if (line.startsWith('Player')) {
      playerNum = Number(line.split(' ')[1][0])
    } else if (line === '') {
      continue
    } else {
      if (playerNum === 1) {
        p1.push(Number(line))
      } else {
        p2.push(Number(line))
      }
    }
  }
  return [p1, p2]
}

function partOne (input) {
  const [p1, p2] = processInput(input)
  while (p1.length > 0 && p2.length > 0) {
    const c1 = p1.shift()
    const c2 = p2.shift()
    if (c1 > c2) {
      p1.push(c1)
      p1.push(c2)
    } else {
      p2.push(c2)
      p2.push(c1)
    }
  }
  const p1Score = calcWinningScore(p1)
  const p2Score = calcWinningScore(p2)
  return p1Score > p2Score ? p1Score : p2Score
}

function calcWinningScore (deck) {
  const len = deck.length
  return deck.reduce((acc, cur, i) => {
    return acc + (cur * (len - i))
  }, 0)
}

function recursiveCombat (p1, p2) {
  const states = new Set()
  // draw
  while (p1.length > 0 && p2.length > 0) {
    const state = p1.join(',') + '-' + p2.join(',')
    if (states.has(state)) {
      return [p1, p2, 'p1']
    }
    const c1 = p1.shift()
    const c2 = p2.shift()
    states.add(state)
    let roundWinner

    if (p1.length >= c1 && p2.length >= c2) {
      const [d1, d2, winner] = recursiveCombat(p1.slice(0, c1), p2.slice(0, c2))
      if (winner) {
        // an instant end gives the win to p1
        roundWinner = winner
      } else {
        // highest value card in deck wins
        const d1high = d1.reduce((acc, cur) => cur > acc ? cur : acc, 0)
        const d2high = d2.reduce((acc, cur) => cur > acc ? cur : acc, 0)
        roundWinner = d1high > d2high ? 'p1' : 'p2'
      }
    } else {
      // highest drawn card wins
      roundWinner = c1 > c2 ? 'p1' : 'p2'
    }
    if (roundWinner === 'p1') {
      p1.push(c1)
      p1.push(c2)
    } else {
      p2.push(c2)
      p2.push(c1)
    }
  }
  return [p1, p2]
}

function partTwo (input) {
  const [p1, p2] = processInput(input)
  const [d1, d2] = recursiveCombat(p1, p2)

  const p1Score = calcWinningScore(d1)
  const p2Score = calcWinningScore(d2)
  return p1Score > p2Score ? p1Score : p2Score
}
