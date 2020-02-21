
// What: Maps a date of a credit into a period-object, with a period number between 1-5 and the year 
// Takes in: a date-object of the credit
const toPeriod = (date) => {
  let period = 0
  const day = date.getDate()
  const month = date.getMonth() + 1
  let year = date.getFullYear()

  if ((month > 9 && month < 11) || (month === 9 && day >= 23) || (month === 11 && day <= 17)) {
    period = 1
  } else if ((month === 12 || month === 1) || (month === 11 && day >= 18) || (month === 2 && day <= 9)) {
    period = 2
  } else if ((month > 2 && month < 4) || (month === 2 && day >= 20) || (month === 4 && day <= 5)) {
    period = 3
  } else if ((month === 4 && day >= 6) || month === 5) {
    period = 4
  } else {
    period = 5
  }

  if (period === 2 && month <= 2) {
    year -= 1
  }

  return { period, year }
}

// What: finds out the next period for another period-object, works year-around, returns an object
// Takes in: an period-object with properties of period (number between 1-5) and a year
const nextPeriodOf = (periodObject) => {
  const nextPeriod = { period: periodObject.period, year: periodObject.year }

  if (periodObject.period === 5) {
    nextPeriod.period = 1
  } else if (periodObject.period === 2) {
    nextPeriod.period = 3
    nextPeriod.year += 1
  } else {
    nextPeriod.period += 1
  }

  return nextPeriod
}

const isSamePeriod = (period1, period2) => {
  if (period1.year !== period2.year) return false
  if (period1.period === period2.period) return true
  return false
}

const dataByYear = (data, year) => {
  return data.filter(credit => credit.date.getFullYear() === year)
}

module.exports = {
  isSamePeriod,
  toPeriod,
  nextPeriodOf,
  dataByYear,
}
