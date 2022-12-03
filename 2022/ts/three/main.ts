import { solve, test } from "../lib/runner.ts";

async function run() {
  const day = "three";
  await test(day, 1, partOne, 157);
  await solve(day, 1, partOne, 8202);
  await test(day, 2, partTwo, 70);
  await solve(day, 2, partTwo, 2864);
}

function calcPriority(char: string) {
  const code = char.charCodeAt(0) - 96;
  return code < 0 ? code + 58 : code
}

function partOne(input: Array<string>): number {
  let prioritySum = 0;
  input.forEach((x) => {
    const mid = x.length / 2;
    const first = x.slice(0, mid);
    const second = x.slice(mid);
    let sharedItem: string;
    first.split("").forEach((x) => {
      if (second.includes(x)) {
        sharedItem = x;
      }
    });
    const priority = calcPriority(sharedItem);
    prioritySum += priority;
  });
  return prioritySum;
}

function partTwo(input: Array<string>): number {
  let prioritySum = 0;
  for (let i = 0; i < input.length; i += 3) {
    const one = input[i];
    const two = input[i + 1];
    const three = input[i + 2];
    const sharedItems: Array<string> = [];
    one.split("").forEach((x) => {
      if (two.includes(x)) {
        sharedItems.push(x);
      }
    });
    let sharedItem: string;
    sharedItems.forEach((x) => {
      if (three.includes(x)) {
        sharedItem = x;
      }
    });
    const priority = calcPriority(sharedItem);
    prioritySum += priority;
  }
  return prioritySum;
}

await run();
