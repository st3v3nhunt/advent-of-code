defmodule Aoc2022.Helpers.LoadInput do
  def get_test_input(day) do
    File.read!("../input/test/#{day}.txt")
  end

  def get_input(day) do
    File.read!("../input/#{day}.txt")
  end
end
