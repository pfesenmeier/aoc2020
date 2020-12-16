import { parseTextFile } from '../denoUtils/mod.ts';

const file = await parseTextFile(Deno.args, String);

class SeaPortSys {
  public readonly memoryLength = 36;
  private readonly mask: string[] = [];
  private readonly memory: number[] = [];
  constructor(mask: string) {
    this.mask = mask.split('');
    this.memory = new Array(this.memoryLength).fill(0);
  } 
}
function numberToBits(num: number) {
  let amountLeft = num;
  let CurrentPlace = 0;
  let currentArrayIndex;
  let bits = '';

  while (amountLeft > 0) {
  }
  
}
interface Instruction {
  (oldMemory: string, loc: number, mem: number): string;
  (oldMask: string, newMask: string): string;
}

class ChangeMemory implements Instruction {
  constructor(private loc: number, private mem: number) {} 
  updateMask = (oldMask: string, newMask: string) => oldMask;
  updateMemory = (mask: string, oldMemory: string, loc: number, mem: number) => {
    let memory = oldMemory.slice();
    
  }
}
  
