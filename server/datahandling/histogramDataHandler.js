const { periodsBetweenTwoDates } = require('@root/server/datahandling/periods')
const { mandatoryCourses, mathCourses, csCourses } = require('@root/server/datahandling/courses')
const { studentObjects, graduatedStudents } = require('@root/server/datahandling/students')

const courseHistoArray = (students, course) => {
  const histogramArray = new Array(36)
  for (let i = 0; i < histogramArray.length; i++) {
    histogramArray[i] = 0
  }

  students.forEach((student) => {
    const firstCourse = student.courses[0]

    if (firstCourse === course) {
      histogramArray[0]++
    } else {
      student.courses.forEach((credit) => {
        if (firstCourse.course !== course && credit.course === course) {
          const time = periodsBetweenTwoDates(firstCourse.date, credit.date)
          if (time < 36) {
            histogramArray[time]++
          }  
        }
      })
    }  
  })

  return { course, histogramArray }
}

const histogramObjects = (data, course, sorting) => {
  const students = studentObjects(data)

  if (course) {
    return courseHistoArray(students, course)
  }

  if (sorting === 'mandatoryCourses') {
    const courses = mandatoryCourses
    let histogramList = []
    courses.forEach((course) => {
      histogramList = [...histogramList, courseHistoArray(students, course)]
    })
    return histogramList
  }

  if (sorting === 'mathCourses') {
    const courses = mathCourses
    let histogramList = []
    courses.forEach((course) => {
      histogramList = [...histogramList, courseHistoArray(students, course)]
    })
    return histogramList
  }

  if (sorting === 'csCourses') {
    const courses = csCourses
    let histogramList = []
    courses.forEach((course) => {
      histogramList = [...histogramList, courseHistoArray(students, course)]
    })
    return histogramList
  }

  let histogramList = []
  let courselist = data.map(credit => credit.course)
  courselist.shift()
  courselist = [...new Set(courselist)]

  courselist.forEach((course) => {
    histogramList = [...histogramList, courseHistoArray(students, course)]
  })
  if (sorting === 'endHeavy') {
    return sortByModeEndHeavy(histogramList)
  }
  if (sorting === 'deviation') {
    return sortByStandardDeviation(histogramList)
  }
  if (sorting === 'deviationReverse') {
    return sortByStandardDeviationReverse(histogramList)
  }

  return sortByModeStartHeavy(histogramList)
}

const sortByModeEndHeavy = (histogramList) => {
  histogramList.forEach((histoObject) => {
    histoObject.biggestIndex = histoObject.histogramArray.indexOf(Math.max(...histoObject.histogramArray))
  })

  return histogramList.sort((histoObject1, histoObject2) => histoObject2.biggestIndex - histoObject1.biggestIndex)
}

const sortByModeStartHeavy = (histogramList) => {
  histogramList.forEach((histoObject) => {
    histoObject.biggestIndex = histoObject.histogramArray.indexOf(Math.max(...histoObject.histogramArray))
  })

  return histogramList.sort((histoObject1, histoObject2) => histoObject1.biggestIndex - histoObject2.biggestIndex)
}

const sortByStandardDeviation = (histogramList) => {
  histogramList.forEach((histoObject) => {
    const median = calculateMedian(histoObject.histogramArray)
    const n = histoObject.histogramArray.length
    let deviation = 0

    histoObject.histogramArray.forEach((x) => {
      deviation += ((x - median) ** 2)
    })

    deviation = Math.sqrt(deviation / n)
    histoObject.deviation = deviation
  })

  return histogramList.sort((histoObject1, histoObject2) => histoObject1.deviation - histoObject2.deviation)
}

const sortByStandardDeviationReverse = (histogramList) => {
  histogramList.forEach((histoObject) => {
    const median = calculateMedian(histoObject.histogramArray)
    const n = histoObject.histogramArray.length
    let deviation = 0

    histoObject.histogramArray.forEach((x) => {
      deviation += ((x - median) ** 2)
    })

    deviation = Math.sqrt(deviation / n)
    histoObject.deviation = deviation
  })

  return histogramList.sort((histoObject1, histoObject2) => histoObject2.deviation - histoObject1.deviation)
}

const calculateMedian = (array) => {
  let sum = 0
  array.forEach((x) => {
    sum += x
  })

  return (sum / array.length)
}

module.exports = {
  histogramObjects,
}
