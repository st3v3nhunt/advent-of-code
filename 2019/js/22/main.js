const path = require('path')
const { getInputAsLines } = require('../lib/utils')

async function getInput (filename) {
  const inputPath = path.join(__dirname, `./${filename}.txt`)
  return getInputAsLines(inputPath)
}

function convertToDeal (phrase) {
  if (phrase.includes('cut')) {
    const [type, size] = phrase.split(' ')
    return { size: Number(size), type }
  } if (phrase.includes('stack')) {
    return { type: 'stack' }
  } if (phrase.includes('increment')) {
    return { size: Number(phrase.split(' ').slice(-1)), type: 'increment' }
  }
  throw new Error('Unknown deal type')
}

function dealCut (deck, n) {
  const { length } = Object.keys(deck)
  const newDeck = {}

  for (let i = 0; i < length; i++) {
    let pos
    if (n < 0) {
      pos = length + n + i
    } else {
      pos = i + n
    }
    if (pos >= length) {
      pos -= length
    }
    newDeck[i] = deck[pos]
  }
  return newDeck
}

function dealIncrement (deck, n) {
  const newDeck = {}
  const { length } = Object.keys(deck)

  for (let i = 0; i < length; i++) {
    const newPos = i > 1 ? (i * n) % length : (i * n)
    newDeck[newPos] = deck[i]
  }

  return newDeck
}

function dealReverse (deck) {
  const { length } = Object.keys(deck)

  for (let i = 0; i < length / 2; i++) {
    const swapPos = length - i - 1;
    [deck[i], deck[swapPos]] = [deck[swapPos], deck[i]]
  }
  return deck
}

function shuffle (input, deckSize) {
  // input = ['deal into new stack', 'cut -2', 'deal with increment 7', 'cut 8',
  //   'cut -4', 'deal with increment 7', 'cut 3', 'deal with increment 9',
  //   'deal with increment 3', 'cut -1'];
  // deckSize = 10;
  // let deck = [...Array(deckSize).keys()];
  let deck = {}
  for (let i = 0; i < deckSize; i++) {
    deck[i] = i
  }

  // console.log(deck);
  while (input.length) {
    const deal = convertToDeal(input.shift())
    switch (deal.type) {
      case 'cut':
        deck = dealCut(deck, deal.size)
        break
      case 'increment':
        deck = dealIncrement(deck, deal.size)
        break
      case 'stack':
        deck = dealReverse(deck)
        break
      default:
        throw new Error(`Unknown deal type: ${deal}`)
    }
  }
  // console.log(deck);

  return deck
}

function part1 (input, deckSize = 10) {
  console.log(`Shuffling deck with size ${deckSize} cards.`)
  const deck = shuffle(input, deckSize)
  return Object.entries(deck).find((x) => x[1] === 2019)[0]
}

function part2 (input) {
  const deckSize = 119315717514047
  console.log(`Shuffling deck with size ${deckSize} cards.`)
  const deck = shuffle(input, deckSize)
  return Object.entries(deck).find((x) => x[1] === 2020)[0]
}

async function answers () {
  const filename = 'input'
  const input = (await getInput(filename))
  return {
    part1: part1(input, 10007),
    part2: part2(input)
  }
}

module.exports = {
  answers
}
