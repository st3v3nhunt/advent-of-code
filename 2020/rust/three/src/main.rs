fn main() {
    let file_contents = include_str!("../../../input/3.txt");

    let ans_one = part_one(file_contents);
    println!("Part one answer: {}", ans_one);
    assert_eq!(ans_one, 282);

    let ans_two = part_two(file_contents);
    println!("Part two answer: {}", ans_two);
    assert_eq!(ans_two, 958815792);
}

fn traverse(file_contents: &str, move_x: usize, move_y: usize) -> u32 {
    let (mut x, mut y) = (0, 0);
    let width = file_contents.lines().nth(0).unwrap().len();
    let mut tree_count = 0;
    let mut line_counter = 0;

    file_contents.lines().for_each(|line| {
        if (line_counter % move_y) == 0 {
            if line.chars().nth(x % width).unwrap() == '#' {
                tree_count = tree_count + 1;
            }
            x = x + move_x;
            y = y + move_y;
        }
        line_counter = line_counter + 1;
    });

    tree_count
}

fn part_one(file_contents: &str) -> u32 {
    traverse(file_contents, 3, 1)
}

fn part_two(file_contents: &str) -> u32 {
    let _11 = traverse(file_contents, 1, 1);
    let _31 = traverse(file_contents, 3, 1);
    let _51 = traverse(file_contents, 5, 1);
    let _71 = traverse(file_contents, 7, 1);
    let _12 = traverse(file_contents, 1, 2);
    _11 * _31 * _51 * _71 * _12
}
