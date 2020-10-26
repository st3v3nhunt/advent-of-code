package main

import (
	"testing"
)

func TestProg(t *testing.T) {
	var tests = []struct {
		input  []string
		output int
	}{
		{
			[]string{"R75,D30,R83,U83,L12,D49,R71,U7,L72", "U62,R66,U55,R34,D71,R55,D58,R83"}, 159,
		},
		{
			[]string{"R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51", "U98,R91,D20,R16,D67,R40,U7,R15,U6,R7"}, 135,
		},
	}

	for _, test := range tests {
		actual := ManhattanDistance(test.input)
		t.Logf("actual: %v, expected: %v", actual, test.output)
		if actual != test.output {
			t.Errorf("Test failed. Input: %v. Expected %v but got %v.", test.input, test.output, actual)
		}
	}
}
