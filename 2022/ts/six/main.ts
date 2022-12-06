import { solve, test } from "../lib/runner.ts";

async function run() {
  const day = "six";
  await test(day, 1, partOne, 7);
  await solve(day, 1, partOne, 1965);
  await test(day, 2, partTwo, 19);
  await solve(day, 2, partTwo, 2773);
}

function uniqueEntries(input: Array<string>): boolean {
  return new Set(input).size === input.length;
}

function partOne(input: Array<string>): number {
  return findMarker(input[0].split(""), 4)
}

function partTwo(input: Array<string>): number {
  return findMarker(input[0].split(""), 14)
}

function findMarker(line: Array<string>, distinctChars: number): number {
  const view: Array<string> = line.splice(0, distinctChars);

  if (uniqueEntries(view)) {
    return distinctChars;
  }

  for (let i = 0; i < line.length; i++) {
    view.shift();
    view.push(line[i]);
    if (uniqueEntries(view)) {
      return i + distinctChars + 1;
    }
  }
  return 0;
}

await run();
