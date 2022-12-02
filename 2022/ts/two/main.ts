import { solve, test } from "../lib/runner.ts";

async function run() {
  const day = "two";
  await test(day, 1, partOne, 15);
  await solve(day, 1, partOne, 12772);
  await test(day, 2, partTwo, 12);
  await solve(day, 2, partTwo, 11618);
}

function scoreObject(object: string): number {
  switch (object) {
    case "X": // rock
      return 1;
    case "Y": // paper
      return 2;
    case "Z": // scissors
      return 3;
  }
}

function scoreResult(object: string): number {
  switch (object) {
    case "X": // lose
      return 0;
    case "Y": // draw
      return 3;
    case "Z": // win
      return 6;
  }
}

function paperGame(me: string): number {
  switch (me) {
    case "X": // rock - loss
      return 0;
    case "Y": // paper - draw
      return 3;
    case "Z": // scissors - win
      return 6;
  }
}

function rockGame(me: string): number {
  switch (me) {
    case "X": // rock - draw
      return 3;
    case "Y": // paper - win
      return 6;
    case "Z": // scissors - loss
      return 0;
  }
}

function scissorGame(me: string): number {
  switch (me) {
    case "X": // rock - win
      return 6;
    case "Y": // paper - loss
      return 0;
    case "Z": // scissors - draw
      return 3;
  }
}

function scoreGame(you: string, me: string): number {
  switch (you) {
    case "A": // rock
      return rockGame(me);
    case "B": // paper
      return paperGame(me);
    case "C": // scissors
      return scissorGame(me);
  }
}

function pickObject(you: string, result: string): string {
  switch (result) {
    case "X":
      return loseGame(you);
    case "Y":
      return drawGame(you);
    case "Z":
      return winGame(you);
  }
}

function loseGame(you: string): string {
  switch (you) {
    case "A": // rock
      return "Z"; // scissors
    case "B": // paper
      return "X"; // rock
    case "C": // scissors
      return "Y"; // paper
  }
}

function drawGame(you: string): string {
  switch (you) {
    case "A": // rock
      return "X";
    case "B": // paper
      return "Y";
    case "C": // scissors
      return "Z";
  }
}

function winGame(you: string): string {
  switch (you) {
    case "A": // rock
      return "Y"; // paper
    case "B": // paper
      return "Z"; // scissors
    case "C": // scissors
      return "X"; // rock
  }
}

function partOne(input: Array<string>): number {
  let scores = 0;
  input.forEach((x) => {
    const [you, me] = x.split(" ");
    const objectScore = scoreObject(me);
    const result = scoreGame(you, me);
    scores += objectScore + result;
  });
  return scores;
}

function partTwo(input: Array<string>): number {
  let scores = 0;
  input.forEach((x) => {
    const [you, gameResult] = x.split(" ");
    const result = scoreResult(gameResult);
    const objectToPlay = pickObject(you, gameResult);
    const objectScore = scoreObject(objectToPlay);
    scores += result + objectScore;
  });
  return scores;
}

await run();
