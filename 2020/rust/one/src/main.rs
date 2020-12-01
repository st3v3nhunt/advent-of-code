fn main() {
    let path = "../../input/1.txt";
    let input = std::fs::read_to_string(path)
        .expect("file not found")
        .lines()
        .map(|x| x.parse::<u32>().unwrap())
        .collect::<Vec<_>>();

    for i in &input {
        for j in &input {
            if i + j == 2020 {
                println!("i: {}, j: {}. i*j: {}", i, j, i * j);
            }
            for k in &input {
                if i + j + k == 2020 {
                    println!("i: {}, j: {}, k: {}. i * j * k: {}", i, j, k, i * j * k);
                }
            }
        }
    }
    println!("done");

    // let input = read_all::<String>("../../../input/1.txt");
    // println!("{}", input);
    // let a = input
    //     .lines()
    //     .map(calc_fuel)
    //     .map(|x| {
    //         let c = x / 2;
    //         c
    //     })
    //     .collect::<Vec<_>>();

    // a.iter().for_each(|x| println!("{}", x));
    // println!("{}", a);
}

// fn calc_fuel(input: &str) -> i32 {
//     input.parse().unwrap()
// }
