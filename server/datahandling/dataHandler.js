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
  data.shift()
  let students = []
  let courses = []
  let helper = data[0].studentId
  let student = { studentNumber: data[0].studentId, courses: [] }

  data.forEach((credit) => {
    if (credit.studentId !== helper) {
      courses.sort((credit1, credit2) => credit1.date - credit2.date)
      student.courses = courses
      students = [...students, student]
      courses = []
      courses = [...courses, credit]
      helper = credit.studentId
      student = { studentNumber: credit.studentId, courses: [] }
    } else {
      courses = [...courses, credit]
    }
  })

  //sorts and adds the last student as well
  courses.sort((credit1, credit2) => credit1.date - credit2.date)
  student.courses = courses
  students = [...students, student]

  return students
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

  //console.log(studentsWhoHaveDoneCreditcourse)
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


// Creates a highcharts-array of the studentpaths taking into account all credits in each students starting period
// Takes in: an array of credits and starting year
const firstCourses = (data, year) => {
  const students = studentObjects(data)
  let highChartsArrays = []
  let fromCourses = []
  let toCourses = []

  students.forEach((student) => {
    const firstCourse = student.courses[0]
    const startPeriod = toPeriod(firstCourse.date)
    let fromPeriod = startPeriod
    let nextPeriodWithCredit = 0
    let periodHasChanged = false

    if ( year === startPeriod.year) {
      student.courses.forEach((course) => {
        const periodOfCourse = toPeriod(course.date)
        if (isSamePeriod(periodOfCourse, fromPeriod)) {
          fromCourses = [...fromCourses, course.course]
        } else if (!periodHasChanged && !isSamePeriod(periodOfCourse, fromPeriod)) {
          periodHasChanged = true
          nextPeriodWithCredit = periodOfCourse
          toCourses = [...toCourses, course.course]
        } else if (isSamePeriod(periodOfCourse, nextPeriodWithCredit)) {
          toCourses = [...toCourses, course.course]
        } else {
          fromCourses.forEach((from) => {
            toCourses.forEach((to) => {
              const w = 1 / Math.max(toCourses.length, fromCourses.length)
              highChartsArrays = [...highChartsArrays, [from, to, w]]
            })
          })
          fromPeriod = nextPeriodWithCredit
          nextPeriodWithCredit = periodOfCourse
          fromCourses = toCourses
          toCourses = [course.course]
        }
      })
      fromCourses.forEach((from) => {
        toCourses.forEach((to) => {
          const w = 1 / Math.max(toCourses.length, fromCourses.length)
          highChartsArrays = [...highChartsArrays, [from, to, w]]
        })
      })
      fromCourses = []
      toCourses = []
    }
  })

  return addWeights(highChartsArrays)
}

module.exports = {
  studentPaths,
  studentPathsE2E,
  firstCourses,
}
