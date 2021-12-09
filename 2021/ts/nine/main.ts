import { solve, test } from "../lib/utils.ts";

async function run() {
  const day = "nine";
  await test(day, 1, partOne, 15);
  await solve(day, 1, partOne, 478);
  await test(day, 2, partTwo, 1134);
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
      const value = map[y][x];
      if (x > 0) {
        const leftPoint = map[y][x - 1];
        adjPoints.push(leftPoint);
      }
      if (x < dimensions.x - 1) {
        const rightPoint = map[y][x + 1];
        adjPoints.push(rightPoint);
      }
      if (y > 0) {
        const upPoint = map[y - 1][x];
        adjPoints.push(upPoint);
      }
      if (y < dimensions.y - 1) {
        const downPoint = map[y + 1][x];
        adjPoints.push(downPoint);
      }

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

  function checkVisitedPoints(visitedPoints: Array<Point>, called = 0): number {
    let recurse = false;
    visitedPoints.forEach(({ x, y }) => {
      let adjPoints = getAdjacentPoints({ y, x }, dimensions);
      adjPoints = adjPoints.filter(
        (adj) => !isPointIncluded(visitedPoints, adj) && map[adj.y][adj.x] < 9
      );
      if (adjPoints.length > 0) {
        recurse = true;
        visitedPoints.push(...adjPoints);
      }
    });

    return recurse
      ? checkVisitedPoints(visitedPoints, called + 1)
      : visitedPoints.length;
  }

  const basins: Array<number> = [];
  lowPoints.forEach((lowPoint) => {
    const point = lowPoint.coords;
    const adjPoints = getAdjacentPoints(point, dimensions);

    if (adjPoints.find((adj) => map[adj.y][adj.x] <= map[point.y][point.x])) {
      return;
    }

    basins.push(checkVisitedPoints([point]));
  });

  basins.sort((a, b) => b - a);
  return basins[0] * basins[1] * basins[2];
}

await run();
