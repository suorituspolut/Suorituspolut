const { isBefore } = require('@root/server/datahandling/periods')
const { studentObjects } = require('@root/server/datahandling/students')


const roadToSuccessObjects = (data, startCourse) => {
  const students = studentObjects(data)
  const byGrades = coursesByGrades(students, startCourse)
  const percentagesForGrades = percentagesForCourses(byGrades)
  return percentagesForGrades
}

const coursesByGrades = (data, startCourse) => {

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
        switch (gradeOfStartCourse) {
          case 'Hyl.' || '0':
            earlierCoursesByGrades[0].amountOfStudents++
            break
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
          case 'Hyv.':
            earlierCoursesByGrades[6].amountOfStudents++
            break
          default:
            break
        }
      }
    })

    if (hasDoneStartCourse) {
      const earlierCourses = student.courses.filter(credit => isBefore(credit.date, startCourseDate))

      earlierCourses.forEach((credit) => {
        switch (gradeOfStartCourse) {
          case 'Hyl.' || '0':
            earlierCoursesByGrades[0].courses = [...earlierCoursesByGrades[0].courses, credit.course]
            break
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
          case 'Hyv.':
            earlierCoursesByGrades[6].courses = [...earlierCoursesByGrades[6].courses, credit.course]
            break
          default:
            break
        }
      })
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
