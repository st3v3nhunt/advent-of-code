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

export async function solve(day: string, part: number, solver: (input: Array<string>) => number, expected: number) {
  const input = await getInputAsLines(day);
  console.time(`Day ${day}, part ${part} duration`);
  const answerTwo = solver(input);
  console.timeEnd(`Day ${day}, part ${part} duration`);
  console.log(
    `Day ${day}, part ${part} answers. Expected: ${expected}. Got: ${answerTwo}.`
  );
  assertEquals(answerTwo, expected);
}

export async function test(day: string, part: number, solver: (input: Array<string>) => number, expected: number) {
  const input = await getTestInputAsLines(day);
  console.time(`[TEST] Day ${day}, part ${part} duration`);
  const answerTwo = solver(input);
  console.timeEnd(`[TEST] Day ${day}, part ${part} duration`);
  console.log(
    `[TEST] Day ${day}, part ${part} answers. Expected: ${expected}. Got: ${answerTwo}.`
  );
  assertEquals(answerTwo, expected);
}
