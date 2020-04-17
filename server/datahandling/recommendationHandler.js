const { graduatedStudents } = require('@root/server/datahandling/students')
const { periodsBetweenTwoDates, periodsToClosestYear } = require('@root/server/datahandling/periods')
const { mockStudent } = require('@root/server/datahandling/mockStudent')

const mockList = ['Linis I', 'Käyttöjärjestelmät', 'Ohjelmoinnin jatkokurssi', 'Ranskan alkeet', 'Kemian kertauskurssi', 'Tietorakenteet ja algoritmit', 'Keramiikkakurssi', 'JYM', 'Tikape', 'Tilpe', 'Ylimääräinen kurssi'] 

//Gets all students who have graduated and filters all the timely graduated ones
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
    let firstCourse = student.courses[0]
    student.courses.forEach((credit) => {
      let creditTime = 5 + periodsToClosestYear(periodsBetweenTwoDates(firstCourse.date, credit.date))
      if (year * 5 === creditTime) {
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


const getRecommendations = (data, year, term, studentNumber, goalYears) => {
  // TODO: List all courses they have done by the year and term chosen
  //       change return to whatever you are returning to frontend
  // examples of use below
  // expected to return an array of recommended courses

  let timely = timelyGraduated(data, goalYears)
  let courseList = makeCourseList(timely, year)

  if (studentNumber !== null && studentNumber === mockStudent.studentNumber) return ['Analyysi II', 'Tietokoneen toiminta']
  if (year === 3 && term === 'Kevät') return ['Kandidaatin tutkielma']
  return courseList
}

module.exports = {
  getRecommendations,
}