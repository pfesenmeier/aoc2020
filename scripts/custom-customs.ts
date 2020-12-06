import { remoteFileToList } from "../denoUtils/remoteFileToList.ts";

const list = await remoteFileToList(
  "https://raw.githubusercontent.com/pfesenmeier/aoc2020/master/input/6.txt",
  String,
);

type Dict<T> = {
  [key: string]: T;
};

export function groupAnswers(
  currentGroup: Dict<boolean> = {},
  list: string[] = [],
  processedList: Dict<boolean>[] = [],
): Dict<boolean>[] {
  if (list.length === 0) return processedList;
  if (list[0] === '') {
      return groupAnswers({}, list.slice(1), processedList.concat(currentGroup))
  }

  list[0].split('').map(letter => currentGroup[letter] = true)
  return groupAnswers(currentGroup, list.slice(1), processedList);
}

