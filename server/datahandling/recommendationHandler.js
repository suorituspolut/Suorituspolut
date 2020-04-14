const { graduatedStudents } = require('@root/server/datahandling/students')
const { periodsBetweenTwoDates } = require('@root/server/datahandling/periods')

const mockList = ['Linis I', 'Käyttöjärjestelmät', 'Ohjelmoinnin jatkokurssi', 'Ranskan alkeet', 'Kemian kertauskurssi', 'Tietorakenteet ja algoritmit', 'Keramiikkakurssi', 'JYM', 'Tikape', 'Tilpe', 'Ylimääräinen kurssi'] 

//Gets all students who have graduated and filters all the timely graduated ones
const timelyGraduated = (data) => {
  const students = graduatedStudents(data)
  let onTime = []
  students.forEach((student) => {
    const firstCourse = student.courses[0]

    student.courses.forEach((credit) => {
      if (credit.course === 'Luonnontieteiden kandidaatti') {
        if (periodsBetweenTwoDates(firstCourse.date, credit.date) < 16) {
          onTime = [...onTime, student]
        }
      }
    })
  })

  return onTime
}

const getRecommendations = (data) => {
  // TODO: List all courses they have done by the year and term chosen
  //       change return to whatever you are returning to frontend

  return mockList//timelyGraduated(data)
}

module.exports = {
  getRecommendations,
}