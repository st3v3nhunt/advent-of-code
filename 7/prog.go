package main

import (
	"fmt"

	"github.com/st3v3nhunt/aoc-2019-go/comp"
	"github.com/st3v3nhunt/aoc-2019-go/utils"
)

func main() {
	part1()
	// part2()
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
		var input int64 = 0
		for _, s := range phaseSignal {
			computer := comp.Computer{Program: (copySlice(program)), Inputs: []int64{s, input}}
			outputs := computer.Run()
			input = outputs[0]
		}
		fmt.Printf("phase signal %v produced output signal %v\n", phaseSignal, input)
		runOutputs = append(runOutputs, input)
	}
	fmt.Println("All outputs:", runOutputs)
	max := max(runOutputs)

	fmt.Println("Answer to part 1 should be 21860. Has been calculated to be", max)
}

func part2() {
	// 	fmt.Println("Running part 2...")
	// 	data := utils.LoadInput()
	// 	program := utils.StringsToInts(data)

	// 	psCombinations := utils.Permutations([]int64{5, 6, 7, 8, 9})

	// 	runOutputs := []int64{}

	// 	for _, phaseSignal := range psCombinations {
	// 		// var input int64 = 0
	// 		i1, i2, i3, i4, i5 := []int64{phaseSignal[0], int64(0)}, []int64{phaseSignal[1]}, []int64{phaseSignal[2]}, []int64{phaseSignal[3]}, []int64{phaseSignal[4]}

	// 		p1, p2, p3, p4, p5 := copySlice(program), copySlice(program), copySlice(program), copySlice(program), copySlice(program)

	// 		outputs := []int64{}
	// 		looper := int64(0)

	// 		for looper != 99 {
	// 			fmt.Println("starting iteration")
	// 			c := comp.Computer{Program: p1, Inputs: i1}
	// 			c.Run()
	// 			outputs = comp.Runner(p1, i1)
	// 			i1 = []int64{}
	// 			i2 = append(i2, outputs[0])
	// 			fmt.Printf("outputs %v, inputs 2 %v\n", outputs, i2)

	// 			outputs = comp.Runner(p2, i2)
	// 			i2 = []int64{}
	// 			i3 = append(i3, outputs[0])
	// 			fmt.Printf("outputs %v, inputs 3 %v\n", outputs, i3)

	// 			outputs = comp.Runner(p3, i3)
	// 			i3 = []int64{}
	// 			i4 = append(i4, outputs[0])
	// 			fmt.Printf("outputs %v, inputs 4 %v\n", outputs, i4)

	// 			outputs = comp.Runner(p4, i4)
	// 			i4 = []int64{}
	// 			i5 = append(i5, outputs[0])
	// 			fmt.Printf("outputs %v, inputs 5 %v\n", outputs, i5)

	// 			outputs = comp.Runner(p5, i5)
	// 			fmt.Println("output from 5", outputs)
	// 			looper = outputs[0]
	// 			i5 = []int64{}
	// 			// this append could just be i1 = outputs
	// 			i1 = append(i1, outputs[0])
	// 			fmt.Printf("outputs %v, inputs 1 %v\n", outputs, i1)
	// 			fmt.Println("completed iteration")
	// 		}

	// 		fmt.Printf("phase signal %v produced outputs %v\n", phaseSignal, outputs)
	// 		// outputs := []int64{}
	// 		// for k, s := range phaseSignal {
	// 		// 	switch k {
	// 		// 	case 0:
	// 		// 		outputs = append(outputs, comp.Runner(p1, []int64{s, input})[0])

	// 		// 	}
	// 		// 	outputs := comp.Runner(copySlice(program), []int64{s, input})
	// 		// 	input = outputs[0]
	// 		// }
	// 		// fmt.Printf("phase signal %v produced output signal %v\n", phaseSignal, input)
	// 		// runOutputs = append(runOutputs, input)
	// 	}
	// 	fmt.Println("All outputs:", runOutputs)

	// 	max := max(runOutputs)
	// 	fmt.Println("Answer to part 2 should be 2645740. Has been calculated to be", max)
}
