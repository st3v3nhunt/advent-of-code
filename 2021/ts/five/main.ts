import { solve, test } from "../lib/utils.ts";

async function run() {
  const day = "five";
  await test(day, 1, partOneSolver, 5);
  await solve(day, 1, partOneSolver, 8111);
  await test(day, 2, partTwoSolver, 12);
  await solve(day, 2, partTwoSolver, 22088);
}

type Lines = [Line];
type Line = [Position, Position];
type Position = [number, number];
type OceanFloor = Array<Array<number>>;

function createLines(input: Array<string>): Lines {
  return input.map((val) => {
    const line = val.split(" -> ").map((coords) => {
      return coords.split(",").map((coord) => {
        return parseInt(coord, 10);
      }) as Position;
    }) as Line;
    return line;
  }) as Lines;
}

function createOceanFloor(lines: Lines): OceanFloor {
  const maxCoord = Math.max(...lines.flat(2)) + 1;
  const row = new Array(maxCoord).fill(0);
  const oceanFloor: Array<Array<number>> = [];
  for (let i = 0; i < maxCoord; i++) {
    oceanFloor[i] = [...row];
  }

  return oceanFloor;
}

function markHorizontalVentLine(oceanFloor: OceanFloor, line: Line) {
  const xStart = line[0][0];
  let yStart = line[0][1];
  let yEnd = line[1][1];

  if (yStart > yEnd) {
    [yStart, yEnd] = [yEnd, yStart];
  }
  while (yStart <= yEnd) {
    oceanFloor[yStart++][xStart]++;
  }
}

function markVerticalVentLine(oceanFloor: OceanFloor, line: Line) {
  let xStart = line[0][0];
  const yStart = line[0][1];
  let xEnd = line[1][0];

  if (xStart > xEnd) {
    [xStart, xEnd] = [xEnd, xStart];
  }
  while (xStart <= xEnd) {
    oceanFloor[yStart][xStart++]++
  }
}

function markDiagonalVentLine(oceanFloor: OceanFloor, line: Line) {
  let xStart = line[0][0];
  let yStart = line[0][1];
  const xEnd = line[1][0];
  const yEnd = line[1][1];

  if (xEnd < xStart && yEnd < yStart) { // moving top left
    while (xStart >= xEnd) {
      oceanFloor[yStart--][xStart--]++
    }
  } else if (xEnd > xStart && yEnd < yStart) { // moving top right
    while (xStart <= xEnd) {
      oceanFloor[yStart--][xStart++]++
    }
  } else if (xEnd > xStart && yEnd > yStart) { // moving bottom right
    while (xStart <= xEnd) {
      oceanFloor[yStart++][xStart++]++
    }
  } else if (xEnd < xStart && yEnd > yStart) { // moving bottom left
    while (xStart >= xEnd) {
      oceanFloor[yStart++][xStart--]++
    }
  }
}

function calculateDangerPoints(oceanFloor: OceanFloor): number {
  let dangerPoints = 0;
  oceanFloor.forEach((line) => {
    line.forEach((point) => {
      if (point > 1) {
        dangerPoints++;
      }
    });
  });
  return dangerPoints;
}

function partOneSolver(input: Array<string>): number {
  const lines = createLines(input);
  const oceanFloor = createOceanFloor(lines);

  lines.forEach((line) => {
    const xStart = line[0][0];
    const yStart = line[0][1];
    const xEnd = line[1][0];
    const yEnd = line[1][1];

    if (xStart === xEnd) {
      markHorizontalVentLine(oceanFloor, line);
    } else if (yStart === yEnd) {
      markVerticalVentLine(oceanFloor, line);
    }
  });

  return calculateDangerPoints(oceanFloor);
}

function partTwoSolver(input: Array<string>): number {
  const lines = createLines(input);
  const oceanFloor = createOceanFloor(lines);

  lines.forEach((line) => {
    const xStart = line[0][0];
    const yStart = line[0][1];
    const xEnd = line[1][0];
    const yEnd = line[1][1];

    if (xStart === xEnd) {
      markHorizontalVentLine(oceanFloor, line);
    } else if (yStart === yEnd) {
      markVerticalVentLine(oceanFloor, line);
    } else {
      markDiagonalVentLine(oceanFloor, line);
    }
  });
  return calculateDangerPoints(oceanFloor);
}

await run();
