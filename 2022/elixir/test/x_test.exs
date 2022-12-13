defmodule Aoc2022Test.X do
  use ExUnit.Case
  import Aoc2022.X
  import Aoc2022.Helpers.LoadInput

  @day "x"
  @test_input get_test_input(@day)
  @input get_input(@day)

  @tag :skip
  test "part 1 test input" do
    assert part1(@test_input) == 0
  end

  @tag :skip
  test "part 1 real input" do
    assert part1(@input) == 0
  end

  @tag :skip
  test "part 2 test input" do
    assert part2(@test_input) == 0
  end

  @tag :skip
  test "part 2 real input" do
    assert part2(@input) == 0
  end
end
