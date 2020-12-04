import fileToList from '../denoUtils/fileToList.ts';

const list = await fileToList('3.txt', String);

const inputLength = list[0].length;
let pos = 0;
let trees = 0;

list.forEach(level => {
    if (level[pos] === '#') {
        trees++;
    }
    pos += 3;
    pos = pos >= inputLength ? pos - inputLength : pos;
});

function ski(list: string[], pos = 0, trees = 0): number {
    if (list.length === 0) return trees;
    const nextPos: number = pos + 3 >= inputLength ? pos + 3 - inputLength : pos + 3;

    if (list[0][pos] === '#') {
        return ski(list.slice(1), nextPos, ++trees);
    }
    return ski(list.slice(1), nextPos, trees);
}

console.log(trees);
console.log(ski(list));