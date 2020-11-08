const assert = require('assert')
const { getPattern } = require('./utils')

// const zerofour = getPattern(0, 4);
// assert.deepEqual(zerofour, [1, 0, -1, 0]);

// const zeroeight = getPattern(0, 8);
// assert.deepEqual(zeroeight, [1, 0, -1, 0, 1, 0, -1, 0]);

// const oneeight = getPattern(1, 8);
// assert.deepEqual(oneeight, [0, 1, 1, 0, 0, -1, -1, 0]);

const three8 = getPattern(2, 8)
assert.deepEqual(three8, [0, 0, 1, 1, 1, 0, 0, 0])

// idx is the index of the signal
// pos is the index of the number being calculated
function test (element, pos) {
  const basePattern = [0, 1, 0, -1]
  // const patpos = (idx + 1 * pos) % 4;
  // const patpos = (Math.round(pos / (idx + 1)) % 4) - 1;
  const patpos = (Math.round(((element + 1) / pos)) % 4) - 1 // - 1;
  console.log(`index: ${patpos}`)
  return basePattern[patpos]
}

// assert.equal(test(0, 1), 1);
assert.equal(test(1, 1), 1)
assert.equal(test(2, 1), 0)
assert.equal(test(3, 1), -1)
assert.equal(test(4, 1), 0)
assert.equal(test(5, 1), 1)
assert.equal(test(6, 1), 0)
assert.equal(test(7, 1), -1)
assert.equal(test(8, 1), 0)
// what is factor of first pos (0) for the 2nd number? - 0
// assert.equal(test(0, 2), 0); // needs index 0
assert.equal(test(1, 2), 0) // needs index 1
assert.equal(test(2, 2), 1) // needs index 1
assert.equal(test(3, 2), 1) // needs index 2
assert.equal(test(4, 2), 0) // needs index 2
assert.equal(test(5, 2), 0) // needs index 3
assert.equal(test(6, 2), -1) // needs index 3
assert.equal(test(7, 2), -1) // needs index 0
assert.equal(test(8, 2), 0) // needs index 0
// what is factor of ninth pos (8) for the 2nd number? - -1
// assert.equal(test(2, 8), 0);
