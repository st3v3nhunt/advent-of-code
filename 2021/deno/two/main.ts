import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";
import { getDayInputAsLines } from "../lib/utils.ts";

async function getInput(): Promise<Array<string>> {
  return await getDayInputAsLines("two");
}

async function run() {
  const input = await getInput();
  console.time("part 1 duration");
  const answerOne = partOne(input);
  console.timeEnd("part 1 duration");
  const expectedOne = 2039912;
  console.log(
    `part 1 answers. expected: ${expectedOne}, actual: ${answerOne}.`
  );
  assertEquals(answerOne, expectedOne);

  console.time("part 2 duration");
  const answerTwo = partTwo(input);
  console.timeEnd("part 2 duration");
  const expectedTwo = 1942068080
  console.log(
    `part 2 answers. expected: ${expectedTwo}, actual: ${answerTwo}.`
  );
  assertEquals(answerTwo, expectedTwo);
}

function partOne(input: Array<string>): number {
  let horizontal = 0;
  let depth = 0;
  input.forEach((val) => {
    const [direction, rawValue] = val.split(" ");
    const value = parseInt(rawValue, 10);
    switch (direction) {
      case "forward":
        horizontal += value;
        break;
      case "down":
        depth += value;
        break;
      case "up":
        depth -= value;
        break;
      default:
        console.error("unknown directtion", direction);
    }
  });
  return horizontal * depth;
}

function partTwo(input: Array<string>): number {
  let horizontal = 0;
  let depth = 0;
  let aim = 0;
  input.forEach((val) => {
    const [direction, rawValue] = val.split(" ");
    const value = parseInt(rawValue, 10);
    switch (direction) {
      case "forward":
        horizontal += value;
        depth += aim*value
        break;
      case "down":
        aim += value;
        break;
      case "up":
        aim -= value;
        break;
      default:
        console.error("unknown directtion", direction);
    }
  });
  return horizontal * depth;
}

await run();
