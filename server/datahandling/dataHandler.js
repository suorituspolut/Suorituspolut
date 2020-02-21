const { checkGrade } = require('@root/server/datahandling/grades')
const { toPeriod, isSamePeriod, nextPeriodOf } = require('@root/server/datahandling/periods')
const { addWeights, separateOthersCategory } = require('@root/server/datahandling/weights')

// What: ties it all together
// Takes in: an array of course credits, start course, wanted year of the starting course and the wanted grade
const studentPaths = (data, year, startCourse, grade) => {
  const students = studentObjects(data)
  const arrays = highChartsObjects(students, startCourse, year, grade)
  const arraysWithSummedWeights = addWeights(arrays)
  const arraysWithOtherCategory = separateOthersCategory(arraysWithSummedWeights, startCourse)
  return arraysWithOtherCategory
}

// What: creates an array of highchart-objects with a starting course, ending course in next period and a weight of 1
// Takes in: an array of students with their corresponding courses, starting course, year of the starting course, and grade
// Special: if year is null, returns data of all years, if grade is null, returns data of all grades
const highChartsObjects = (data, startCourse, year, grade) => {
  
  let highChartsArrays = []
  data.forEach((student) => {
    let hasDoneStartCourse = false
    let periodOfStartCourse = 0
    student.courses.forEach((credit) => {
      if (credit.course === startCourse 
        && (!year || credit.date.getFullYear() === year)
        && (!grade || checkGrade(grade, credit.grade))) {
        hasDoneStartCourse = true
        periodOfStartCourse = toPeriod(credit.date)
      }
    })

    if (hasDoneStartCourse) {
      const nextPeriodCourses = student.courses.filter(credit => isSamePeriod(toPeriod(credit.date), nextPeriodOf(periodOfStartCourse)))
      nextPeriodCourses.forEach((credit) => {
        highChartsArrays = [...highChartsArrays, [startCourse, credit.course, 1]]
      })
    }
    hasDoneStartCourse = false
  })
  return highChartsArrays
}

// What: creates an array of student-objects with their corresponding courses in an array
// Takes in: array of credits with studentIds, dates, courses, grades, module
const studentObjects = (data) => {
  const students = []
  let courses = []
  let helper = data[0].studentNumber
  let student = { studentNumber: data[0].studentId, courses: [] }

  data.forEach((credit) => {
    if (credit.studentId !== helper) {
      student.courses = courses
      students.push(student)
      courses = []
      courses.push(credit)
      helper = credit.studentId
      student = { studentNumber: credit.studentId, courses: [] }
    } else {
      courses.push(credit)
    }
  })
  return students
}

module.exports = {
  studentPaths,
}