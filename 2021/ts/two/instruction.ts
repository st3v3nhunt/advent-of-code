export enum Direction {
  Down = "down",
  Forward = "forward",
  Up = "up",
}

interface Instruction {
  direction: Direction;
  value: number;
}

export function getInstruction(input: string): Instruction {
  const [rawDirection, rawValue] = input.split(" ");
  return {
    direction: rawDirection as Direction,
    value: parseInt(rawValue, 10),
  };
}
