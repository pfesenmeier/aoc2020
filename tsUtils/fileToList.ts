import * as fs from 'fs';
import * as readline from 'readline';

interface ParseFunc<T> {
    (line: string): T;
}

// https://stackoverflow.com/questions/6156501/read-a-file-one-line-at-a-time-in-node-js
module.exports = async function proccessFileIntoList<T>(file: string, parseFunc: ParseFunc<T>): Promise<T[]> {
    const fileStream = fs.createReadStream(file);

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    const list: Array<T> = [];
    for await (const line of rl) {
        list.push(parseFunc(line));
    }
    return list;
}