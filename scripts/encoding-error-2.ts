import { answer, list } from "./encoding-error-1.ts";

const makeSearchListUntilMatchFunction = (desiredSum: number) =>
  function searchListUntilMatch(list: number[]): number[] {
    if (list.length === 0) throw Error("no matches found");

    const matchedList = makeFindFunc(desiredSum)(list);

    if (matchedList.length === 0) return searchListUntilMatch(list.slice(1));

    return matchedList;
  };

const makeFindFunc = (desiredSum: Readonly<number>) =>
  function findContiguousSumStartingWithFirstIndex(list: Readonly<number>[]): number[] {
    function tryIndicesUntilSumMetOrExceeded(indiceNonInclusive = 2): number {
      if (indiceNonInclusive > list.length) return -1;
      const sum = list.slice(0, indiceNonInclusive).reduce(
        (sum, num) => sum + num,
        0,
      );
      if (sum === desiredSum) return indiceNonInclusive;
      if (sum > desiredSum) return -1;
      return tryIndicesUntilSumMetOrExceeded(++indiceNonInclusive);
    }
    const indiceNonInclusive = tryIndicesUntilSumMetOrExceeded();
    if (tryIndicesUntilSumMetOrExceeded() > 0) {
      return list.slice(0, indiceNonInclusive);
    }
    return findContiguousSumStartingWithFirstIndex(list.slice(1));
  };

const subList = makeSearchListUntilMatchFunction(answer)(list);

const sum = subList.reduce((sum, num) => sum + num, 0);
if (sum !== answer) {
  throw new Error(
    "list doesnt add up to original answer " + sum + " not equal to " + answer,
  );
}

subList.sort();
const answer2 = subList[0] + subList[subList.length - 1];

console.log(answer2);
