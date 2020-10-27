package main

import (
	f "fmt"
	"log"
	"strconv"
	"strings"

	"github.com/st3v3nhunt/aoc-2019-go/utils"
)

var startingPos position = position{0, 0}

func main() {
	part1()
	part2()
}

func part2() {
}

func part1() {
	f.Println("Running part 1...")
	data := utils.LoadInput()
	output := ManhattanDistance(data)
	f.Println("Answer to part 1:", output)
}

type position struct {
	x int
	y int
}

// ManhattanDistance ...
func ManhattanDistance(inputs []string) int {
	wireMap1 := createWireMap(inputs[0])
	wireMap2 := createWireMap(inputs[1])
	// f.Println(wireMap1)
	// f.Println(wireMap2)
	intersections := findIntersections(wireMap1, wireMap2)
	f.Println(intersections)

	// go through the map and add x to y for each entry
	var shortestDistance int = 1000000
	for _, v := range intersections {
		if v != startingPos {
			distance := utils.AbsInt(v.x) + utils.AbsInt(v.y)
			if distance < shortestDistance {
				shortestDistance = distance
			}
		}
	}
	return shortestDistance
}

func findIntersections(m1, m2 map[position]int) (intersections []position) {
	for k := range m1 {
		if _, present := m2[k]; present {
			intersections = append(intersections, k)
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
