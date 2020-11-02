package comp

import (
	"fmt"
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

func debug(data []int64, address int, ins Instruction) {
	fmt.Printf("data: %v\n", data)
	fmt.Printf("address: %v, instruction: %+v\n", address, ins)
	// maybe a loop to show all of the values based on the 'size' of the opcode
	// fmt.Printf("values: %v\n", (data)[address+1])
}

// Run ..
func (c *Computer) Run(input ...int64) int64 {
	c.Inputs = append(c.Inputs, input...)

	output, err := intCodeComputer(c)
	// fmt.Printf("c %+v\n", c)
	if err != nil {
		log.Fatal(err)
	}
	return output
}

// Computer ...
type Computer struct {
	address         int
	Inputs, Program []int64
}

// func intCodeComputer(program, inputs []int64, address int) (int64, int, error) {
func intCodeComputer(c *Computer) (int64, error) {
	fmt.Printf("c.Inputs (%v) IN COMPTER\n", c.Inputs)
	for c.address < len(c.Program) {
		instruction := processInstruction(c.Program[c.address])
		// debug(c.Program, c.address, instruction)

		switch instruction.opcode {
		case 1: // add 2 values
			p1 := getVal(c.Program, instruction.p1mode, c.address+1)
			p2 := getVal(c.Program, instruction.p2mode, c.address+2)
			c.Program[c.Program[c.address+3]] = p1 + p2
			c.address += 4
		case 2: // multiply 2 values
			p1 := getVal(c.Program, instruction.p1mode, c.address+1)
			p2 := getVal(c.Program, instruction.p2mode, c.address+2)
			c.Program[c.Program[c.address+3]] = p1 * p2
			c.address += 4
		case 3: // update address with input
			c.Program[c.Program[c.address+1]] = c.Inputs[0]
			c.Inputs = c.Inputs[1:]
			c.address += 2
		case 4: // return value
			p1 := getVal(c.Program, instruction.p1mode, c.address+1)
			c.address += 2
			return p1, nil
		case 5:
			p1 := getVal(c.Program, instruction.p1mode, c.address+1)
			if p1 != 0 {
				p2 := getVal(c.Program, instruction.p2mode, c.address+2)
				c.address = int(p2)
			} else {
				c.address += 3
			}
		case 6:
			p1 := getVal(c.Program, instruction.p1mode, c.address+1)
			if p1 == 0 {
				p2 := getVal(c.Program, instruction.p2mode, c.address+2)
				c.address = int(p2)
			} else {
				c.address += 3
			}
		case 7:
			p1 := getVal(c.Program, instruction.p1mode, c.address+1)
			p2 := getVal(c.Program, instruction.p2mode, c.address+2)
			if p1 < p2 {
				c.Program[c.Program[c.address+3]] = 1
			} else {
				c.Program[c.Program[c.address+3]] = 0
			}
			c.address += 4
		case 8:
			p1 := getVal(c.Program, instruction.p1mode, c.address+1)
			p2 := getVal(c.Program, instruction.p2mode, c.address+2)
			if p1 == p2 {
				c.Program[c.Program[c.address+3]] = 1
			} else {
				c.Program[c.Program[c.address+3]] = 0
			}
			c.address += 4
		case 99:
			c.address++
			return 99, nil
		default:
			return -1, fmt.Errorf("Unknown opcode: %+v. Computer %+v", instruction, c)
		}
	}
	return -1, fmt.Errorf("Address pointer (%v) is greater than length of program (%v)", c.address, len(c.Program))
}
