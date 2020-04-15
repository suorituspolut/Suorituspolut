const { mockStudent } = require('@root/server/datahandling/mockStudent')

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


  //add a mock student into dataset
  mockStudent.courses.sort((credit1, credit2) => credit1.date - credit2.date)
  students = [...students, mockStudent]

  return students
}

const graduatedStudents = (data) => {
  data.shift()
  let students = []
  let courses = []
  let helper = 1234
  let student = { studentNumber: data[0].studentId, courses: [] }

  data.forEach((credit) => {
    if (credit.studentId !== helper) {
      if (credit.course === 'Luonnontieteiden kandidaatti') {
        courses.sort((credit1, credit2) => credit1.date - credit2.date)
        student.courses = courses
        students = [...students, student]
        courses = []
        courses = [...courses, credit]
        helper = credit.studentId
        student = { studentNumber: credit.studentId, courses: [] }
      }
    } else {
      courses = [...courses, credit]
    }
  })
  courses.sort((credit1, credit2) => credit1.date - credit2.date)
  return students
}

module.exports = {
  studentObjects,
  graduatedStudents,
}