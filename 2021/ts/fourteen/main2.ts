import { solve, test } from "../lib/runner.ts";

async function run() {
  const day = "fourteen";
  await test(day, 1, partOne, 1588);
  await solve(day, 1, partOne, 3342);
  await test(day, 2, partTwo, 2188189693529);
  // await solve(day, 2, partTwo, 1);
}

function processInput(
  input: Array<string>
): {
  rules: Map<string, string>;
  template: string;
  uniqueValues: Array<string>;
} {
  const template = input.shift() || "";
  input.shift();
  const rules = new Map<string, string>();
  const uniqueValues: Array<string> = [];
  input.forEach((line) => {
    const [key, value] = line.split(" -> ");
    rules.set(key, value);
    if (!uniqueValues.includes(value)) {
      uniqueValues.push(value);
    }
  });
  return {
    rules,
    template,
    uniqueValues,
  };
}

function partOne(input: Array<string>): number {
  const processedInput = processInput(input);
  let { template } = processedInput;
  const { rules, uniqueValues } = processedInput;

  const stepCount = 10;
  for (let i = 0; i < stepCount; i++) {
    const valuesToInsert = new Map<number, string>();
    for (const [key, value] of rules.entries()) {
      let indexOfPair = template.indexOf(key);
      while (indexOfPair >= 0) {
        const indexToInsert = indexOfPair + 1;
        valuesToInsert.set(indexToInsert, value);
        indexOfPair = template.indexOf(key, indexOfPair + 1);
      }
    }
    const orderedIndexesForInsertion = [...valuesToInsert.keys()]
      .sort((a, b) => a - b)
      .reverse();
    orderedIndexesForInsertion.forEach((indexToInsertAt) => {
      const valueToInsert = valuesToInsert.get(indexToInsertAt);
      template =
        template.slice(0, indexToInsertAt) +
        valueToInsert +
        template.slice(indexToInsertAt);
    });
  }

  const counts = new Array(uniqueValues.length).fill(0);
  template.split("").forEach((c) => {
    uniqueValues.forEach((v, valIndex) => {
      if (v === c) {
        counts[valIndex]++;
      }
    });
  });

  counts.sort((a, b) => a - b);
  return counts[counts.length - 1] - counts[0];
}

function partTwo(input: Array<string>): number {
  const processedInput = processInput(input);
  let { template } = processedInput;
  const { rules, uniqueValues } = processedInput;

  const stepCount = 40;
  for (let step = 0; step < stepCount; step++) {
    console.log("step", step);
    console.time(`step ${step} took`);
    const valuesToInsert = new Map<number, string>();
    for (const [key, value] of rules.entries()) {
      let indexOfPair = template.indexOf(key);
      while (indexOfPair >= 0) {
        const indexToInsert = indexOfPair + 1;
        valuesToInsert.set(indexToInsert, value);
        indexOfPair = template.indexOf(key, indexOfPair + 1);
      }
    }
    // console.log('final valuesToInsert for step',i, valuesToInsert)
    // console.log('KEYS', [...valuesToInsert.keys()].sort((a, b) => a-b).reverse())
    const orderedIndexesForInsertion = [...valuesToInsert.keys()]
      .sort((a, b) => b - a);
    // console.log(orderedIndexesForInsertion)
    orderedIndexesForInsertion.forEach((indexToInsertAt) => {
      const valueToInsert = valuesToInsert.get(indexToInsertAt);
      template =
        template.slice(0, indexToInsertAt) +
        valueToInsert +
        template.slice(indexToInsertAt);
    });
    console.timeEnd(`step ${step} took`);
  }

  console.log("final template", template, " length ", template.length);
  // const counts = [0,0,0,0] //{ 'B': 0, 'C': 0, 'H': 0, 'N': 0}
  const counts = new Array(uniqueValues.length).fill(0);
  template.split("").forEach((c) => {
    uniqueValues.forEach((v, valIndex) => {
      if (v === c) {
        counts[valIndex]++;
      }
    });
  });

  console.log(counts);
  counts.sort((a, b) => a - b);
  console.log(counts);
  // TODO: Find the MOST and LEAST common elements after 10 rounds
  return counts[counts.length - 1] - counts[0];
}

await run();
