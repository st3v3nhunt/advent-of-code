package main

import (
	"testing"
)

func TestProg(t *testing.T) {
	var tests = []struct {
		input, output []int64
	}{
		{
			[]int64{1, 0, 0, 0, 99}, []int64{2, 0, 0, 0, 99},
		},
		{
			[]int64{2, 3, 0, 3, 99}, []int64{2, 3, 0, 6, 99},
		},
		{
			[]int64{2, 4, 4, 5, 99, 0}, []int64{2, 4, 4, 5, 99, 9801},
		},
		{
			[]int64{1, 1, 1, 4, 99, 5, 6, 0, 99}, []int64{30, 1, 1, 4, 2, 5, 6, 0, 99},
		},
	}

	for _, test := range tests {
		actual := Run(test.input)
		t.Logf("actual: %v, expected: %v", actual, test.output)
		for k := range actual {
			if actual[k] != test.output[k] {
				t.Errorf("Test failed. Input: %v. Expected %v but got %v.", test.input, test.output, actual)
			}
		}
	}
}
