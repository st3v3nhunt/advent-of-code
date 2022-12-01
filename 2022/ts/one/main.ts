import { solve, test } from "../lib/runner.ts";

async function run() {
  const day = "one";
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
}

await run();
