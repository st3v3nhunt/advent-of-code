import { solve, test } from "../lib/runner.ts";

async function run() {
  const day = "ten";
  await test(day, 1, partOne, 26397);
  await solve(day, 2, partOne, 311895);
  await test(day, 1, partTwo, 288957);
  await solve(day, 2, partTwo, 2904180541);
}

enum IllegalChars {
  ")" = 3,
  "]" = 57,
  "}" = 1197,
  ">" = 25137,
}

const open = ["(", "[", "{", "<"];
const close = [")", "]", "}", ">"];

function getCorruptChar(
  char: string,
  prevChars: Array<string>
): IllegalChars | undefined {
  if (open.includes(char)) {
    switch (char) {
      case "(":
        prevChars.push(")");
        break;
      case "[":
        prevChars.push("]");
        break;
      case "{":
        prevChars.push("}");
        break;
      case "<":
        prevChars.push(">");
        break;
    }
  } else if (close.includes(char)) {
    const prevChar = prevChars.pop();
    if (
      (char === ")" && prevChar !== ")") ||
      (char === "]" && prevChar !== "]") ||
      (char === "}" && prevChar !== "}") ||
      (char === ">" && prevChar !== ">")
    ) {
      return IllegalChars[char];
    }
  }
  return;
}

function calcLineScore(chars: Array<string>): number {
  return chars.reduce((p, char) => {
    let points = p * 5;
    switch (char) {
      case ")":
        return (points += 1);
      case "]":
        return (points += 2);
      case "}":
        return (points += 3);
      case ">":
        return (points += 4);
      default:
        return points;
    }
  }, 0);
}

function partOne(input: Array<string>): number {
  const corruptedCharValues: Array<number> = [];

  input.forEach((line) => {
    const prevChars: Array<string> = [];
    line.split("").forEach((char: string) => {
      const corruptChar = getCorruptChar(char, prevChars);
      if (corruptChar) {
        corruptedCharValues.push(corruptChar);
      }
    });
  });
  return corruptedCharValues.reduce((p, c) => p + c, 0);
}

function partTwo(input: Array<string>): number {
  const lineScores: Array<number> = [];
  input.forEach((line) => {
    const prevChars: Array<string> = [];
    let corrupt = false;
    line.split("").forEach((char: string) => {
      if (getCorruptChar(char, prevChars)) {
        corrupt = true;
        return;
      }
    });
    if (!corrupt) {
      lineScores.push(calcLineScore(prevChars.reverse()));
    }
  });
  lineScores.sort((a, b) => a - b);
  return lineScores[(lineScores.length - 1) / 2];
}

await run();
