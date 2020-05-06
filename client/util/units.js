export const createNumberOptions = (start, end, all) => {
  let startPos = start
  const array = new Array(end - startPos)
  for (let i = 0; i < array.length; i++) {
    array[i] = { key: startPos, value: startPos, text: startPos }
    startPos++
  }
  if (all) {
    array.push({ key: 'Kaikki', value: 'Kaikki', text: 'Kaikki' })
  }
  return array
}

export const createTextOptions = array => array.map(item => ({ key: item, value: item, text: item }))

export const grades = createTextOptions(['Läpäisseet', 'Hylätyt', '1', '2', '3', '4', '5'])

export const blueColors = ['#81d4fa', '#4fc3f7', '#29b6f6', '#039be5', '#0288d1', '#0277bd', '#01579b', '#03396c', '#06010f', '#071F33', '#051e3e']

export const randomKey = () => Math.random() * 100000

export const terms = createTextOptions(['Syksy', 'Kevät', 'Kesä'])

export const histogramCategories = (maxYear) => {
  const categories = []
  let currentYear = 1
  let currentPeriod = 1

  for (let i = 1; i < maxYear * 5 + 1; i++) {
    categories[i - 1] = `${currentYear} .vuosi /  ${currentPeriod} .periodi`
    currentPeriod++
    if (i % 5 === 0) {
      currentYear++
      currentPeriod = 1
    }
  }
  return categories
}

export const dataWithColors = (data, maxYear) => {
  const addingColors = data.map((dataPoint, index) => {
    if (index < 5) return ({ y: dataPoint, color: blueColors[0] })
    if (index >= 5 && index < 10) return ({ y: dataPoint, color: blueColors[1] })
    if (index >= 10 && index < 15) return ({ y: dataPoint, color: blueColors[2] })
    if (index >= 15 && index < 20) return ({ y: dataPoint, color: blueColors[3] })
    if (index >= 20 && index < 25) return ({ y: dataPoint, color: blueColors[0] })
    if (index >= 25 && index < 30) return ({ y: dataPoint, color: blueColors[1] })
    if (index >= 30 && index < 35) return ({ y: dataPoint, color: blueColors[2] })
    if (index >= 35 && index < 40) return ({ y: dataPoint, color: blueColors[3] })
    if (index >= 40 && index < 45) return ({ y: dataPoint, color: blueColors[0] })
    if (index >= 45 && index < 50) return ({ y: dataPoint, color: blueColors[1] })
  })
  const array = []
  for (let i = 0; i < maxYear * 5; i++) {
    array[i] = addingColors[i]
  }
  return array
}
