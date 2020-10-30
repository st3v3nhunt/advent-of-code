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
	data := utils.LoadInput()

	orbits := map[string]string{}
	// create map of input
	for _, v := range data {
		// fmt.Println(v)
		ss := strings.Split(v, ")")
		obj, orb := ss[0], ss[1]
		orbits[orb] = obj
	}
	// fmt.Println(orbits)

	orbitCount := 0
	for _, v := range orbits {
		orbitCount++
		for v != "COM" {
			v = orbits[v]
			orbitCount++
		}
	}
	fmt.Println(orbitCount)
}

func part2() {
}
