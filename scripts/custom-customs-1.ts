import { remoteFileToList } from "../denoUtils/remoteFileToList.ts";

const list = await remoteFileToList(
  "https://raw.githubusercontent.com/pfesenmeier/aoc2020/master/input/6.txt",
  String,
);

type Dict<T> = {
  [key: string]: T;
};

export function groupAnswers(
  list: string[],
  processedList: Dict<boolean>[] = [],
  currentGroup: Dict<boolean> = {},
): Dict<boolean>[] {
  if (list.length === 0) return processedList;
  const [currentLine, ...restOfLines] = list;

  if (currentLine === "") {
    return groupAnswers(
      restOfLines,
      processedList.concat(currentGroup),
    );
  }

  currentLine.split("").map((letter) => currentGroup[letter] = true);

  return groupAnswers(
    restOfLines,
    processedList,
    currentGroup,
  );
}

const sumAnswers = groupAnswers(list)
  .map((group) => Object.keys(group).length)
  .reduce((count, current) => count + current);

console.log(sumAnswers);
