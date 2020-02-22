const { checkGrade } = require('@root/server/datahandling/grades')
const { toPeriod, isSamePeriod, nextPeriodOf } = require('@root/server/datahandling/periods')
const { addWeights, separateOthersCategory, separateOthersCategorySecond } = require('@root/server/datahandling/weights')
const { countTheBiggestCourses } = require('@root/server/datahandling/courses')


// What: ties it all together for a normal graph
// Takes in: an array of course credits, start course, wanted year of the starting course and the wanted grade
const studentPaths = (data, year, startCourse, grade) => {
  const students = studentObjects(data)
  const arrays = highChartsObjects(students, startCourse, year, grade)
  const arraysWithSummedWeights = addWeights(arrays)
  const arraysWithOtherCategory = separateOthersCategory(arraysWithSummedWeights, startCourse, 9)
  return arraysWithOtherCategory
}

// What: ties it all together for a multiple-level graph. Works currently for two periods at a time
// Takes in: an array of course credit, start course, wanted year of the starting course, and the wanted grade
const studentPathsE2E = (data, year, startCourse, grade) => {

  const students = studentObjects(data)

  // Create highchart arrays of first period
  const arrays = highChartsObjects(students, startCourse, year, grade)
  const arraysWithSummedWeights = addWeights(arrays)
  const arraysWithOtherCategory = separateOthersCategory(arraysWithSummedWeights, startCourse, 9)

  // Map the end courses of first period
  const nextCourses = arraysWithOtherCategory.map(array => array[1])

  // Create all the arrays for second period with summed weights
  let secondPeriodWithSummedWeights = []
  nextCourses.forEach(((nextCourse) => {
    const secondPeriod = highChartsObjectsSecond(students, nextCourse, startCourse, nextCourses, year)
    const secondPeriodWithWeights = addWeights(secondPeriod)
    secondPeriodWithWeights.forEach((array) => {
      secondPeriodWithSummedWeights = [...secondPeriodWithSummedWeights, array]
    })
  }))

  // Check the biggest end-courses of second period and form the "Others"-category
  const biggestCourses = countTheBiggestCourses(secondPeriodWithSummedWeights, 9)
  const secondPeriodWithOthers = separateOthersCategorySecond(secondPeriodWithSummedWeights, biggestCourses)
  secondPeriodWithOthers.forEach((credit) => {
    arraysWithOtherCategory.push(credit)
  })

  return arraysWithOtherCategory
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

// What: creates the highcharts-objects for the second period
// Takes in: an array of credits, the starting course of second level,
// the original starting course, list of all second level courses and the year of the orig. starting course
const highChartsObjectsSecond = (data, levelStartCourse, origStartCourse, listOfCourses, year) => {

  let highChartsArrays = []

  data.forEach((student) => {
    let hasDoneLevelCourse = false
    let periodOfLevelCourse = 0
    let hasDoneOrigStartCourse = false
    let periodOfOrigStartCourse = 0

    student.courses.forEach((credit) => {

      if (credit.course === levelStartCourse || levelStartCourse === 'Muut') {
        hasDoneLevelCourse = true
        periodOfLevelCourse = toPeriod(credit.date)
      }

      if (credit.course === origStartCourse && credit.date.getFullYear() === year) {
        hasDoneOrigStartCourse = true
        periodOfOrigStartCourse = toPeriod(credit.date)
      }
    })

    if (hasDoneLevelCourse && hasDoneOrigStartCourse && isSamePeriod(periodOfLevelCourse, nextPeriodOf(periodOfOrigStartCourse))) {
      const nextCourses = student.courses.filter(credit => isSamePeriod(toPeriod(credit.date), nextPeriodOf(periodOfLevelCourse)))
      nextCourses.forEach((credit) => {
        if (listOfCourses.includes(credit.course)) {
          highChartsArrays = [...highChartsArrays, [levelStartCourse, " " + credit.course, 1]]
        } else {
          highChartsArrays = [...highChartsArrays, [levelStartCourse, credit.course, 1]]
        }
      })
      hasDoneLevelCourse = false
      hasDoneOrigStartCourse = false
    }
  })

  return highChartsArrays
}

module.exports = {
  studentPaths,
  studentPathsE2E,
}
