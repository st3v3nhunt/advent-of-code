use std::time::Instant;

fn main() {
    let file_contents = include_str!("../../../input/0.txt");

    let start = Instant::now();
    let ans_one = part_one(file_contents);
    let duration = start.elapsed();
    println!("Part one answer: {}. Completed in: {:?}", ans_one, duration);
    assert_eq!(ans_one, 0);

    let start = Instant::now();
    let ans_two = part_two(file_contents);
    let duration = start.elapsed();
    println!("Part two answer: {}. Completed in: {:?}", ans_two, duration);
    assert_eq!(ans_two, 0);
}

fn part_one(file_contents: &str) -> u32 {
    file_contents.len() as u32
}

fn part_two(file_contents: &str) -> u32 {
    file_contents.len() as u32
}
