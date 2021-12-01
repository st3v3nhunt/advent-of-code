use std::time::Instant;

fn main() {
    // TODO: Update the location of the input file.
    let lines = include_str!("../../../input/x.txt").lines();

    let start = Instant::now();
    let ans_one = part_one(lines.clone());
    let duration = start.elapsed();
    // TODO: Update the expected answer (once known).
    let expected_one = 0;
    println!(
        "Part one answer: {}, expected {}. Completed in: {:?}",
        ans_one, expected_one, duration
    );
    assert_eq!(ans_one, expected_one);

    let start = Instant::now();
    let ans_two = part_two(lines);
    let duration = start.elapsed();
    // TODO: Update the expected answer (once known).
    let expected_two = 0;
    println!(
        "Part two answer: {}, expected {}. Completed in: {:?}",
        ans_two, expected_two, duration
    );
    assert_eq!(ans_two, expected_two);
}

fn part_one(lines: std::str::Lines) -> i32 {
    1
}

fn part_two(lines: std::str::Lines) -> i32 {
    2
}
