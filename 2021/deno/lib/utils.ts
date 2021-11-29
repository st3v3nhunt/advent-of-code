export async function getDayInputAsLines(day: string): Promise<Array<string>> {
  return (await Deno.readTextFile(`../input/${day}.txt`)).trim().split('\n');
}
