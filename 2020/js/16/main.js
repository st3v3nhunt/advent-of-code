const assert = require('assert')
const { getDayInputAsLines } = require('../lib/utils')

async function getInput () {
  return getDayInputAsLines(16)
}

(async function run () {
  const input = await getInput()
  console.time('part 1 duration')
  const answerOne = partOne(input)
  console.timeEnd('part 1 duration')
  const expectedOne = 23044
  console.log(`part 1 answers. expected: ${expectedOne}, actual: ${answerOne}.`)
  assert.equal(answerOne, expectedOne)

  console.time('part 2 duration')
  const answerTwo = partTwo(input)
  console.timeEnd('part 2 duration')
  const expectedTwo = 3765150732757
  console.log(`part 2 answers. expected: ${expectedTwo}, actual: ${answerTwo}.`)
  assert.equal(answerTwo, expectedTwo)
}())

function partOne (input) {
  let blanks = 0
  const missingNearby = []
  const nearbySet = new Set()
  const validSet = new Set()
  for (let i = 0; i < input.length; i++) {
    const line = input[i]
    if (line === '') {
      blanks++
    }
    if (blanks === 0) { // valid vals
      const split = line.split(': ')
      const candidates = []
      const ranges = split[1].split(' or ')
      candidates.push(ranges[0].split('-').map(Number))
      candidates.push(ranges[1].split('-').map(Number))
      candidates.forEach(arr => {
        for (let j = arr[0]; j <= arr[1]; j++) {
          validSet.add(j)
        }
      })
    } else if (blanks === 2) { // nearby tickets
      if (line === '' || line.startsWith('nearby')) { continue }

      const tickets = line.split(',').map(Number)
      for (let j = 0; j < tickets.length; j++) {
        const ticket = tickets[j]
        nearbySet.add(ticket)
        if (!validSet.has(ticket)) {
          missingNearby.push(ticket)
        }
      }
    }
  }
  return missingNearby.reduce((acc, cur) => acc + cur, 0)
}

function partTwo (input) {
  let myTicket = []
  let blanks = 0
  const validTickets = []
  const validSet = new Set()
  const fields = {}
  let fieldCount = 0

  for (let i = 0; i < input.length; i++) {
    const line = input[i]
    if (line === '') {
      blanks++
    }
    if (blanks === 0) { // valid vals
      const split = line.split(': ')
      const candidates = []
      const field = split[0]
      const ranges = split[1].split(' or ')
      candidates.push(ranges[0].split('-').map(Number))
      candidates.push(ranges[1].split('-').map(Number))
      const validValues = []
      candidates.forEach(arr => {
        for (let j = arr[0]; j <= arr[1]; j++) {
          validSet.add(j)
          validValues.push(j)
        }
      })
      fields[field] = validValues
      fieldCount++
    } else if (blanks === 1) { // your ticket
      if (line !== '' && !line.startsWith('your')) {
        myTicket = line.split(',').map(Number)
      }
    } else if (blanks === 2) { // nearby tickets
      if (line === '' || line.startsWith('nearby')) { continue }
      const values = line.split(',').map(Number)
      let invalid = false
      for (let j = 0; j < values.length; j++) {
        if (!validSet.has(values[j])) {
          invalid = true
        }
      }
      if (!invalid) {
        validTickets.push(values)
      }
    }
  }

  // work out what indexes the fields are not valid at
  const impossibilities = {}
  for (const k of Object.keys(fields)) {
    impossibilities[k] = new Set()
  }
  for (let i = 0; i < validTickets.length; i++) {
    for (const field of Object.keys(fields)) {
      for (let j = 0; j < fieldCount; j++) {
        // check if the field val is within the bounds for the field
        if (fields[field].indexOf(validTickets[i][j]) < 0) {
          // field not in bounds, field can not be in at this position
          impossibilities[field].add(j)
        }
      }
    }
  }

  // work out the order of the fields
  const possibleFieldIndexes = [...Array(fieldCount).keys()]
  const fieldOrder = {}
  for (let i = 0; i < fieldCount; i++) {
    Object.entries(impossibilities).forEach(([k, v]) => {
      // -1 due to one field being possible in all indexes
      if (v.size === possibleFieldIndexes.length - 1) {
        for (let j = 0; j < possibleFieldIndexes.length; j++) {
          const val = possibleFieldIndexes[j]
          if (!v.has(val)) {
            fieldOrder[k] = val
            possibleFieldIndexes.splice(j, 1)
          }
        }
      }
    })
  }

  let ans = 1
  for (const [k, v] of Object.entries(fieldOrder)) {
    if (k.startsWith('departure')) {
      ans *= myTicket[v]
    }
  }

  return ans
}
