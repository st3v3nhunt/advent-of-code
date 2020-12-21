const assert = require('assert')
const { getDayInputAsLines } = require('../lib/utils')

async function getInput () {
  return getDayInputAsLines(21)
}

(async function run () {
  const input = await getInput()
  console.time('part 1 duration')
  const answerOne = partOne(input)
  console.timeEnd('part 1 duration')
  const expectedOne = 2211
  console.log(`part 1 answers. expected: ${expectedOne}, actual: ${answerOne}.`)
  assert.equal(answerOne, expectedOne)

  console.time('part 2 duration')
  const answerTwo = partTwo(input)
  console.timeEnd('part 2 duration')
  const expectedTwo = 'vv,nlxsmb,rnbhjk,bvnkk,ttxvphb,qmkz,trmzkcfg,jpvz'
  console.log(`part 2 answers. expected: ${expectedTwo}, actual: ${answerTwo}.`)
  assert.equal(answerTwo, expectedTwo)
}())

function processInput (input) {
  const alergenIngredientMap = new Map()
  const ingredientCounts = new Map()

  for (let i = 0; i < input.length; i++) {
    const line = input[i]
    const lSplit = line.split(' (contains ')
    const [tempIngs, tempAlegs] = [lSplit[0], lSplit[1]]
    const ings = new Set(tempIngs.split(' '))
    const alegs = tempAlegs.split(' ').map(x => x.slice(0, -1))

    ings.forEach(x => {
      let ingCount = 0
      if (ingredientCounts.has(x)) {
        ingCount = ingredientCounts.get(x)
      }
      ingCount += 1
      ingredientCounts.set(x, ingCount)
    })

    for (let j = 0; j < alegs.length; j++) {
      const aleg = alegs[j]
      if (alergenIngredientMap.has(aleg)) {
        const alegIngs = alergenIngredientMap.get(aleg)
        const intersection = new Set([...ings].filter(x => alegIngs.has(x)))
        if (intersection.size === 0) {
          alergenIngredientMap.set(aleg, new Set([[...ings], [...alegIngs]]))
        } else if (intersection.size > 0) {
          alergenIngredientMap.set(aleg, intersection)
        }
      } else {
        alergenIngredientMap.set(aleg, ings)
      }
    }
  }
  return [alergenIngredientMap, ingredientCounts]
}

function partOne (input) {
  const [alergenIngredientMap, ingredientCounts] = processInput(input)

  // get ingredients with alergens
  const ingredientsWithAlergens = new Set()
  alergenIngredientMap.forEach((v, k) => v.forEach(x => ingredientsWithAlergens.add(x)))

  // get ingredients with NO alergens and count how many times they appear
  const ingsNoAlegs = new Set()
  let ingCount = 0
  ingredientCounts.forEach((v, k) => {
    if (!ingredientsWithAlergens.has(k)) {
      ingsNoAlegs.add(k)
      ingCount += v
    }
  })

  return ingCount
}

function partTwo (input) {
  const [alergenToIngredients] = processInput(input)

  let alergensToProcess = []
  const alergenToIngredient = new Map()
  alergenToIngredients.forEach((v, k) => {
    if (v.size === 1) {
      const ingredient = [...v][0]
      alergensToProcess.push(ingredient)
      alergenToIngredient.set(k, ingredient)
      alergenToIngredients.delete(k)
    }
  })

  while (alergenToIngredients.size > 0) {
    const newAlergensToProcess = []
    alergenToIngredients.forEach((v, k) => {
      for (let i = 0; i < alergensToProcess.length; i++) {
        if (v.delete(alergensToProcess[i])) {
          if (v.size === 1) {
            const ingredient = [...v][0]
            newAlergensToProcess.push(ingredient)
            alergenToIngredient.set(k, ingredient)
            alergenToIngredients.delete(k)
          }
        }
      }
    })
    alergensToProcess = newAlergensToProcess
  }

  const sortedMap = new Map([...alergenToIngredient.entries()].sort())
  return [...sortedMap.values()].join(',')
}
