use std::time::Instant;

fn main() {
    let file_contents = include_str!("../../../input/12.txt");

    let start = Instant::now();
    let ans_one = part_one(file_contents);
    let duration = start.elapsed();
    let expected_one = 938;
    println!(
        "Part one answer: {}, expected {}. Completed in: {:?}",
        ans_one, expected_one, duration
    );
    assert_eq!(ans_one, expected_one);

    let start = Instant::now();
    let ans_two = part_two(file_contents);
    let duration = start.elapsed();
    let expected_two = 54404;
    println!(
        "Part two answer: {}, expected {}. Completed in: {:?}",
        ans_two, expected_one, duration
    );
    assert_eq!(ans_two, expected_two);
}

#[derive(Debug)]
struct Coord {
    x: i32,
    y: i32,
}

fn part_one(file_contents: &str) -> u32 {
    let mut pos = Coord { x: 0, y: 0 };
    let mut deg = 90;

    file_contents.lines().for_each(|ins| {
        let action = ins.chars().next().unwrap();
        let val: i32 = ins.chars().skip(1).collect::<String>().parse().unwrap();
        // println!("{:?} {}", pos, deg);
        // println!("{} {}", action, val);

        match action {
            'N' => {
                pos.y += val;
            }
            'S' => {
                pos.y -= val;
            }
            'E' => {
                pos.x += val;
            }
            'W' => {
                pos.x -= val;
            }
            'L' => {
                deg -= val;
            }
            'R' => {
                deg += val;
            }
            'F' => {
                let dir = deg % 360;
                match dir {
                    90 | -270 => pos.x += val,
                    -90 | 270 => pos.x -= val,
                    180 | -180 => pos.y -= val,
                    0 => pos.y += val,
                    _ => println!("Unknown direction."),
                }
            }
            _ => println!("{}", action),
        }
    });

    println!("{:?}", pos);
    let ans = pos.x.abs() + pos.y.abs();
    ans as u32
}

fn part_two(file_contents: &str) -> u32 {
    file_contents.len() as u32
}

// TODO
// Use enum for action
