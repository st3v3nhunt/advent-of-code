use std::collections::BTreeMap;
use std::time::Instant;

fn solve_part(solver: &dyn Fn(std::str::Lines) -> i64, expected: i64) {
    let lines = include_str!("../../../input/six.txt").lines();
    run_part(lines, solver, expected)
}

fn test_part(solver: &dyn Fn(std::str::Lines) -> i64, expected: i64) {
    let lines = include_str!("../../../input/test/six.txt").lines();
    run_part(lines, solver, expected)
}

fn run_part(lines: std::str::Lines, solver: &dyn Fn(std::str::Lines) -> i64, expected: i64) {
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
    test_part(&part_one, 5934);
    solve_part(&part_one, 388419);

    test_part(&part_two, 26984457539);
    solve_part(&part_two, 1740449478328);
}

fn create_initial_population(mut lines: std::str::Lines) -> Vec<u8> {
    lines
        .next()
        .unwrap()
        .split(',')
        .map(|x| x.parse::<u8>().unwrap())
        .collect::<Vec<_>>()
}

fn run_sim(fish: Vec<u8>, duration: u16) -> BTreeMap<u8, u64> {
    let mut ages = BTreeMap::new();
    for f in fish.iter() {
        let age = f.to_owned();
        match ages.get(f) {
            Some(&x) => ages.insert(age, x + 1_u64),
            None => ages.insert(age, 1),
        };
    }

    for _n in 0..duration {
        let mut temp_ages = BTreeMap::new();
        let mut new_fish: u64 = 0;
        for (&age, &count) in ages.iter() {
            if age == 0 {
                temp_ages.insert(6, count);
                new_fish = count as u64;
            } else {
                let existing_age = temp_ages.get(&(age - 1));
                let mut temp_count = count;
                if let Some(x) = existing_age {
                    temp_count += x
                }
                temp_ages.insert(age - 1, temp_count);
            }
        }
        if new_fish > 0 {
            temp_ages.insert(8, new_fish);
        }
        ages = temp_ages;
    }
    ages
}

fn count_fish(ages: BTreeMap<u8, u64>) -> i64 {
    ages.values().map(|&x| x as i64).sum()
}

fn part_one(lines: std::str::Lines) -> i64 {
    let initial_population = create_initial_population(lines);
    let fish_ages = run_sim(initial_population, 80);
    count_fish(fish_ages)
}

fn part_two(lines: std::str::Lines) -> i64 {
    let initial_population = create_initial_population(lines);
    let fish_ages = run_sim(initial_population, 256);
    count_fish(fish_ages)
}
