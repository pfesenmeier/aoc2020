const fs = require('fs');
const readline = require('readline');

// https://stackoverflow.com/questions/6156501/read-a-file-one-line-at-a-time-in-node-js
module.exports = async function proccessFileIntoList(file, parseFunc) {
    const fileStream = fs.createReadStream(file);

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    const list = [];
    for await (const line of rl) {
        list.push(parseFunc(line));
    }
    return list;
}