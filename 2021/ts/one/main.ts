import { solve, test } from "../lib/utils.ts";

async function run() {
  const day = "one";
  await test(day, 1, partOne, 7);
  await solve(day, 2, partOne, 1316);
  await test(day, 1, partTwo, 5);
  await solve(day, 2, partTwo, 1344);
}

function partOne(input: Array<string>): number {
  const numbers = input.map((x) => parseInt(x, 10));
  let increment = 0;
  for (let i = 1; i < numbers.length; i++) {
    if (numbers[i] > numbers[i - 1]) {
      increment++;
    }
  }
  return increment;
}

function partTwo(input: Array<string>): number {
  const numbers = input.map((x) => parseInt(x, 10));
  let increment = 0;
  for (let i = 3; i < numbers.length; i++) {
    const prev = numbers[i - 1] + numbers[i - 2] + numbers[i - 3];
    const curr = numbers[i] + numbers[i - 1] + numbers[i - 2];
    if (curr > prev) {
      increment++;
    }
  }
  return increment;
}

await run();
