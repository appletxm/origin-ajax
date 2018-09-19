var arr = [1, 2, 3, 4, 5];
// arr.reduce((accumulator, currentValue, currentIndex, array) => {
//   console.info(accumulator, currentValue, currentIndex, array)
//   return accumulator + currentValue
// })
var newArr = arr.reduce(function (a, b) {
  return a * b;
});

var arr2 = [88].concat(arr);

console.info('arr2:', arr2);

console.info(newArr, arr);

export default arr2;