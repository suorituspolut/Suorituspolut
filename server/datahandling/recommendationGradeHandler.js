/* eslint-disable no-use-before-define */
const { studentObjects } = require('@root/server/datahandling/students')
const { dataByGrade, gradeToNumber, whichHasBetterGrade } = require('@root/server/datahandling/grades')
const { toPeriod, isEarlierPeriod } = require('@root/server/datahandling/periods')

const recommendationGradeObjects = (data, year, course, uniqueness, studytrack, studyrights) => {

  const allStudents = studentObjects(data, studyrights, studytrack)
  let studentsWithCourse = []
  if (uniqueness === 'unique') {
    studentsWithCourse = uniqueCredits(allStudents, year, course)
  } else {
    studentsWithCourse = allCredits(allStudents, year, course)
  }
  const byGrades = coursesByGrades(studentsWithCourse)
  const topTen = topTenCourses(byGrades[10].courses)
  const percentagesForGrades = percentagesForCourses(byGrades, topTen)
  const dataWithCorrectRange = dataWithCorrectGradeRange(percentagesForGrades)
  return dataWithCorrectRange
}

const getUniqueEarlierCourses = (credits, chosenDate) => {
  const earlierCourses = new Map()
  const unique = []

  credits.forEach((credit) => {
    let creditToAdd = {}
    if (isEarlierPeriod(toPeriod(credit.date), toPeriod(chosenDate))) {
      if (!earlierCourses.has(credit.course)) {
        earlierCourses.set(credit.course, credit)
      } else if (earlierCourses.has(credit.course)) {
        creditToAdd = whichHasBetterGrade(earlierCourses.get(credit.course), credit)
        earlierCourses.delete(credit.course)
        earlierCourses.set(credit.course, creditToAdd)
      }
    }
  })

  earlierCourses.forEach((credit) => {
    unique.push(credit)
  })
  return unique
}

const uniqueCredits = (students, year, startCourse) => {
  const studentList = []
  students.forEach((student) => {
    let searched = null
    let earlierCourses = []
    student.courses.forEach((credit) => {
      if (credit.course === startCourse && searched && (credit.date.getFullYear() === Number(year) || year === 'Kaikki')) {
        searched = whichHasBetterGrade(credit, searched)
      } else if (credit.course === startCourse && !searched && (credit.date.getFullYear() === Number(year) || year === 'Kaikki')) {
        searched = credit
      }
    })
    if (searched) {
      earlierCourses = getUniqueEarlierCourses(student.courses, searched.date)
      studentList.push({ searched, earlierCourses })
    }
  })

  return studentList
}

const allCredits = (students, year, startCourse) => {
  const studentList = []
  students.forEach((student) => {
    let searched = null
    let earlierCourses = []
    student.courses.forEach((credit) => {
      if (credit.course === startCourse && (credit.date.getFullYear() === Number(year) || year === 'Kaikki')) {
        searched = credit
      }
      if (searched) {
        earlierCourses = getUniqueEarlierCourses(student.courses, searched.date)
        studentList.push({ searched, earlierCourses })
      }
      searched = null
    })
  })

  return studentList
}

const coursesByGrades = (students) => {
  const data = dataByGrade()

  students.forEach((student) => {
    const grade = gradeToNumber(student.searched.grade)
    data[10].amountOfStudents++
    data[grade].amountOfStudents++
    if (grade !== 0) {
      data[9].amountOfStudents++
    }

    student.earlierCourses.forEach((credit) => {
      data[grade].courses = [...data[grade].courses, credit.course]
      data[10].courses = [...data[10].courses, credit.course]
      if (grade !== 0) {
        data[9].courses = [...data[9].courses, credit.course]
      }
    })
  })

  return data
}

const topTenCourses = (allCourses) => {
  let mostDoneCourses = []
  const courseSet = new Map()
  allCourses.forEach((course) => {
    if (!courseSet.has(course)) {
      courseSet.set(course, 1)
    } else {
      courseSet.set(course, courseSet.get(course) + 1)
    }
  })
  courseSet.forEach((amount, course) => mostDoneCourses.push([course, amount]))
  mostDoneCourses.sort((course1, course2) => course2[1] - course1[1])
  mostDoneCourses = mostDoneCourses.slice(0, 10)
  const topTen = new Map()
  mostDoneCourses.forEach(course => topTen.set(course[0], 0))
  return topTen
}

const percentagesForCourses = (byGrades, topTenOfAll) => {
  let dataWithPercentages = []
  byGrades.forEach((gradeArray) => {
    const topTenOfGrade = new Map()
    const totalAmount = gradeArray.amountOfStudents
    let dataArray = []

    if (totalAmount > 0) {
      gradeArray.courses.forEach((course) => {
        if (topTenOfAll.has(course) && topTenOfGrade.has(course)) {
          topTenOfGrade.set(course, topTenOfGrade.get(course) + 1)
        } else if (topTenOfAll.has(course)) {
          topTenOfGrade.set(course, 1)
        }
      })

      topTenOfGrade.forEach((amount, course) => {
        dataArray = [...dataArray, [course, amount, Number(amount / totalAmount * 100).toFixed(2)]]
      })
    }
    dataWithPercentages = [...dataWithPercentages, { grade: gradeArray.grade, totalAmount, courses: dataArray }]
  })
  return dataWithPercentages
}

const dataWithCorrectGradeRange = (grades) => {
  const { totalAmount } = grades[10]
  const totalAccepted = grades[9].totalAmount
  if (grades[1].totalAmount > 0 || grades[5].totalAmount > 0) {
    return [
      {
        name: 'Kaikki',
        totalAmount: grades[10].totalAmount,
        y: grades[10].totalAmount / totalAmount,
        courses: grades[10].courses,
        color: '#1675db',
      },
      {
        name: 'Hylätty',
        totalAmount: grades[0].totalAmount,
        y: grades[0].totalAmount / totalAmount,
        courses: grades[0].courses,
        color: '#1d1e1f',
      }, {
        name: 'Arvosana: 1',
        totalAmount: grades[1].totalAmount,
        y: grades[1].totalAmount / totalAmount,
        courses: grades[1].courses,
        color: '#ff5454',
      }, {
        name: 'Arvosana: 2',
        totalAmount: grades[2].totalAmount,
        y: grades[2].totalAmount / totalAmount,
        courses: grades[2].courses,
        color: '#e39e30',
      }, {
        name: 'Arvosana: 3',
        totalAmount: grades[3].totalAmount,
        y: grades[3].totalAmount / totalAmount,
        courses: grades[3].courses,
        color: '#554fa8',
      }, {
        name: 'Arvosana: 4',
        totalAmount: grades[4].totalAmount,
        y: grades[4].totalAmount / totalAmount,
        courses: grades[4].courses,
        color: '#6ad5fc',
      },
      {
        name: 'Arvosana: 5',
        totalAmount: grades[5].totalAmount,
        y: grades[5].totalAmount / totalAmount,
        courses: grades[5].courses,
        color: '#15d167',
      },
      {
        name: 'Hyväksilukeneet',
        totalAmount: grades[8].totalAmount,
        y: grades[8].totalAmount / totalAmount,
        courses: grades[8].courses,
        color: '#e3cd9a',
      },
    ]
  }
  if (grades[7].totalAmount > 0) {
    return [
      {
        name: 'Kaikki',
        totalAmount: grades[10].totalAmount,
        y: grades[10].totalAmount / totalAmount,
        courses: grades[10].courses,
        color: '#1675db',
      },
      {
        name: 'Hylätty',
        totalAmount: grades[0].totalAmount,
        y: grades[0].totalAmount / totalAmount,
        courses: grades[0].courses,
        color: '#1d1e1f',
      },
      {
        name: 'Tyydyttävät taidot',
        totalAmount: grades[6].totalAmount,
        y: grades[6].totalAmount / totalAmount,
        courses: grades[6].courses,
        color: '#e39e30',
      },
      {
        name: 'Hyvät taidot',
        totalAmount: grades[7].totalAmount,
        y: grades[7].totalAmount / totalAmount,
        courses: grades[7].courses,
        color: '#15d167',
      },
      {
        name: 'Hyväksilukeneet',
        totalAmount: grades[8].totalAmount,
        y: grades[8].totalAmount / totalAmount,
        courses: grades[8].courses,
        color: '#4e4c6b',
      },
    ]
  }
  if (grades[15].totalAmount > 0) {
    return [
      {
        name: 'Kaikki',
        totalAmount: grades[10].totalAmount,
        y: grades[10].totalAmount / totalAmount,
        courses: grades[10].courses,
        color: '#1675db',
      },
      {
        name: 'LUB',
        totalAmount: grades[11].totalAmount,
        y: grades[11].totalAmount / totalAmount,
        courses: grades[11].courses,
        color: '#ff5454',
      },
      {
        name: 'NSLA',
        totalAmount: grades[12].totalAmount,
        y: grades[12].totalAmount / totalAmount,
        courses: grades[12].courses,
        color: '#e3cd9a',
      },
      {
        name: 'CL',
        totalAmount: grades[13].totalAmount,
        y: grades[13].totalAmount / totalAmount,
        courses: grades[13].courses,
        color: '#e39e30',
      },
      {
        name: 'MCLA',
        totalAmount: grades[14].totalAmount,
        y: grades[14].totalAmount / totalAmount,
        courses: grades[14].courses,
        color: '#554fa8',
      },
      {
        name: 'ECLA',
        totalAmount: grades[15].totalAmount,
        y: grades[15].totalAmount / totalAmount,
        courses: grades[15].courses,
        color: '#6ad5fc',
      },
      {
        name: 'L',
        totalAmount: grades[16].totalAmount,
        y: grades[16].totalAmount / totalAmount,
        courses: grades[16].courses,
        color: '#15d167',
      },
    ]
  }
  return [
    {
      name: 'Kaikki',
      totalAmount: grades[10].totalAmount,
      y: grades[10].totalAmount / totalAmount,
      courses: grades[10].courses,
      color: '#1675db',
    },
    {
      name: 'Hyväksytty',
      totalAmount: grades[9].totalAmount,
      y: totalAccepted / totalAmount,
      courses: grades[9].courses,
      color: '#15d167',
    },
    {
      name: 'Hylätty',
      totalAmount: grades[0].totalAmount,
      y: grades[0].totalAmount / totalAmount,
      courses: grades[0].courses,
      color: '#1d1e1f',
    },
  ]
}

module.exports = {
  recommendationGradeObjects,
}
