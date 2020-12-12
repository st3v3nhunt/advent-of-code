use std::collections::{HashMap, HashSet};
use std::time::Instant;

fn main() {
    let file_contents = include_str!("../../../input/7.txt");

    let start = Instant::now();
    let ans_one = part_one(file_contents);
    let duration = start.elapsed();
    println!("Part one answer: {}. Completed in: {:?}", ans_one, duration);
    assert_eq!(ans_one, 0);

    let start = Instant::now();
    let ans_two = part_two(file_contents);
    let duration = start.elapsed();
    println!("Part two answer: {}. Completed in: {:?}", ans_two, duration);
    assert_eq!(ans_two, 0);
}

fn clean_content(item: &str) -> &str {
    item.split_at(item.find(" bag").unwrap()).0.trim()
}

fn part_one(file_contents: &str) -> u32 {
    let mut map: HashMap<String, HashSet<String>> = HashMap::new();
    file_contents.lines().for_each(|line| {
        // println!("{}", line);
        let mut split_value = line.split(" bags contain ");
        let (container, contents) = (
            split_value.next().unwrap(),
            split_value.next().unwrap().split(',').map(clean_content),
        );
        println!("{}", container);
        contents.for_each(|content| {
            println!("{}", content);
            if content.eq("no other") {
                let mut content_split = content.split(' ');
                // content_split.next()
                let key = format!(
                    "{} {}",
                    content_split.next().unwrap(),
                    content_split.next().unwrap()
                );
                if map.contains_key(&key) {
                    map.get_mut(&key).unwrap().insert(container.to_owned());
                } else {
                    let mut set = HashSet::new();
                    set.insert(container.to_owned());
                    map.insert(key, set);
                }
            }
        });
    });

    // function bagColorCount (bagName, map, set) {
    //   const bags = map[bagName]
    //   if (!bags) { return }

    //   for (const bag of bags.keys()) {
    //     set.add(bag)
    //     bagColorCount(bag, map, set)
    //   }
    //   return set
    // }
    0
}

fn bagColourCount<'a>(
    bagName: &str,
    map: HashMap<String, HashSet<String>>,
    set: &'a HashSet<String>,
) -> Option<&'a HashSet<String>> {
    // let bags = map.get(bagName);
    match map.get_mut(bagName) {
        None => println!("No bags!"),
        Some(bags) => {
            bags.iter().for_each(|bag| {
                set.insert(bag.to_owned());
                bagColourCount(bag, map, set);
            });
        }
    }
    Some(set)
}

fn part_two(file_contents: &str) -> u32 {
    file_contents.len() as u32
}
