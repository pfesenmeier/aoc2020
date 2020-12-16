const history = "6,3,15,13,1,0".split(",").map((num) => parseInt(num));


while (history.length < 30000000) {
  console.log(history.length);
  const lastNum = history[history.length - 1];
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf
  const indices = [];
  let idx = history.lastIndexOf(lastNum);
  while (idx !== -1 && indices.length < 2) {
    indices.push(idx);
    idx = history.lastIndexOf(lastNum, idx - 1);
  }
  if (indices.length === 0) throw Error("something happened");
  if (indices.length === 1) {
    history.push(0);
  } else {
    const lastOccurance = indices[0];
    const penultimateOccurance = indices[1];
  
    history.push(lastOccurance - penultimateOccurance);
  }
}

console.log(history[history.length - 1]);
