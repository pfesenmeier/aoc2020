import { remoteFileToList } from "../denoUtils/mod.ts";

export const list = await remoteFileToList(
  "https://raw.githubusercontent.com/pfesenmeier/aoc2020/master/input/9.txt",
  Number,
);

const makeMatcher = (preambleLength: number) =>
  function checkUntilMatch(list: number[]): number {
    if (list.length === preambleLength) {
      throw new Error("no unmatched preamble + number match found");
    }

    const preamble = list.slice(0, preambleLength);
    const numberUnderConseration = list[preambleLength];

    if (
      !checkManyNumbersAgaintAllNumbers(preamble, numberUnderConseration)
    ) {
      return numberUnderConseration;
    }

    return checkUntilMatch(list.slice(1));
  };

function checkManyNumbersAgaintAllNumbers(
  preamble: number[],
  desiredSum: number,
): boolean {
  if (preamble.length === 1) return false;
  const [currentNumberToTest, ...restOfNumbers] = preamble;
  let findMatch = false;
  restOfNumbers.forEach((number) => {
    if (number + currentNumberToTest === desiredSum) {
      findMatch = true;
    }
  });
  if (findMatch) return findMatch;
  return checkManyNumbersAgaintAllNumbers(preamble.slice(1), desiredSum);
}

export const answer = makeMatcher(25)(list);

console.log(answer);