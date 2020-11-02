package main

import (
	"fmt"

	"github.com/st3v3nhunt/aoc-2019-go/comp"
	"github.com/st3v3nhunt/aoc-2019-go/utils"
)

func main() {
	// part1()
	part2()
}

func copySlice(s1 []int64) []int64 {
	s2 := make([]int64, len(s1))
	copy(s2, s1)
	return s2
}

func max(s []int64) int64 {
	max := int64(0)
	for _, v := range s {
		if v > max {
			max = v
		}
	}
	return max
}

func part1() {
	fmt.Println("Running part 1...")
	data := utils.LoadInput()
	program := utils.StringsToInts(data)
	psCombinations := utils.Permutations([]int64{0, 1, 2, 3, 4})
	runOutputs := []int64{}

	for _, phaseSignal := range psCombinations {
		var output int64 = 0
		for _, s := range phaseSignal {
			computer := comp.Computer{Program: (copySlice(program)), Inputs: []int64{s}}
			output = computer.Run(output)
		}
		fmt.Printf("phase signal %v produced output signal %v\n", phaseSignal, output)
		runOutputs = append(runOutputs, output)
	}
	fmt.Println("All outputs:", runOutputs)
	max := max(runOutputs)

	fmt.Println("Answer to part 1 should be 21860. Has been calculated to be", max)
}

func part2() {
	fmt.Println("Running part 2...")
	data := utils.LoadInput()
	program := utils.StringsToInts(data)
	psCombinations := utils.Permutations([]int64{5, 6, 7, 8, 9})

	// psCombinations := [][]int64{{9, 8, 7, 6, 5}}
	// program := []int64{3, 26, 1001, 26, -4, 26, 3, 27, 1002, 27, 2, 27, 1, 27, 26, 27, 4, 27, 1001, 28, -1, 28, 1005, 28, 6, 99, 0, 0, 5}
	// program := []int64{3, 52, 1001, 52, -5, 52, 3, 53, 1, 52, 56, 54, 1007, 54, 5, 55, 1005, 55, 26, 1001, 54, -5, 54, 1105, 1, 12, 1, 53, 54, 53, 1008, 54, 0, 55, 1001, 55, 1, 55, 2, 53, 55, 53, 4, 53, 1001, 56, -1, 56, 1005, 56, 6, 99, 0, 0, 0, 0, 10}
	// psCombinations := [][]int64{{9, 7, 8, 5, 6}}

	runOutputs := []int64{}

	for _, phaseSignal := range psCombinations {
		i1, i2, i3, i4, i5 := []int64{phaseSignal[0]}, []int64{phaseSignal[1]}, []int64{phaseSignal[2]}, []int64{phaseSignal[3]}, []int64{phaseSignal[4]}
		p1, p2, p3, p4, p5 := copySlice(program), copySlice(program), copySlice(program), copySlice(program), copySlice(program)
		c1, c2, c3, c4, c5 := comp.Computer{Program: p1, Inputs: i1}, comp.Computer{Program: p2, Inputs: i2}, comp.Computer{Program: p3, Inputs: i3}, comp.Computer{Program: p4, Inputs: i4}, comp.Computer{Program: p5, Inputs: i5}

		output := int64(0)

		for output != 99 {
			fmt.Println("starting iteration")
			// fmt.Printf("comp1 %+v\n", c1)
			output = c1.Run(output)
			// fmt.Printf("comp1 %+v\n", c1)
			// fmt.Println("outputs", output)

			// fmt.Printf("comp %+v\n", c2)
			output = c2.Run(output)
			// fmt.Println("outputs", output)

			// fmt.Printf("comp %+v\n", c3)
			output = c3.Run(output)
			// fmt.Println("output", output)

			// fmt.Printf("comp %+v\n", c4)
			output = c4.Run(output)
			// fmt.Println("output", output)

			// fmt.Printf("comp %+v\n", c5)
			output = c5.Run(output)
			// fmt.Println("output", output)
			runOutputs = append(runOutputs, output)
			fmt.Println("completed iteration")
		}

		fmt.Printf("phase signal %v produced outputs %v\n", phaseSignal, output)
	}
	fmt.Println("All outputs:", runOutputs)

	max := max(runOutputs)
	fmt.Println("Answer to part 2 should be 2645740. Has been calculated to be", max)
}
