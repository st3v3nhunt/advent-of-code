pub mod instruction {
    pub enum Direction {
        Down,
        Forward,
        Up,
    }

    pub struct Instruction {
        pub direction: Direction,
        pub value: i32,
    }

    impl Instruction {
        pub fn new(input: &str) -> Instruction {
            let instruction = input.split_whitespace().collect::<Vec<_>>();
            Instruction {
                direction: match instruction[0] {
                    "forward" => Direction::Forward,
                    "down" => Direction::Down,
                    "up" => Direction::Up,
                    _ => panic!("Unknown direction."),
                },
                value: instruction[1].parse::<i32>().unwrap(),
            }
        }
    }
}
