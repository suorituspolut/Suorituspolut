

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
  
  weightedArray.sort(byWeights)
  return weightedArray
}

const addWeightsLater = (arrayOfCredits) => {

  const courseSet = new Map()
  let weightedArray = []

  for (let i = 0; i < arrayOfCredits.length; i++) {
    const finishCourse = arrayOfCredits[i][1]
    const startWeight = arrayOfCredits[i][2]

    if (!courseSet.has(finishCourse)) {
      courseSet.set(finishCourse, startWeight)
    } else {
      const weight = courseSet.get(finishCourse) + startWeight
      courseSet.set(finishCourse, weight)
    }
  }

  for (let [finishCourse, weight] of courseSet.entries()) {
    weightedArray = [...weightedArray, [finishCourse, weight]]
  }
  
  // sorting the array of courses by weights
  weightedArray.sort(byWeightsLater)
  return weightedArray
}

const byWeights = (array1, array2) => array2[2]-array1[2]

const byWeightsLater = (array1, array2) => array2[1]-array1[1]

const filterByWeights = (weightedArray) => {
  let arrayWithOthers = weightedArray.filter(array => weightedArray.indexOf(array) < 7)
  const others = weightedArray.filter(array => weightedArray.indexOf(array) >= 7)

  if (weightedArray.length >= 7) {
    const totalWeightsOfOthers = others.reduce((sum, course) => {
      return sum + course[2]
    }, 0)
    arrayWithOthers = [...arrayWithOthers, [weightedArray[1][0], "Muut", totalWeightsOfOthers]] 
  }

  if (weightedArray.length >= 7) {
    others.forEach((course) => {
      arrayWithOthers = [...arrayWithOthers, [course[0], "Muut", course[2]]]
    })
  }

  return arrayWithOthers
}

const filterByWeightsLater = (weightedArray, courses) => {
  const courseSet = new Map()
  let biggestCourses = courses.filter(course => courses.indexOf(course) <= 6)
  let smallerCourses = courses.filter(course => courses.indexOf(course) > 6)
  biggestCourses.forEach((course) => courseSet.set(course[0], course[1]))
  console.log(courseSet)
  let arrayWithOthers = []
  if (courses.length >= 7) {
    weightedArray.forEach((credit) => {
      
      if (courseSet.has(credit[1])) {
        arrayWithOthers = [...arrayWithOthers, [credit[0], credit[1], credit[2]]]
        console.log(credit[0])
        console.log(credit[1])
        console.log(credit[2])
      } else {
        arrayWithOthers = [...arrayWithOthers, [credit[0], "Muut ", credit[2]]]
      }
    })
  }
  console.log(arrayWithOthers)
  return arrayWithOthers
}

const highChartsObjects = (data, startCourse, endCourse, origStartCourse, listOfCourses) => {

  let highChartsArrays = []
  for (let i = 0; i < data.length; i++) {
    let isOrigCourse = false
    let isStartCourse = false
    let isEndCourse = false
    let periodOfStartCourse = 0

    for (let j = 0; j < data[i].courses.length; j++) {
      if (data[i].courses[j].course === startCourse) {
        isStartCourse = true
        periodOfStartCourse = toPeriod(data[i].courses[j].date)
      }
      if (data[i].courses[j].course === endCourse) {
        isEndCourse = true
      }
      if (data[i].courses[j].course === origStartCourse) {
        isOrigCourse = true 
      }
    }

    if (isStartCourse && isOrigCourse && isEndCourse) {
      const nextCourses = data[i].courses.filter(credit => isSamePeriod(toPeriod(credit.date), nextPeriodOf(periodOfStartCourse)))
      nextCourses.forEach((credit) => {
        if (listOfCourses.includes(credit.course) ) {
          highChartsArrays = [...highChartsArrays, [startCourse, credit.course+" ", 1]]
        } else {
          highChartsArrays = [...highChartsArrays, [startCourse, credit.course, 1]]
        }
      }) 
      isStartCourse = false
      isEndCourse = false
      isOrigCourse = false
    }
  }
  return addWeights(highChartsArrays)
}

const studentPathsE2E = (data, year, origStartCourse, endCourse) => {
  data.shift()
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

  
  const startCourse = origStartCourse
  
  //data for the first period
  let highChartsArrays = highChartsObjects(students, startCourse, endCourse, origStartCourse, [startCourse])
  highChartsArrays = filterByWeights(highChartsArrays)

  //checking the courses of second period
  const nextCourses = highChartsArrays.map(array => array[1])

  //creating the highChartsArrays for the secondperiod. Adding "Muut" to be found on the 
  let newSecondPeriod = []
  for (let i = 0; i < nextCourses.length; i++) {
    let secondPeriod = highChartsObjects(students, nextCourses[i], endCourse, origStartCourse, [...nextCourses, "Muut"])
    for (let j = 0; j < secondPeriod.length; j++) {
      newSecondPeriod = [...newSecondPeriod, secondPeriod[j]]
    }
  }

  const secondPeriodCourses = addWeightsLater(newSecondPeriod)
  newSecondPeriod = filterByWeightsLater(newSecondPeriod, secondPeriodCourses)
  for (let i = 0; i < newSecondPeriod.length; i++) {
    highChartsArrays = [...highChartsArrays, newSecondPeriod[i]]
  }

  return highChartsArrays
}

module.exports = {
  dataByYear,
  studentPathsE2E,
}
