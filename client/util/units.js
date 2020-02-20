
export const createOptions = (start, end) => {
  const array = new Array(end-start)
  for (let i = 0; i < array.length; i++) {
    array[i] = {key: start, value: start, text: start}
    start++
  }
  console.log(array)
  return array
}
