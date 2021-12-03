use std::time::Instant;

fn solve_part(solver: &dyn Fn(std::str::Lines) -> i32, expected: i32) {
    let lines = include_str!("../../../input/three.txt").lines();
    run_part(lines, solver, expected)
}

fn test_part(solver: &dyn Fn(std::str::Lines) -> i32, expected: i32) {
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
    test_part(&part_one, 198);
    solve_part(&part_one, 1131506);

    test_part(&part_two, 230);
    solve_part(&part_two, 7863147);
}

fn part_one(lines: std::str::Lines) -> i32 {
    let bit_lines = lines
        .map(|x| {
            x.chars()
                .map(|c| c.to_digit(2).unwrap())
                .collect::<Vec<_>>()
        })
        .collect::<Vec<_>>();
    let mut gamma_bits: Vec<_> = vec![];
    let mut epsilon_bits: Vec<_> = vec![];
    let bit_positions = bit_lines[0].len();
    let mut i = 0;
    while i < bit_positions {
        let (zeros, ones) = count_bits_at_position(&bit_lines, i);
        if ones >= zeros {
            gamma_bits.push(1);
            epsilon_bits.push(0);
        } else {
            gamma_bits.push(0);
            epsilon_bits.push(1);
        }
        i = i + 1;
    }
    let gamma_rate = isize::from_str_radix(
        &gamma_bits.iter().map(|x| x.to_string()).collect::<String>(),
        2,
    )
    .unwrap();
    let epsilon_rate = isize::from_str_radix(
        &epsilon_bits
            .iter()
            .map(|x| x.to_string())
            .collect::<String>(),
        2,
    )
    .unwrap();
    (epsilon_rate * gamma_rate) as i32
}

fn count_bits_at_position(bit_lines: &Vec<Vec<u32>>, bit_position: usize) -> (i32, i32) {
    let mut ones = 0;
    let mut zeros = 0;
    for bits in bit_lines {
        if bits[bit_position] == 1 {
            ones = ones + 1;
        } else {
            zeros = zeros + 1;
        }
    }
    (zeros, ones)
}

fn part_two(lines: std::str::Lines) -> i32 {
    2
}
