export const sum = (array) => array.reduce((value, sum) => value + sum, 0);

export const makeGroupsOfArrays = (arrays, size) => {
  let res = [];
  for (let i = 0; i < arrays.length / size; i++) {
    res.push(arrays.slice(size * i, size * (i + 1)));
  }
  return res;
};

export const splitArray = (array) => {
  return makeGroupsOfArrays(array, array.length / 2);
};
