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
enum Direction {
    Down,
    Forward,
    Up,
}

struct Instruction {
    direction: Direction,
    value: i32,
}

impl Instruction {
    fn new(input: &str) -> Instruction {
        let instruction = input.split_whitespace().collect::<Vec<_>>();
        Instruction {
            direction: match instruction[0] {
                "forward" => Direction::Forward,
                "down" => Direction::Down,
                "up" => Direction::Up,
                _ => panic!("bust"),
            },
            value: instruction[1].parse::<i32>().unwrap(),
        }
    }
}

fn part_one(lines: std::str::Lines) -> i32 {
    let mut depth = 0;
    let mut horizontal = 0;

    for line in lines {
        let instruction = Instruction::new(line);
        match instruction.direction {
            Direction::Forward => horizontal = horizontal + instruction.value,
            Direction::Down => depth = depth + instruction.value,
            Direction::Up => depth = depth - instruction.value,
        }
    }
    depth * horizontal
}

fn part_two(lines: std::str::Lines) -> i32 {
    let mut aim = 0;
    let mut depth = 0;
    let mut horizontal = 0;

    for line in lines {
        let instruction = Instruction::new(line);
        match instruction.direction {
            Direction::Forward => {
                horizontal = horizontal + instruction.value;
                depth = depth + aim * instruction.value;
            }
            Direction::Down => aim = aim + instruction.value,
            Direction::Up => aim = aim - instruction.value,
        }
    }
    depth * horizontal
}
