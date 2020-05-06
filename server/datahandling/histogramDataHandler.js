/* eslint-disable no-use-before-define */
/* eslint-disable no-param-reassign */
const { periodsBetweenTwoDates } = require('@root/server/datahandling/periods')
const { mandatoryCourses, mathCourses, csCourses } = require('@root/server/datahandling/courses')
const { studentObjects } = require('@root/server/datahandling/students')

const histogramObjects = (data, course, subset, sorting) => {
  const students = studentObjects(data)

  if (course) {
    return simpleHistogramData(students, course)
  }

  let histogramList = []
  let courses = mandatoryCourses
  if (subset === 'mathCourses') courses = mathCourses
  if (subset === 'csCourses') courses = csCourses

  courses.forEach((course) => {
    const courseHistogramArray = simpleHistogramData(students, course)
    if (courseHistogramArray.sum > 20) {
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

const simpleHistogramData = (students, course) => {
  let sum = 0
  const histogramArray = new Array(50)
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
          if (time < 50) {
            histogramArray[time]++
            sum++
          }
        }
      })
    }
  })

  return { course, histogramArray, sum }
}

const calculateMedian = (array) => {
  let sum = 0
  array.forEach((x) => {
    sum += x
  })

  return (sum / array.length)
}

// sorts a list of histogram-objects by their mode, smallest modes first
const sortByModeEndHeavy = (histogramList) => {
  histogramList.forEach((histoObject) => {
    histoObject.biggestIndex = histoObject.histogramArray.indexOf(Math.max(...histoObject.histogramArray))
  })

  return histogramList.sort((histoObject1, histoObject2) => histoObject2.biggestIndex - histoObject1.biggestIndex)
}

// sorts a list of histogram-objects by their mode, biggest modes first
const sortByModeStartHeavy = (histogramList) => {
  histogramList.forEach((histoObject) => {
    histoObject.biggestIndex = histoObject.histogramArray.indexOf(Math.max(...histoObject.histogramArray))
  })

  return histogramList.sort((histoObject1, histoObject2) => histoObject1.biggestIndex - histoObject2.biggestIndex)
}

// sorts a list of histogram-objects by their standard deviation, smallest first
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

// sorts a list of histogram-objects by their standard deviation, biggest first
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

module.exports = {
  histogramObjects,
}
