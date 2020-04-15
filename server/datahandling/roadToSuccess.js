const { studentObjects } = require('@root/server/datahandling/students')
const { checkGrade, checkPassed, dataByGrade, whichHasBetterGrade } = require('@root/server/datahandling/grades')

const roadToSuccessObjects = (data, startCourse, uniqueness) => {
  const students = studentObjects(data)
  const byGrades = coursesByGrades(students, startCourse, uniqueness)
  const topTen = topTenCourses(byGrades[10].courses)
  const percentagesForGrades = percentagesForCourses(byGrades, topTen)
  const dataWithCorrectRange = dataWithCorrectGradeRange(percentagesForGrades)
  return dataWithCorrectRange
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

const coursesByGrades = (students, startCourse, uniqueness) => {
  const data = dataByGrade()

  students.forEach((student) => {
    let startCredit = null
    student.courses.forEach((credit) => {
      if (credit.course === startCourse) {
        startCredit = credit
        data[10].amountOfStudents++
        if (checkPassed(startCredit.grade)) {
          data[9].amountOfStudents++
        } else {
          data[0].amountOfStudents++
        }
        switch (startCredit.grade) {
          case '1':
            data[1].amountOfStudents++
            break
          case '2':
            data[2].amountOfStudents++
            break
          case '3':
            data[3].amountOfStudents++
            break
          case '4':
            data[4].amountOfStudents++
            break
          case '5':
            data[5].amountOfStudents++
            break
          case 'TT':
            data[6].amountOfStudents++
            break
          case 'HT':
            data[7].amountOfStudents++
            break
          case 'Hyv.':
            data[8].amountOfStudents++
            break
          default:
            break
        }

      }
    })

    if (startCredit) {
      let earlierCourses = []
      if (uniqueness === 'all') {
        earlierCourses = student.courses.filter(credit => credit.date < startCredit.date)
      }
      if (uniqueness === 'unique') {
        earlierCourses = getUniqueEarlierCourses(student.courses, startCredit.date)
      }
      earlierCourses.forEach((credit) => {
        
        if (checkPassed(startCredit.grade)) {
          data[9].courses = [...data[9].courses, credit.course]
          data[10].courses = [...data[10].courses, credit.course]
        } else {
          data[0].courses = [...data[0].courses, credit.course]
          data[10].courses = [...data[10].courses, credit.course]
        }
        switch (startCredit.grade) {
          case '1':
            data[1].courses = [...data[1].courses, credit.course]
            break
          case '2':
            data[2].courses = [...data[2].courses, credit.course]
            break
          case '3':
            data[3].courses = [...data[3].courses, credit.course]
            break
          case '4':
            data[4].courses = [...data[4].courses, credit.course]
            break
          case '5':
            data[5].courses = [...data[5].courses, credit.course]
            break
          case 'TT':
            data[6].courses = [...data[6].courses, credit.course]
            break
          case 'HT':
            data[7].courses = [...data[7].courses, credit.course]
            break
          case 'Hyv.':
            data[8].courses = [...data[8].courses, credit.course]
            break
          default:
            break
        }
      })
      startCredit = null
    }
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
    dataWithPercentages = [...dataWithPercentages, {grade: gradeArray.grade, totalAmount, courses: dataArray}]

  })    
  return dataWithPercentages
}

const dataWithCorrectGradeRange = (grades) => {
  const totalAmount = grades[10].totalAmount
  const totalAccepted = grades[9].totalAmount
  

  if (grades[1].totalAmount > 0) {
    return [
      {
        name: 'Kaikki',
        totalAmount: grades[10].totalAmount,
        y: grades[10].totalAmount / totalAmount,
        courses: grades[10].courses,
        color: '#1675db'
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
        color: '#1675db'
      },
      {
        name: 'Hylätty',
        totalAmount: grades[0].totalAmount,
        y: grades[0].totalAmount / totalAmount,
        courses: grades[0].courses,
        color: '#1d1e1f' 
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
  else {
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
}

module.exports = {
  roadToSuccessObjects,
}
