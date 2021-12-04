import { solve, test } from "../lib/utils.ts";

async function run() {
  const day = "four";
  await test(day, partOne, 4512);
  await solve(day, partOne, 31424);
  await test(day, partTwo, 1924);
  await solve(day, partTwo, 23042);
}

function createBoards(
  input: Array<string>
): Array<Array<Array<[number, number]>>> {
  const boards = [];
  let board: Array<Array<[number, number]>> = [];
  for (let i = 2; i < input.length; i++) {
    if (input[i]) {
      const row: Array<[number, number]> = [];
      for (let j = 0; j < input[i].length; j += 3) {
        const item = parseInt(input[i].slice(j, j + 3), 10);
        row.push([item, 0]);
      }
      board.push(row);
    } else {
      boards.push(board);
      board = [];
    }
  }
  boards.push(board);
  return boards;
}

function markBoards(
  boards: Array<Array<Array<[number, number]>>>,
  ball: number
) {
  boards.forEach((board) => {
    board.forEach((row) => {
      row.forEach((item) => {
        if (item[0] === ball) {
          item[1] = 1;
        }
      });
    });
  });
}

function doesBoardWin(board: Array<Array<[number, number]>>): boolean {
  const columnScores: Array<number> = new Array(5).fill(0);
  const rowScores: Array<number> = [];
  for (let i = 0; i < board.length; i++) {
    const row = board[i];
    row.forEach((item, j) => {
      columnScores[j] += item[1];
    });
    rowScores.push(row.reduce((prev, curr) => prev + curr[1], 0));
  }
  const winningColumn = columnScores.some((x) => x === 5);
  const winningRow = rowScores.some((x) => x === 5);
  return winningColumn || winningRow;
}

function calculateUnmarkedNumberSum(
  board: Array<Array<[number, number]>>
): number {
  let unmarkedNumberSum = 0;
  board.forEach((row) => {
    row.forEach((item) => {
      if (item[1] === 0) {
        unmarkedNumberSum += item[0];
      }
    });
  });
  return unmarkedNumberSum;
}

function partOne(input: Array<string>): number {
  const draw = input[0].split(",").map((x) => parseInt(x, 10));

  const boards = createBoards(input);

  let unmarkedNumberSum = 0;
  let ball = 0;
  // play to win!
  drawloop: for (let i = 0; i < draw.length; i++) {
    ball = draw[i];
    markBoards(boards, ball);

    // first win requires 5 balls drawn
    if (i > 5) {
      for (let j = 0; j < boards.length; j++) {
        const board = boards[j];
        const winner = doesBoardWin(board);

        if (winner) {
          unmarkedNumberSum = calculateUnmarkedNumberSum(board);
          break drawloop;
        }
      }
    }
  }
  return ball * unmarkedNumberSum;
}

function partTwo(input: Array<string>): number {
  const draw = input[0].split(",").map((x) => parseInt(x, 10));

  let boards = createBoards(input);

  let ball = 0;
  // play to lose!
  let i = 0;
  while (boards.length > 1) {
    const tempBoards: Array<Array<Array<[number, number]>>> = [];
    ball = draw[i];
    markBoards(boards, ball);

    // first win requires 5 balls drawn
    if (i > 5) {
      for (let j = 0; j < boards.length; j++) {
        const board = boards[j];
        const winner = doesBoardWin(board);

        if (!winner) {
          tempBoards.push(board);
        }
      }
      boards = tempBoards;
    }
    i++;
  }

  // last board left. now work out when it will win
  let unmarkedNumberSum = 0;
  for (let j = i; j < draw.length; j++) {
    ball = draw[j];
    markBoards(boards, ball);
    const board = boards[0];
    const winner = doesBoardWin(board);
    if (winner) {
      unmarkedNumberSum = calculateUnmarkedNumberSum(board);
      break;
    }
  }
  return ball * unmarkedNumberSum
}

await run();
