

const dataByYear = (data, year) => {
  return data.filter(credit => credit.date.getFullYear() === year)
}

const toPeriod = (date) => {
  let period = 0
  const month = date.getMonth() + 1

  if (month >= 11 && month <= 12) {
    period = 1
  } else if (month >= 1 && month <= 3) {
    period = 2
  } else if (month >= 4 && month <= 5) {
    period = 3
  } else {
    period = 4
  }

  return period
}

const highChartsObjects = (data, startingCourse) => {

  let highChartsArrays = []

  for (let i = 0; i < data.length; i++) {
    let isStartingCourse = false
    let periodOfStartingCourse = 0

    for (let j = 0; j < data[i].courses.length; j++) {
      if (data[i].courses[j].course === startingCourse) {
        isStartingCourse = true
        periodOfStartingCourse = data[i].courses[j].period
      }
    }

    if (isStartingCourse) {
      const nextCourses = data[i].courses.filter(credit => credit.period === (periodOfStartingCourse + 1))
      nextCourses.forEach(credit => highChartsArrays = [...highChartsArrays, [startingCourse, credit.course, 1]])
    }
    isStartingCourse = false
  }

  return highChartsArrays
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
