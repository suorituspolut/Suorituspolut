const { toPeriod, periodsBetweenTwoDates } = require('@root/server/datahandling/periods')
const { studentObjects } = require('@root/server/datahandling/students')
const { listOfCourses } = require('@root/server/datahandling/courses')

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
        if (time < 36) {
          histogramArray[time]++
        }
      }
    })
  })
  return { course, histogramArray }
}

const histogramObjects = (data, course) => {
  const students = studentObjects(data)

  if (course) {
    return courseHistoArray(students, course)
  }

  let histogramList = []
  let courselist = data.map(credit => credit.course)
  courselist.shift()
  courselist = new Set(courselist)


  courselist.forEach((course) => {
    histogramList = [...histogramList, courseHistoArray(students, course)]
  })

  return sortByMode(histogramList)
}

const sortByMode = (histogramList) => {
  histogramList.forEach((histoObject) => {
    histoObject.biggestIndex = histoObject.histogramArray.indexOf(Math.max(...histoObject.histogramArray))
  })

  return histogramList.sort((histoObject1, histoObject2) => histoObject1.biggestIndex - histoObject2.biggestIndex)
}


module.exports = {
  histogramObjects,
}
