require('draftlog').into(console)

const { Comp } = require('../lib/intcodeComputerClass')

class ASCII {
  constructor (intcode, wake = false) {
    if (wake) {
      const temp = intcode.split(',')
      temp[0] = 2
      // eslint-disable-next-line
      intcode = temp.join();
    }
    this.comp = new Comp(intcode).runner()
    this.state = this.comp.next().value.map((x) => String.fromCharCode(Number(x))).join('').split('\n')
  }

  // input - comma separated list e.g. 'A,B,B,C'
  static convertToAscii (input) {
    const ascii = input.split('').map((x) => x.charCodeAt())
    ascii.push(10)
    return ascii
  }

  play (inputs, feed = false) {
    inputs.push(feed ? 'y' : 'n') // turn on 'live' feed, takes seconds
    const asciiInputs = inputs.map(ASCII.convertToAscii)
    const result = this.comp.next(asciiInputs.flat())

    // result is the map output. Ignore the first 54 rows once it has been processed
    const rows = result.value.map((x) => String.fromCharCode(Number(x))).join('').split('\n').slice(54)
    const drafts = []
    for (let i = 0; i < 48; i++) {
      drafts.push(console.draft())
    }
    while (rows.length) {
      drafts.forEach((x) => x(rows.shift()))
    }
    return Number(result.value.slice(-1)[0])
  }

  sumOfAlignmentParams () {
    const width = this.state[0].length
    const { length } = this.state
    // no point in checking the edges so start from 1 and go to max - 1
    const intersections = []

    for (let y = 1; y < length - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        // if scaffold, check surround
        if (this.state[y][x] === '#') {
          const left = this.state[y][x - 1] === '#'
          const right = this.state[y][x + 1] === '#'
          const up = this.state[y - 1][x] === '#'
          const down = this.state[y + 1][x] === '#'

          if (left && right && up && down) {
            intersections.push([x, y])
          }
        }
      }
    }

    return intersections.reduce((acc, cur) => acc + cur[0] * cur[1], 0)
  }

  drawView () {
    this.state.forEach((r) => console.log(r))
  }
}

module.exports = ASCII
