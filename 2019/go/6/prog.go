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

func mapOrbits(data []string) map[string]string {
	orbits := map[string]string{}
	for _, v := range data {
		// fmt.Println(v)
		ss := strings.Split(v, ")")
		obj, orb := ss[0], ss[1]
		orbits[orb] = obj
	}
	return orbits
}

func part1() {
	fmt.Println("Running part 1...")
	data := utils.LoadInput(6)

	orbits := mapOrbits(data)

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
	fmt.Println("Running part 2...")
	data := utils.LoadInput(6)

	orbits := mapOrbits(data)

	// find distance between common ancestors
	// go through map and extract the path for SAN and YOU

	youOrbitTrace := singleOrbitTrace("YOU", orbits)
	sanOrbitTrace := singleOrbitTrace("SAN", orbits)
	// fmt.Println(youOrbitTrace)
	// fmt.Println(sanOrbitTrace)
	// start at -2 as the count includes 1 additional for the common ancestor
	// being duplicated and the other is, depending on the direction that is
	// being travelled the initial orbit jump that isn't needed as the orbit is
	// already in place
	i := -2
	for k, v := range youOrbitTrace {
		if ov := sanOrbitTrace[k]; ov != v {
			i++
		}
	}
	for k, v := range sanOrbitTrace {
		if ov := youOrbitTrace[k]; ov != v {
			i++
		}
	}
	fmt.Println("differences:", i)
}

func singleOrbitTrace(origin string, orbits map[string]string) map[string]string {
	orbitTrace := map[string]string{}
	k := origin
	v := orbits[k]

	for v != "COM" {
		orbitTrace[k] = v
		k = v
		v = orbits[k]
	}
	return orbitTrace
}
