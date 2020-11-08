// const assert = require('assert')
// const { hasLos } = require('../lib/utils');

function getEdges (width, height) {
  const edges = []
  for (let w = 0; w < width; w++) {
    for (let h = 0; h < height; h++) {
      if (w === 0 || w === width - 1 || h === 0 || h === height - 1) {
        edges.push([w, h])
      }
    }
  }
  return edges
}
const edges = getEdges(5, 5)
console.log(edges)
console.log(edges.length)
// try {
//   assert(hasLos([0, 0], [1, 0]), true);
// } catch (err) {
//   console.log(err);
// }
