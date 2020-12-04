import fileToList from '../denoUtils/fileToList.ts';

const list = await fileToList('3.txt', String);
const inputLength = list[0].length;

function skiFactory(right: number, down: number) {
    return (function ski(list: string[], pos = 0, trees = 0): number {
        if (list.length === 0) return trees;
        const nextPos: number = pos + right >= inputLength ? pos + right - inputLength : pos + right;
    
        if (list[0][pos] === '#') {
            return ski(list.slice(down), nextPos, ++trees);
        }
        return ski(list.slice(down), nextPos, trees);
    });
}

const slopes = [
    { right: 1, down: 1 },
    { right: 3, down: 1 },
    { right: 5, down: 1 },
    { right: 7, down: 1 },
    { right: 1, down: 2 },
];

const trees = slopes
                 .map(slope => skiFactory(slope.right, slope.down))
                 .map(ski => ski(list))
                 .reduce((runTotal, current) => runTotal * current);

console.log(trees);