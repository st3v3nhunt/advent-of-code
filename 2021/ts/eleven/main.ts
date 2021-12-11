import { solve, test } from "../lib/runner.ts";
import { Dimensions, Point } from "../lib/types.ts";
import { getAdjacentPoints } from "../lib/utils.ts";

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

type Octopi = Array<Array<Octopus>>;

function incrementByOne(octopi: Octopi) {
  octopi.forEach((line) => line.forEach((_, i) => line[i].val++));
}

function resetFlashedOctopi(octopi: Octopi): number {
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

function flash(octopi: Octopi, location: Point) {
  octopi[location.y][location.x].flashed = true;

  const dimensions = { x: octopi[0].length, y: octopi.length };
  getAdjacentPoints(location, dimensions).forEach((adjPoint) => {
    octopi[adjPoint.y][adjPoint.x].val++;
    if (shouldFlash(octopi[adjPoint.y][adjPoint.x])) {
      octopi[adjPoint.y][adjPoint.x].flashed = true;
      flash(octopi, adjPoint);
    }
  });
}

function initOctopi(input: Array<string>): Octopi {
  return input.map((line) =>
    line.split("").map((c) => {
      return { val: parseInt(c, 10), flashed: false };
    })
  );
}

function shouldFlash(octopus: Octopus): boolean {
  return octopus.val > 9 && !octopus.flashed;
}

function checkForFlashes(octopi: Octopi, dimensions: Dimensions) {
  for (let y = 0; y < dimensions.y; y++) {
    for (let x = 0; x < dimensions.x; x++) {
      if (shouldFlash(octopi[y][x])) {
        flash(octopi, { x, y });
      }
    }
  }
}

function partOne(input: Array<string>): number {
  const octopi = initOctopi(input);
  const dimensions = { x: octopi[0].length, y: octopi.length };

  let flashCount = 0;
  for (let i = 0; i < 100; i++) {
    incrementByOne(octopi);
    checkForFlashes(octopi, dimensions);
    flashCount += resetFlashedOctopi(octopi);
  }
  return flashCount;
}

function partTwo(input: Array<string>): number {
  const octopi = initOctopi(input);
  const dimensions = { x: octopi[0].length, y: octopi.length };

  let flashes = 0;
  let stepCount = 0;
  while (flashes !== dimensions.x * dimensions.y) {
    incrementByOne(octopi);
    checkForFlashes(octopi, dimensions);
    flashes = resetFlashedOctopi(octopi);
    stepCount++;
  }
  return stepCount;
}

await run();
