package main

import (
	"fmt"

	"github.com/st3v3nhunt/aoc-2019-go/utils"
)

func main() {
	part1()
	part2()
}

func part2() {
	fmt.Println("Running part 2...")
	data := utils.LoadInput()
	// data := []string{"3,9,8,9,10,9,4,9,99,-1,8"}
	// data := []string{"3,9,7,9,10,9,4,9,99,-1,8"}
	// data := []string{"3,3,1108,-1,8,3,4,3,99"}
	// data := []string{"3,3,1107,-1,8,3,4,3,99"}
	// data := []string{"3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9"}
	ints := utils.StringsToInts(data)

	outputs := utils.Runner(ints, int64(5))

	fmt.Println("output:", outputs)
	fmt.Println("Answer to part 2 should be 14110739. Has been calculated to be", outputs[len(outputs)-1])
}

func part1() {
	fmt.Println("Running part 1...")
	data := utils.LoadInput()
	ints := utils.StringsToInts(data)

	outputs := utils.Runner(ints, int64(1))

	fmt.Println("output:", outputs)
	fmt.Println("Answer to part 1 should be 13087969. Has been calculated to be", outputs[len(outputs)-1])
}
