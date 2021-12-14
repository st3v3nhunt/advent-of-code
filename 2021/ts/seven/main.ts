import { solve, test } from "../lib/runner.ts";

async function run() {
  const day = "seven";
  await test(day, 1, partOne, 37);
  await solve(day, 1, partOne, 353800);
  await test(day, 2, partTwo, 168);
  await solve(day, 2, partTwo, 98119739);
}

function partOne(input: Array<string>): number {
  const crabPositions = input[0].split(",").map((x) => parseInt(x, 10));
  const maxPositions = Math.max(...crabPositions);
  const fuelCounts = [];

  for (let position = 0; position < maxPositions; position++) {
    const fuel = crabPositions.reduce((runningTotal, crabPosition) => {
      return runningTotal + Math.abs(crabPosition - position);
    }, 0);
    fuelCounts.push(fuel);
  }
  return Math.min(...fuelCounts);
}

function partTwo(input: Array<string>): number {
  const crabPositions = input[0].split(",").map((x) => parseInt(x, 10));
  const maxPositions = Math.max(...crabPositions);
  const fuelCounts = [];

  const fuelCosts = [0];
  for (let i = 1; i <= maxPositions; i++) {
    fuelCosts.push(i + fuelCosts[i - 1]);
  }

  for (let position = 0; position < maxPositions; position++) {
    const fuel = crabPositions.reduce((runningTotal, crabPosition) => {
      const moves = Math.abs(crabPosition - position);
      return runningTotal + fuelCosts[moves];
    }, 0);
    fuelCounts.push(fuel);
  }
  return Math.min(...fuelCounts);
}

await run();
