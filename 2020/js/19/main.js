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
  const expectedOne = 0
  console.log(`part 1 answers. expected: ${expectedOne}, actual: ${answerOne}.`)
  assert.equal(answerOne, expectedOne)

  console.time('part 2 duration')
  const answerTwo = partTwo(input)
  console.timeEnd('part 2 duration')
  const expectedTwo = 0
  console.log(`part 2 answers. expected: ${expectedTwo}, actual: ${answerTwo}.`)
  assert.equal(answerTwo, expectedTwo)
}())

function partOne (input) {
  // TODO:
  // get rules
  // get messages
  // expand rules
  // run rules against the messages
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
      console.log(k, v)
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
  console.log(uprules)
  console.log(msgs)
  // process rules , 1 level depth
  const [pr, upr] = process(prules, uprules)
  console.log('pr', pr)
  console.log('upr', upr)
  // Test each message to see if it is in the values from rule '0'
  let msgCount = 0
  const rz = pr.get('0')
  console.log('*************************')
  console.log(rz)
  for (let i = 0; i < msgs.length; i++) {
    const msg = msgs[i]
    console.log(msg)
    if (rz.includes(msgs[i])) {
      msgCount++
      continue
    }
  }
  return msgCount
}
// rtemp.forEach((v, k) => {
//   // console.log(k)
//   console.log(v.replace('| ', '').split(' '))
//   const vks = v.replace('| ', '').split(' ')
//   let l1 = true
//   // check each rule to see if it can expanded
//   for (let i = 0; i < vks.length; i++) {
//     if (vks[i] !== ak && vks[i] !== bk) {
//       l1 = false
//       // not level 1
//     }
//   }
//   if (l1) { // expand - add an array of rules
//     const krules = v.split(' | ').map(c => {
//       return c.replace(new RegExp(ak, 'g'), a).replace(new RegExp(bk, 'g'), b).replace(/ /g, '')
//     })
//     rules.set(k, krules)
//     rtemp.set(k, krules)
//   }
//   // const vals = new Set(v.replace('| ', '').split(' '))
//   // console.log(vals)
// })
// console.log(rules)
// console.log(rtemp)
// rlist.forEach(r => {
//   if (r.split(': ')[1] === '"a"') {
//   }
// }
// sort rules - not required but nice to view thema - maybe!
// console.log(rtemp.sort())
// return input.length
// }

// go through the rules and identify which ones haven't been processed
// use a 'processed rules' map for this
// for each unprocessed rule check if all of the values are included in the
// processed map. if they are, process them otherwise rerun the processing once
// the current iteration of processing has been completed. once processed,
// remove the rule and make sure it is added to the processed set
function process (prules, uprules) {
  uprules.forEach((v, k) => {
    console.log('processing rule', v)
    console.log(v.replace('| ', '').split(' '))
    const rps = v.replace('| ', '').split(' ')
    let isProcessable = true
    // check each rule to see if it can expanded
    for (let i = 0; i < rps.length; i++) {
      const val = rps[i]
      if (!prules.has(val)) {
        isProcessable = false
        break
      }
    }
    if (isProcessable) { // expand - add an array of rules
      const krules = []
      const orRules = v.split(' | ')
      const orRule = orRules.length
      // processed rules are likely to be arrays
      for (let i = 0; i < orRule; i++) {
        const singleRule = orRules[i].split(' ')
        // const rts = []
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
                if (orRule > 1) {
                  rts[k * 2 + 1] = []
                }
              }
              rts[k * 2].push(pruleVal[k])
              if (orRule > 1) {
                rts[k * 2 + 1].push(pruleVal[k])
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
      prules.set(k, krules)
      uprules.delete(k)
    }
    // const vals = new Set(v.replace('| ', '').split(' '))
    // console.log(vals)
  })

  // let runAgain = false
  // for (const v of uprules.values()) {
  //   if (v !== a && v !== b && !Array.isArray(v)) { // check if elements haven't been expanded - maybe use a flag to do this?
  //     runAgain = true
  //     break
  //   }
  // }
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
