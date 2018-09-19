let arr = [1, 2, 3, 4, 5]
// arr.reduce((accumulator, currentValue, currentIndex, array) => {
//   console.info(accumulator, currentValue, currentIndex, array)
//   return accumulator + currentValue
// })
let newArr = arr.reduce((a, b) => {
  return a * b
})

let arr2 = [88,...arr]

console.info('arr2:', arr2)

console.info(newArr, arr)

export default arr2
