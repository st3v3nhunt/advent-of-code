const { Comp } = require('../lib/intcodeComputerClass')

class NIC {
  constructor (input, address) {
    this.comp = new Comp(input, [address]).runner()
    this.result = this.comp.next()
  }

  run (input) {
    this.result = this.comp.next(input)
  }
}

module.exports = NIC
