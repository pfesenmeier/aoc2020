import { remoteFileToList } from "../denoUtils/remoteFileToList.ts";

const list = await remoteFileToList(
  "https://raw.githubusercontent.com/pfesenmeier/aoc2020/master/input/8.txt",
  String,
);

type CMD = "acc" | "jmp" | "nop";

class Instruction {
  constructor(readonly cmd: CMD, readonly amt: number) {}

  static parse(rawInput: string) {
    const regex = rawInput.match(/([a-z]+) ([\+|-][0-9]+)/);
    if (regex === null) throw new Error("regex failed!");
    return new Instruction(regex[1] as CMD, parseInt(regex[2]));
  }

  toString = () => "cmd " + this.cmd + "amt " + this.amt;
}

function parseInstructions(
  lines: string[],
  parsedList: Instruction[] = [],
): Instruction[] {
  const [currentLine, ...restOfLines] = lines;
  if (currentLine === "") return parsedList;

  const instruction = Instruction.parse(currentLine);

  return parseInstructions(restOfLines, parsedList.concat(instruction));
}

const instructions: readonly Instruction[] = parseInstructions(list);
const indexImmediatelyAfterListCommand = instructions.length;

const makeClosure = (instructions: Instruction[]) =>
  function findRepeatedInstruction(
    executedInstructions: Instruction[] = [],
    currentInstructionIndex = 0,
    acc = 0,
  ): [number, boolean] | undefined {
    if (currentInstructionIndex in executedInstructions) return [acc, false];
    if (currentInstructionIndex === indexImmediatelyAfterListCommand) {
      return [acc, true];
    }

    const currentInstruction = instructions[currentInstructionIndex];
    console.log(currentInstruction.toString());
    executedInstructions[currentInstructionIndex] = currentInstruction;

    if (currentInstruction.cmd === "acc") {
      return findRepeatedInstruction(
        executedInstructions,
        currentInstructionIndex + 1,
        acc + currentInstruction.amt,
      );
    }

    if (currentInstruction.cmd === "jmp") {
      return findRepeatedInstruction(
        executedInstructions,
        currentInstructionIndex + currentInstruction.amt,
        acc,
      );
    }
    if (currentInstruction.cmd === "nop") {
      return findRepeatedInstruction(
        executedInstructions,
        currentInstructionIndex + 1,
        acc,
      );
    }
  };

function makeLists(checkedIndex = 0): number {
  const instruction = instructions[checkedIndex];
  const newList = instructions.slice();

  if (instruction.cmd !== "acc") {
    if (instruction.cmd === "jmp") {
      newList[checkedIndex] = new Instruction("nop", instruction.amt);
    } else {
      newList[checkedIndex] = new Instruction("jmp", instruction.amt);
    }
  }

  const [acc, terminated] = makeClosure(newList)()!;

  if (terminated) return acc;

  return makeLists(++checkedIndex);
}

console.log(makeLists());
