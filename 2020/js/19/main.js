const assert = require('assert')
const { getDayInputAsLines } = require('../lib/utils')

async function getInput () {
  return getDayInputAsLines(19)
}

(async function run () {
  const input = await getInput()
  console.time('part 1 duration')
  const answerOne = partOne(input)
  console.timeEnd('part 1 duration')
  const expectedOne = 136
  console.log(`part 1 answers. expected: ${expectedOne}, actual: ${answerOne}.`)
  assert.equal(answerOne, expectedOne)

  console.time('part 2 duration')
  const answerTwo = partTwo(input)
  console.timeEnd('part 2 duration')
  const expectedTwo = 256
  console.log(`part 2 answers. expected: ${expectedTwo}, actual: ${answerTwo}.`)
  assert.equal(answerTwo, expectedTwo)
}())

function processInput (input) {
  const uprules = new Map()
  const prules = new Map()
  const msgs = []
  let rlines = true
  for (let i = 0; i < input.length; i++) {
    const line = input[i]
    if (line === '') {
      rlines = false
    } else if (rlines) {
      const [k, v] = line.split(': ')
      if (v.includes('"')) {
        prules.set(k, v.replace(/"/g, ''))
      } else {
        uprules.set(k, v)
      }
    } else {
      msgs.push(line)
    }
  }
  return { msgs, prules, uprules }
}

function processRules (prules, uprules) {
  while (uprules.size > 0) {
    uprules.forEach((rule, ruleId) => {
      const rulesToProcess = new Set(rule.replace('| ', '').split(' '))
      let isProcessable = true
      for (const rule of rulesToProcess.values()) {
        if (!prules.has(rule)) {
          isProcessable = false
          break
        }
      }
      if (isProcessable) {
        let ruleForProcessing = rule.padStart(rule.length + 2, '( ').padEnd(rule.length + 4, ' )').replace(/ /g, '  ')
        for (const k of rulesToProcess.keys()) {
          const val = prules.get(k)
          ruleForProcessing = ruleForProcessing.replace(new RegExp(` ${k} `, 'g'), ` ${val} `)
        }
        prules.set(ruleId, ruleForProcessing.replace(/ /g, ''))
        uprules.delete(ruleId)
      }
    })
  }
  return { prules, uprules }
}

function partOne (input) {
  const { msgs, prules, uprules } = processInput(input)
  const { prules: pr } = processRules(prules, uprules)

  const rz = pr.get('0')
  const re = new RegExp(`^${rz}$`)

  return msgs.reduce((acc, cur) => re.test(cur) ? acc + 1 : acc, 0)
}

function partTwo (input) {
  const { msgs, prules, uprules } = processInput(input)
  const { prules: pr } = processRules(prules, uprules)

  const rule42 = pr.get('42')
  const rule31 = pr.get('31')

  const matchCounts = []
  for (let i = 1; i < 5; i++) {
    const re5 = new RegExp(`^${rule42}+${rule42}{${i}}${rule31}{${i}}$`)
    matchCounts.push(msgs.reduce((acc, cur) => re5.test(cur) ? acc + 1 : acc, 0))
  }

  return matchCounts.reduce((acc, cur) => acc + cur, 0)
}
