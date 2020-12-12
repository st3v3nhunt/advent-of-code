use std::time::Instant;

fn main() {
    let file_contents = include_str!("../../../input/11.txt");

    let start = Instant::now();
    let ans_one = part_one(file_contents);
    let duration = start.elapsed();
    let expected_one = 2164;
    println!(
        "Part one answer: {}, expected {}. Completed in: {:?}",
        ans_one, expected_one, duration
    );
    assert_eq!(ans_one, expected_one);

    let start = Instant::now();
    let ans_two = part_two(file_contents);
    let duration = start.elapsed();
    let expected_two = 1974;
    println!(
        "Part two answer: {}, expected {}. Completed in: {:?}",
        ans_two, expected_one, duration
    );
    assert_eq!(ans_two, expected_two);
}

fn part_one(file_contents: &str) -> u32 {
    // all seats are initially filled
    println!("{}", file_contents);
    let mut layout = file_contents.replace("L", "#");
    println!("{}", layout);
    let len = layout.lines().count();
    let row_len = layout.lines().next().unwrap().len();

    let mut mutating_layout = layout.clone();
    let mut prev_seat_count = 9999999;
    let mut cur_seat_count = 0;
    let mut iteration = 0;

    while cur_seat_count != prev_seat_count {
        iteration += 1;
        println!("iteration {}", iteration);
        for (i, line) in layout.lines().enumerate() {
            for (j, seat) in line.chars().enumerate() {
                if seat == '.' {
                    continue;
                }
                let mut seats = String::new();
                // COUNT SEATS
                // top row
                if i > 0 {
                    if j > 0 {
                        // top left
                        seats.push(
                            layout
                                .lines()
                                .nth(i - 1)
                                .unwrap()
                                .chars()
                                .nth(j - 1)
                                .unwrap(),
                        );
                    }
                    // top middle
                    seats.push(layout.lines().nth(i - 1).unwrap().chars().nth(j).unwrap());
                    // top right
                    if j < row_len - 1 {
                        seats.push(
                            layout
                                .lines()
                                .nth(i - 1)
                                .unwrap()
                                .chars()
                                .nth(j + 1)
                                .unwrap(),
                        );
                    }
                }
                // left
                if j > 0 {
                    seats.push(layout.lines().nth(i).unwrap().chars().nth(j - 1).unwrap());
                }
                println!("{}, {}, {}", i, j, row_len);
                println!("{}, {}, {}", i, j, row_len);
                // right
                if j < row_len - 1 {
                    seats.push(layout.lines().nth(i).unwrap().chars().nth(j + 1).unwrap());
                }
                // bottom row
                if i < len - 1 {
                    // bottom left
                    if j > 0 {
                        seats.push(
                            layout
                                .lines()
                                .nth(i + 1)
                                .unwrap()
                                .chars()
                                .nth(j - 1)
                                .unwrap(),
                        );
                    }
                    // bottom middle
                    seats.push(layout.lines().nth(i + 1).unwrap().chars().nth(j).unwrap());
                    // bottom right
                    if j < row_len - 1 {
                        seats.push(
                            layout
                                .lines()
                                .nth(i + 1)
                                .unwrap()
                                .chars()
                                .nth(j + 1)
                                .unwrap(),
                        );
                    }
                }
                let occupied_seat_count = seats.matches("#").count();

                // MUTATE SEATS
                // mutating_layout.lines().nth(i).unwrap().get_mut(j..j + 1);
                // let mut row = mutating_layout.lines().nth(i).unwrap();
                let start = (i + 1) * row_len + (j + 1);
                let end = start + 1;
                if seat == 'L' && occupied_seat_count == 0 {
                    // seat_replacement = "#";
                    mutating_layout.replace_range(start..end, "#");
                } else if seat == '#' && occupied_seat_count > 3 {
                    // seat_replacement = "L";
                    mutating_layout.replace_range(start..end, "L");
                }
                println!("{}", mutating_layout);
                // mutating_layout.lines().nth(1).unwrap().to_uppercase
                // .chars().nth(j);
            }
        }
        prev_seat_count = cur_seat_count;
        cur_seat_count = count_occupied_seats(&mutating_layout);
        layout = mutating_layout.clone();
        // while true {
        //     for (i, x) in
        //     break;
        // }
    }

    file_contents.len() as u32
}

fn count_occupied_seats(layout: &str) -> u32 {
    layout
        .chars()
        .fold(0, |acc, c| if c == '#' { acc + 1 } else { acc })
}

fn part_two(file_contents: &str) -> u32 {
    // all seats are initially filled
    println!("{}", file_contents);
    let layout = file_contents.replace("L", "#");
    println!("{}", layout);

    file_contents.len() as u32
}
