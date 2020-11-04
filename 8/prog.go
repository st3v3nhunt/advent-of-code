package main

import (
	"fmt"
	"strings"

	"github.com/st3v3nhunt/aoc-2019-go/utils"
)

func main() {
	part1()
	part2()
}

func part1() {
	fmt.Println("Running part 1...")
	input := utils.LoadInput()
	width, height := 25, 6

	// TEST
	// input := []string{"123456789012"}
	// width, height := 3, 2

	pixelString := strings.Split(input[0], "")
	pixels := utils.StringsToInts(pixelString)
	// fmt.Println(pixels)

	layer, rowSize := int64(0), 0

	row := []int64{}
	rows := [][]int64{}
	layers := [][][]int64{}
	// zeroCount := 0
	pixelCounter := map[int64][3]int{int64(0): {0, 0, 0}}

	for i, p := range pixels {
		// fmt.Printf("k - %v, rowSize - %v, layer - %v, pixelCounter - %v\n", i, rowSize, layer, pixelCounter)
		row = append(row, p)

		// record number of different pixels
		a := pixelCounter[layer]
		switch p {
		case 0:
			a[0] = a[0] + 1
		case 1:
			a[1] = a[1] + 1
		case 2:
			a[2] = a[2] + 1
		}
		pixelCounter[layer] = a

		// fmt.Println(row)
		// new row
		if (i+1)%width == 0 {
			rowSize++
			rows = append(rows, row)
			// fmt.Println(rows)
			row = []int64{}
		}
		// new layer
		if (i+1)%(width*height) == 0 {
			layer++
			layers = append(layers, rows)
			rows = [][]int64{}
			rowSize = 0
		}
	}
	// fmt.Println(layers)

	maxPossibleZero := width * height
	leastZero, leastZeroLayer := maxPossibleZero, int64(0)
	// find layer with most 0s
	for k, v := range pixelCounter {
		if v[0] < leastZero {
			leastZero = v[0]
			leastZeroLayer = k
		}
	}
	ones, twos := pixelCounter[leastZeroLayer][1], pixelCounter[leastZeroLayer][2]
	answer := ones * twos

	fmt.Printf("The least zeros (%v) were found on layer %v\n", leastZero, leastZeroLayer)
	fmt.Printf("There were %v ones and %v twos for an answer of %v\n", ones, twos, answer)
	fmt.Println("The expected answer is 1206")
}

func part2() {
}
