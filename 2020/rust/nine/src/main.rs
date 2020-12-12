use std::time::Instant;

fn main() {
    let file_contents = include_str!("../../../input/9.txt");

    let start = Instant::now();
    let ans_one = part_one(file_contents);
    let duration = start.elapsed();
    let expected_one = 217430975;
    println!(
        "Part one answer: {}, expected {}. Completed in: {:?}",
        ans_one, expected_one, duration
    );
    assert_eq!(ans_one, expected_one);

    let start = Instant::now();
    let ans_two = part_two(file_contents);
    let duration = start.elapsed();
    let expected_two = 28509180;
    println!(
        "Part two answer: {}, expected {}. Completed in: {:?}",
        ans_two, expected_one, duration
    );
    assert_eq!(ans_two, expected_two);
}

fn part_one(file_contents: &str) -> i32 {
    let preamble_size = 25;
    let mut preamble = file_contents
        .lines()
        .take(preamble_size)
        .map(|x| x.parse().unwrap())
        .collect::<Vec<i32>>();

    let mut x: i32 = -1;
    for line in file_contents.lines().skip(preamble_size) {
        x = line.parse().unwrap();
        if !valid(&preamble, x) {
            break;
        }
        preamble.remove(0);
        preamble.push(x);
    }
    x
}

fn valid(arr: &[i32], x: i32) -> bool {
    for i in 0..arr.len() {
        for j in 0..arr.len() {
            if i != j && arr[i] + arr[j] == x {
                return true;
            }
        }
    }
    false
}

fn part_two(file_contents: &str) -> i32 {
    file_contents.len() as i32
}
