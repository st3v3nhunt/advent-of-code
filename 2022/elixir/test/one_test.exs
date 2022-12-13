defmodule Aoc2022Test.One do
  use ExUnit.Case
  import Aoc2022.One
  import Aoc2022.Helpers.LoadInput

  @day "one"
  @test_input get_test_input(@day)
  @input get_input(@day)

  test "part 1 test input" do
    assert part1(@test_input) == 24000
  end

  @tag :skip
  test "part 1 real input" do
    assert part1(@input) == 69177
  end

  @tag :skip
  test "part 2 test input" do
    assert part2(@test_input) == 45000
  end

  @tag :skip
  test "part 2 real input" do
    assert part2(@input) == 207_456
  end
end
