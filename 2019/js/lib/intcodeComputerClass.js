class Comp {
  constructor (program, inputs) {
    this.inputs = inputs || []
    this.memory = program.split(',').reduce((acc, cur, i) => {
      acc[i] = cur
      return acc
    }, {})
    this.relativeBase = BigInt(0)
    this.pointer = BigInt(0)
  }

  padOpcode () {
    return this.memory[this.pointer].toString().padStart(5, 0)
  }

  getValue (mode, offset) {
    let result
    switch (mode) {
      case '0':
        // position mode
        result = this.memory[this.memory[this.pointer + BigInt(offset)]]
        break
      case '1':
        // immediate mode
        result = this.memory[this.pointer + BigInt(offset)]
        break
      case '2':
        // relative mode
        result = this.memory[BigInt(this.memory[this.pointer + BigInt(offset)]) +
          BigInt(this.relativeBase)]
        break
      default:
        throw new Error(`Unknown mode: ${mode}`)
    }
    return result
  }

  getValues (fullOpcode) {
    const param1Mode = fullOpcode.slice(2, 3)
    const param2Mode = fullOpcode.slice(1, 2)
    let val1 = this.getValue(param1Mode, BigInt(1))
    let val2 = this.getValue(param2Mode, BigInt(2))
    val1 = val1 ? BigInt(val1) : BigInt(0)
    val2 = val2 ? BigInt(val2) : BigInt(0)
    return [(val1), (val2)]
  }

  setValue (paramMode, val, offset) {
    switch (paramMode) {
      case '0':
        this.memory[this.memory[this.pointer + BigInt(offset)]] = BigInt(val)
        break
      case '1':
        this.memory[this.pointer + BigInt(offset)] = BigInt(val)
        break
      case '2':
        this.memory[BigInt(this.memory[this.pointer + BigInt(offset)]) +
          BigInt(this.relativeBase)] = BigInt(val)
        break
      default:
        throw new Error(`Unknown mode: ${paramMode}`)
    }
  }

  * runner () {
    let runOutputs = []
    const run = this.run()
    let result = run.next()
    let userInput = []

    while (!result.done) {
      if (result.value !== undefined && !result.done) {
        runOutputs.push(result.value)
      }
      // Input required - supply it from the caller with a next(VAL)
      if (result.value === undefined) {
        let val = userInput.shift()
        if (val === undefined) {
          val = yield runOutputs
          // reset runOutputs so not all outputs are continually sent back
          runOutputs = []
          userInput = userInput.concat(val)
          result = run.next(userInput.shift())
        } else {
          result = run.next(val)
        }
      } else {
        result = run.next()
      }
    }

    return result.value
  }

  * run () {
    const outputs = []
    let fullOpcode = this.padOpcode()
    let opcode = fullOpcode.slice(3)

    while (true) {
      let val
      const [val1, val2] = this.getValues(fullOpcode)
      switch (opcode) {
        case '01':
          val = BigInt(val1) + BigInt(val2)
          this.setValue(fullOpcode.slice(0, 1), val, 3)
          this.pointer += BigInt(4)
          break
        case '02':
          val = BigInt(val1) * BigInt(val2)
          this.setValue(fullOpcode.slice(0, 1), val, 3)
          this.pointer += BigInt(4)
          break
        case '03':
          val = this.inputs.shift()
          if (val === undefined) {
            val = yield
          }
          this.setValue(fullOpcode.slice(2, 3), val, 1)
          this.pointer += BigInt(2)
          break
        case '04':
          this.pointer += BigInt(2)
          outputs.push(BigInt(val1))
          yield val1
          break
        case '05':
          if (BigInt(val1) !== BigInt(0)) {
            this.pointer = BigInt(val2)
          } else {
            this.pointer += BigInt(3)
          }
          break
        case '06':
          if (BigInt(val1) === BigInt(0)) {
            this.pointer = BigInt(val2)
          } else {
            this.pointer += BigInt(3)
          }
          break
        case '07':
          val = BigInt(val1) < BigInt(val2) ? BigInt(1) : BigInt(0)
          this.setValue(fullOpcode.slice(0, 1), val, 3)
          this.pointer += BigInt(4)
          break
        case '08':
          val = BigInt(val1) === BigInt(val2) ? BigInt(1) : BigInt(0)
          this.setValue(fullOpcode.slice(0, 1), val, 3)
          this.pointer += BigInt(4)
          break
        case '09':
          this.relativeBase += BigInt(val1)
          this.pointer += BigInt(2)
          break
        case '99':
          return outputs
        default:
          throw new Error(`Unknown opcode: ${opcode}`)
      }
      fullOpcode = this.padOpcode()
      opcode = fullOpcode.slice(3)
    }
  }
}

module.exports = {
  Comp
}
