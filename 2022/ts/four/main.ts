import { solve, test } from "../lib/runner.ts";

async function run() {
  const day = "four";
  await test(day, 1, partOne, 2);
  await solve(day, 1, partOne, 651);
  await test(day, 2, partTwo, 4);
  await solve(day, 2, partTwo, 956);
}

function processLine(line: string): Array<number> {
  const [first, second] = line.split(",");
  const [firstStart, firstEnd] = first.split("-").map((x) => parseInt(x));
  const [secondStart, secondEnd] = second.split("-").map((x) => parseInt(x));
  return [firstStart, firstEnd, secondStart, secondEnd];
}

function partOne(input: Array<string>): number {
  let fullyContained = 0;
  input.forEach((x) => {
    const [firstStart, firstEnd, secondStart, secondEnd] = processLine(x)
    if (
      firstStart >= secondStart && firstEnd <= secondEnd ||
      secondStart >= firstStart && secondEnd <= firstEnd
    ) {
      fullyContained++;
    }
  });
  return fullyContained;
}

function partTwo(input: Array<string>): number {
  let fullyContained = 0;
  input.forEach((x) => {
    const [firstStart, firstEnd, secondStart, secondEnd] = processLine(x)
    if (
      firstStart >= secondStart && firstStart <= secondEnd ||
      firstEnd >= secondEnd && firstEnd <= secondEnd ||
      secondStart >= firstStart && secondStart <= firstEnd ||
      secondEnd >= firstEnd && secondEnd <= firstEnd
    ) {
      fullyContained++;
    }
  });
  return fullyContained;
}

await run();
