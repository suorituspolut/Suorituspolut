

const dataByYear = (data, year) => {
  return data.filter(credit => credit.date.getFullYear() === year)
}

const toPeriod = (date) => {
  let period = 0
  const day = date.getDate()
  const month = date.getMonth() + 1
  let year = date.getFullYear()

  if ((month > 9 && month < 11) || (month === 9 && day >= 23) || (month === 11 && day <= 17)) {
    period = 1
  } else if ((month === 12 || month === 1) || (month === 11 && day >= 18) || (month === 2 && day <= 9)) {
    period = 2
  } else if ((month > 2 && month < 4) || (month === 2 && day >= 2) || (month === 4 && day <= 5)) {
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

const nextPeriodOf = (period) => {
  const nextPeriod = { period: period.period, year: period.year }

  if (period.period === 5) {
    nextPeriod.period = 1
  } else if (period.period === 2) {
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

const addWeights = (arrayOfCredits) => {
  
  const courseSet = new Map()
  let weightedArray = []

  for (let i = 0; i < arrayOfCredits.length; i++) {
    const startCourse = arrayOfCredits[i][0]
    const finishCourse = arrayOfCredits[i][1]
    const coursepair = `${startCourse}>${finishCourse}`
    if (!courseSet.has(coursepair)) {
      courseSet.set(coursepair, 1)
    } else {
      const weight = courseSet.get(coursepair) + 1
      courseSet.set(coursepair, weight)
    }
  }

  for (let [courses, weight] of courseSet.entries()) {
    const coursepair = courses.split('>')
    weightedArray = [...weightedArray, [coursepair[0], coursepair[1], weight]]
  }
  
  return weightedArray
}

const highChartsObjects = (data, startingCourse) => {

  let highChartsArrays = []

  for (let i = 0; i < data.length; i++) {
    let isStartingCourse = false
    let periodOfStartingCourse = 0

    for (let j = 0; j < data[i].courses.length; j++) {
      if (data[i].courses[j].course === startingCourse) {
        isStartingCourse = true
        periodOfStartingCourse = toPeriod(data[i].courses[j].date)
      }
    }

    if (isStartingCourse) {
      const nextCourses = data[i].courses.filter(credit => isSamePeriod(toPeriod(credit.date), nextPeriodOf(periodOfStartingCourse)))
      nextCourses.forEach(credit => highChartsArrays = [...highChartsArrays, [startingCourse, credit.course, 1]])
    }
    isStartingCourse = false
  }

  return addWeights(highChartsArrays)
}


const studentPaths = (data, year, startCourse) => {
  const stNumbers = [...new Set(data.map(x => x.studentId))]
  const students = []
  let courses = []
  let helper = stNumbers[0]
  let student = { studentNumber: stNumbers[0], courses: [] }

  const dataOfYear = dataByYear(data, year)

  for (let i = 0; i < dataOfYear.length; i++) {

    if (dataOfYear[i].studentId !== helper) {
      courses.sort()
      student.courses = courses
      students.push(student)

      courses = []

      courses.push({
        courseId: dataOfYear[i].courseId,
        date: dataOfYear[i].date,
        period: toPeriod(dataOfYear[i].date),
        course: dataOfYear[i].course,
        grade: dataOfYear[i].grade,
      })
      helper = dataOfYear[i].studentId

      student = { studentNumber: dataOfYear[i].studentId, courses: [] }
    } else {
      courses.push({
        courseId: dataOfYear[i].courseId,
        date: dataOfYear[i].date,
        period: toPeriod(dataOfYear[i].date),
        course: dataOfYear[i].course,
        grade: dataOfYear[i].grade,
      })
    }

    if (i === dataOfYear.length - 1) {
      courses.sort()

      student.courses = courses
      students.push(student)
    }
  }
  return highChartsObjects(students, startCourse)
}

module.exports = {
  dataByYear,
  studentPaths,
}
