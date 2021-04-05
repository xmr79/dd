export function getSearchVal(searchColums) {
  let val = {};
  searchColums.forEach(element => {
    const { initval, dataname } = element;
    if (initval) {
      if (typeof initval === 'object') {
        // ...
        val = {
          ...val,
          ...initval,
        };
      } else {
        val[dataname] = initval;
      }
    }
  });
  return val;
}
