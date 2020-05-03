
// What: Maps a date of a credit into a period-object, with a period number between 1-5 and the year
// Takes in: a date-object of the credit
// boundaries at the moment (may need to be fixed later):
// period 1: 23.9.-17.11.
// period 2: 18.11.-19.2.
// period 3: 20.2.-5.4.
// period 4: 6.4.-31.5.
// period 5: 1.6.-22.9.
const toPeriod = (date) => {
  let period = 0
  const day = date.getDate()
  const month = date.getMonth() + 1
  let year = date.getFullYear()

  if ((month > 9 && month < 11) || (month === 9 && day >= 23) || (month === 11 && day <= 17)) {
    period = 1
  } else if ((month === 12 || month === 1) || (month === 11 && day >= 18) || (month === 2 && day <= 19)) {
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

const timeBetween = (startDate, endDate) => {
  const start = toPeriod(startDate)
  const end = toPeriod(endDate)
  if (start.year === end.year) {
    return end.period
  } if (start.year + 1 === end.year) {
    return 5 + end.period
  } if (start.year + 2 === end.year) {
    return 10 + end.period
  } if (start.year + 3 === end.year) {
    return 15 + end.period
  } if (start.year + 4 === end.year) {
    return 20 + end.period
  } if (start.year + 5 === end.year) {
    return 25 + end.period
  } if (start.year + 6 === end.year) {
    return 30 + end.period
  }
  return 49
}

const isSamePeriod = (period1, period2) => {
  if (period1.year !== period2.year) return false
  if (period1.period === period2.period) return true
  return false
}

const isEarlierPeriod = (period1, period2) => {
  if (period1.year < period2.year) return true
  if (period1.year === period2.year && period1.period === 3 && (period2.period === 1 || period2.period === 2)) return true
  if (period1.year === period2.year && period1.period === 4 && (period2.period === 1 || period2.period === 2)) return true
  if (period1.year === period2.year && period1.period === 5 && (period2.period === 1 || period2.period === 2)) return true
  return false
}

const periodToYearEnd = (period) => {
  const p = period.period
  if (p === 2) return 0
  if (p === 1) return 1
  if (p === 5) return 2
  if (p === 4) return 3
  return 4
}

const periodToTerm = (period) => {
  if (period === 1 || period === 2) {
    return 'Syksy'
  } if (period === 3 || period === 4) {
    return 'Kevät'
  } return 'Kesä'
}
const periodsToClosestYear = (amount) => {
  const remainder = amount % 5

  return amount - remainder
}

const periodsBetweenTwoDates = (date1, date2) => {
  const start = toPeriod(date1)
  const end = toPeriod(date2)

  if (isSamePeriod(start, end)) return 0

  if (end.year - start.year === 0) {
    if (end.period > start.period) return end.period - start.period
    return (5 - start.period) + end.period
  }
  return periodToYearEnd(start) + ((end.year - start.year - 1) * 5) + (5 - periodToYearEnd(end))
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

const dataByYear = (data, year) => data.filter(credit => credit.date.getFullYear() === year)


module.exports = {
  isEarlierPeriod,
  isSamePeriod,
  toPeriod,
  nextPeriodOf,
  dataByYear,
  timeBetween,
  periodsBetweenTwoDates,
  periodsToClosestYear,
  periodToTerm,
}
