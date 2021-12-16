import { solve, test } from "../lib/runner.ts";
import { getAdjacentPoints, Dimensions } from "../lib/utils.ts";

async function run() {
  const day = "fifteen";
  await test(day, 1, partOne, 40);
  await solve(day, 1, partOne, 472);
  await test(day, 2, partTwo, 315);
  await solve(day, 2, partTwo, 2851);
}

function partOne(input: Array<string>): number {
  const map = input.map((line) =>
    line.split("").map((pos) => parseInt(pos, 10))
  );
  const maxY = map.length;
  const maxX = map[0].length;

  const visited = dijkstra(map);
  return visited.get(`${maxX - 1}-${maxY - 1}`) ?? 0;
}

function dijkstra(map: Array<Array<number>>): Map<string, number> {
  const dimensions: Dimensions = { x: map[0].length, y: map.length };

  const unvisited = new Map<string, number>();
  for (let y = 0; y < dimensions.y; y++) {
    for (let x = 0; x < dimensions.x; x++) {
      unvisited.set(`${x}-${y}`, Infinity);
    }
  }

  const tentativeValues = new Map<string, number>();
  tentativeValues.set("0-0", 0);
  const visited = new Map<string, number>();

  const target = `${dimensions.x - 1}-${dimensions.y - 1}`;
  while (unvisited.size > 0) {
    console.log("unvisited", unvisited.size);
    const [current, currentVal] = [...tentativeValues.entries()].sort(
      (a, b) => a[1] - b[1]
    )[0];

    const coords = current.split("-").map((x) => parseInt(x, 10));
    const currentPoint = { x: coords[0], y: coords[1] };
    unvisited.delete(current);
    tentativeValues.delete(current);
    if (current === target) {
      visited.set(current, currentVal);
      return visited;
    }

    const adjacentPoints = getAdjacentPoints(currentPoint, dimensions, true);
    adjacentPoints.forEach(({ x, y }) => {
      const tentativeVal =
        tentativeValues.get(`${x}-${y}`) ?? unvisited.get(`${x}-${y}`);
      if (tentativeVal) {
        const newVal = map[y][x] + currentVal;
        if (newVal < tentativeVal) {
          tentativeValues.set(`${x}-${y}`, newVal);
        }
      }
    });
  }

  return visited;
}

function partTwo(input: Array<string>): number {
  const map: Array<Array<number>> = input.map((line) =>
    line.split("").map((pos) => parseInt(pos, 10))
  );
  map.forEach((row, y) => {
    const rowFill = [];
    for (let i = 1; i < 5; i++) {
      rowFill.push(
        ...row.map((cell) => {
          const val = cell + i;
          return val > 9 ? val - 9 : val;
        })
      );
    }
    map[y].push(...rowFill);
  });

  const depth = map.length;
  for (let times = 0; times < 5 * depth - depth; times++) {
    const newRow = map[times].map((cell) => {
      const val = cell + 1;
      return val > 9 ? val - 9 : val;
    });
    map.push(newRow);
  }

  map.forEach((row) => console.log(row.join("")));
  const maxY = map.length;
  const maxX = map[0].length;

  const visited = dijkstra(map);
  return visited.get(`${maxX - 1}-${maxY - 1}`) ?? 0;
}

await run();
