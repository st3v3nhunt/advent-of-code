package main

import (
	"fmt"

	"github.com/st3v3nhunt/aoc-2019-go/utils"
)

func main() {
	part1()
	part2()
}

func part1() {
	fmt.Println("Running part 1...")
	data := utils.LoadInput()

	for _, v := range data {
		fmt.Println(v)
	}
	// for every entry with an asteroid, calculate how many other asteroids can
	// be seen - will need a new array with a count for each location or make
	// the original array able to contain that information
}

func part2() {
}
