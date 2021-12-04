import { solve, test } from "../lib/utils.ts";

async function run() {
  const day = "three";
  await test(day, partOne, 198);
  await solve(day, partOne, 1131506);
  await test(day, partTwo, 230);
  await solve(day, partTwo, 7863147);
}

function countBitsAtPosition(
  input: Array<Array<number>>,
  bitPosition: number
): Array<number> {
  let zeros = 0;
  let ones = 0;
  input.forEach((val) => {
    if (val[bitPosition] === 0) {
      zeros++;
    } else {
      ones++;
    }
  });
  return [zeros, ones];
}

function partOne(inputRaw: Array<string>): number {
  const input = inputRaw.map((val) => val.split("").map((x) => parseInt(x, 2)));
  const gammaBits: Array<number> = [];
  const epsilonBits: Array<number> = [];
  const bitPositions = input[0].length;
  for (let i = 0; i < bitPositions; i++) {
    const [zeros, ones] = countBitsAtPosition(input, i);
    if (ones >= zeros) {
      gammaBits.push(1);
      epsilonBits.push(0);
    } else {
      gammaBits.push(0);
      epsilonBits.push(1);
    }
  }

  const gammaRate = parseInt(gammaBits.join(""), 2);
  const epsilonRate = parseInt(epsilonBits.join(""), 2);
  return gammaRate * epsilonRate;
}

function getRating(
  input: Array<Array<number>>,
  bitPrecedence: Array<number>
): number {
  let ratings = [...input];
  let i = 0;
  while (ratings.length > 1) {
    const [zeros, ones] = countBitsAtPosition(ratings, i);
    const candidateRatings: Array<Array<number>> = [];
    ratings.forEach((val) => {
      const bit = val[i];
      if (ones >= zeros) {
        if (bit === bitPrecedence[0]) {
          candidateRatings.push(val);
        }
      } else if (ones < zeros) {
        if (bit === bitPrecedence[1]) {
          candidateRatings.push(val);
        }
      }
    });
    ratings = candidateRatings;
    i++;
  }
  return parseInt(ratings.flat().join(""), 2);
}

function partTwo(inputRaw: Array<string>): number {
  const input = inputRaw.map((val) => val.split("").map((x) => parseInt(x, 2)));

  const o2 = getRating(input, [1, 0]);
  const co2 = getRating(input, [0, 1]);
  return o2 * co2;
}

await run();
