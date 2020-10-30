package main

import (
	f "fmt"

	"github.com/st3v3nhunt/aoc-2019-go/utils"
)

func main() {
	part1()
	// part2()
}

func part2() {
}

func part1() {
	f.Println("Running part 1...")
	data := utils.LoadInput()
	ints := utils.StringsToInts(data)

	outputs := utils.Runner((&ints), int64(1))

	f.Println("output:", outputs)
	f.Println("Answer to part 1:", outputs[len(outputs)-1])
}
