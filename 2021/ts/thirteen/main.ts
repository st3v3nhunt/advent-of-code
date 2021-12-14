import { solve, test } from "../lib/runner.ts";

async function run() {
  const day = "thirteen";
  await test(day, 1, partOne, 17);
  await solve(day, 1, partOne, 763);
  await test(day, 2, partTwo, 16);
  await solve(day, 2, partTwo, 103); // RHALRCRA
}

interface Fold {
  direction: string;
  line: number;
}

function processInput(
  input: Array<string>
): { folds: Array<Fold>; map: Array<Array<string>> } {
  let maxX = 0;
  let maxY = 0;
  const folds: Array<Fold> = [];
  const coords: Array<Array<number>> = [];
  input.forEach((line) => {
    if (line === "") {
      return;
    }
    const lineSplit = line.split(",");
    if (lineSplit.length === 2) {
      const points = lineSplit.map((x) => parseInt(x, 10));
      coords.push(points);
      if (points[0] > maxX) {
        maxX = points[0];
      }
      if (points[1] > maxY) {
        maxY = points[1];
      }
    } else {
      const [direction, lines] = line.split(" ")[2].split("=");
      const position = parseInt(lines, 10);
      folds.push({ direction, line: position });
    }
  });
  maxX++;
  maxY++;

  const row = new Array(maxX).fill(".");
  const map = new Array(maxY);
  for (let i = 0; i < maxY; i++) {
    map[i] = [...row];
  }
  coords.forEach(([x, y]) => {
    map[y][x] = "#";
  });
  return { folds, map };
}

function foldUp(map: Array<Array<string>>, foldLine: number) {
  map.forEach((row, rowIndex) => {
    if (rowIndex > foldLine) {
      const rowToUpdate = 2 * foldLine - rowIndex;
      row.forEach((cell, columnIndex) => {
        if (cell === "#") {
          map[rowToUpdate][columnIndex] = "#";
        }
      });
    }
  });
  map.splice(foldLine);
}

function foldLeft(map: Array<Array<string>>, foldLine: number) {
  map.forEach((row) => {
    row.forEach((cell, columnIndex) => {
      if (columnIndex > foldLine) {
        const columnToUpdate = 2 * foldLine - columnIndex;
        if (cell === "#") {
          row[columnToUpdate] = "#";
        }
      }
    });
  });
  map.forEach((row) => row.splice(foldLine));
}

function fold(
  map: Array<Array<string>>,
  folds: Array<Fold>,
  foldCount: number
) {
  for (let f = 0; f < foldCount; f++) {
    const { direction, line: foldLine } = folds[f];
    if (direction === "y") {
      foldUp(map, foldLine);
    } else {
      foldLeft(map, foldLine);
    }
  }
}

function countHashes(map: Array<Array<string>>): number {
  return map.reduce(
    (rowAcc, row) =>
      rowAcc +
      row.reduce((cellAcc, cell) => (cell === "#" ? cellAcc + 1 : cellAcc), 0),
    0
  );
}

function partOne(input: Array<string>): number {
  const processedInput = processInput(input);
  const map = processedInput.map;
  const folds = processedInput.folds;

  fold(map, folds, 1);
  return countHashes(map);
}

function partTwo(input: Array<string>): number {
  const processedInput = processInput(input);
  const map = processedInput.map;
  const folds = processedInput.folds;

  fold(map, folds, folds.length);
  console.log("\n");
  map.forEach((line) => console.log(line.join("")));
  console.log("\nRHALRCRA");

  return countHashes(map);
}

await run();
