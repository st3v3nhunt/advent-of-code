package main

import (
	f "fmt"
	"log"
	"math"
	"strconv"
	"strings"

	"github.com/st3v3nhunt/aoc-2019-go/utils"
)

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
	f.Println("intersections")
	f.Println(intersections)
	// go through the map and add x to y for each entry
	origin := position{0, 0}
	var shortestDistance int = 1000000
	for _, v := range intersections {
		if v != origin {
			distance := int(math.Abs(float64(v.x))) + int(math.Abs(float64(v.y)))
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

func createWireMap(input string) map[position]int {
	// f.Println(input)
	// create a map to hold all of the points of the wire.
	w1 := map[position]int{}
	curPos := position{0, 0}
	totalSteps := 0
	w1[curPos] = totalSteps
	// add points to make based on each instruction
	for _, v := range strings.Split(input, ",") {
		direction := string(v[0])
		length, err := strconv.Atoi(v[1:])
		if err != nil {
			log.Fatal(err)
		}
		// f.Println(direction, length)

		// need to update the map to contain the new points
		for i := 0; i < length; i++ {
			switch direction {
			case "L":
				curPos.x = curPos.x - 1
				// f.Println("L")
			case "R":
				curPos.x = curPos.x + 1
				// f.Println("R")
			case "U":
				curPos.y = curPos.y + 1
				// f.Println("U")
			case "D":
				curPos.y = curPos.y - 1
				// f.Println("D")
			}
			totalSteps++
			w1[curPos] = totalSteps
		}
	}

	// f.Println(w1)
	return w1
}
