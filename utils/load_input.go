package utils

import (
	"bufio"
	"log"
	"os"
	"strconv"
	"strings"
)

// LoadInput ...
func LoadInput() []string {
	input, err := os.Open("./input.txt")
	if err != nil {
		log.Fatal(err)
	}
	defer input.Close()

	scanner := bufio.NewScanner(input)
	scanner.Scan()

	var data []string
	for _, v := range strings.Split(scanner.Text(), ",") {
		data = append(data, v)
	}
	return data
}

// StringsToInts ...
func StringsToInts(data []string) []int64 {
	ints := []int64{}
	for _, v := range data {
		i, err := strconv.ParseInt(v, 10, 64)
		if err != nil {
			log.Fatal(err)
		}
		ints = append(ints, i)
	}
	return ints
}
