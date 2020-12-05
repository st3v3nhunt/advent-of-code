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
    let width = file_contents.lines().next().unwrap().len();
    let mut tree_count = 0;
    let mut line_counter = 0;

    file_contents.lines().for_each(|line| {
        if (line_counter % move_y) == 0 {
            if line.chars().nth(x % width).unwrap() == '#' {
                tree_count += 1;
            }
            x += move_x;
            y += move_y;
        }
        line_counter += 1;
    });

    tree_count
}

fn part_one(file_contents: &str) -> u32 {
    traverse(file_contents, 3, 1)
}

fn part_two(file_contents: &str) -> u32 {
    let move_1_1 = traverse(file_contents, 1, 1);
    let move_3_1 = traverse(file_contents, 3, 1);
    let move_5_1 = traverse(file_contents, 5, 1);
    let move_7_1 = traverse(file_contents, 7, 1);
    let move_1_2 = traverse(file_contents, 1, 2);
    move_1_1 * move_3_1 * move_5_1 * move_7_1 * move_1_2
}
