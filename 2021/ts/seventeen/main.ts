import { solve, test } from "../lib/runner.ts";

async function run() {
  const day = "seventeen";
  await test(day, 1, partOne, 0);
  await solve(day, 1, partOne, 0);
  await test(day, 2, partTwo, 0);
  await solve(day, 2, partTwo, 0);
}

function isStepInZone(step: number, min: number, max: number): boolean {
  return step >= min && step <= max
}

interface Steps { stepSize:number, steps: Array<number> }
function calculatePossibleSteps(min: number, max: number): Array<Steps> {
  const possibleSteps: Array<Steps> = [];
  // TODO: Can cut this in half by not going through anything more than half way, still need to include the last step though
  for (let i = 0; i <= max; i++) {
    let stepSize = i;
    const steps: Array<number> = [];
    let stepIndex = 0;
    let currentPos = 0
    const stepCountToTarger = []
    while (stepSize > 0 && currentPos <= max) { // TODO: do not contiue when the max size has been exceeded
      const prev = steps[stepIndex - 1] ?? 0;
      currentPos = stepSize+prev
      steps.push(currentPos);
      stepIndex++;
      stepSize--;
      if (isStepInZone(currentPos, min, max)) {

      }
    }
    // TODO: which of these arrays have a number that is in the target zone?
    if (steps.some((step) => isStepInZone(step, min, max))) {
      possibleSteps.push({stepSize:i, steps}) //:steps.filter(x => x <= max)});
      // console.log('steps', steps.filter(x => x <= max))
    }
  }

  console.log(possibleSteps);
  return possibleSteps
}

function partOne(input: Array<string>): number {
  const [xrange, yrange] = input[0].split(": ")[1].split(", ");
  console.log(xrange, yrange);
  const [xmin, xmax] = xrange
    .split("=")[1]
    .split("..")
    .map((x) => parseInt(x, 10));
  const [ymin, ymax] = yrange
    .split("=")[1]
    .split("..")
    .map((x) => parseInt(x, 10));
  console.log(xmin, xmax);
  console.log(ymin, ymax);
  // TODO: Could probably just check x,y values on the probe's path rather than creating the area to check
  // const target = [];
  // for (let y = ymin; y < ymax; y++) {
  //   for (let x = xmin; x < xmax; x++) {
  //     target.push(`${x}-${y}`);
  //   }
  // }
  // console.log(target);
  // calc possible x positions. They are triangluar numbers and max is xmax
  // const triangluar = new Map<number, number>()
  // const triangluar: Array<Array<number>> = []
  const possibleXSteps = calculatePossibleSteps(xmin, xmax)
  // const possibleYSteps = calculatePossibleSteps(Math.abs(ymin), Math.abs(ymax))

  // possibleXSteps.forEach((xstep) => {
  //   let xpos = xstep;
  //   while (xpos <= xmax) {
  //     xpos = xpos + xpos - 1;
  //   }
  // });

  // const xsteps = new Map<number, number>()
  // // let x = xmax
  // for (let i=xmax;i>=0;i--) {
  //   let x = i
  //   xsteps.set(x, 0)
  //   while (x <= xmax && x >= xmin) {
  //     let xcount = xsteps.get(i) ?? 0
  //     xsteps.set(i, xcount)
  //     // xcount++
  //     x+=x-1
  //   }
  // }
  // console.log(xsteps)
  return input.length;
}

function partTwo(input: Array<string>): number {
  return input.length;
}

await run();
