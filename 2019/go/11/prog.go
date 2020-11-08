package main

import (
	"fmt"
	"strconv"

	"github.com/st3v3nhunt/aoc-2019-go/comp"
	"github.com/st3v3nhunt/aoc-2019-go/utils"
)

func main() {
	part1()
	part2()
}

func part1() {
	fmt.Println("Running part 1...")
	startingTile := int64(0)
	panelPaintRecord := robot(startingTile)
	fmt.Println("number of panels painted at least once should be '2238'. It has been calculated as", len(panelPaintRecord))
}

func part2() {
	fmt.Println("Running part 2...")
	startingTile := int64(1)
	robot(startingTile)
	fmt.Println("Screen output should include registration of 'PKFPAZRP'")
}

func robot(initialInput int64) map[string]bool {
	data := utils.LoadInput()
	program := utils.StringsToInt64s(data)

	for _, v := range data {
		fmt.Println(v)
	}

	// start off with a large 'hull' where all tiles are black
	hull := [105][100]int64{}
	// robot is arbitarily in the middle(ish) area and facing up
	pos := []int{60, 40}
	direction := "A" // up

	computer := comp.Computer{Program: program, Inputs: []int64{}}
	outputs := []int64{}
	inputs := []int64{initialInput} // initial input is the colour of the starting tile - black
	panelPaintRecord := map[string]bool{}
	for true {
		output := computer.Run(inputs...)
		inputs = []int64{}
		if output == 99 {
			break
		}
		// odd outputs are the colour to paint the panel
		// even outputs are the directio to turn. 0 - left, 1, right
		// once turned, move forward one
		outputs = append(outputs, output)
		if len(outputs) == 2 {
			// paint the current tile
			tile := hull[pos[0]][pos[1]]
			if tile == 0 {
				k := strconv.Itoa(pos[0]) + strconv.Itoa(pos[1])
				panelPaintRecord[k] = true
			}
			hull[pos[0]][pos[1]] = outputs[0]
			direction = updateDirection(direction, outputs[1])
			updatePos(pos, direction)
			inputs = append(inputs, hull[pos[0]][pos[1]])
			outputs = []int64{}
		}
	}

	for _, v := range hull {
		fmt.Println(v)
	}
	return panelPaintRecord
}

func updatePos(pos []int, direction string) {
	switch direction {
	case "A":
		pos[1] = pos[1] + 1
	case "<":
		pos[0] = pos[0] - 1
	case "V":
		pos[1] = pos[1] - 1
	case ">":
		pos[0] = pos[0] + 1
	}
}

func updateDirection(direction string, change int64) string {
	newDirection := ""
	switch direction {
	case "A":
		if change == 0 {
			newDirection = "<"
		} else {
			newDirection = ">"
		}
	case "<":
		if change == 0 {
			newDirection = "V"
		} else {
			newDirection = "A"
		}
	case "V":
		if change == 0 {
			newDirection = ">"
		} else {
			newDirection = "<"
		}
	case ">":
		if change == 0 {
			newDirection = "A"
		} else {
			newDirection = "V"
		}
	default:
		panic("Unkown direction")
	}
	return newDirection
}
