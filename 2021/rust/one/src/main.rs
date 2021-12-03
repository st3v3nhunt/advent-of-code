use std::time::Instant;

fn main() {
    let lines = include_str!("../../../input/one.txt").lines();

    let start = Instant::now();
    let ans_one = part_one(lines.clone());
    let duration = start.elapsed();
    let expected_one = 1316;
    println!(
        "Part one answer: {}, expected {}. Completed in: {:?}",
        ans_one, expected_one, duration
    );
    assert_eq!(ans_one, expected_one);

    let start = Instant::now();
    let ans_two = part_two(lines);
    let duration = start.elapsed();
    let expected_two = 1344;
    println!(
        "Part two answer: {}, expected {}. Completed in: {:?}",
        ans_two, expected_two, duration
    );
    assert_eq!(ans_two, expected_two);
}

fn part_one(lines: std::str::Lines) -> i32 {
    let mut increment = 0;
    let numbers = lines
        .map(|x| x.parse::<i32>().unwrap())
        .collect::<Vec<i32>>();

    let mut i = 1;
    while i < numbers.len() {
        if numbers[i] > numbers[i - 1] {
            increment += 1;
        }
        i += 1;
    }
    increment
}

fn part_two(lines: std::str::Lines) -> i32 {
    let mut increment = 0;
    let numbers = lines
        .map(|x| x.parse::<i32>().unwrap())
        .collect::<Vec<i32>>();

    let mut i = 3;
    while i < numbers.len() {
        let prev = numbers[i - 1] + numbers[i - 2] + numbers[i - 3];
        let curr = numbers[i] + numbers[i - 1] + numbers[i - 2];
        if curr > prev {
            increment += 1;
        }
        i += 1;
    }
    increment
}
