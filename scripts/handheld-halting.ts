import { remoteFileToList } from "../denoUtils/remoteFileToList.ts";

const list = await remoteFileToList(
  "https://raw.githubusercontent.com/pfesenmeier/aoc2020/master/input/8.txt",
  String,
);

type CMD = "acc" | "jmp" | "nop";

class Instruction {
  constructor(rawInput: string) {
    const regex = rawInput.match(/([a-z]+) ([\+|-][0-9]+)/);
    if (regex === null) throw new Error("regex failed!");

    this.cmd = regex[1] as CMD;
    this.amt = parseInt(regex[2]);
  }
  readonly cmd: CMD;
  readonly amt: number;
  toString = () => "cmd " + this.cmd + "amt " + this.amt;
}

function parseInstructions(
  lines: string[],
  parsedList: Instruction[] = [],
): Instruction[] {
  const [currentLine, ...restOfLines] = lines;
  if (currentLine === "") return parsedList;

  const instruction = new Instruction(currentLine);

  return parseInstructions(restOfLines, parsedList.concat(instruction));
}

const instructions = parseInstructions(list);

function findRepeatedInstruction(
  executedInstructions: Instruction[] = [],
  currentInstructionIndex = 0,
  acc = 0,
): number | undefined {
    if (currentInstructionIndex in executedInstructions) return acc;

    const currentInstruction = instructions[currentInstructionIndex];
    console.log(currentInstruction.toString());
    executedInstructions[currentInstructionIndex] = currentInstruction;

    if (currentInstruction.cmd === 'acc') {
      return findRepeatedInstruction(executedInstructions, currentInstructionIndex + 1, acc + currentInstruction.amt);
    }

    if (currentInstruction.cmd === 'jmp') {
      return findRepeatedInstruction(executedInstructions, currentInstructionIndex + currentInstruction.amt, acc);
    }
    if (currentInstruction.cmd === 'nop') {
      return findRepeatedInstruction(executedInstructions, currentInstructionIndex + 1, acc);
    }
}

const accTotalFirstPass = findRepeatedInstruction();
console.log(accTotalFirstPass);