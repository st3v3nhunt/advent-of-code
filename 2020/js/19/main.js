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
        prules.set(k, a)
      } else if (v === `"${b}"`) {
        prules.set(k, b)
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

  // process rules , 1 level depth
  const [pr, upr] = process(prules, uprules)
  console.log('pr', pr)
  console.log('upr', upr)

  // Test each message to see if it is in the values from rule '0'
  let msgCount = 0
  const rz = pr.get('0')

  const ruleLens = new Map()
  rz.forEach(m => {
    const a = m.length
    const cur = ruleLens.get(a)
    if (cur !== undefined) {
      ruleLens.set(a, cur + 1)
    } else {
      ruleLens.set(a, 1)
    }
  })
  const msgsLens = new Map()
  msgs.forEach(m => {
    const a = m.length
    const cur = msgsLens.get(a)
    if (cur !== undefined) {
      msgsLens.set(a, cur + 1)
    } else {
      msgsLens.set(a, 1)
    }
  })
  console.log('lengths', ruleLens)
  console.log('msgsLens', msgsLens)
  for (let i = 0; i < msgs.length; i++) {
    if (rz.includes(msgs[i])) {
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
      const krules = []
      const orRules = rule.split(' | ')
      const orRule = orRules.length
      // processed rules are likely to be arrays
      for (let i = 0; i < orRule; i++) {
        const singleRule = orRules[i].split(' ')
        // const rts = []
        // check if both rules are arrays, if they are they need to capture all of the permutations
        if (singleRule.length === 2 && Array.isArray(prules.get(singleRule[0])) && Array.isArray(prules.get(singleRule[1]))) {
          const arr1 = prules.get(singleRule[0])
          const arr2 = prules.get(singleRule[1])
          for (let j = 0; j < arr1.length; j++) {
            for (let k = 0; k < arr2.length; k++) {
              const a = []
              a.push(arr1[j])
              a.push(arr2[k])
              krules.push(a.join(''))
            }
          }
        } else {
          const rts = []
          let maxLen = 0
          const mix = [0, 0]
          // check if there is a mix of string and arrays in the rules - probably not going to work all the time
          for (let j = 0; j < singleRule.length; j++) {
            const pruleVal = prules.get(singleRule[j])
            if (Array.isArray(pruleVal)) {
              // assume there is only a single array so no need to check for longer once set
              maxLen = pruleVal.length
              mix[1] = 1
            } else {
              mix[0] = 1
            }
          }
          if (mix[0] === 1 && mix[1] === 1) {
            for (let l = 0; l < maxLen; l++) {
              rts[l] = []
            }
          }

          for (let j = 0; j < singleRule.length; j++) {
            const pruleVal = prules.get(singleRule[j])
            // TODO: need a total num of arrays that is:
            // orRules.length * singleRule.length * pruleVal.length
            if (mix[0] === 1 && mix[1] === 1) {
              if (Array.isArray(pruleVal)) {
                for (let k = 0; k < pruleVal.length; k++) {
                  // if (!rts[k * 2]) { // no array exists
                  //   rts[k * 2] = []
                  //   if (orRule > 1) {
                  //     rts[k * 2 + 1] = []
                  //   }
                  // }
                  rts[k].push(pruleVal[k])
                }
                // rts.push(a.join(''))
              } else {
                for (let l = 0; l < rts.length; l++) {
                  rts[l].push(pruleVal)
                }
              }
            } else if (Array.isArray(pruleVal)) {
              for (let k = 0; k < pruleVal.length; k++) {
                if (!rts[k * 2]) { // no array exists
                  rts[k * 2] = []
                  if (orRule > 0) {
                    rts[k * 2 + 1] = []
                  }
                }
                rts[k * 2].push(pruleVal[k])
                if (orRule > 0) {
                  rts[k * 2 + 1].push(pruleVal[k])
                }
              }
              for (let k = rts.length - 1; k >= 0; k--) {
                if (rts[k] === undefined) {
                  rts.splice(k, 1)
                }
              }
              // rts.push(a.join(''))
            } else {
              // if (!rts[i]) { // no array exists
              //   rts[i] = []
              // }
              rts.push(pruleVal)
            }
          }
          if (mix[0] === 1 && mix[1] === 0) {
            krules.push(rts.join(''))
          } else {
            // for each element in rts
            for (let j = 0; j < rts.length; j++) {
              krules.push(rts[j].join(''))
            }
          }
        }
      }
      prules.set(ruleId, krules)
      uprules.delete(ruleId)
    }
    // const vals = new Set(v.replace('| ', '').split(' '))
    // console.log(vals)
  })

  if (uprules.size > 0) {
    console.log('*************Running again')
    const rtemp = process(prules, uprules)
    prules = rtemp[0]
    uprules = rtemp[1]
  }
  return [prules, uprules]
}

function partTwo (input) {
  return input.length
}
