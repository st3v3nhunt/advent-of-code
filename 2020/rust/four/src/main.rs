fn main() {
    let file_contents = include_str!("../../../input/4.txt");

    let ans_one = part_one(file_contents);
    println!("Part one answer: {}", ans_one);
    assert_eq!(ans_one, 216);

    let ans_two = part_two(file_contents);
    println!("Part two answer: {}", ans_two);
    // assert_eq!(ans_two, 150);
}

// tidy up input to have one passport per line
fn create_passports(file_contents: &str) -> Vec<String> {
    let mut passports: Vec<String> = vec![];
    let mut temp_passport_container = String::new();

    for line in file_contents.lines() {
        if line.is_empty() {
            passports.push(temp_passport_container.trim_end().to_owned());
            temp_passport_container = String::new();
        } else {
            temp_passport_container.push_str(line);
            temp_passport_container.push_str(" ");
        }
    }
    passports.push(temp_passport_container.trim_end().to_owned());
    passports
}

fn part_one(file_contents: &str) -> u32 {
    let passports = create_passports(file_contents);
    let required_fields = vec!["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

    passports.iter().fold(0, |acc, passport| {
        let mut key_count = 0;
        passport.split_whitespace().for_each(|passport_field| {
            let key = passport_field.split(':').collect::<Vec<_>>()[0];
            if required_fields.contains(&key) {
                key_count += 1;
            }
        });
        if key_count == required_fields.len() {
            acc + 1
        } else {
            acc
        }
    })
}

fn part_two(file_contents: &str) -> u32 {
    let passports = create_passports(file_contents);
    let required_fields = vec!["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];
    let mut valid = 0;

    passports.iter().for_each(|passport| {
        let mut key_count = 0;
        passport.split_whitespace().for_each(|passport_field| {
            let field = passport_field.split(':').collect::<Vec<_>>();
            let (key, value) = (field[0], field[1]);
            if required_fields.contains(&key) {
                key_count += 1;
            }
        });
        if key_count == required_fields.len() {
            valid += 1;
        }
    });

    valid
}
