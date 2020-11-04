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

// StringsToInt64s ...
func StringsToInt64s(data []string) (ints []int64) {
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

// StringsToInts ...
func StringsToInts(data []string) (ints []int) {
	for _, v := range data {
		for _, r := range strings.Split(v, ",") {
			i, err := strconv.ParseInt(r, 10, 32)
			if err != nil {
				log.Fatal(err)
			}
			ints = append(ints, int(i))
		}
	}
	return ints
}

// AbsInt ...
// Return absolute val for an int
func AbsInt(i int) int {
	if i < 0 {
		return i * -1
	}
	return i
}

// Permutations ...
// Return all the permutations of the supplied slice
func Permutations(arr []int64) [][]int64 {
	var helper func([]int64, int64)
	res := [][]int64{}

	helper = func(arr []int64, n int64) {
		if n == 1 {
			tmp := make([]int64, len(arr))
			copy(tmp, arr)
			res = append(res, tmp)
		} else {
			for i := int64(0); i < n; i++ {
				helper(arr, n-1)
				if n%2 == 1 {
					tmp := arr[i]
					arr[i] = arr[n-1]
					arr[n-1] = tmp
				} else {
					tmp := arr[0]
					arr[0] = arr[n-1]
					arr[n-1] = tmp
				}
			}
		}
	}
	helper(arr, int64(len(arr)))
	return res
}
