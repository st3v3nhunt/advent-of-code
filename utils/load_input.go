package utils

import (
	"bufio"
	"log"
	"os"
	"strconv"
	"strings"
)

// LoadInput ...
// Returns an array, unchanged from the input file
func LoadInput() (data []string) {
	input, err := os.Open("./input.txt")
	if err != nil {
		log.Fatal(err)
	}
	defer input.Close()

	scanner := bufio.NewScanner(input)
	for scanner.Scan() {
		data = append(data, scanner.Text())
	}
	return data
}

// StringsToInts ...
func StringsToInts(data []string) (ints []int64) {
	for _, v := range data {
		for _, r := range strings.Split(v, ",") {
			i, err := strconv.ParseInt(r, 10, 64)
			if err != nil {
				log.Fatal(err)
			}
			ints = append(ints, i)
		}
	}
	return ints
}
