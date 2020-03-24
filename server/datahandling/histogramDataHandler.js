const { toPeriod, periodsBetweenTwoDates } = require('@root/server/datahandling/periods')
const { studentObjects } = require('@root/server/datahandling/students')

const courseHistoArray = (students, course) => {
  const histogramArray = new Array(36)
  for (let i = 0; i < histogramArray.length; i++) {
    histogramArray[i] = 0
  }

  students.forEach((student) => {
    const firstCourse = student.courses[0]
    student.courses.forEach((credit) => {
      if (firstCourse.course === course) {
        histogramArray[0]++
      } else if (credit.course === course) {
        const time = periodsBetweenTwoDates(firstCourse.date, credit.date)
        if (time <= 37) {
          histogramArray[time]++
        }
      }
    })
  })
  return { course, histogramArray }
}

const histogramObjects = (data, course, courselist) => {
  const students = studentObjects(data)

  if (course) {
    return courseHistoArray(students, course)
  }

  let histogramList = []

  courselist.forEach((course) => {
    histogramList = [...histogramList, courseHistoArray(students, course)]
  })


  return histogramList
}


module.exports = {
  histogramObjects,
}
