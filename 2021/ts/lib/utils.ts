async function getDayInputAsLines(day: string, path: string): Promise<Array<string>> {
  return (await Deno.readTextFile(`../${path}/${day}.txt`)).trim().split('\n');
}

export async function getInputAsLines(day: string): Promise<Array<string>> {
  return await getDayInputAsLines(day, 'input')
}

export async function getTestInputAsLines(day: string): Promise<Array<string>> {
  return await getDayInputAsLines(day, 'input/test')
}
