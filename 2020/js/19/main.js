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

  // console.time('part 2 duration')
  // const answerTwo = partTwo(input)
  // console.timeEnd('part 2 duration')
  // const expectedTwo = 0
  // console.log(`part 2 answers. expected: ${expectedTwo}, actual: ${answerTwo}.`)
  // assert.equal(answerTwo, expectedTwo)
}())

function partOne (input) {
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

  while (uprules.size > 0) {
    uprules.forEach((v, ruleId) => {
      const rulesToProcess = new Set(v.replace('| ', '').split(' '))
      let isProcessable = true
      for (const rule of rulesToProcess.values()) {
        if (!prules.has(rule)) {
          isProcessable = false
          break
        }
      }
      if (isProcessable) {
        // console.log('processing', ruleId)
        let ruleForProcessing = v.padStart(v.length + 2, '( ').padEnd(v.length + 4, ' )').replace(/ /g, '  ')
        // console.log(temp)
        for (const k of rulesToProcess.keys()) {
          const val = prules.get(k)
          ruleForProcessing = ruleForProcessing.replace(new RegExp(` ${k} `, 'g'), ` ${val} `)
        }
        // console.log(temp.replace(/ /g, ''))
        prules.set(ruleId, ruleForProcessing.replace(/ /g, ''))
        uprules.delete(ruleId)
      }
    })
  }
  // console.log(uprules)
  // console.log(prules)
  let msgCount = 0
  const rz = prules.get('0')
  const re = new RegExp(`^${rz}$`)

  for (let i = 0; i < msgs.length; i++) {
    if (re.test(msgs[i])) {
      msgCount++
      continue
    }
  }
  return msgCount
}

function partTwo (input) {
  return input.length
}
