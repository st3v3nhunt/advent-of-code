import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";
import { getInputAsLines } from "../lib/utils.ts";

async function getInput(): Promise<Array<string>> {
  return await getInputAsLines("three");
}

async function run() {
  const input = await getInput();
  console.time("part 1 duration");
  const answerOne = partOne(input);
  console.timeEnd("part 1 duration");
  const expectedOne = 1131506;
  console.log(
    `part 1 answers. expected: ${expectedOne}, actual: ${answerOne}.`
  );
  assertEquals(answerOne, expectedOne);

  console.time("part 2 duration");
  const answerTwo = partTwo(input);
  console.timeEnd("part 2 duration");
  const expectedTwo = 7863147;
  console.log(
    `part 2 answers. expected: ${expectedTwo}, actual: ${answerTwo}.`
  );
  assertEquals(answerTwo, expectedTwo);
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
      gammaBits.push(0);
      epsilonBits.push(1);
    } else {
      gammaBits.push(1);
      epsilonBits.push(0);
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
