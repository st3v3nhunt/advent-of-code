import { solve, test } from "../lib/runner.ts";

async function run() {
  const day = "eight";
  await test(day, 1, partOne, 26);
  await solve(day, 1, partOne, 369);
  await test(day, 2, partTwo, 61229);
  await solve(day, 2, partTwo, 1031553);
}

function partOne(input: Array<string>): number {
  const uniqueCodedOutputLengths = [2, 3, 4, 7];
  let uniqueCodedOutputsInInput = 0;
  input.forEach((line) =>
    line
      .split("| ")[1]
      .split(" ")
      .forEach((codedOutput) => {
        if (uniqueCodedOutputLengths.includes(codedOutput.length)) {
          uniqueCodedOutputsInInput++;
        }
      })
  );
  return uniqueCodedOutputsInInput;
}

function isSubset(a1: string, a2: string) {
  return a2.split("").every((x) => a1.split("").includes(x));
}

function partTwo(input: Array<string>): number {
  return input.reduce((sum, line) => {
    const [patterns, output] = line.split(" | ");
    const codedDigits = patterns
      .split(" ")
      .map((x) => x.split("").sort().join(""));
    const codedOutput = output
      .split(" ")
      .map((x) => x.split("").sort().join(""));

    const numbers = new Array(10);
    numbers[1] = codedDigits.find((x) => x.length === 2) ?? "";
    numbers[8] = codedDigits.find((x) => x.length === 7) ?? "";
    const four = codedDigits.find((x) => x.length === 4) ?? "";
    numbers[4] = four;
    const seven = codedDigits.find((x) => x.length === 3) ?? "";
    numbers[7] = seven;

    const zeroSixOrNine = codedDigits.filter((x) => x.length === 6);
    const nine = zeroSixOrNine.find((x) => isSubset(x, four)) ?? "";
    numbers[9] = nine;
    const zeroOrSix = zeroSixOrNine.filter((x) => x !== nine);
    const zero = zeroOrSix.find((x) => isSubset(x, seven)) ?? "";
    numbers[0] = zero;
    numbers[6] = zeroOrSix.find((x) => x !== zero) ?? "";

    const twoThreeOrFive = codedDigits.filter((x) => x.length === 5);
    const three = twoThreeOrFive.find((x) => isSubset(x, seven)) ?? "";
    numbers[3] = three;
    const twoOrFive = twoThreeOrFive.filter((x) => x !== three);
    twoOrFive.forEach((x) => {
      const count = four
        .split("")
        .reduce((p, c) => (x.split("").includes(c) ? p + 1 : p), 0);

      if (count === 3) {
        numbers[5] = x;
      } else {
        numbers[2] = x;
      }
    });

    return (sum += parseInt(
      codedOutput.map((x) => numbers.indexOf(x)).join(""),
      10
    ));
  }, 0);
}

await run();
