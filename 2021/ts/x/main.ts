import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";
import { getDayInputAsLines } from "../lib/utils.ts";

async function getInput(): Promise<Array<string>> {
  // TODO: Update day number.
  return await getDayInputAsLines("x");
}

async function run() {
  const input = await getInput();
  console.time("part 1 duration");
  const answerOne = partOne(input);
  console.timeEnd("part 1 duration");
  // TODO: Update expected answer when known.
  const expectedOne = 0;
  console.log(
    `part 1 answers. expected: ${expectedOne}, actual: ${answerOne}.`
  );
  assertEquals(answerOne, expectedOne);

  console.time("part 2 duration");
  const answerTwo = partTwo(input);
  console.timeEnd("part 2 duration");
  // TODO: Update expected answer when known.
  const expectedTwo = 0;
  console.log(
    `part 2 answers. expected: ${expectedTwo}, actual: ${answerTwo}.`
  );
  assertEquals(answerTwo, expectedTwo);
}

function partOne(input: Array<string>): number {
  return input.length;
}

function partTwo(input: Array<string>): number {
  return input.length;
}

await run();
