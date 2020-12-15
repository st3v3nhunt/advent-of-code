use std::time::Instant;

fn main() {
    let file_contents = include_str!("../../../input/x.txt");

    let start = Instant::now();
    let ans_one = part_one(file_contents);
    let duration = start.elapsed();
    let expected_one = 0;
    println!(
        "Part one answer: {}, expected {}. Completed in: {:?}",
        ans_one, expected_one, duration
    );
    assert_eq!(ans_one, expected_one);

    let start = Instant::now();
    let ans_two = part_two(file_contents);
    let duration = start.elapsed();
    let expected_two = 0;
    println!(
        "Part two answer: {}, expected {}. Completed in: {:?}",
        ans_two, expected_two, duration
    );
    assert_eq!(ans_two, expected_two);
}

fn part_one(file_contents: &str) -> i32 {
    file_contents.len() as i32
}

fn part_two(file_contents: &str) -> i32 {
    file_contents.len() as i32
}
