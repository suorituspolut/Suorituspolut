const { studentObjects } = require('@root/server/datahandling/students')
const { checkGrade, whichHasBetterGrade } = require('@root/server/datahandling/grades')

const roadToSuccessObjects = (data, startCourse, uniqueness) => {
  const students = studentObjects(data)
  const byGrades = coursesByGrades(students, startCourse, uniqueness)
  const percentagesForGrades = percentagesForCourses(byGrades)
  return percentagesForGrades
}

const getUniqueEarlierCourses = (credits, startCourseDate) => {
  const earlierCourses = new Map()
  const unique = []

  credits.forEach((credit) => {
    let creditToAdd = {}
    if (credit.date < startCourseDate) {
      if (!earlierCourses.has(credit.course)) {
        earlierCourses.set(credit.course, credit)
      } else if (earlierCourses.has(credit.course)) {
        creditToAdd = whichHasBetterGrade(earlierCourses.get(credit.course), credit)
        earlierCourses.delete(credit.course)
        earlierCourses.set(credit.course, creditToAdd)
      }
    }
  })

  earlierCourses.forEach((credit, course) => {
    unique.push(credit)
  })
  return unique
}

const coursesByGrades = (data, startCourse, uniqueness) => {
  const earlierCoursesByGrades = [
    {
      grade: 'Hylätty',
      amountOfStudents: 0,
      courses: [],
    },
    {
      grade: 1,
      amountOfStudents: 0,
      courses: [],
    },
    {
      grade: 2,
      amountOfStudents: 0,
      courses: [],
    },
    {
      grade: 3,
      amountOfStudents: 0,
      courses: [],
    },
    {
      grade: 4,
      amountOfStudents: 0,
      courses: [],
    },
    {
      grade: 5,
      amountOfStudents: 0,
      courses: [],
    },
    {
      grade: 'Tyydyttävät taidot',
      amountOfStudents: 0,
      courses: [],
    },
    {
      grade: 'Hyvät taidot',
      amountOfStudents: 0,
      courses: [],
    },
    {
      grade: 'Hyväksytty',
      amountOfStudents: 0,
      courses: [],
    },
  ]

  data.forEach((student) => {
    let hasDoneStartCourse = false
    let startCourseDate = 0
    let gradeOfStartCourse = 0
    student.courses.forEach((credit) => {
      if (credit.course === startCourse) {
        hasDoneStartCourse = true
        startCourseDate = credit.date
        gradeOfStartCourse = credit.grade

        if (!checkGrade('Läpäisseet', gradeOfStartCourse)) {
          earlierCoursesByGrades[0].amountOfStudents++
        }
        switch (gradeOfStartCourse) {
          case '1':
            earlierCoursesByGrades[1].amountOfStudents++
            break
          case '2':
            earlierCoursesByGrades[2].amountOfStudents++
            break
          case '3':
            earlierCoursesByGrades[3].amountOfStudents++
            break
          case '4':
            earlierCoursesByGrades[4].amountOfStudents++
            break
          case '5':
            earlierCoursesByGrades[5].amountOfStudents++
            break
          case 'TT':
            earlierCoursesByGrades[6].amountOfStudents++
            break
          case 'HT':
            earlierCoursesByGrades[7].amountOfStudents++
            break
          case 'Hyv.':
            earlierCoursesByGrades[8].amountOfStudents++
            break
          default:
            break
        }
      }
    })

    if (hasDoneStartCourse) {
      let earlierCourses = []
      if (uniqueness === 'all') {
        earlierCourses = student.courses.filter(credit => credit.date < startCourseDate)
      }
      if (uniqueness === 'unique') {
        earlierCourses = getUniqueEarlierCourses(student.courses, startCourseDate)
      }

      earlierCourses.forEach((credit) => {
        if (!checkGrade('Läpäisseet', gradeOfStartCourse)) {
          earlierCoursesByGrades[0].courses = [...earlierCoursesByGrades[0].courses, credit.course]
        }
        switch (gradeOfStartCourse) {
          case '1':
            earlierCoursesByGrades[1].courses = [...earlierCoursesByGrades[1].courses, credit.course]
            break
          case '2':
            earlierCoursesByGrades[2].courses = [...earlierCoursesByGrades[2].courses, credit.course]
            break
          case '3':
            earlierCoursesByGrades[3].courses = [...earlierCoursesByGrades[3].courses, credit.course]
            break
          case '4':
            earlierCoursesByGrades[4].courses = [...earlierCoursesByGrades[4].courses, credit.course]
            break
          case '5':
            earlierCoursesByGrades[5].courses = [...earlierCoursesByGrades[5].courses, credit.course]
            break
          case 'TT':
            earlierCoursesByGrades[6].courses = [...earlierCoursesByGrades[6].courses, credit.course]
            break
          case 'HT':
            earlierCoursesByGrades[7].courses = [...earlierCoursesByGrades[7].courses, credit.course]
            break
          case 'Hyv.':
            earlierCoursesByGrades[8].courses = [...earlierCoursesByGrades[8].courses, credit.course]
            break
          default:
            break
        }
      })
      hasDoneStartCourse = false
      startCourseDate = 0
      gradeOfStartCourse = 0
    }
  })
  return earlierCoursesByGrades
}

const percentagesForCourses = (byGrades) => {
  const dataWithPercentages = []
  let gradeIndex = 0

  byGrades.forEach((gradeArray) => {
    const totalAmount = gradeArray.amountOfStudents
    let dataArray = []
    const courseSet = new Map()

    gradeArray.courses.forEach((course) => {
      if (!courseSet.has(course)) {
        courseSet.set(course, 1)
      } else {
        courseSet.set(course, courseSet.get(course) + 1)
      }
    })
    courseSet.forEach((amount, course) => dataArray.push([course, amount]))
    dataArray.sort((course1, course2) => course2[1] - course1[1])
    dataArray = dataArray.slice(0, 10)

    const dataArrayWithPerc = dataArray.map(course => ([course[0], course[1], Number((course[1] / totalAmount * 100).toFixed(2))]))
    dataWithPercentages[gradeIndex] = { grade: gradeArray.grade, totalAmount, courses: dataArrayWithPerc }
    gradeIndex++
  })
  return dataWithPercentages
}

module.exports = {
  roadToSuccessObjects,
}
