import { fileToList } from "../denoUtils/mod.ts";
import { assert } from "https://deno.land/std@0.81.0/testing/asserts.ts";

class fieldRule {
  type = "fieldRule";
  constructor(public name: string, private ranges: number[][]) {
    ranges.forEach((range) =>
      assert(range.length === 2 && range[0] < range[1])
    );
  }

  isValid = (field: number) =>
    this.ranges.some((range) => field >= range[0] && field <= range[1]);
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

const validTickets = tickets.filter((ticket) => {
  const fields = ticket.getFields();
  return fields
    .every(
      (field) => rules.some((rule) => rule.isValid(field)),
    );
});

const orderedRules = rules.map((rule) => {
  return {
    [rule.name]: validTickets.map((ticket) => {
      return ticket.getFields().map((field, index) =>
        rule.isValid(field) ? index : -1
      ).filter((index) => index > -1);
    })
    .reduce((all, ticket) => {
      return all.filter((field) => ticket.includes(field));
    }),
  };
});

console.log(orderedRules);
