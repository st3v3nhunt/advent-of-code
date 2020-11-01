package main

import (
	"fmt"

	"github.com/st3v3nhunt/aoc-2019-go/utils"
)

func main() {
	part1()
	part2()
}

func copySlice(s1 []int64) []int64 {
	s2 := make([]int64, len(s1))
	copy(s2, s1)
	return s2
}

func permutations(arr []int64) [][]int64 {
	var helper func([]int64, int64)
	res := [][]int64{}

	helper = func(arr []int64, n int64) {
		if n == 1 {
			tmp := make([]int64, len(arr))
			copy(tmp, arr)
			res = append(res, tmp)
		} else {
			for i := int64(0); i < n; i++ {
				helper(arr, n-1)
				if n%2 == 1 {
					tmp := arr[i]
					arr[i] = arr[n-1]
					arr[n-1] = tmp
				} else {
					tmp := arr[0]
					arr[0] = arr[n-1]
					arr[n-1] = tmp
				}
			}
		}
	}
	helper(arr, int64(len(arr)))
	return res
}

func part1() {
	fmt.Println("Running part 1...")
	data := utils.LoadInput()
	program := utils.StringsToInts(data)

	// psCombinations := [][]int64{{0, 1, 2, 3, 4}, {4, 3, 2, 1, 0}}
	psCombinations := permutations([]int64{0, 1, 2, 3, 4})

	runOutputs := []int64{}

	for _, phaseSignal := range psCombinations {
		fmt.Printf("running phase signal %v\n", phaseSignal)
		var input int64 = 0
		for _, s := range phaseSignal {
			outputs := utils.Runner(copySlice(program), []int64{s, input})
			// fmt.Printf("running signal %v, produced outputs: %v\n", s, outputs)
			input = outputs[0]
		}
		fmt.Printf("phase signal %v produced output signal %v\n", phaseSignal, input)
		runOutputs = append(runOutputs, input)
	}
	fmt.Println(runOutputs)
	max := int64(0)
	for _, v := range runOutputs {
		if v > max {
			max = v
		}
	}

	fmt.Println("Answer to part 1 should be 21860. Has been calculated to be", max)
}

func part2() {
}
