const { checkGrade } = require('@root/server/datahandling/grades')
const { toPeriod, isSamePeriod, nextPeriodOf } = require('@root/server/datahandling/periods')
const { addWeights, separateOthersCategory, othersCategoryFirsts } = require('@root/server/datahandling/weights')
const { countTheBiggestCourses } = require('@root/server/datahandling/courses')
const { studentObjects } = require('@root/server/datahandling/students')

// What: ties it all together for a normal graph
// Takes in: an array of course credits, start course, wanted year of the starting course and the wanted grade
const studentPaths = (data, year, startCourse, grade) => {
  const students = studentObjects(data)
  const arrays = highChartsObjects(students, startCourse, year, grade)
  const arraysWithSummedWeights = addWeights(arrays)
  const arraysWithOtherCategory = separateOthersCategory(arraysWithSummedWeights, startCourse, 9)
  return arraysWithOtherCategory
}

// What: creates an array of highchart-objects with a starting course, ending course in next period and a weight of 1
// Takes in: an array of students with their corresponding courses, starting course, year of the starting course, and grade
// Special: if year is null, returns data of all years, if grade is null, returns data of all grades
// täällä on nyt seassa tota mun pohdintaa, et millä vois pitää kirjaa siitä, et ketkä on ne opiskelijat, jotka on seuraavassa periodissa suorittanut sen klikattavan kurssin
// pitää miettiä joku järkevämpi sijoitus sille myöhemmin
const highChartsObjects = (data, startCourse, year, grade) => {

  let highChartsArrays = []
  const studentsWhoHaveDoneCreditcourse = new Map()

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
        if (studentsWhoHaveDoneCreditcourse.has(credit.course)) {
          let arrayOfStudentIds = []
          arrayOfStudentIds = studentsWhoHaveDoneCreditcourse.get(credit.course)
          arrayOfStudentIds = [...arrayOfStudentIds, credit.studentId]
          studentsWhoHaveDoneCreditcourse.set(credit.course, arrayOfStudentIds)
        } else {
          studentsWhoHaveDoneCreditcourse.set(credit.course, [credit.studentId])
        }

        highChartsArrays = [...highChartsArrays, [startCourse, credit.course, 1]]
      })
    }
    hasDoneStartCourse = false
  })

  return highChartsArrays
}

const isCsStudent = (firstCourse) => {
  let isCsStudent = false
  if (firstCourse === 'Ohjelmoinnin perusteet' ||
    firstCourse === 'Ohjelmoinnin jatkokurssi' ||
    firstCourse === 'Tietokone työvälineenä') {
    isCsStudent = true
  }

  return isCsStudent
}
// Creates a highcharts-array of the studentpaths taking into account all credits in each students starting period
// Takes in: an array of credits and starting year
const firstCourses = (data, year, grade, levels) => {
  const students = studentObjects(data)
  let highChartsArrays = []
  let fromCourses = []
  let toCourses = []

  students.forEach((student) => {
    let level = 1
    const firstCourse = student.courses[0]
    const startPeriod = toPeriod(firstCourse.date)
    let fromPeriod = startPeriod
    let nextPeriodWithCredit = 0
    let periodHasChanged = false

    if (year === startPeriod.year && isCsStudent(firstCourse.course)) {
      student.courses.forEach((course) => {
        const periodOfCourse = toPeriod(course.date)
        if (level >= levels) {
          // do nothing
        } else if (isSamePeriod(periodOfCourse, fromPeriod)) {
          fromCourses = [...fromCourses, `${level}: ${course.course}`]
        } else if (!periodHasChanged && !isSamePeriod(periodOfCourse, fromPeriod)) {
          periodHasChanged = true
          level++
          nextPeriodWithCredit = periodOfCourse
          toCourses = [...toCourses, `${level}: ${course.course}`]
        } else if (isSamePeriod(periodOfCourse, nextPeriodWithCredit)) {
          toCourses = [...toCourses, `${level}: ${course.course}`]
        } else {
          fromCourses.forEach((from) => {
            toCourses.forEach((to) => {
              highChartsArrays = [...highChartsArrays, [from, to, 1]]
            })
          })
          level++
          fromPeriod = nextPeriodWithCredit
          nextPeriodWithCredit = periodOfCourse
          fromCourses = toCourses
          toCourses = [`${level}: ${course.course}`]
        }
      })
      fromCourses.forEach((from) => {
        toCourses.forEach((to) => {
          highChartsArrays = [...highChartsArrays, [from, to, 1]]
        })
      })
      fromCourses = []
      toCourses = []
    }
  })


  return othersCategoryFirsts(addWeights(highChartsArrays), levels)
}

module.exports = {
  studentPaths,
  firstCourses,
}
