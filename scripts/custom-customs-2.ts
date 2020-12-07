import {
  AggregateFunc,
  Dict,
  lineToObj,
  list,
  listProcessFactory,
} from "./custom-customs-1.ts";


const aggregateSharedResponses: AggregateFunc<boolean> = (
  aggregateCandidates,
  currentCustomsForm,
) => {
  const matchedKeys = Object.keys(aggregateCandidates[0]);
  const unmatchedKeys = Object.keys(aggregateCandidates[1]);

  console.log('matched : ' + matchedKeys + 'unmatched: ' + unmatchedKeys);

  if (unmatchedKeys.length + matchedKeys.length === 0) {
    console.log('first form');
    return [{},currentCustomsForm];
  }

  const commonKeys = Object.keys(currentCustomsForm)
  .reduce((commonKeys, key) => {
      if (key in matchedKeys.concat(unmatchedKeys)) {
        commonKeys[key] = true;
      }
      return commonKeys;
    }, {} as Dict<boolean>);
  console.log('commonKeys: ' + Object.keys(commonKeys));
  return [commonKeys, {}];
};

function main() {
  const sumAnswers = listProcessFactory(
      lineToObj,
      aggregateSharedResponses,
  )(list.slice(0,14))
    .map((group) => {console.log(group); return group})
    .map((group) => {console.log(Object.keys(group).length); return Object.keys(group).length;})
    .reduce((count, current) => count + current, 0);

    console.log(sumAnswers);
}

if (import.meta.main) main();


