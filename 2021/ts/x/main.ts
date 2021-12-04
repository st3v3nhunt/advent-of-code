import { solve, test } from "../lib/utils.ts";

async function run() {
  const day = "x";
  await test(day, partOne, 1);
  await solve(day, partOne, 1);
  await test(day, partTwo, 1);
  await solve(day, partTwo, 1);
}

function partOne(input: Array<string>): number {
  return input.length;
}

function partTwo(input: Array<string>): number {
  return input.length;
}

await run();
