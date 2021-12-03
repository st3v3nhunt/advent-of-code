use std::time::Instant;

fn solve_part(solver: &dyn Fn(std::str::Lines) -> i32, expected: i32) {
    // TODO: Update the location of the input file.
    let lines = include_str!("../../../input/three.txt").lines();
    run_part(lines, solver, expected)
}

fn test_part(solver: &dyn Fn(std::str::Lines) -> i32, expected: i32) {
    // TODO: Update the location of the input file.
    let lines = include_str!("../../../input/test/three.txt").lines();
    run_part(lines, solver, expected)
}

fn run_part(lines: std::str::Lines, solver: &dyn Fn(std::str::Lines) -> i32, expected: i32) {
    let start = Instant::now();
    let answer = solver(lines.clone());
    let duration = start.elapsed();
    println!(
        "Part one answer: {}, expected {}. Completed in: {:?}",
        answer, expected, duration
    );
    assert_eq!(answer, expected);
}

fn main() {
    // TODO: Update expected answers
    test_part(&part_one, 1);
    solve_part(&part_one, 1);

    test_part(&part_two, 2);
    solve_part(&part_two, 2);
}

fn part_one(lines: std::str::Lines) -> i32 {
    1
}

fn part_two(lines: std::str::Lines) -> i32 {
    2
}
