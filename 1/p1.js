const fileToList = require('../utils/fileToList');

async function solveProblem() {
    const list = await fileToList('input1.txt', Number.parseInt);
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

