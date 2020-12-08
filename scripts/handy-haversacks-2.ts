import {
    list,
    createBagDictionary
} from './handy-haversacks-1.ts';

const bagDictionary = createBagDictionary(list)!;

function countInnerBags(bagName: string): number {
    const contents = bagDictionary[bagName];
    if (contents.length === 0) return 1;

    let bags = 0;
    for (const bag of contents) {
      // salmon
      const innerBagName = Object.keys(bag)[0];
      console.log('name ' + innerBagName);
      // 1-5...
      const innerBagCount = Object.values(bag)[0];
      console.log('count ' + innerBagCount);
      // how many bags salmon has
      const innerInnerCount = countInnerBags(innerBagName);
      bags += innerInnerCount * innerBagCount;
    }
    console.log(bags);
    return bags;
}

const answer = countInnerBags('shiny gold');

console.log(answer);