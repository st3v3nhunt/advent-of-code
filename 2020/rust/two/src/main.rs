fn main() {
    let file_contents = include_str!("../../../input/2.txt");

    let ans_one = part_one(file_contents);
    println!("Part one answer: {}", ans_one);

    let ans_two = part_two(file_contents);
    println!("Part two answer: {}", ans_two);
}

fn part_one(file_contents: &str) -> u32 {
    file_contents.lines().fold(0, |acc, line| {
        let line_split = line.split(": ").collect::<Vec<_>>();
        let password = line_split[1];
        let reqs = line_split[0].split(" ").collect::<Vec<_>>();
        let [req_range, c] = [reqs[0], reqs[1]];
        let range = req_range
            .split("-")
            .map(|x| x.parse().unwrap())
            .collect::<Vec<u32>>();
        let [min, max] = [range[0], range[1]];
        // println!("{:?}'{}'", reqs, password);
        // println!("{}, {}", min, max);
        let matches = password.match_indices(c).count() as u32;
        if matches <= max && matches >= min {
            acc + 1
        } else {
            acc
        }
    })
}

fn part_two(file_contents: &str) -> u32 {
    file_contents.lines().fold(0, |acc, line| {
        let line_split = line.split(": ").collect::<Vec<_>>();
        let password = line_split[1];
        let reqs = line_split[0].split(" ").collect::<Vec<_>>();
        let [req_range, c] = [reqs[0], reqs[1]];
        let positions = req_range
            .split("-")
            .map(|x| x.parse().unwrap())
            .collect::<Vec<u32>>();
        let [pos_one, pos_two] = [positions[0], positions[1]];
        // println!("{:?}'{}'", reqs, password);
        // println!("{}, {}", pos_one, pos_two);
        for (v, i) = password.char_indices().enumerate() {
        }
        let matches = password.match_indices(c).count() as u32;
        if matches <= pos_two && matches >= pos_one {
            acc + 1
        } else {
            acc
        }
    })
}
