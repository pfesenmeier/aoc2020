import { remoteFileToList } from "../denoUtils/remoteFileToList.ts";

export const list = await remoteFileToList(
  "https://raw.githubusercontent.com/pfesenmeier/aoc2020/master/input/7.txt",
  String,
);

type BagDictionary = Record<string, Record<string, number>[]>;

const regexPattern =
  /(?:(?:^([a-z]+ [a-z]+) bags contain ([0-9]+) ([a-z]+ [a-z]+) bags?[\.,](?: ([0-9]+) ([a-z]+ [a-z]+) bags?[\.,])?(?: ([0-9]+) ([a-z]+ [a-z]+) bags?[\.,])?(?: ([0-9]+) ([a-z]+ [a-z]+) bags?[\.,])?$)|^([a-z]+ [a-z]+) bags contain (no) other bags.$)/;

export function createBagDictionary(
  list: string[],
  dictionary: BagDictionary = {},
): BagDictionary | undefined {
  const [currentLine, ...restOfLines] = list;
  if (currentLine === "") return dictionary;

  const parsedCurrentLine = currentLine.match(regexPattern);
  const [, b, n1, b1, n2, b2, n3, b3, n4, b4, bno, no] = parsedCurrentLine!;

  const newBag: Record<string, Record<string, number>[]> = {
    [b]: [] as Record<string, number>[],
  };

  if (bno) {
    return createBagDictionary(
      restOfLines,
      Object.assign(dictionary, { [bno]: [] }),
    );
  }

  newBag[b].push({ [b1]: parseInt(n1) });

  if (!n2) {
    return createBagDictionary(restOfLines, Object.assign(dictionary, newBag));
  }

  newBag[b].push({ [b2]: parseInt(n2) });

  if (!n3) {
    return createBagDictionary(restOfLines, Object.assign(dictionary, newBag));
  }

  newBag[b].push({ [b3]: parseInt(n3) });

  if (!n4) {
    return createBagDictionary(restOfLines, Object.assign(dictionary, newBag));
  }

  newBag[b].push({ [b4]: parseInt(n4) });

  return createBagDictionary(restOfLines, Object.assign(dictionary, newBag));
}

const dictionary = createBagDictionary(list)!;

const allBags: string[] = Object.keys(dictionary);

function goldInBag(bagName: string): boolean {
  if (bagName === 'shiny gold') return true;

  const contents = dictionary[bagName];
  if (contents.length === 0) return false;

  for (const bag of contents) {
    if(goldInBag(Object.keys(bag)[0])) {
      return true;
    }
  }
  return false;
}

function main() {
  const listOfBooleans = allBags
  .map(bag => goldInBag(bag))
  .reduce((sum, current) => current ? ++sum : sum, 0);
  
  console.log(listOfBooleans);
}

if (import.meta.main) main();