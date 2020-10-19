package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"strconv"
)

func main() {
	CalcFuelTotal()
}

// CalcFuelTotal ...
func CalcFuelTotal() int64 {
	input, err := os.Open("./input.txt")
	if err != nil {
		log.Fatal(err)
	}
	defer input.Close()

	scanner := bufio.NewScanner(input)
	var totalMass int64
	for scanner.Scan() {
		m, err := strconv.ParseInt(scanner.Text(), 0, 64)
		if err != nil {
			log.Fatal(err)
		}
		fm := calcFuelForMass(m)
		totalMass += fm

		for fm > 0 {
			fm = calcFuelForMass(fm)
			if fm > 0 {
				totalMass += fm
			}
		}
	}
	fmt.Printf("Total mass is: %v\n", totalMass)
	return totalMass
}

// CalcFuelForMass - take its mass, divide by three, round down, and subtract 2
func calcFuelForMass(m int64) int64 {
	return m/3 - 2
}
