
export const createNumberOptions = (start, end) => {
  const array = new Array(end-start)
  for (let i = 0; i < array.length; i++) {
    array[i] = {key: start, value: start, text: start}
    start++
  }
  return array
}

export const createTextOptions = (array) => {
  return array.map(item => ({key: item, value: item, text: item}))
}
