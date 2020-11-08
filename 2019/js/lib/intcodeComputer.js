function padOpcode (opcode) {
  return opcode.toString().padStart(5, 0)
}

function getValues (codes, fullOpcode, pointer) {
  const mode1 = fullOpcode.slice(2, 3)
  const mode2 = fullOpcode.slice(1, 2)
  const val1 = mode1 === '1' ? codes[pointer + 1] : codes[codes[pointer + 1]]
  const val2 = mode2 === '1' ? codes[pointer + 2] : codes[codes[pointer + 2]]
  return [parseInt(val1, 10), parseInt(val2, 10)]
}

function * process (program, inputs) {
  const codes = program.split(',')
  const outputs = []
  let pointer = 0
  let fullOpcode = padOpcode(codes[pointer])
  let opcode = fullOpcode.slice(3)
  // let a;

  while (opcode !== '99') {
    let val
    const [val1, val2] = getValues(codes, fullOpcode, pointer)
    switch (opcode) {
      case '01':
        codes[codes[pointer + 3]] = val1 + val2
        pointer += 4
        break
      case '02':
        codes[codes[pointer + 3]] = val1 * val2
        pointer += 4
        break
      case '03':
        val = inputs.shift()
        if (!val) {
          val = yield
        }
        // a = yield;
        codes[codes[pointer + 1]] = val
        pointer += 2
        break
      case '04':
        outputs.push(val1)
        pointer += 2
        break
      case '05':
        if (val1 !== 0) {
          pointer = val2
        } else {
          pointer += 3
        }
        break
      case '06':
        if (val1 === 0) {
          pointer = val2
        } else {
          pointer += 3
        }
        break
      case '07':
        codes[codes[pointer + 3]] = val1 < val2 ? 1 : 0
        pointer += 4
        break
      case '08':
        codes[codes[pointer + 3]] = val1 === val2 ? 1 : 0
        pointer += 4
        break
      case '99':
        break
      default:
        throw new Error(`Unknown opcode: ${opcode}`)
    }
    fullOpcode = padOpcode(codes[pointer])
    opcode = fullOpcode.slice(3)
  }
  return [outputs, opcode, codes.join(',')]
}

module.exports = {
  process
}
