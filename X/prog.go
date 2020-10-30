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
}

func part2() {
}
