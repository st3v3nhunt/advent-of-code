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
    let mut i = 1;
    while i < passes.len() - 1 {
        if passes[i - 1] != passes[i] - 1 {
            seat_id = passes[i - 1] + 1;
            break;
        }
        i += 1;
    }
    seat_id
}
