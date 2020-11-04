package main

import (
	"fmt"
	"strings"

	"github.com/st3v3nhunt/aoc-2019-go/utils"
)

func main() {
	fmt.Println("Running part 1...")
	input := utils.LoadInput()
	const width int = 25
	const height int = 6

	// TEST
	// input := []string{"123456789012"}
	// const width int = 3
	// const height int = 2

	pixelString := strings.Split(input[0], "")
	pixels := utils.StringsToInts(pixelString)

	layer, rowSize := 0, 0

	row := []int{}
	rows := [][]int{}
	layers := [][][]int{}
	pixelCounter := map[int][3]int{0: {0, 0, 0}}

	for i, p := range pixels {
		row = append(row, p)

		// record number of different pixels
		counter := pixelCounter[layer]
		switch p {
		case 0:
			counter[0] = counter[0] + 1
		case 1:
			counter[1] = counter[1] + 1
		case 2:
			counter[2] = counter[2] + 1
		}
		pixelCounter[layer] = counter

		// new row
		if (i+1)%width == 0 {
			rowSize++
			rows = append(rows, row)
			row = []int{}
		}
		// new layer
		if (i+1)%(width*height) == 0 {
			layer++
			layers = append(layers, rows)
			rows = [][]int{}
			rowSize = 0
		}
	}

	maxPossibleZero := width * height
	leastZero, leastZeroLayer := maxPossibleZero, 0
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

	// calculate the display based on the layers
	image := [height][width]string{} // need to be created with all pixels set to transparent so they can be overwritten
	for i, r := range image {
		for j := range r {
			image[i][j] = "."
		}
	}
	// fmt.Println(image)

	for _, layer := range layers {
		// fmt.Println("layer", i, layer)
		for l, layerRow := range layer {
			// fmt.Println("layer, layerrow", i, l, layerRow)
			for p, pixel := range layerRow {
				// transparent, can be over written
				if image[l][p] == "." {
					if pixel == 1 {
						image[l][p] = " "
					} else if pixel == 0 {
						image[l][p] = "#"
					}
				}
			}
		}
	}
	fmt.Println("Running part 2...")
	for _, r := range image {
		fmt.Println(r)
	}
	fmt.Println("The image above should have printed out 'EJRGP'")
}
