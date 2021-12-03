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

fn get_int_from_binary_vec(bits: &Vec<u8>) -> i32 {
    isize::from_str_radix(&bits.iter().map(|x| x.to_string()).collect::<String>(), 2).unwrap()
        as i32
}

fn count_bits_at_position(bit_lines: &Vec<Vec<u8>>, bit_position: usize) -> (i32, i32) {
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

fn get_rating(bit_lines: &Vec<Vec<u8>>, bit_precedence: (u8, u8)) -> i32 {
    let mut ratings = bit_lines.clone();
    let mut i = 0;

    while ratings.len() > 1 {
        let (zeros, ones) = count_bits_at_position(&ratings, i);
        let mut candidate_ratings: Vec<Vec<u8>> = vec![];
        for rating in ratings {
            let bit = rating[i];
            if ones >= zeros {
                if bit == bit_precedence.0 {
                    candidate_ratings.push(rating);
                }
            } else {
                if bit == bit_precedence.1 {
                    candidate_ratings.push(rating);
                }
            }
        }
        ratings = candidate_ratings;
        i = i + 1;
    }
    get_int_from_binary_vec(ratings.iter().next().unwrap())
}

fn part_one(lines: std::str::Lines) -> i32 {
    let bit_lines = lines
        .map(|x| {
            x.chars()
                .map(|c| c.to_digit(2).unwrap() as u8)
                .collect::<Vec<u8>>()
        })
        .collect::<Vec<_>>();
    let mut gamma_bits: Vec<u8> = vec![];
    let mut epsilon_bits: Vec<u8> = vec![];
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
    let gamma_rate = get_int_from_binary_vec(&gamma_bits);
    let epsilon_rate = get_int_from_binary_vec(&epsilon_bits);
    epsilon_rate * gamma_rate
}

fn part_two(lines: std::str::Lines) -> i32 {
    let bit_lines = lines
        .map(|x| {
            x.chars()
                .map(|c| c.to_digit(2).unwrap() as u8)
                .collect::<Vec<u8>>()
        })
        .collect::<Vec<_>>();
    let o2_rating = get_rating(&bit_lines, (1, 0));
    let co2_rating = get_rating(&bit_lines, (0, 1));
    o2_rating * co2_rating
}
