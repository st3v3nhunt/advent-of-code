package main

import "testing"

func TestFuel(t *testing.T) {
	var tests = []struct {
		input  int64
		output int64
	}{
		{12, 2},
		{14, 2},
		{1969, 654},
		{100756, 33583},
	}

	for _, test := range tests {
		actual := calcFuelForMass(test.input)
		if actual != test.output {
			t.Errorf("Test failed. Input: %v. Expected %v but got %v.", test.input, test.output, actual)
		}
	}
}

// func TestFuelCorrect(t *testing.T) {
// 	var tests = []struct {
// 		input  int64
// 		output int64
// 	}{
// 		{12, 2},
// 		{14, 2},
// 		{1969, 966},
// 		{100756, 50346},
// 	}

// 	for _, test := range tests {
// 		actual := calcFuelForModuleCorrect(test.input)
// 		if actual != test.output {
// 			t.Errorf("Test failed. Input: %v. Expected %v but got %v.", test.input, test.output, actual)
// 		}
// 	}
// }
