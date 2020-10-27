package main

import (
	"fmt"
	"strconv"
	"strings"
)

func main() {
	// 236491-713787 <- range of password
	counter := 0
	for i := 236491; i < 713788; i++ {
		split := strings.Split(strconv.Itoa(i), "")
		neverDecreasing := false
		adjacentDigits := false
		for j := 1; j < len(split); j++ {
			if adjacentDigits || split[j-1] == split[j] {
				adjacentDigits = true
			}
			if split[j-1] > split[j] {
				neverDecreasing = true
				break
			}
		}
		if !neverDecreasing && adjacentDigits {
			counter++
		}
	}
	fmt.Println("number of passwords:", counter)
}
