const path = require('path')
const { getInputAsLines } = require('../lib/utils')
const { getPattern } = require('./utils')

async function getInput (filename) {
  const inputPath = path.join(__dirname, `./${filename}.txt`)
  return getInputAsLines(inputPath)
}

function runFFT (input, numPhases) {
  let numbers = input.split('')
  const { length } = 8 // numbers;
  // console.log(`Input signal '${numbers.join('')}'`);

  // length is massive, can' go through each one
  const patterns = []
  for (let i = 0; i < length; i++) {
    patterns.push(getPattern(i, length))
  }
  // debugger
  console.log('Patterns complete')

  for (let p = 0; p < numPhases; p++) {
    const output = []
    // go through every element in the input signal
    // figure out what the pattern to us is - can this be calculated more quickly?
    //
    // base patter is 0,1,0,-1
    // What is the third number's multiplying factor for the second number in the signal? - 1
    // The pattern being used would be 0,1,1,0,0,-1,-1,0
    //
    // What is the third number's multiplying factor for the fouth number in the signal? - 0
    // The pattern being used would be 0,0,0,1,1,1,1,0,0,0,0,-1,-1,...
    //
    // What is the sixth number's multiplying factor for the fouth number in the signal? - 1
    // The pattern being used would be 0,0,0,1,1,1,1,0,0,0,0,-1,-1,...
    //
    for (let i = 0; i < length; i++) {
      let temp = 0
      for (let j = 0; j < length; j++) {
        temp += numbers[j] * patterns[i][j]
      }
      output.push(Math.abs(temp).toString().slice(-1))
    }

    numbers = output
    // console.log(`After ${p + 1} phase(s): '${numbers.join('')}'`);
  }
  return numbers.join('')
}

function part1 (input) {
  const fullOutput = runFFT(input, 100)
  console.log(`Output signal: ${fullOutput}`)
  console.log('Answer is:   : ')
  return fullOutput.slice(0, 8)
}

function part2 (input) {
  // input is input repeated 10000 times
  const offset = input.slice(0, 7)
  console.log(`offset: ${offset}`)
  const fullInput = input.repeat(10000)
  const fullOutput = runFFT(fullInput, 100)
  console.log(`fullout has been calculated. length: ${fullOutput.length}`)
  const msg = fullOutput.slice(offset, offset + 8)
  console.log(msg)
  return msg
}

async function answers () {
  // const filename = 'input';
  // const filename = 'test1';
  const filename = 'test2'
  const [input] = (await getInput(filename))
  console.log(input)
  return {
    part1: part1(input),
    part2: part2(input)
  }
}

module.exports = {
  answers
}
