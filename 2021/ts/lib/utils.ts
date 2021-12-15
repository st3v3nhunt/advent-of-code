import { Point, Dimensions } from "./types.ts";
export type { Point, Dimensions } from "./types.ts";

export function getAdjacentPoints(
  { x: px, y: py }: Point,
  dimensions: Dimensions,
  excludeDiagonals = false
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
      if (excludeDiagonals) {
        if (Math.abs(y - py) === 1 && Math.abs(x - px) === 1) {
          continue;
        }
      }

      adjacentPoints.push({ y, x });
    }
  }
  return adjacentPoints;
}
