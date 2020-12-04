fn main() {
    let file_contents = include_str!("../../../input/3.txt");

    let ans_one = part_one(file_contents);
    println!("Part one answer: {}", ans_one);
    assert_eq!(ans_one, 282);

    let ans_two = part_two(file_contents);
    println!("Part two answer: {}", ans_two);
    // assert_eq!(ans_two, 958815792);
}

fn part_one(file_contents: &str) -> u32 {
    let (mut x, mut y) = (0, 0);
    let (move_x, move_y) = (3, 1);
    let width = file_contents.lines().nth(0).unwrap().len();
    let mut tree_count = 0;

    file_contents.lines().for_each(|line| {
        if line.chars().nth(x % width).unwrap() == '#' {
            tree_count = tree_count + 1
        }
        x = x + move_x;
        y = y + move_y;
    });

    tree_count
}

fn part_two(file_contents: &str) -> u32 {
    file_contents.len() as u32
}
