const { periodsBetweenTwoDates } = require('@root/server/datahandling/periods')
const { mandatoryCourses, mathCourses, csCourses } = require('@root/server/datahandling/courses')
const { studentObjects } = require('@root/server/datahandling/students')

const courseHistoArray = (students, course) => {
  let sum = 0
  const histogramArray = new Array(45)
  for (let i = 0; i < histogramArray.length; i++) {
    histogramArray[i] = 0
  }

  students.forEach((student) => {
    const firstCourse = student.courses[0]

    if (firstCourse === course) {
      histogramArray[0]++
      sum++
    } else {
      student.courses.forEach((credit) => {
        if (firstCourse.course !== course && credit.course === course) {
          const time = periodsBetweenTwoDates(firstCourse.date, credit.date)
          if (time < 45) {
            histogramArray[time]++
            sum++
          }  
        }
      })
    }  
  })

  return { course, histogramArray, sum}
}

const histogramObjects = (data, course, subset, sorting) => {
  const students = studentObjects(data)

  if (course) {
    return courseHistoArray(students, course)
  }

  let histogramList = []
  let courses = mandatoryCourses
  if (subset === 'mathCourses') courses = mathCourses
  if (subset === 'csCourses') courses = csCourses

  courses.forEach((course) => {
    const courseHistogramArray = courseHistoArray(students, course)
    if (courseHistogramArray.sum !== 0) {
      histogramList = [...histogramList, courseHistogramArray]
    }
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
