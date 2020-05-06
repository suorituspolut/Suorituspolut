/* eslint-disable no-use-before-define */
const { graduatedStudents, coursesOfOneStudent } = require('@root/server/datahandling/students')
const {
  periodsBetweenTwoDates, periodsToClosestYear, periodToTerm, toPeriod,
} = require('@root/server/datahandling/periods')


const recommendationTimeObjects = (data, year, term, studentNumber, goalYears) => {
  const timely = timelyGraduated(data, goalYears)
  const courseList = makeCourseList(timely, year, term)
  if (studentNumber !== 'null') {
    const studentCourseList = coursesOfOneStudent(studentNumber, data)
    const filtered = filterCoursesFromList(courseList, studentCourseList)
    return filtered
  }
  return courseList
}

// Gets all students who have graduated and filters all the timely graduated ones
// Takes in an array of credit-objects and the number of years a student should have graduated in
// to be considered "timely graduated"
const timelyGraduated = (data, goalYears) => {
  const periods = goalYears * 5
  const students = graduatedStudents(data)
  let onTime = []
  students.forEach((student) => {
    const firstCourse = student.courses[0]

    student.courses.forEach((credit) => {
      if (credit.course === 'Luonnontieteiden kandidaatti') {
        if (periodsBetweenTwoDates(firstCourse.date, credit.date) <= periods) {
          onTime = [...onTime, student]
        }
      }
    })
  })

  return onTime
}


const makeCourseList = (data, year, term) => {
  let filtered = []
  const courseSet = new Map()
  let weight = 0
  data.forEach((student) => {
    const firstCourse = student.courses[0]
    student.courses.forEach((credit) => {
      const creditTerm = periodToTerm(toPeriod(credit.date).period)
      const creditTime = 5 + periodsToClosestYear(periodsBetweenTwoDates(firstCourse.date, credit.date))
      if (year * 5 === creditTime && creditTerm === term) {
        if (courseSet.has(credit.course)) {
          weight = courseSet.get(credit.course) + 1
          courseSet.set(credit.course, weight)
        } else {
          courseSet.set(credit.course, 1)
        }
      }
    })
  })

  courseSet.forEach((weight, course) => {
    filtered = [...filtered, [course, weight]]
  })
  filtered.sort((credit1, credit2) => credit2[1] - credit1[1])
  return filtered
}

const filterCoursesFromList = (courseList, studentCourseList) => {
  const newList = []
  courseList.forEach((credit) => {
    if (!studentCourseList.includes(credit[0])) {
      newList.push(credit)
    }
  })

  return newList
}

module.exports = {
  recommendationTimeObjects,
}
