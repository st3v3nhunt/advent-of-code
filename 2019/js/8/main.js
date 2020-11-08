const path = require('path')
const { getInputAsLines } = require('../lib/utils')

async function getInput () {
  const inputPath = path.join(__dirname, './input.txt')
  return (await getInputAsLines(inputPath))[0]
}

const [w, h] = [25, 6]

function buildImageLayers (imageData) {
  const data = imageData.split('')
  const numLayers = data.length / (w * h)
  const layers = []
  let layerRecorder = [0, 0, 0] // layer index, #0s, (#1s * #2s)
  for (let l = 0; l < numLayers; l++) {
    const layer = []
    let zeros = 0
    let ones = 0
    let twos = 0
    for (let i = 0; i < h; i++) {
      const temp = data.splice(0, w)
      layer.push(temp)
      zeros += temp.filter((x) => x === '0').length
      ones += temp.filter((x) => x === '1').length
      twos += temp.filter((x) => x === '2').length
    }
    if (zeros <= layerRecorder[1] || l === 0) {
      const score = ones * twos
      layerRecorder = [l, zeros, score]
    }
    layers.push(layer)
  }
  return [layerRecorder, layers]
}

function part1 (layerRecorder) {
  return layerRecorder[2]
}

function part2 (layers) {
  const ll = layers.length
  const image = []

  for (let i = 0; i < h; i++) {
    const row = []
    for (let j = 0; j < w; j++) {
      let l = 0
      let pixel = '2'
      while ((pixel === '2') && l < ll) {
        pixel = layers[l][i][j]
        l += 1
      }
      row.push(pixel)
    }
    image.push(row)
  }
  /* eslint-disable no-console */
  console.log('*'.repeat(w))
  image.forEach((x) => {
    console.log(x.map((c) => {
      switch (c) {
        case '1':
          return '#'
        default:
          return ' '
      }
    }).join(''))
  })
  console.log('*'.repeat(w))
  /* eslint-enable no-console */
  return 'Check image printed above'
}

async function answers () {
  const input = await getInput()
  const [layerRecorder, layers] = buildImageLayers(input)

  return {
    part1: part1(layerRecorder),
    part2: part2(layers)
  }
}

module.exports = {
  answers
}
