import fileToList from '../denoUtils/fileToList.ts';

const list = await fileToList('input.txt', String);

class Range {
    constructor(range: string) {
        const nums = range.split('-');
        this.min = parseInt(nums[0]);
        this.max = parseInt(nums[1]);
    }
    readonly min: number;
    readonly max: number;
}

class Char {
    constructor(charChunk: string) {
        this.value = charChunk[0];
    }
    readonly value: string;
}

class Password {
    constructor(password: string) {
        this.value = password;
    }
    readonly value: string;
}

let valid = 0;

for (const line of list) {
    const parts = line.split(' ');
    const range = new Range(parts[0]);
    const char = new Char(parts[1]);
    const password = new Password(parts[2]);

    let freq = 0;
    for (const c of password.value) {
      if (c === char.value) {
          ++freq;
      }
    }
    
    if (freq >= range.min && freq <= range.max) {
        valid++;
    }
}

console.log(valid);
