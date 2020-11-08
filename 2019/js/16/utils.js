function getPattern (idx, reqPatLen) {
  const basePattern = [0, 1, 0, -1]
  // const basePat = '0,|1,|0,|-1,';

  const newPattern = []
  // this is quick and is an N operation
  basePattern.forEach((x) => {
    for (let i = 0; i < (idx + 1); i++) {
      newPattern.push(x)
    }
    console.log(newPattern.join())
  })

  // basePat.split('|').forEach((x) => {
  //   newPattern.push(x.repeat(idx + 1));
  //   console.log(newPattern.join());
  // });

  console.log(newPattern.join())

  let flattened
  if (reqPatLen + 1 > newPattern.length) {
    const holder = []
    holder.push(newPattern)
    const patDupes = reqPatLen / newPattern.length
    for (let i = 1; i < patDupes; i++) {
      holder.push(newPattern)
    }
    flattened = holder.flat()
  } else {
    flattened = newPattern
  }

  const num = flattened.shift()
  flattened.push(num)
  return flattened.slice(0, reqPatLen)
}

module.exports = {
  getPattern
}
