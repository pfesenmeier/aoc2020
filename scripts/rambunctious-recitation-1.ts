const input = "6,3,15,13,1,0".split(",").map((num) => parseInt(num));

function callOutNumbers(history: number[]): number {
  const lastNum = history[history.length - 1];
  console.log(lastNum);
  if (history.length === 2020) return lastNum;

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf
  const indices = [];
  let idx = history.indexOf(lastNum);
  while (idx !== -1) {
    indices.push(idx);
    idx = history.indexOf(lastNum, idx + 1);
  }
  if (indices.length === 0) throw Error('something happened');
  if (indices.length === 1) {
    return callOutNumbers(
      history.concat(0),
    );
  }

  const lastOccurance = indices[indices.length - 1];
  const penultimateOccurance = indices[indices.length - 2];

  return callOutNumbers(history.concat(lastOccurance - penultimateOccurance));
}

console.log(callOutNumbers(input));
