import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";
import { getInputAsLines } from "../lib/utils.ts";

async function getInput(): Promise<Array<string>> {
  return await getInputAsLines("one");
}

async function run() {
  const input = await getInput();
  console.time("part 1 duration");
  const answerOne = partOne(input);
  console.timeEnd("part 1 duration");
  const expectedOne = 1316;
  console.log(
    `part 1 answers. expected: ${expectedOne}, actual: ${answerOne}.`
  );
  assertEquals(answerOne, expectedOne);

  console.time("part 2 duration");
  const answerTwo = partTwo(input);
  console.timeEnd("part 2 duration");
  const expectedTwo = 1344;
  console.log(
    `part 2 answers. expected: ${expectedTwo}, actual: ${answerTwo}.`
  );
  assertEquals(answerTwo, expectedTwo);
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
