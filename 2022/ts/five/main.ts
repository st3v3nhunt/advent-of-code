import { solve, test } from "../lib/runner.ts";

async function run() {
  const day = "five";
  await test(day, 1, partOneTest, "CMZ");
  await solve(day, 1, partOneReal, "FZCMJCRHZ");
  await test(day, 2, partTwoTest, "MCD");
  await solve(day, 2, partTwoReal, "JSDHQMZGF");
}

const testStacks: Array<Array<string>> = [];
testStacks.push(["Z", "N"]);
testStacks.push(["M", "C", "D"]);
testStacks.push(["P"]);

const realStacks: Array<Array<string>> = [];
realStacks.push(["R", "S", "L", "F", "Q"]);
realStacks.push(["N", "Z", "Q", "G", "P", "T"]);
realStacks.push(["S", "M", "Q", "B"]);
realStacks.push(["T", "G", "Z", "J", "H", "C", "B", "Q"]);
realStacks.push(["P", "H", "M", "B", "N", "F", "S"]);
realStacks.push(["P", "C", "Q", "N", "S", "L", "V", "G"]);
realStacks.push(["W", "C", "F"]);
realStacks.push(["Q", "H", "G", "Z", "W", "V", "P", "M"]);
realStacks.push(["G", "Z", "D", "L", "C", "N", "R"]);

function clone(obj: Array<Array<string>>): Array<Array<string>> {
  return JSON.parse(JSON.stringify(obj));
}

function partOneTest(input: Array<string>): string {
  return partOne(input.slice(5), clone(testStacks));
}

function partOneReal(input: Array<string>): string {
  return partOne(input.slice(10), clone(realStacks));
}

function partTwoTest(input: Array<string>): string {
  return partTwo(input.slice(5), testStacks);
}

function partTwoReal(input: Array<string>): string {
  return partTwo(input.slice(10), realStacks);
}

function partOne(input: Array<string>, stacks: Array<Array<string>>): string {
  for (let i = 0; i < input.length; i++) {
    const x = input[i];
    const info = x.split(" ");
    const count = parseInt(info[1], 10);
    const source = parseInt(info[3], 10);
    const target = parseInt(info[5], 10);
    for (let j = 0; j < count; j++) {
      const item: string = stacks[source - 1].pop()!;
      stacks[target - 1].push(item);
    }
  }
  const topCrates = stacks.map((x) => x.pop());
  return topCrates.join("");
}

function partTwo(input: Array<string>, stacks: Array<Array<string>>): string {
  for (let i = 0; i < input.length; i++) {
    const x = input[i];
    const info = x.split(" ");
    const count = parseInt(info[1], 10);
    const source = parseInt(info[3], 10);
    const target = parseInt(info[5], 10);
    const len = stacks[source - 1].length;
    const crates = stacks[source - 1].splice(len - count, count);
    stacks[target - 1] = stacks[target - 1].concat(crates);
  }
  const topCrates = stacks.map((x) => x.pop());
  return topCrates.join("");
}

await run();
