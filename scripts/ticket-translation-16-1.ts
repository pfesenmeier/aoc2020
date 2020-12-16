import { fileToList } from "../denoUtils/mod.ts";
import { assert } from "https://deno.land/std@0.81.0/testing/asserts.ts";

class fieldRule {
  type = "fieldRule";
  constructor(public name: string, private ranges: number[][]) {
    ranges.forEach((range) => assert(range.length === 2));
  }

  isValid = (field: number) =>
    this.ranges.every((range) => field >= range[0] && field <= range[1]);
}

class ticket {
  type = "ticket";
  constructor(private fields: number[]) {}

  getFields = () => this.fields;
}

function matchRegexp(line: string): fieldRule | ticket | "" {
  const regexpArray = line.match(
    /(?:([a-z]+): ([0-9]+)-([0-9]+) or ([0-9]+)-([0-9]+))|([0-9,\,]+)/,
  );
  if (regexpArray === null) return "";
  const [, ruleName, r1, r2, r3, r4, fields] = regexpArray;

  if (ruleName && r1 && r2 && r3 && r4) {
    return new fieldRule(
      ruleName,
      [[parseInt(r1), parseInt(r2)], [parseInt(r3), parseInt(r4)]],
    );
  }

  return new ticket(fields.split(",").map((field) => parseInt(field)));
}

const file = await fileToList("./input/16.txt", matchRegexp);


const rules = file.filter((line) =>
  line !== "" && line.type === "fieldRule"
) as fieldRule[];
const tickets = file.filter((line) =>
  line !== "" && line.type === "ticket"
) as ticket[];

const rating = tickets.map((ticket) => {
  const fields = ticket.getFields();
  return fields.reduce(
    (acc, cur) => rules.some((rule) => !rule.isValid(cur)) ? acc + cur : acc,
    0,
  );
}).reduce((acc, cur) => cur + acc, 0);

console.log(rating);
