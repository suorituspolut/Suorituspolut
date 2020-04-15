const date1 = new Date('21 Oct 2016 03:00:00 GMT')
const date2 = new Date('18 Dec 2016 03:00:00 GMT')

const student = {
  studentNumber: '9888000',
  courses: [{
    studentId: '9888000',
    courseId: '581325',
    course: 'Ohjelmoinnin perusteet',
    isModule: 'false',
    date: date1,
    grade: '5',
  }, {
    studentId: '9888000',
    courseId: '57033',
    course: 'Johdatus yliopistomatematiikkaan',
    isModule: 'false',
    date: date1,
    grade: '5',
  }, {
    studentId: '9888000',
    courseId: '582103',
    course: 'Ohjelmoinnin jatkokurssi',
    isModule: 'false',
    date: date2,
    grade: '5',
  }, {
    studentId: '9888000',
    courseId: '57016',
    course: 'Analyysi I',
    isModule: 'false',
    date: date2,
    grade: '4',
  }, {
    studentId: '9888000',
    courseId: '582102',
    course: 'Johdatus tietojenkäsittelytieteeseen',
    isModule: 'false',
    date: date2,
    grade: '4',
  }],
}


module.exports = {
  mockStudent: student,
}
