package main

import (
	"fmt"

	"github.com/st3v3nhunt/aoc-2019-go/comp"
	"github.com/st3v3nhunt/aoc-2019-go/utils"
)

func main() {
	part1()
	part2()
}

func part1() {
	fmt.Println("Running part 1...")
	data := utils.LoadInput(9)
	program := utils.StringsToInt64s(data)
	part2Prog := utils.CopyMap(program)
	// fmt.Println(program)
	// program := map[int64]int64{0: 109, 1: 1, 2: 204, 3: -1, 4: 1001, 5: 100, 6: 1, 7: 100, 8: 1008, 9: 100, 10: 16, 11: 101, 12: 1006, 13: 101, 14: 0, 15: 99}
	// program := map[int64]int64{0: 1102, 1: 34915192, 2: 34915192, 3: 7, 4: 4, 5: 7, 6: 99, 7: 0}
	// program := map[int64]int64{0: 104, 1: 1125899906842624, 2: 99}

	comp1 := comp.Computer{Program: program, Inputs: []int64{1}}
	outputs := []int64{}
	output := int64(0)
	for output != 99 {
		output = comp1.Run()
		outputs = append(outputs, output)
	}
	fmt.Println("all outputs:", outputs)
	fmt.Println("Answer for part 1 should be '3780860499'. It has been calculated as", outputs[0])

	comp2 := comp.Computer{Program: part2Prog, Inputs: []int64{2}}
	outputs = []int64{}
	output = int64(0)
	for output != 99 {
		output = comp2.Run()
		outputs = append(outputs, output)
	}
	fmt.Println("all outputs:", outputs)
	fmt.Println("Answer for part 2 should be '33343'. It has been calculated as", outputs[0])
}

func part2() {
	fmt.Println("Running part 2...")
	// data := utils.LoadInput()
	// program := utils.StringsToInt64s(data)
	// psCombinations := utils.Permutations([]int64{5, 6, 7, 8, 9})
}
