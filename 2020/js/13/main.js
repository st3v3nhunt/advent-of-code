const assert = require('assert')
const { getDayInputAsLines } = require('../lib/utils')

async function getInput () {
  return getDayInputAsLines(13)
}

(async function run () {
  const input = await getInput()
  console.time('part 1 duration')
  const answerOne = partOne(input)
  console.timeEnd('part 1 duration')
  const expectedOne = 171
  console.log(`part 1 answers. expected: ${expectedOne}, actual: ${answerOne}.`)
  assert.equal(answerOne, expectedOne)

  console.time('part 2 duration')
  const answerTwo = partTwo(input)
  console.timeEnd('part 2 duration')
  const expectedTwo = 539746751134958
  console.log(`part 2 answers. expected: ${expectedTwo}, actual: ${answerTwo}.`)
  assert.equal(answerTwo, expectedTwo)
}())

function partOne (input) {
  const time = Number(input[0])
  const buses = input[1].split(',')
  const diffs = {}
  let monitor = [-time]

  for (let i = 0; i < buses.length; i++) {
    const bus = buses[i]

    if (bus !== 'x') {
      const numBus = Number(bus)
      const nextTime = Math.ceil(time / numBus)
      const wait = time - nextTime * numBus
      diffs[numBus] = wait
      if (wait > monitor[0]) {
        monitor = [wait, bus]
      }
    }
  }
  return -(monitor[0] * monitor[1])
}

function getInverse (n, mod) {
  let i = 1n
  const inverse = BigInt(n % mod)
  if (inverse === i) { return i }
  let t = 0n
  do {
    i++
    t = (inverse * i) % mod
  } while (t !== 1n)
  return i
}

function partTwo (input) {
  const buses = input[1].split(',')
  const deps = {}
  for (let i = 0; i < buses.length; i++) {
    if (buses[i] !== 'x') {
      deps[i] = { mod: BigInt(buses[i]) }
    }
  }

  const N = Object.values(deps).reduce((acc, cur) => acc * cur.mod, 1n)
  for (const [k, o] of Object.entries(deps)) {
    const mod = BigInt(o.mod)
    const r = BigInt(k)
    const n = BigInt(N / mod)
    const x = getInverse(n, mod)

    deps[k].n = n
    deps[k].x = x
    deps[k].product = BigInt(r * n * x)
  }
  const X = Object.values(deps).reduce((acc, cur) => acc + cur.product, 0n)
  return N - X % N
}
