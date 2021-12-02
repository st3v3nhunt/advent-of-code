use std::time::Instant;

fn main() {
    let lines = include_str!("../../../input/two.txt").lines();

    let start = Instant::now();
    let ans_one = part_one(lines.clone());
    let duration = start.elapsed();
    let expected_one = 2039912;
    println!(
        "Part one answer: {}, expected {}. Completed in: {:?}",
        ans_one, expected_one, duration
    );
    assert_eq!(ans_one, expected_one);

    let start = Instant::now();
    let ans_two = part_two(lines);
    let duration = start.elapsed();
    let expected_two = 1942068080;
    println!(
        "Part two answer: {}, expected {}. Completed in: {:?}",
        ans_two, expected_two, duration
    );
    assert_eq!(ans_two, expected_two);
}

fn part_one(lines: std::str::Lines) -> i32 {
    let mut depth = 0;
    let mut horizontal = 0;

    for line in lines {
        let instruction = line.split_whitespace().collect::<Vec<_>>();
        let value = instruction[1].parse::<i32>().unwrap();
        match instruction[0] {
            "forward" => horizontal = horizontal + value,
            "down" => depth = depth + value,
            "up" => depth = depth - value,
            _ => eprintln!("Unknown direction."),
        }
    }
    depth * horizontal
}

fn part_two(lines: std::str::Lines) -> i32 {
    let mut aim = 0;
    let mut depth = 0;
    let mut horizontal = 0;

    for line in lines {
        let instruction = line.split_whitespace().collect::<Vec<_>>();
        let value = instruction[1].parse::<i32>().unwrap();
        match instruction[0] {
            "forward" => {
                horizontal = horizontal + value;
                depth = depth + aim * value;
            }
            "down" => aim = aim + value,
            "up" => aim = aim - value,
            _ => eprintln!("Unknown direction."),
        }
    }
    depth * horizontal
}
