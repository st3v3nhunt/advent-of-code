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

export async function solve(day: string, part: number, solver: Function, expected: number) {
  const input = await getInputAsLines(day);
  console.time(`part ${part} duration`);
  const answerTwo = solver(input);
  console.timeEnd(`part ${part} duration`);
  console.log(
    `part ${part} answers. expected: ${expected}, actual: ${answerTwo}.`
  );
  assertEquals(answerTwo, expected);
}

export async function test(day: string, part: number, solver: Function, expected: number) {
  const input = await getTestInputAsLines(day);
  console.time(`part ${part} test duration`);
  const answerTwo = solver(input);
  console.timeEnd(`part ${part} test duration`);
  console.log(
    `part ${part} answers. expected: ${expected}, actual: ${answerTwo}.`
  );
  assertEquals(answerTwo, expected);
}
