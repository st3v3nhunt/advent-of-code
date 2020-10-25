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
	data := utils.LoadInput()
	ints := utils.StringsToInts(data)
	f.Printf("input: %v\n", ints)
	for noun := 0; noun < 100; noun++ {
		for verb := 0; verb < 100; verb++ {
			ints[1] = int64(noun)
			ints[2] = int64(verb)
			output := IntCodeComputer(ints)
			if output[0] == 19690720 {
				f.Printf("noun: %v, verb: %v\n", noun, verb)
				f.Println("Answer to part 2:", 100*noun+verb)
				break
			}
		}
	}
}

func part1() {
	f.Println("Running part 1...")
	data := utils.LoadInput()
	ints := utils.StringsToInts(data)
	// f.Printf("input: %v\n", ints)
	ints[1] = 12 // noun
	ints[2] = 2  // verb
	output := IntCodeComputer(ints)
	// f.Printf("input: %v\n", ints)
	// f.Printf("output: %v\n", output)
	f.Println("Answer to part 1:", output[0])
}

// IntCodeComputer ...
func IntCodeComputer(input []int64) []int64 {
	data := make([]int64, len(input))
	copy(data, input)

	// f.Println(data)
	address := 0
	opcode := data[address]
	for opcode != 99 && address < len(data) {
		// f.Println(data)
		switch opcode {
		case 1:
			// f.Println("opcode is 1")
			n1 := data[data[address+1]]
			n2 := data[data[address+2]]
			data[data[address+3]] = n1 + n2
			address += 4
		case 2:
			// f.Println("opcode is 2")
			n1 := data[data[address+1]]
			n2 := data[data[address+2]]
			data[data[address+3]] = n1 * n2
			address += 4
		case 99:
			// f.Println("opcode is 99")
			opcode = 99
			address++
			break
		}
		opcode = data[address]
	}
	// f.Println(data)
	return data
}
