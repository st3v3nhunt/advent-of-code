const REQUIRED_FIELDS: [&str; 7] = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

fn main() {
    let file_contents = include_str!("../../../input/4.txt");

    let ans_one = part_one(file_contents);
    println!("Part one answer: {}", ans_one);
    assert_eq!(ans_one, 216);

    let ans_two = part_two(file_contents);
    println!("Part two answer: {}", ans_two);
    assert_eq!(ans_two, 150);
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

    passports.iter().fold(0, |acc, passport| {
        let mut key_count = 0;
        passport.split_whitespace().for_each(|passport_field| {
            let key = passport_field.split(':').collect::<Vec<_>>()[0];
            if REQUIRED_FIELDS.contains(&key) {
                key_count += 1;
            }
        });
        if key_count == REQUIRED_FIELDS.len() {
            acc + 1
        } else {
            acc
        }
    })
}

fn part_two(file_contents: &str) -> u32 {
    let passports = create_passports(file_contents);
    let mut valid = 0;
    let req_fields_count = REQUIRED_FIELDS.len();

    passports.iter().for_each(|passport| {
        let mut key_count = 0;
        let mut valid_fields = vec![];

        passport.split_whitespace().for_each(|passport_field| {
            let field = passport_field.split(':').collect::<Vec<_>>();
            let (key, value) = (field[0], field[1]);
            if REQUIRED_FIELDS.contains(&key) {
                key_count += 1;
            }
            match key {
                "byr" => {
                    let year = value.parse().unwrap_or(0);
                    if year >= 1920 && year <= 2002 {
                        valid_fields.push(key)
                    }
                }
                "iyr" => {
                    let year = value.parse().unwrap_or(0);
                    if year >= 2010 && year <= 2020 {
                        valid_fields.push(key)
                    }
                }
                "eyr" => {
                    let year = value.parse().unwrap_or(0);
                    if year >= 2020 && year <= 2030 {
                        valid_fields.push(key)
                    }
                }
                "hgt" => {
                    if is_height_valid(value) {
                        valid_fields.push(key)
                    }
                }
                "hcl" => {
                    let re = regex::Regex::new(r"^#[0-9a-f]{6}$").unwrap();
                    if re.is_match(value) {
                        valid_fields.push(key)
                    }
                }
                "ecl" => {
                    let re = regex::Regex::new(r"^(amb|blu|brn|gry|grn|hzl|oth)$").unwrap();
                    if re.is_match(value) {
                        valid_fields.push(key)
                    }
                }
                "pid" => {
                    let re = regex::Regex::new(r"^[0-9]{9}$").unwrap();
                    if re.is_match(value) {
                        valid_fields.push(key)
                    }
                }
                "cid" => {
                    // println!("ignoring cid")
                }
                _ => println!("unhandled key: '{}' with value: '{}'", key, value),
            }
        });
        if key_count == req_fields_count && valid_fields.len() == req_fields_count {
            valid += 1;
        }
    });

    valid
}

fn is_height_valid(s: &str) -> bool {
    if let Some(height_cm) = s.strip_suffix("cm") {
        let height: u32 = height_cm.parse().unwrap();
        if height >= 150 && height <= 193 {
            return true;
        }
    } else if let Some(height_in) = s.strip_suffix("in") {
        let height: u32 = height_in.parse().unwrap();
        if height >= 59 && height <= 76 {
            return true;
        }
    }
    false
}
