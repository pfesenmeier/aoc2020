import {
  AggregateFunc,
  Dict,
  lineToObj,
  list,
  listProcessFactory,
} from "./custom-customs-1.ts";


const aggregateSharedResponses: AggregateFunc<boolean> = (
  aggregateGroup: Dict<boolean>, //group
  currentGroup: Dict<boolean>, //line
) => {
  const aggKeys = Object.keys(aggregateGroup);
  // return. if at end, return {}
  if (aggKeys.length === 0) {
    return currentGroup;
  }

  const commonKeys = Object.keys(currentGroup)
  .reduce((commonKeys, key) => {
      console.log('common ' + Object.keys(commonKeys));
      console.log('key' + key);
      console.log('agg ' + Object.keys(aggregateGroup))
      if (key in aggregateGroup) {
        commonKeys[key] = true;
      }
      return commonKeys;
    }, {} as Dict<boolean>);
  console.log('result ' + Object.keys(commonKeys));
  return commonKeys;
};

function main() {
  const sumAnswers = listProcessFactory(
      lineToObj,
      aggregateSharedResponses,
  )(list)
    .map((group) => {console.log(group); return group})
    .map((group) => {console.log(Object.keys(group).length); return Object.keys(group).length;})
    .reduce((count, current) => count + current, 0);

    console.log(sumAnswers);
}

if (import.meta.main) main();


