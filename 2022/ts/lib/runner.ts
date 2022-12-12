import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";

async function getDayInputAsLines(
  day: string,
  path: string,
  trim = true,
): Promise<Array<string>> {
  return trim
    ? (await Deno.readTextFile(`../${path}/${day}.txt`)).trimEnd().split("\n")
    : (await Deno.readTextFile(`../${path}/${day}.txt`)).split("\n");
}

export async function getInputAsLines(
  day: string,
  trim?: boolean,
): Promise<Array<string>> {
  return await getDayInputAsLines(day, "input", trim);
}

export async function getTestInputAsLines(
  day: string,
  trim?: boolean,
): Promise<Array<string>> {
  return await getDayInputAsLines(day, "input/test", trim);
}

export async function solve(
  day: string,
  part: number,
  solver: (input: Array<string>) => number | string | Array<string>,
  expected: number | string | Array<string>,
  trim?: boolean
) {
  const input = await getInputAsLines(day, trim);
  console.time(`Day ${day}, part ${part} duration`);
  const answerTwo = solver(input);
  console.timeEnd(`Day ${day}, part ${part} duration`);
  console.log(
    `Day ${day}, part ${part} answers. Expected: ${expected}. Got: ${answerTwo}.`,
  );
  assertEquals(answerTwo, expected);
}

export async function test(
  day: string,
  part: number,
  solver: (input: Array<string>) => number | string | Array<string>,
  expected: number | string | Array<string>,
  trim?: boolean
) {
  const input = await getTestInputAsLines(day, trim);
  console.time(`[TEST] Day ${day}, part ${part} duration`);
  const answerTwo = solver(input);
  console.timeEnd(`[TEST] Day ${day}, part ${part} duration`);
  console.log(
    `[TEST] Day ${day}, part ${part} answers. Expected: ${expected}. Got: ${answerTwo}.`,
  );
  assertEquals(answerTwo, expected);
}
