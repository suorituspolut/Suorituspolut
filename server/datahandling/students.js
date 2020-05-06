// creates an array of student-objects with their corresponding courses in an array
// data of credits, data of all students studyrights, and wanted study track (math, cs or all)
const studentObjects = (data, studyrights, wantedTrack) => {
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

  // sorts and adds the last student as well
  courses.sort((credit1, credit2) => credit1.date - credit2.date)
  student.courses = courses
  students = [...students, student]

  // filters out the students of math, cs or all if "wantedTrack" left null
  const correctStudents = students.filter(student => correctStudyTrack(student.studentNumber, studyrights, wantedTrack))
  return correctStudents
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

const coursesOfOneStudent = (studentNumber, data) => {
  data.shift()
  let courses = []
  data.forEach((credit) => {
    if (credit.studentId === studentNumber) {
      courses = [...courses, credit.course]
    }
  })
  return courses
}

// Checks if the student is of correct training programme
// Takes in the id of the student, an array of studyrights objects and the correct study track wanted
const correctStudyTrack = (studentId, studyrights, wantedTrack) => {
  if (!studyrights || !wantedTrack || wantedTrack === 'all') return true
  let track = wantedTrack
  if (wantedTrack === 'cs') track = 'Tietojenkäsittelytieteen koulutusohjelma'
  if (wantedTrack === 'math') track = 'Matematiikan koulutusohjelma'
  const right = studyrights.find(right => right.id === studentId)
  if (right.studytrack === track) return true
  return false
}


module.exports = {
  studentObjects,
  graduatedStudents,
  coursesOfOneStudent,
  correctStudyTrack,
}
