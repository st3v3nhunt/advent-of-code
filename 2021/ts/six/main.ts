import { solve, test } from "../lib/utils.ts";

async function run() {
  const day = "six";
  await test(day, 1, partOne, 5934);
  await solve(day, 1, partOne, 388419);
  await test(day, 2, partTwo, 26984457539);
  await solve(day, 2, partTwo, 1740449478328);
}

// Naive
// function calculateFishAfterDays(fish: Array<number>, duration: number): number {
//   for (let day = 0; day < duration; day++) {
//     const newFish = [];
//     for (let i = 0; i < fish.length; i++) {
//       if (fish[i] === 0) {
//         fish[i] = 6;
//         newFish.push(8);
//       } else {
//         fish[i]--;
//       }
//     }
//     fish = fish.concat(newFish);
//   }
//   return fish.length;
// }

function calculateFishAfterDays(fish: Array<number>, duration: number): number {
  let fishAges = new Map();
  fish.forEach((x) => {
    const age = fishAges.get(x);
    if (age >= 0) {
      fishAges.set(x, age + 1);
    } else {
      fishAges.set(x, 1);
    }
  });

  for (let day = 0; day < duration; day++) {
    const tempFishAges = new Map();
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
  let sum = 0;
  fishAges.forEach((v) => (sum += v));
  return sum;
}

function partOne(input: Array<string>): number {
  const fish = input[0].split(",").map((x) => parseInt(x, 10));
  return calculateFishAfterDays(fish, 80);
}

function partTwo(input: Array<string>): number {
  const fish = input[0].split(",").map((x) => parseInt(x, 10));
  return calculateFishAfterDays(fish, 256);
}

await run();
