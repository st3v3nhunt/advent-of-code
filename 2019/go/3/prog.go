package main

import (
	f "fmt"
	"log"
	"strconv"
	"strings"

	"github.com/st3v3nhunt/aoc-2019-go/utils"
)

var startingPos position = position{0, 0}

type position struct {
	x int
	y int
}

func main() {
	data := utils.LoadInput()
	manhattanDistance, fewestSteps := ManhattanDistance(data)
	f.Println("Answer to part 1:", manhattanDistance)
	f.Println("Answer to part 2:", fewestSteps)
}

// ManhattanDistance ...
func ManhattanDistance(inputs []string) (int, int) {
	wireMap1 := createWireMap(inputs[0])
	wireMap2 := createWireMap(inputs[1])
	// f.Println(wireMap1)
	// f.Println(wireMap2)
	intersections := findIntersections(wireMap1, wireMap2)
	f.Println(intersections)

	// go through the map and add x to y for each entry, taking into account
	// the total number of steps
	shortestDistance := 1000000 // bit of a hack
	fewestSteps := 1000000      // moar hacks

	for pos, totalSteps := range intersections {
		if pos != startingPos {
			distance := utils.AbsInt(pos.x) + utils.AbsInt(pos.y)
			if distance < shortestDistance {
				shortestDistance = distance
			}
			if totalSteps < fewestSteps {
				fewestSteps = totalSteps
			}
		}
	}
	return shortestDistance, fewestSteps
}

func findIntersections(m1, m2 map[position]int) map[position]int {
	intersections := map[position]int{}
	for k, m1v := range m1 {
		if m2v, present := m2[k]; present {
			intersections[k] = m1v + m2v
		}
	}
	return intersections
}

// create a map to hold all of the points of the wire
func createWireMap(input string) map[position]int {
	wireMap := map[position]int{}
	curPos := startingPos
	totalSteps := 0
	wireMap[curPos] = totalSteps

	// add points to map for each instruction
	for _, v := range strings.Split(input, ",") {
		direction := string(v[0])
		length, err := strconv.Atoi(v[1:])
		if err != nil {
			log.Fatal(err)
		}

		for i := 0; i < length; i++ {
			switch direction {
			case "L":
				curPos.x = curPos.x - 1
			case "R":
				curPos.x = curPos.x + 1
			case "U":
				curPos.y = curPos.y + 1
			case "D":
				curPos.y = curPos.y - 1
			}
			totalSteps++
			wireMap[curPos] = totalSteps
		}
	}
	return wireMap
}
