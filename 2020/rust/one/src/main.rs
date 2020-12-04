fn main() {
    let path = "../../input/1.txt";
    let input = std::fs::read_to_string(path)
        .expect("file not found")
        .lines()
        .map(|x| x.parse::<u32>().unwrap())
        .collect::<Vec<_>>();

    let ans_one = part_one(&input).unwrap();
    let ans_two = part_two(&input).unwrap();

    println!("Answers. Part one: {}, part two: {}", ans_one, ans_two);
    assert_eq!(ans_one, 1013211);
    assert_eq!(ans_two, 13891280);
}

fn part_two(input: &Vec<u32>) -> Option<u32> {
    for i in input {
        for j in input {
            for k in input {
                if i + j + k == 2020 {
                    println!("i: {}, j: {}, k: {}. i * j * k: {}", i, j, k, i * j * k);
                    return Some(i * j * k);
                }
            }
        }
    }
    None
}

fn part_one(input: &Vec<u32>) -> Option<u32> {
    for i in input {
        for j in input {
            if i + j == 2020 {
                println!("i: {}, j: {}. i*j: {}", i, j, i * j);
                return Some(i * j);
            }
        }
    }
    None
}
