import { solve, test } from "../lib/utils.ts";

async function run() {
  const day = "eleven";
  await test(day, 1, partOne, 1656);
  await solve(day, 2, partOne, 1588);
  await test(day, 1, partTwo, 195);
  await solve(day, 2, partTwo, 517);
}

interface Octopus {
  val: number;
  flashed: boolean;
}

interface Point {
  x: number;
  y: number;
}

interface Dimensions {
  x: number;
  y: number;
}

function getAdjacentPoints(
  { x: px, y: py }: Point,
  dimensions: Dimensions
): Array<Point> {
  const adjacentPoints: Array<Point> = [];
  for (let y = py - 1; y < py + 2; y++) {
    for (let x = px - 1; x < px + 2; x++) {
      if (y === py && x === px) {
        continue;
      }
      if (y < 0 || x < 0) {
        continue;
      }
      if (y >= dimensions.y || x >= dimensions.x) {
        continue;
      }

      adjacentPoints.push({ y, x });
    }
  }
  return adjacentPoints;
}

function incrementByOne(octopi: Array<Array<Octopus>>) {
  octopi.forEach((line) => line.forEach((_, i) => line[i].val++));
}

function resetFlashedOctopi(octopi: Array<Array<Octopus>>): number {
  let flashCount = 0;
  octopi.forEach((line) =>
    line.forEach((_, i) => {
      if (line[i].val > 9) {
        line[i].val = 0;
      }
      if (line[i].flashed) {
        line[i].flashed = false;
        flashCount++;
      }
    })
  );
  return flashCount;
}

function flash(
  octopi: Array<Array<Octopus>>,
  octoPoint: Point,
  dimensions: Dimensions
) {
  octopi[octoPoint.y][octoPoint.x].flashed = true;

  const adj = getAdjacentPoints(octoPoint, dimensions);
  adj.forEach((adjPoint) => {
    octopi[adjPoint.y][adjPoint.x].val++;
    if (
      octopi[adjPoint.y][adjPoint.x].val > 9 &&
      !octopi[adjPoint.y][adjPoint.x].flashed
    ) {
      octopi[adjPoint.y][adjPoint.x].flashed = true;
      flash(octopi, adjPoint, dimensions);
    }
  });
}

function initOctopi(input: Array<string>): Array<Array<Octopus>> {
  return input.map((line) =>
    line.split("").map((c) => {
      return { val: parseInt(c, 10), flashed: false };
    })
  );
}

function partOne(input: Array<string>): number {
  const octopi = initOctopi(input)

  let flashCount = 0;
  const stepCount = 100;
  const dimensions: Dimensions = { x: octopi[0].length, y: octopi.length };
  for (let i = 0; i < stepCount; i++) {
    incrementByOne(octopi);
    for (let y = 0; y < dimensions.y; y++) {
      for (let x = 0; x < dimensions.x; x++) {
        if (octopi[y][x].val > 9 && !octopi[y][x].flashed) {
          flash(octopi, { x, y }, dimensions);
        }
      }
    }
    const flashes = resetFlashedOctopi(octopi);
    flashCount += flashes;
  }
  return flashCount;
}

function partTwo(input: Array<string>): number {
  const octopi = input.map((line) =>
    line.split("").map((c) => {
      return { val: parseInt(c, 10), flashed: false };
    })
  );
  let flashes = 0;
  const dimensions: Dimensions = { x: octopi[0].length, y: octopi.length };
  let stepCount = 0;
  while (flashes !== dimensions.x * dimensions.y) {
    incrementByOne(octopi);
    for (let y = 0; y < dimensions.y; y++) {
      for (let x = 0; x < dimensions.x; x++) {
        if (octopi[y][x].val > 9 && !octopi[y][x].flashed) {
          flash(octopi, { x, y }, dimensions);
        }
      }
    }
    flashes = resetFlashedOctopi(octopi);
    stepCount++;
  }
  return stepCount;
}

await run();
