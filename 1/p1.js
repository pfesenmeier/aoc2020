const fs = require('fs');
const readline = require('readline');

// https://stackoverflow.com/questions/6156501/read-a-file-one-line-at-a-time-in-node-js
async function proccessIntoList(file, parseFunc) {
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

async function solveProblem() {
    const list = await proccessIntoList('input1.txt', Number.parseInt);
    list.sort();

    for (let i = 0; i < list.length; i++) {
      for (let j = 0; j < list.length; j++) {
          for (let k = 0; k < list.length; k++) {
              const sum = list[j] + list[i] + list[k];
              if (sum === 2020) {
                  console.log(`${list[j]} + ${list[i]} + ${list[k]} = ${sum}`)
                  return list[j] * list[i] * list[k];
              } else if (sum > 2020) {
                  continue;
              }
          }
      }
    }
}

solveProblem().then(a => console.log(a));

