const assert = require('assert')
const { getDayInputAsLines } = require('../lib/utils')

async function getInput () {
  return getDayInputAsLines(22)
}

(async function run () {
  const input = await getInput()
  // console.time('part 1 duration')
  // const answerOne = partOne(input)
  // console.timeEnd('part 1 duration')
  // const expectedOne = 32401
  // console.log(`part 1 answers. expected: ${expectedOne}, actual: ${answerOne}.`)
  // assert.equal(answerOne, expectedOne)

  console.time('part 2 duration')
  const answerTwo = partTwo(input)
  console.timeEnd('part 2 duration')
  const expectedTwo = 0
  console.log(`part 2 answers. expected: ${expectedTwo}, actual: ${answerTwo}.`)
  assert.equal(answerTwo, expectedTwo)
}())

function processInput (input) {
  const p1 = []
  const p2 = []
  let playerNum

  for (let i = 0; i < input.length; i++) {
    const line = input[i]
    console.log('line:', line)
    if (line.startsWith('Player')) {
      playerNum = Number(line.split(' ')[1][0])
      console.log(playerNum)
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
  console.log('player1:', p1)
  console.log('player2:', p2)
  let round = 0
  while (p1.length > 0 && p2.length > 0) {
    const c1 = p1.shift()
    const c2 = p2.shift()
    if (c1 > c2) {
      p1.push(c1)
      p1.push(c2)
    } else { // there aren't any 2 cards of the same value
      p2.push(c2)
      p2.push(c1)
    }

    round++
  }
  // console.log('number of rounds:', round)
  // console.log('player1 deck:', p1)
  // console.log('player2 deck:', p2)
  const p1Score = calcWinningScore(p1)
  const p2Score = calcWinningScore(p2)
  // console.log('player1 score:', p1Score)
  // console.log('player2 score:', p2Score)
  return p1Score > p2Score ? p1Score : p2Score
}

function calcWinningScore (deck) {
  const len = deck.length
  return deck.reduce((acc, cur, i) => {
    // console.log(acc, cur, len - i)
    return acc + (cur * (len - i))
  }, 0)
}

function partTwo (input) {
  return input.length
}
