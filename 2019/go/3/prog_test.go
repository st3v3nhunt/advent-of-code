package main

import (
	"testing"
)

func TestProg(t *testing.T) {
	var tests = []struct {
		input    []string
		distance int
		steps    int
	}{
		{
			[]string{"R75,D30,R83,U83,L12,D49,R71,U7,L72", "U62,R66,U55,R34,D71,R55,D58,R83"}, 159, 610,
		},
		{
			[]string{"R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51", "U98,R91,D20,R16,D67,R40,U7,R15,U6,R7"}, 135, 410,
		},
	}

	for _, test := range tests {
		distance, steps := ManhattanDistance(test.input)
		if distance != test.distance {
			t.Errorf("Test failed. Input: %v. Expected %v but got %v.", test.input, test.distance, distance)
		} else {
			t.Logf("actual: %v, expected: %v", distance, test.distance)
		}
		if steps != test.steps {
			t.Errorf("Test failed. Input: %v. Expected %v but got %v.", test.input, test.steps, steps)
		} else {
			t.Logf("actual: %v, expected: %v", steps, test.steps)
		}
	}
}
