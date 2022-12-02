import { solve, test } from "../lib/runner.ts";

async function run() {
  const day = "one";
<<<<<<< HEAD
  await test(day, 1, partOne, 0);
  await solve(day, 1, partOne, 0);
  await test(day, 2, partTwo, 0);
  await solve(day, 2, partTwo, 0);
}

function partOne(input: Array<string>): number {
  return input.length;
}

function partTwo(input: Array<string>): number {
  return input.length;
=======
  await test(day, 1, partOne, 24000);
  await solve(day, 1, partOne, 69177);
  await test(day, 2, partTwo, 45000);
  await solve(day, 2, partTwo, 207456);
}

function sortElves (input: Array<string>): Array<number> {
  const elves: Array<number> = []
  let i = 0
  input.forEach((x) => {
    if (x) {
      const val = elves[i]
      if (val) {
        elves[i] += parseInt(x)
      } else {
        elves.push(parseInt(x))
      }
    } else {
      i++
    }
  })

  elves.sort((a, b) => a - b)
  return elves
}

function partOne(input: Array<string>): number {
  return sortElves(input).pop() ?? 0
}

function partTwo(input: Array<string>): number {
  const elves = sortElves(input)
  return elves.pop() + elves.pop() + elves.pop()
>>>>>>> temp
}

await run();
