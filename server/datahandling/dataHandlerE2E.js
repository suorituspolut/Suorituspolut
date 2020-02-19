

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

const addWeights = (arrayOfCredits, startCourse) => {

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
  
  // sorting the array of courses by weights
  weightedArray.sort(byWeights)
  return filterByWeights(weightedArray, startCourse)
}

const byWeights = (array1, array2) => array2[2]-array1[2]

const filterByWeights = (weightedArray, startCourse) => {

  //separating the biggest courses from the small courses 
  let arrayWithOthers = weightedArray.filter(array => weightedArray.indexOf(array) < 7)
  const others = weightedArray.filter(array => weightedArray.indexOf(array) >= 7)

  //counting together the weights of smaller courses
  if (weightedArray.length >= 7) {
    const totalWeightsOfOthers = others.reduce((sum, course) => {
      return sum + course[2]
    }, 0)
    arrayWithOthers = [...arrayWithOthers, [startCourse, "Muut", totalWeightsOfOthers]] 
  }
  return arrayWithOthers
}

const highChartsObjects = (data, startCourse, endCourse, origStartCourse, howMany) => {

  let highChartsArrays = []

  for (let i = 0; i < data.length; i++) {
    let isOrigCourse = false
    let isStartCourse = false
    let periodOfStartCourse = 0
    let periodOfOrigStartCourse = 0
    let isEndCourse = false
    let orig = null
    let startCourse = null

    for (let j = 0; j < data[i].courses.length; j++) {
      if (data[i].courses[j].course === startCourse) {
        isStartCourse = true
        startCourse = data[i].courses[j]
        periodOfStartCourse = toPeriod(data[i].courses[j].date)
      }
      if (data[i].courses[j].course === endCourse) {
        isEndCourse = true
      }
      if (data[i].courses[j].course === origStartCourse) {
        isOrigCourse = true
        orig = data[i].courses[j]
        periodOfOrigStartCourse = toPeriod(data[i].courses[j].date)
      }
    }

    if (isStartCourse && isEndCourse && isOrigCourse) {
      let nextCourses = data[i].courses.filter(credit => isSamePeriod(toPeriod(credit.date), nextPeriodOf(periodOfStartCourse)))
      console.log(nextCourses)
      nextCourses = nextCourses.filter(credit => isSamePeriod(toPeriod(credit.date), nextPeriodOf(nextPeriodOf((orig.date)))))
      console.log(nextCourses)
      nextCourses.forEach(credit => [...highChartsArrays, [startCourse, credit.course, 1]])
    }

    isStartCourse = false
    isEndCourse = false
  }
  return addWeights(highChartsArrays, startCourse)
}


const studentPathsE2E = (data, year, origStartCourse, endCourse ) => {
  data.shift()
  const stNumbers = [...new Set(data.map(x => x.studentId))]
  const students = []
  let courses = []
  let helper = stNumbers[0]
  let student = { studentNumber: stNumbers[0], courses: [] }

  const dataOfYear = data

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
  let highChartsArrays = highChartsObjects(students, origStartCourse, endCourse, origStartCourse, 1)
  const nextCourses = highChartsArrays.map(array => array[1])
  nextCourses.forEach(course => {
    if (course !== endCourse && course !== "Muut") {
      newobjects = highChartsObjects(students, course, endCourse, origStartCourse, 2)
      for (let j = 0; j < newobjects.length; j++) {
        highChartsArrays = [...highChartsArrays, newobjects[j]]
      }
    }
  })
  return highChartsArrays
}

module.exports = {
  dataByYear,
  studentPathsE2E,
}
