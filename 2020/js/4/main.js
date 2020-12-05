const assert = require('assert')
const { getDayInputAsLines } = require('../lib/utils')

const requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']
const ecls = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']

async function getInput () {
  return getDayInputAsLines(4)
}

function createPassports (input) {
  input.push('')
  let passport = ''
  const passports = []

  input.forEach((line) => {
    if (line !== '') {
      passport += line + ' '
    } else {
      passports.push(passport.trim())
      passport = ''
    }
  })
  return passports
}

async function partOne () {
  const input = await getInput()
  const passports = createPassports(input)

  let valid = 0
  passports.forEach((passport) => {
    const fieldCount = passport.split(' ').reduce((acc, field) => {
      const fieldData = field.split(':')
      const key = fieldData[0]
      if (requiredFields.includes(key)) {
        return acc + 1
      } else {
        return acc
      }
    }, 0)
    if (fieldCount === requiredFields.length) {
      valid++
    }
  })

  console.log('part 1 answer:', valid)
  assert.equal(valid, 216)
}

async function partTwo () {
  const input = await getInput()
  const passports = createPassports(input)

  let valid = 0
  passports.forEach((passport) => {
    const fields = passport.split(' ')
    let fieldCount = 0
    let trueFields = 0
    fields.forEach((field) => {
      const fieldData = field.split(':')
      const fieldKey = fieldData[0]
      const fieldValue = fieldData[1]
      const num = Number(fieldValue)
      if (requiredFields.includes(fieldKey)) {
        switch (fieldKey) {
          case 'byr':
            if (num >= 1920 && num <= 2002) {
              trueFields++
            }
            break
          case 'iyr':
            if (num >= 2010 && num <= 2020) {
              trueFields++
            }
            break
          case 'eyr':
            if (num >= 2020 && num <= 2030) {
              trueFields++
            }
            break
          case 'hgt':
            if (isHeightValid(fieldValue)) {
              trueFields++
            }
            break
          case 'hcl':
            if (/^#[0-9a-f]{6}$/.test(fieldValue)) {
              trueFields++
            }
            break
          case 'ecl':
            if (ecls.includes(fieldValue)) {
              trueFields++
            }
            break
          case 'pid':
            if (/^[0-9]{9}$/.test(fieldValue)) {
              trueFields++
            }
            break
          case 'cid': // ignore cid
            break
          default:
            console.log('unknown field:', fieldKey)
            throw new Error(`unknown field: ${fieldKey} with value ${fieldValue}`)
        }
        fieldCount++
      }
    })
    if (fieldCount === requiredFields.length && trueFields === requiredFields.length) {
      valid++
    }
  })

  console.log('part 2 answer:', valid)
  assert.equal(valid, 150)
}

function isHeightValid (val) {
  const units = val.slice(-2)
  if (units === 'cm') {
    const height = Number(val.split('cm')[0])
    if (height >= 150 && height <= 193) {
      return true
    }
  } else if (units === 'in') {
    const height = Number(val.split('in')[0])
    if (height >= 59 && height <= 76) {
      return true
    }
  }
  return false
}

(async function run () {
  await partOne()
  await partTwo()
}())
