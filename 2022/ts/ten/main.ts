import { solve, test } from "../lib/runner.ts";

async function run() {
  const day = "ten";
  await test(day, 1, partOne, 13140);
  await solve(day, 1, partOne, 14720);
  await test(
    day,
    2,
    partTwo,
    [
      "##..##..##..##..##..##..##..##..##..##..",
      "###...###...###...###...###...###...###.",
      "####....####....####....####....####....",
      "#####.....#####.....#####.....#####.....",
      "######......######......######......####",
      "#######.......#######.......#######.....",
    ],
  );
  await solve(
    day,
    2,
    partTwo,
    [
      "####.####.###..###..###..####.####.####.",
      "#.......#.#..#.#..#.#..#.#.......#.#....",
      "###....#..###..#..#.###..###....#..###..",
      "#.....#...#..#.###..#..#.#.....#...#....",
      "#....#....#..#.#....#..#.#....#....#....",
      "#....####.###..#....###..#....####.#....",
    ],
  );
}

function addSignalStrength(
  X: number,
  cycle: number,
  signalStrengths: Array<number>,
) {
  if ((cycle - 20) % 40 === 0) {
    signalStrengths.push(X * cycle);
  }
}

function drawScreen(X: number, cycle: number, screen: Array<Array<string>>) {
  let pixel = ".";
  const pos = (cycle - 1) % 40;
  if (pos === X - 1 || pos === X || pos === X + 1) {
    pixel = "#";
  }
  const line = Math.floor((cycle - 1) / 40);
  screen[line].push(pixel);
}

function partOne(input: Array<string>): number {
  const signalStrengths: Array<number> = [];
  let X = 1;
  let cycle = 0;
  input.forEach((line) => {
    const [op, temp] = line.split(" ");
    const val = parseInt(temp, 10);
    cycle++;
    addSignalStrength(X, cycle, signalStrengths);
    switch (op) {
      case "noop":
        break;
      case "addx":
        cycle++;
        addSignalStrength(X, cycle, signalStrengths);
        X += val;
        break;
    }
  });
  return signalStrengths.reduce((a, b) => a + b, 0);
}

function partTwo(input: Array<string>): string[] {
  const screen: Array<Array<string>> = [[], [], [], [], [], []];
  let X = 1;
  let cycle = 0;
  input.forEach((line) => {
    const [op, temp] = line.split(" ");
    const val = parseInt(temp, 10);
    cycle++;
    drawScreen(X, cycle, screen);
    switch (op) {
      case "noop":
        break;
      case "addx":
        cycle++;
        drawScreen(X, cycle, screen);
        X += val;
        break;
    }
  });
  screen.forEach((x) => {
    console.log(x.join(""));
  });
  return screen.map((x) => x.join(""));
}

await run();
