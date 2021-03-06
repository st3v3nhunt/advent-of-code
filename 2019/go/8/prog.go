package main

import (
	"fmt"
	"strings"

	"github.com/st3v3nhunt/aoc-2019-go/utils"
)

func main() {
	fmt.Println("Running part 1...")
	input := utils.LoadInput(8)
	const width int = 25
	const height int = 6

	// TEST
	// input := []string{"123456789012"}
	// const width int = 3
	// const height int = 2

	pixelString := strings.Split(input[0], "")
	pixels := utils.StringsToInts(pixelString)

	layer, row := 0, 0

	rows := [height][width]int{}
	layers := [][height][width]int{}
	pixelCounter := map[int][3]int{0: {0, 0, 0}}

	for i, pixel := range pixels {
		// add pixel to map
		rows[row][(i+1)%width] = pixel

		// record number of different pixels
		counter := pixelCounter[layer]
		switch pixel {
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
			row++
		}
		// new layer
		if (i+1)%(width*height) == 0 {
			layers = append(layers, rows)
			layers[layer] = rows
			layer++
			row = 0
		}
	}

	// find layer with most 0s
	maxPossibleZero := width * height
	leastZero, leastZeroLayer := maxPossibleZero, 0
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
	fmt.Printf("The expected answer is 1206\n\n")

	// calculate the display based on the layers
	// set all pixels to transparent so they can be overwritten
	transparent := "."
	image := [height][width]string{}
	for i, r := range image {
		for j := range r {
			image[i][j] = transparent
		}
	}

	for _, layer := range layers {
		for l, layerRow := range layer {
			for p, pixel := range layerRow {
				if image[l][p] == transparent {
					if pixel == 1 {
						// white pixel
						image[l][p] = " "
					} else if pixel == 0 {
						// black pixel
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
