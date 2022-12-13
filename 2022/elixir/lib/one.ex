defmodule Aoc2022.One do
  def part1(input) do
    IO.puts("here #{input}")
    # for each block of numbers, add them up
    # then find the max value from the blocks
    for x <- String.split(input) do
      IO.puts(x)
    end
  end

  def part2(input) do
    input
  end
end
