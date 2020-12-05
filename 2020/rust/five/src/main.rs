fn main() {
    let file_contents = include_str!("../../../input/5.txt");

    let ans_one = part_one(file_contents);
    println!("Part one answer: {}", ans_one);
    assert_eq!(ans_one, 828);

    let ans_two = part_two(file_contents);
    println!("Part two answer: {}", ans_two);
    assert_eq!(ans_two, 565);
}

fn boarding_passes(file_contents: &str) -> Vec<u32> {
    file_contents
        .lines()
        .map(|pass| {
            let (raw_row, raw_seat) = pass.split_at(7);
            let row = raw_row
                .chars()
                .map(|c| if c == 'B' { '1' } else { '0' })
                .collect::<String>();
            let row = u32::from_str_radix(row.as_str(), 2).unwrap();

            let seat = raw_seat
                .chars()
                .map(|c| if c == 'R' { '1' } else { '0' })
                .collect::<String>();
            let seat = u32::from_str_radix(seat.as_str(), 2).unwrap();
            row * 8 + seat
        })
        .collect::<_>()
}

fn part_one(file_contents: &str) -> u32 {
    boarding_passes(file_contents)
        .iter()
        .max()
        .unwrap()
        .to_owned()
}

fn part_two(file_contents: &str) -> u32 {
    let mut passes = boarding_passes(file_contents);
    passes.sort();
    let mut seat_id = 0;
    passes.iter().fold(0_u32, |prev, cur| {
        if prev == 0 {
            *cur
        } else if *cur == prev + 1 {
            *cur
        } else {
            seat_id = prev + 1;
            println!("seat_id: {}", seat_id);
            *cur
        }
    });
    seat_id
}
