import { solve, test } from "../lib/runner.ts";

async function run() {
  const day = "x";
  await test(day, 1, partOne, 1);
  await solve(day, 2, partOne, 1);
  await test(day, 1, partTwo, 1);
  await solve(day, 2, partTwo, 1);
}

function partOne(input: Array<string>): number {
  return input.length;
}

function partTwo(input: Array<string>): number {
  return input.length;
}

await run();
