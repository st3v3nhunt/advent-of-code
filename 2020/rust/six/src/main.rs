use std::collections::HashMap;

fn main() {
    let file_contents = include_str!("../../../input/6.txt");
    let file_contents = format!("{}\n", file_contents);

    let ans_one = part_one(file_contents.as_str());
    println!("Part one answer: {}", ans_one);
    assert_eq!(ans_one, 6534);

    let ans_two = part_two(file_contents.as_str());
    println!("Part two answer: {}", ans_two);
    assert_eq!(ans_two, 3402);
}

fn part_one(file_contents: &str) -> u32 {
    let mut group_count = 0;
    let mut yes_group_tracker = HashMap::new();
    let mut yes_tracker: Vec<u32> = vec![];

    file_contents.lines().for_each(|line| {
        if line.is_empty() {
            yes_tracker.push(yes_group_tracker.keys().len() as u32);
            group_count = 0;
            yes_group_tracker = HashMap::new();
        } else {
            group_count += 1;
            line.chars().for_each(|c| {
                yes_group_tracker.insert(c, 1);
            });
        }
    });
    yes_tracker.iter().sum()
}

fn part_two(file_contents: &str) -> u32 {
    let mut group_count = 0_u32;
    let mut yes_group_tracker: HashMap<char, u32> = HashMap::new();
    let mut yes_tracker: Vec<u32> = vec![];

    file_contents.lines().for_each(|line| {
        if line.is_empty() {
            let mut count = 0;
            yes_group_tracker.values().for_each(|val| {
                if *val == group_count {
                    count += 1;
                }
            });
            yes_tracker.push(count);
            group_count = 0;
            yes_group_tracker = HashMap::new();
        } else {
            group_count += 1;
            line.chars()
                .for_each(|c| match yes_group_tracker.get_mut(&c) {
                    Some(val) => {
                        *val += 1;
                    }
                    None => {
                        yes_group_tracker.insert(c, 1);
                    }
                });
        }
    });
    yes_tracker.iter().sum()
}
