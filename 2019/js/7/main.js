const path = require('path')
const { getInputAsLines } = require('../lib/utils')
const { Comp } = require('../lib/intcodeComputerClass')

async function getInput () {
  const inputPath = path.join(__dirname, './input.txt')
  return (await getInputAsLines(inputPath))[0]
}

const permutator = (inputArr) => {
  const result = []

  const permute = (arr, m = []) => {
    if (arr.length === 0) {
      result.push(m)
    } else {
      for (let i = 0; i < arr.length; i++) {
        const curr = arr.slice()
        const next = curr.splice(i, 1)
        permute(curr.slice(), m.concat(next))
      }
    }
  }

  permute(inputArr)

  return result
}

function runProg (program, input) {
  return new Comp(program, input).runner().map(Number)
}

function part1 (program) {
  const thrustSignals = []
  const phasePermutations = permutator([0, 1, 2, 3, 4])

  phasePermutations.forEach((x) => {
    let ampInput = 0
    for (let i = 0; i < 5; i++) {
      ampInput = runProg(program, [x[i], ampInput])
      if (i === 4) {
        thrustSignals.push(ampInput)
      }
    }
  })
  return Math.max(...thrustSignals)
}

function part2 (program) {
  const thrustSignals = []
  const phasePermutations = permutator([5, 6, 7, 8, 9])

  phasePermutations.forEach((x) => {
    const compa = new Comp(program).run()
    const compb = new Comp(program).run()
    const compc = new Comp(program).run()
    const compd = new Comp(program).run()
    const compe = new Comp(program).run()
    const outputs = [...x, 0]
    let a = compa.next()
    let b = compb.next()
    let c = compc.next()
    let d = compd.next()
    let e = compe.next()

    while (!e.done) {
      if (a.value !== undefined) {
        a = compa.next()
      } else {
        a = compa.next(outputs.shift())
      }
      if (a.value !== undefined) {
        outputs.push(a.value)
      }

      if (b.value !== undefined) {
        b = compb.next()
      } else {
        b = compb.next(outputs.shift())
      }
      if (b.value !== undefined) {
        outputs.push(b.value)
      }

      if (c.value !== undefined) {
        c = compc.next()
      } else {
        c = compc.next(outputs.shift())
      }
      if (c.value !== undefined) {
        outputs.push(c.value)
      }

      if (d.value !== undefined) {
        d = compd.next()
      } else {
        d = compd.next(outputs.shift())
      }
      if (d.value !== undefined) {
        outputs.push(d.value)
      }

      if (e.value !== undefined) {
        e = compe.next()
      } else {
        e = compe.next(outputs.shift())
      }
      if (e.value !== undefined) {
        outputs.push(e.value)
      }
    }
    thrustSignals.push(e.value.slice(-1)[0])
  })
  return thrustSignals.reduce((cur, acc) => {
    if (cur > acc) {
      return cur
    }
    return acc
  }, 0)
}

async function answers () {
  const program = await getInput()
  return {
    part1: part1(program),
    part2: part2(program)
  }
}

module.exports = {
  answers
}
