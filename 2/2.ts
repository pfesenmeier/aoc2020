import fileToList from '../denoUtils/fileToList.ts';

const list = await fileToList('input.txt', String);

let validCount = 0;
for (const line of list) {
    const match = line.match(/([0-9]+)-([0-9]+) ([a-z]): ([a-z]+)/);
    if (match === null) {
        throw new Error('regexp failed');
    }
    const index1: number = parseInt(match[1]);
    const index2: number = parseInt(match[2]);
    const char: string = match[3];
    const password: string = match[4];

    if(password[index1 - 1] === char ? password[index2 - 1] !== char : password[index2 - 1] === char) {
        validCount++;
    }
}
console.log(validCount);



