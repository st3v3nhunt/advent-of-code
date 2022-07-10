import { solve, test } from "../lib/runner.ts";

async function run() {
  const day = "twentyone";
  await test(day, 1, partOne, 739785);
  await solve(day, 1, partOne, 752247);
  await test(day, 2, partTwo, 444356092776315);
  await solve(day, 2, partTwo, 0);
}

interface StartingPositions {
  p1: number;
  p2: number;
}

function getStartingPositions(input: Array<string>): StartingPositions {
  const [p1, p2] = input.map((line) => parseInt(line.split(": ")[1], 10));

  return { p1, p2 };
}

class GameDie {
  lastRoll = 0;
  sides = 100;
  rollCount = 0;

  roll(): number {
    let score = 0;
    for (let i = 0; i < 3; i++) {
      this.rollCount++;
      this.lastRoll++;
      score += this.lastRoll;
      if (this.lastRoll >= this.sides) {
        this.lastRoll = 0;
      }
    }
    console.log(
      "die has been rolled",
      this.rollCount,
      "times with a score of",
      score
    );
    return score;
  }
}

class Player {
  position: number;
  score = 0;

  constructor(startingPosition: number) {
    this.position = startingPosition;
  }

  move(score: number, boardSize: number) {
    const positionsToMove = (this.position + score) % boardSize;
    this.position = positionsToMove === 0 ? boardSize : positionsToMove;
    this.score += this.position;
    console.log("player scored", this.score);
  }
}

function partOne(input: Array<string>): number {
  const { p1, p2 } = getStartingPositions(input);
  const player1 = new Player(p1);
  const player2 = new Player(p2);
  const die = new GameDie();

  let p1Play = true;
  const boardSize = 10;
  const winScore = 1000;
  while (player1.score < winScore && player2.score < winScore) {
    const dieRollTotal = die.roll();
    if (p1Play) {
      player1.move(dieRollTotal, boardSize);
    } else {
      player2.move(dieRollTotal, boardSize);
    }
    p1Play = !p1Play;
  }

  const loosingPoints =
    player1.score > player2.score ? player2.score : player1.score;
  console.log(loosingPoints, die.rollCount);
  return loosingPoints * die.rollCount;
}

function partTwo(input: Array<string>): number {
  return input.length;
}

await run();
