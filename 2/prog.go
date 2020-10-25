package main

import (
	f "fmt"

	"github.com/st3v3nhunt/aoc-2019-go/utils"
)

func main() {
	data := utils.LoadInput()
	ints := utils.StringsToInts(data)
	f.Printf("input: %v\n", ints)
	ints[1] = 12
	ints[2] = 2
	output := Run(ints)
	f.Printf("output: %v\n", output)
}

// Run ...
func Run(input []int64) []int64 {
	data := make([]int64, len(input))
	copy(data, input)

	// f.Println(data)
	pos := 0
	opcode := data[pos]
	for opcode != 99 && pos < len(data) {
		// f.Println(data)
		switch opcode {
		case 1:
			// f.Println("opcode is 1")
			n1 := data[data[pos+1]]
			n2 := data[data[pos+2]]
			data[data[pos+3]] = n1 + n2
		case 2:
			// f.Println("opcode is 2")
			n1 := data[data[pos+1]]
			n2 := data[data[pos+2]]
			data[data[pos+3]] = n1 * n2
		case 99:
			// f.Println("opcode is 99")
			opcode = 99
			break
		}
		pos += 4
		opcode = data[pos]
	}
	// f.Println(data)
	return data
}
