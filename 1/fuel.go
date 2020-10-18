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
func CalcFuelTotal() {
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
		totalMass += calcFuelForModule(m)
	}
	fmt.Printf("Total mass is: %v\n", totalMass)
}

// CalcFuelForModule - take its mass, divide by three, round down, and subtract 2
func calcFuelForModule(m int64) int64 {
	return m/3 - 2
}
