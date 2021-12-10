import { solve, test } from "../lib/utils.ts";

async function run() {
  const day = "nine";
  await test(day, 1, partOne, 15);
  await solve(day, 2, partOne, 478);
  await test(day, 1, partTwo, 1134);
  await solve(day, 2, partTwo, 1327014);
}

function createInputMap(input: Array<string>): Array<Array<number>> {
  return input.map((line) => line.split("").map((c) => parseInt(c, 10)));
}

interface Point {
  x: number;
  y: number;
}

interface LowPoint {
  coords: Point;
  value: number;
}

interface Dimensions {
  x: number;
  y: number;
}

function getLowPoints(map: Array<Array<number>>): Array<LowPoint> {
  const dimensions: Dimensions = { x: map[0].length, y: map.length };

  const lowPoints: Array<LowPoint> = [];
  for (let y = 0; y < dimensions.y; y++) {
    for (let x = 0; x < dimensions.x; x++) {
      const adjPoints = [];
      if (x > 0) {
        adjPoints.push(map[y][x - 1]);
      }
      if (x < dimensions.x - 1) {
        adjPoints.push(map[y][x + 1]);
      }
      if (y > 0) {
        adjPoints.push(map[y - 1][x]);
      }
      if (y < dimensions.y - 1) {
        adjPoints.push(map[y + 1][x]);
      }

      const value = map[y][x];
      const pointsLower = adjPoints.filter((x) => value < x);
      if (pointsLower.length === adjPoints.length) {
        lowPoints.push({ coords: { y, x }, value });
      }
    }
  }
  return lowPoints;
}

function doPointsMatch(p1: Point, p2: Point): boolean {
  return p1.x === p2.x && p1.y === p2.y;
}

function isPointIncluded(points: Array<Point>, point: Point): boolean {
  return !!points.find((x) => doPointsMatch(x, point));
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
      if (Math.abs(y - py) === 1 && Math.abs(x - px) === 1) {
        continue;
      }

      adjacentPoints.push({ y, x });
    }
  }
  return adjacentPoints;
}

function partOne(input: Array<string>): number {
  const map = createInputMap(input);
  return getLowPoints(map).reduce((p, c) => p + c.value + 1, 0);
}

function partTwo(input: Array<string>): number {
  const map = createInputMap(input);
  const lowPoints = getLowPoints(map);
  const dimensions: Dimensions = { x: map[0].length, y: map.length };

  function checkPoints(points: Array<Point>): number {
    let recurse = false;
    points.forEach((point) => {
      const adjPoints = getAdjacentPoints(point, dimensions);
      const basinPoints = adjPoints.filter((adj) => !isPointIncluded(points, adj) && map[adj.y][adj.x] < 9);
      if (basinPoints.length > 0) {
        recurse = true;
        points.push(...basinPoints);
      }
    });

    return recurse ? checkPoints(points) : points.length;
  }

  const basinSizes: Array<number> = [];
  lowPoints.forEach((lowPoint) => {
    const point = lowPoint.coords;
    basinSizes.push(checkPoints([point]));
  });

  basinSizes.sort((a, b) => b - a);
  return basinSizes[0] * basinSizes[1] * basinSizes[2];
}

await run();
