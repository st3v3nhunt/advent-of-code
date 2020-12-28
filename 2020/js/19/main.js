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

function processInput (input) {
  const a = 'a'
  const b = 'b'
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
      if (v === `"${a}"`) {
        prules.set(k, [a])
      } else if (v === `"${b}"`) {
        prules.set(k, [b])
      } else {
        uprules.set(k, v)
      }
    } else {
      msgs.push(line)
    }
  }
  return [prules, uprules, msgs]
}

function partOne (input) {
  const [prules, uprules, msgs] = processInput(input)

  const [pr] = process(prules, uprules)

  // Test each message to see if it is in the values from rule '0'
  let msgCount = 0
  const ruleZeroSet = new Set(pr.get('0'))

  const ruleLens = new Map()
  ruleZeroSet.forEach(m => {
    const a = m.length
    const cur = ruleLens.get(a)
    if (cur !== undefined) {
      ruleLens.set(a, cur + 1)
    } else {
      ruleLens.set(a, 1)
    }
  })
  console.log('lengths', ruleLens)

  for (let i = 0; i < msgs.length; i++) {
    if (!ruleLens.has(msgs[i].length)) {
      continue
    }
    if (ruleZeroSet.has(msgs[i])) {
      msgCount++
      continue
    }
  }
  console.log('matched msgs', msgCount)
  return msgCount
}

// go through the rules and identify which ones haven't been processed
// use a 'processed rules' map for this
// for each unprocessed rule check if all of the values are included in the
// processed map. if they are, process them otherwise rerun the processing once
// the current iteration of processing has been completed. once processed,
// remove the rule and make sure it is added to the processed set
function process (prules, uprules) {
  uprules.forEach((rule, ruleId) => {
    console.log('processing rule', rule)
    console.log(rule.replace('| ', '').split(' '))
    const ruleIds = rule.replace('| ', '').split(' ')
    let isProcessable = true
    // check each rule to see if the constituent rules have been processed
    for (let i = 0; i < ruleIds.length; i++) {
      const val = ruleIds[i]
      if (!prules.has(val)) {
        isProcessable = false
        break
      }
    }

    if (isProcessable) { // expand - add an array of rules
      const resolvedRules = []
      const rules = rule.split(' | ')

      for (let i = 0; i < rules.length; i++) {
        const singleRule = rules[i].split(' ')
        const ruleOneRules = prules.get(singleRule[0])
        const ruleTwoRules = prules.get(singleRule[1])
        if (singleRule.length === 2 && Array.isArray(ruleOneRules) && Array.isArray(ruleTwoRules)) {
          for (let j = 0; j < ruleOneRules.length; j++) {
            for (let k = 0; k < ruleTwoRules.length; k++) {
              const tempRules = []
              tempRules.push(ruleOneRules[j])
              tempRules.push(ruleTwoRules[k])
              resolvedRules.push(tempRules.join(''))
            }
          }
        } else {
          for (let j = 0; j < ruleOneRules.length; j++) {
            resolvedRules.push(ruleOneRules[j])
          }
        }
      }
      prules.set(ruleId, resolvedRules)
      uprules.delete(ruleId)
    }
  })

  if (uprules.size > 0) {
    console.log('*************Running again')
    const [prulesTemp, uprulesTemp] = process(prules, uprules)
    prules = prulesTemp
    uprules = uprulesTemp
  }
  return [prules, uprules]
}

function partTwo (input) {
  return input.length
}
