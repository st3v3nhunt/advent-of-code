import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";

async function getDayInputAsLines(day: string, path: string): Promise<Array<string>> {
  return (await Deno.readTextFile(`../${path}/${day}.txt`)).trim().split('\n');
}

export async function getInputAsLines(day: string): Promise<Array<string>> {
  return await getDayInputAsLines(day, 'input')
}

export async function getTestInputAsLines(day: string): Promise<Array<string>> {
  return await getDayInputAsLines(day, 'input/test')
}

export async function solve(day: string, solver: (input: Array<string>) => number, expected: number) {
  const input = await getInputAsLines(day);
  console.time(`part ${day} duration`);
  const answerTwo = solver(input);
  console.timeEnd(`part ${day} duration`);
  console.log(
    `part ${day} answers. expected: ${expected}, actual: ${answerTwo}.`
  );
  assertEquals(answerTwo, expected);
}

export async function test(day: string, solver: (input: Array<string>) => number, expected: number) {
  const input = await getTestInputAsLines(day);
  console.time(`part ${day} test duration`);
  const answerTwo = solver(input);
  console.timeEnd(`part ${day} test duration`);
  console.log(
    `part ${day} answers. expected: ${expected}, actual: ${answerTwo}.`
  );
  assertEquals(answerTwo, expected);
}
