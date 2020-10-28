package main

import (
	"fmt"
	"strconv"
	"strings"
)

// 236491-713787 <- range of password
func main() {
	part1PasswordCount := 0
	part2PasswordCount := 0
	for i := 236491; i < 713788; i++ {
		digits := strings.Split(strconv.Itoa(i), "")
		digitsDecrease := false
		adjacentDigits := false

		digitPositions := map[string][]int{}
		digitPositions[digits[0]] = []int{0}

		for j := 1; j < len(digits); j++ {
			pos, prs := digitPositions[digits[j]]
			if prs {
				digitPositions[digits[j]] = append(pos, j)
			} else {
				digitPositions[digits[j]] = []int{j}
			}
			if adjacentDigits || digits[j-1] == digits[j] {
				adjacentDigits = true
			}
			if digits[j-1] > digits[j] {
				digitsDecrease = true
				break
			}
		}
		viable := false
		if !digitsDecrease {
			for _, v := range digitPositions {
				if !viable && len(v) == 2 && v[0]+1 == v[1] {
					viable = true
					part2PasswordCount++
				}
			}
		}
		if !digitsDecrease && adjacentDigits {
			part1PasswordCount++
		}
	}
	fmt.Println("number of passwords:", part1PasswordCount)
	fmt.Println("number of new passwords:", part2PasswordCount)
}
