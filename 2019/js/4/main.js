function findPossiblePasswords (input) {
  const [min, max] = input.split('-')
  let part1Count = 0
  let part2Count = 0

  let password = Number(min)
  while (password <= max) {
    const chars = password.toString().split('')
    let count = 1
    let charsIncrease = true

    const d = { }
    d[chars[0]] = 1
    for (let j = 1; j < chars.length; j++) {
      const cur = chars[j]
      const prev = chars[j - 1]
      if (prev > cur) {
        charsIncrease = false
        break
      }
      if (prev === cur) {
        count += 1
      }
      if (d[cur]) {
        d[cur] += 1
      } else {
        d[cur] = 1
      }
    }

    if (count >= 2 && charsIncrease) {
      part1Count += 1
    }

    if (Object.values(d).includes(2) && charsIncrease) {
      part2Count += 1
    }
    password += 1
  }
  return {
    part1: part1Count,
    part2: part2Count
  }
}

function answers () {
  const input = '236491-713787'
  return findPossiblePasswords(input)
}

module.exports = {
  answers
}
