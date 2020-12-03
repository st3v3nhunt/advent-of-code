fn main() {
    let file_contents = include_str!("../../../input/0.txt");

    let ans_one = part_one(file_contents);
    println!("Part one answer: {}", ans_one); // ...

    let ans_two = part_two(file_contents);
    println!("Part two answer: {}", ans_two); // ...
}

fn part_one(file_contents: &str) -> u32 {
    file_contents.len() as u32
}

fn part_two(file_contents: &str) -> u32 {
    file_contents.len() as u32
}
