import { solve, test } from "../lib/utils.ts";

async function run() {
  const day = "six";
  await test(day, 1, partOne, 5934);
  await solve(day, 2, partOne, 388419);
  await test(day, 1, partTwo, 26984457539);
  await solve(day, 2, partTwo, 1740449478328);
}

function runSimulation(fish: Array<number>, duration: number): Map<number, number> {
  let fishAges = new Map<number, number>();
  fish.forEach((x) => {
    const age = fishAges.get(x) ?? 0;
      fishAges.set(x, age + 1);
  });

  for (let day = 0; day < duration; day++) {
    const tempFishAges = new Map<number, number>();
    let newFish = 0;
    fishAges.forEach((count, age) => {
      if (age === 0) {
        tempFishAges.set(6, count);
        newFish = count;
      } else {
        const existingYoungerCount = tempFishAges.get(age - 1);
        if (existingYoungerCount) {
          count += existingYoungerCount;
        }
        tempFishAges.set(age - 1, count);
      }
    });
    if (newFish > 0) {
      tempFishAges.set(8, newFish);
    }
    fishAges = tempFishAges;
  }
  return fishAges
}

function countFish(fishAges: Map<number, number>): number {
  let sum = 0;
  fishAges.forEach((v) => (sum += v));
  return sum;
}

function partOne(input: Array<string>): number {
  const initialPopulation = input[0].split(",").map((x) => parseInt(x, 10));
  const fishAges = runSimulation(initialPopulation, 80);
  return countFish(fishAges)
}

function partTwo(input: Array<string>): number {
  const initialPopulation = input[0].split(",").map((x) => parseInt(x, 10));
  const fishAges = runSimulation(initialPopulation, 256);
  return countFish(fishAges)
}

await run();
