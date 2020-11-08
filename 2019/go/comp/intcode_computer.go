package comp

import (
	"fmt"
	"log"
)

// Mode ...
type Mode int

// Mode types
const (
	Position Mode = iota
	Immediate
	Relative
)

// Instruction ...
type Instruction struct {
	opcode                 int64
	p1mode, p2mode, p3mode Mode
}

func processInstruction(input int64) Instruction {
	return Instruction{
		opcode: input % 100,
		p1mode: Mode(input / 100 % 10),
		p2mode: Mode(input / 1000 % 10),
		p3mode: Mode(input / 10000 % 10),
	}
}

func debug(c *Computer, ins Instruction) {
	fmt.Printf("computer: %+v\n", c)
	fmt.Printf("instruction: %+v\n", ins)
}

// Run ..
func (c *Computer) Run(input ...int64) int64 {
	c.Inputs = append(c.Inputs, input...)

	output, err := intCodeComputer(c)
	if err != nil {
		log.Fatal(err)
	}
	return output
}

// Computer ...
type Computer struct {
	address, relativeBase int64
	Inputs                []int64
	Program               map[int64]int64
}

func getVal(c *Computer, m Mode, offset int64) int64 {
	switch m {
	case Position:
		return c.Program[c.Program[c.address+offset]]
	case Immediate:
		return c.Program[c.address+offset]
	case Relative:
		return c.Program[c.Program[c.address+offset]+c.relativeBase]
	default:
		panic("Mode not recognised when GETTING value")
	}
}

func getVals(c *Computer, ins Instruction, offsets []int64) (p1 int64, p2 int64) {
	p1 = getVal(c, ins.p1mode, offsets[0])
	p2 = getVal(c, ins.p2mode, offsets[1])
	return p1, p2
}

func setVal(c *Computer, m Mode, offset, input int64) {
	switch m {
	case Position:
		c.Program[c.Program[c.address+offset]] = input
	case Immediate:
		c.Program[c.address+offset] = input
	case Relative:
		c.Program[c.Program[c.address+offset]+c.relativeBase] = input
	default:
		panic("Mode not recognised when SETTING value")
	}
}

// func intCodeComputer(program, inputs []int64, address int) (int64, int, error) {
func intCodeComputer(c *Computer) (int64, error) {
	for c.address < int64(len(c.Program)) {
		instruction := processInstruction(c.Program[c.address])
		// debug(c, instruction)

		p1, p2 := getVals(c, instruction, []int64{1, 2})
		switch instruction.opcode {
		case 1: // add 2 values
			setVal(c, instruction.p3mode, 3, p1+p2)
			c.address += 4
		case 2: // multiply 2 values
			setVal(c, instruction.p3mode, 3, p1*p2)
			c.address += 4
		case 3: // update address with input
			setVal(c, instruction.p1mode, 1, c.Inputs[0])
			c.Inputs = c.Inputs[1:]
			c.address += 2
		case 4: // return value
			c.address += 2
			return p1, nil
		case 5: // jump-if-true - if p1 != 0, set address to p2
			if p1 != 0 {
				c.address = p2
			} else {
				c.address += 3
			}
		case 6: // jump-if-false - if p1 == 0, set address to p2
			if p1 == 0 {
				c.address = p2
			} else {
				c.address += 3
			}
		case 7: // less than - if p1 < p2 set p3 = 1 else p3 = 1
			if p1 < p2 {
				setVal(c, instruction.p3mode, 3, 1)
			} else {
				setVal(c, instruction.p3mode, 3, 0)
			}
			c.address += 4
		case 8: // equals - if p1 == p2 set p3 = 1 else p3 = 1
			if p1 == p2 {
				setVal(c, instruction.p3mode, 3, 1)
			} else {
				setVal(c, instruction.p3mode, 3, 0)
			}
			c.address += 4
		case 9: // adjust relative base by value of p1
			p1 := getVal(c, instruction.p1mode, 1)
			c.relativeBase += p1
			c.address += 2
		case 99: // halt
			c.address++
			return 99, nil
		default:
			return -1, fmt.Errorf("Unknown opcode: %+v. Computer %+v", instruction, c)
		}
	}
	return -1, fmt.Errorf("Address pointer (%v) is greater than length of program (%v)", c.address, len(c.Program))
}
