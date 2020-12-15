use std::time::Instant;

fn main() {
    let file_contents = include_str!("../../../input/15.txt");

    let start = Instant::now();
    let ans_one = part_one(file_contents);
    let duration = start.elapsed();
    let expected_one = 257;
    println!(
        "Part one answer: {}, expected {}. Completed in: {:?}",
        ans_one, expected_one, duration
    );
    assert_eq!(ans_one, expected_one);

    let start = Instant::now();
    let ans_two = part_two(file_contents);
    let duration = start.elapsed();
    let expected_two = 8546398;
    println!(
        "Part two answer: {}, expected {}. Completed in: {:?}",
        ans_two, expected_two, duration
    );
    assert_eq!(ans_two, expected_two);
}

fn part_one(file_contents: &str) -> i32 {
    let target = 2020;
    calc(file_contents, target)
}

fn part_two(file_contents: &str) -> i32 {
    let target = 30000000;
    calc(file_contents, target)
}

fn calc(file_contents: &str, target: usize) -> i32 {
    let nums: Vec<i32> = file_contents
        .lines()
        .next()
        .unwrap()
        .split(',')
        .map(|x| x.parse::<i32>().unwrap())
        .collect();

    let length = nums.len() - 1;

    let mut memo = std::collections::HashMap::new();
    nums.iter().enumerate().take(length).for_each(|(i, x)| {
        memo.insert(*x, i);
    });

    let mut i = length;
    let mut last = *nums.last().unwrap();
    while i < target - 1 {
        let curr;
        match memo.get(&last) {
            None => curr = 0,
            Some(x) => curr = (i - *x) as i32,
        }
        memo.insert(last, i);
        last = curr;
        i += 1;
    }
    last
}
