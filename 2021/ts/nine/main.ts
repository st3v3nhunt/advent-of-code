import { solve, test } from "../lib/utils.ts";

async function run() {
  const day = "nine";
  await test(day, 1, partOne, 15);
  await solve(day, 1, partOne, 478);
  await test(day, 2, partTwo, 1134);
  await solve(day, 2, partTwo, 1);
}

function calculateLowPoints(map: Array<Array<number>>): Array<number> {
  const [x, y] = [map[0].length, map.length];

  const lowPoints: Array<number> = [];
  for (let i = 0; i < y; i++) {
    for (let j = 0; j < x; j++) {
      const adjacentPoints = [];
      const pointToCheck = map[i][j];
      if (j > 0) {
        const leftPoint = map[i][j - 1];
        adjacentPoints.push(leftPoint);
      }
      if (j < x - 1) {
        const rightPoint = map[i][j + 1];
        adjacentPoints.push(rightPoint);
      }
      if (i > 0) {
        const upPoint = map[i - 1][j];
        adjacentPoints.push(upPoint);
      }
      if (i < y - 1) {
        const downPoint = map[i + 1][j];
        adjacentPoints.push(downPoint);
      }

      const pointsLower = adjacentPoints.filter((x) => pointToCheck < x);
      if (pointsLower.length === adjacentPoints.length) {
        lowPoints.push(pointToCheck);
      }
    }
  }
  return lowPoints;
}

function partOne(input: Array<string>): number {
  const map: Array<Array<number>> = [];
  input.forEach((line) => {
    map.push(line.split("").map((x) => parseInt(x, 10)));
  });

  const lowPoints = calculateLowPoints(map);
  return lowPoints.reduce((p, c) => p + c + 1, 0);
}

function partTwo(input: Array<string>): number {
  return input.length;
}

await run();
