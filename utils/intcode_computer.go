package utils

import (
	f "fmt"
	"log"
)

type mode int

const (
	position = iota
	immediate
)

// Instruction ...
type Instruction struct {
	opcode                 int64
	p1mode, p2mode, p3mode mode
}

func processInstruction(input int64) Instruction {
	return Instruction{
		opcode: input % 100,
		p1mode: mode(input / 100 % 10),
		p2mode: mode(input / 1000 % 10),
		p3mode: mode(input / 10000 % 10),
	}
}

func getVal(d []int64, m mode, address int) int64 {
	if m == position {
		return d[d[address]]
	}
	return d[address]
}

// Runner ..
func Runner(data []int64, input int64) (outputs []int64) {
	address, output := 0, int64(0)
	var err error

	for output == 0 {
		output, address, err = IntCodeComputer(data, input, address)
		if err != nil {
			log.Fatal(err)
		}
		outputs = append(outputs, output)
	}
	return outputs
}

func debug(data []int64, address int, ins Instruction) {
	f.Printf("data: %v\n", data)
	f.Printf("address: %v, instruction: %+v\n", address, ins)
	// maybe a loop to show all of the values based on the 'size' of the opcode
	// f.Printf("values: %v\n", (data)[address+1])
}

// IntCodeComputer ...
func IntCodeComputer(data []int64, input int64, address int) (int64, int, error) {
	for address < len(data) {
		rawInstruction := data[address]
		instruction := processInstruction(rawInstruction)
		// debug(data, address, instruction)
		p1 := getVal(data, instruction.p1mode, address+1)
		switch instruction.opcode {
		case 1: // add 2 values
			p2 := getVal(data, instruction.p2mode, address+2)
			data[data[address+3]] = p1 + p2
			address += 4
		case 2: // mulitply 2 values
			p2 := getVal(data, instruction.p2mode, address+2)
			data[data[address+3]] = p1 * p2
			address += 4
		case 3: // update address with input
			data[data[address+1]] = input
			address += 2
		case 4: // return value
			address += 2
			return p1, address, nil
		case 5:
			if p1 != 0 {
				p2 := getVal(data, instruction.p2mode, address+2)
				data[address] = p2
				address = int(p2)
			} else {
				address += 3
			}
		case 6:
			if p1 == 0 {
				p2 := getVal(data, instruction.p2mode, address+2)
				data[address] = p2
				address = int(p2)
			} else {
				address += 3
			}
		case 7:
			p2 := getVal(data, instruction.p2mode, address+2)
			if p1 < p2 {
				data[data[address+3]] = 1
			} else {
				data[data[address+3]] = 0
			}
			address += 4
		case 8:
			p2 := getVal(data, instruction.p2mode, address+2)
			if p1 == p2 {
				data[data[address+3]] = 1
			} else {
				data[data[address+3]] = 0
			}
			address += 4
		case 99:
			address++
			return 99, address, nil
			// break
		default:
			return -1, address, f.Errorf("Unknown opcode: %+v", instruction)
		}
		// rawInstruction = data[address]
		// instruction = processInstruction(rawInstruction)
	}
	return -1, address, nil
}
