package main

import (
	f "fmt"

	"github.com/st3v3nhunt/aoc-2019-go/utils"
)

func main() {
	part1()
	part2()
}

func part2() {
}

func part1() {
	f.Println("Running part 1...")
	data := utils.LoadInput()
	output := ManhattanDistance(data)
	f.Println("Answer to part 1:", output)
}

// ManhattanDistance ...
func ManhattanDistance(input []string) int {
	return 0
}
