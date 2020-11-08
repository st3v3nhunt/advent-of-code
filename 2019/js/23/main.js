const path = require('path')
const { getInputAsLines } = require('../lib/utils')
const NIC = require('./NIC')

async function getInput (filename) {
  const inputPath = path.join(__dirname, `./${filename}.txt`)
  return getInputAsLines(inputPath)
}

function createNicNetwork (input, size) {
  const nics = []
  const inputs = {}
  for (let i = 0; i < size; i++) {
    nics.push(new NIC(input, i))
    inputs[i] = []
  }
  return [nics, inputs]
}

function part1 (input) {
  const size = 50
  const [nics, inputs] = createNicNetwork(input, size)

  let address = 0
  let x
  let y

  let run = 0
  while (address !== 255) {
    console.log(`Run ${run} of network`)
    run += 1
    for (let i = 0; i < size; i++) {
      const nic = nics[i]
      const nicInput = inputs[i]

      if (nicInput.length) {
        nic.run(nicInput)
        inputs[i] = []
      } else {
        nic.run(-1)
      }

      const packets = nic.result.value.map(Number)
      while (packets.length) {
        address = packets.shift()
        x = packets.shift()
        y = packets.shift()
        if (address === 255) {
          break
        }
        inputs[address].push(x, y)
      }
    }
  }

  console.log(`Address: ${address}, X:, ${x}, Y: ${y}`)

  return y
}

function part2 (input) {
  const size = 50
  const [nics, inputs] = createNicNetwork(input, size)
  const natAddress = 255
  inputs[natAddress] = []

  let address = 0
  let x
  let y

  const yValues = []
  let natY
  let run = 0
  while (address !== natAddress) {
    console.log(`Run ${run} of network`)
    run += 1
    for (let i = 0; i < size; i++) {
      const nic = nics[i]
      const nicInput = inputs[i]

      if (nicInput.length) {
        nic.run(nicInput)
        inputs[i] = []
      } else {
        nic.run(-1)
      }

      let packets = nic.result.value.map(Number)
      if (!packets.length) {
        let networkIdle = true
        for (let j = 0; j < size; j++) {
          if (inputs[j].length) {
            networkIdle = false
          }
        }
        // Send last packet from NAT to address 0
        if (networkIdle) {
          const lastNatPacket = inputs[natAddress].slice(-2)
          packets = [0].concat(lastNatPacket);
          // monitor y value
          [, natY] = lastNatPacket
          if (yValues.slice(-1)[0] === natY) {
            break
          } else {
            yValues.push(natY)
          }
        }
      }

      // process packets
      while (packets.length) {
        address = packets.shift()
        x = packets.shift()
        y = packets.shift()
        inputs[address].push(x, y)
      }
    }
  }

  console.log(`Values sent from NAT: ${yValues}`)
  return natY
}

async function answers () {
  const filename = 'input'
  const [input] = (await getInput(filename))

  return {
    part1: part1(input),
    part2: part2(input)
  }
}

module.exports = {
  answers
}
