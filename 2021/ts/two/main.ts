import { Direction, getInstruction } from "./instruction.ts";
import { solve, test } from "../lib/utils.ts";

async function run() {
  const day = "two";
  await test(day, partOne, 150);
  await solve(day, partOne, 2039912);
  await test(day, partTwo, 900);
  await solve(day, partTwo, 1942068080);
}

function partOne(input: Array<string>): number {
  let horizontal = 0;
  let depth = 0;
  input.forEach((val) => {
    const ins = getInstruction(val);
    switch (ins.direction) {
      case Direction.Forward:
        horizontal += ins.value;
        break;
      case Direction.Down:
        depth += ins.value;
        break;
      case Direction.Up:
        depth -= ins.value;
        break;
      default:
        console.error("Unknown direction", ins.direction);
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
      case Direction.Forward:
        horizontal += value;
        depth += aim * value;
        break;
      case Direction.Down:
        aim += value;
        break;
      case Direction.Up:
        aim -= value;
        break;
      default:
        console.error("Unknown direction", direction);
    }
  });
  return horizontal * depth;
}

await run();
