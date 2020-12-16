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
        ans_two, expected_two, duration
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
    let len = arr.len();
    for i in 0..len {
        for j in 0..len {
            if i != j && arr[i] + arr[j] == x {
                return true;
            }
        }
    }
    false
}

fn part_two(file_contents: &str) -> i64 {
    let target = 28509180;
    let len = file_contents.lines().count();
    let input = file_contents
        .lines()
        .map(|x| x.parse::<i64>().unwrap())
        .collect::<Vec<i64>>();

    for i in 0..len {
        let mut acc = 0;
        let mut nums = vec![];
        // nums = vec![];
        for j in i..len {
            let num = input[j];
            acc += num;
            println!("{}", acc);
            if acc == target {
                println!("nums: {:?}", nums);
                return nums.iter().max().unwrap() + nums.iter().min().unwrap();
            // return nums;
            // break 'outer;
            } else if acc > target {
                break;
            }
            nums.push(num);
        }
    }

    // println!("{:?}", nums);
    // println!(
    //     "{} {}",
    //     nums.iter().max().unwrap(),
    //     nums.iter().min().unwrap()
    // );
    // nums.iter().max().unwrap() + nums.iter().min().unwrap()
    0
}
