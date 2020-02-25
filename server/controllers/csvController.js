//const { ApplicationError } = require('@util/customErrors')
const { listOfCourses } = require('@root/server/datahandling/courses')
const { studentPaths, studentPathsE2E } = require('@root/server/datahandling/dataHandler')
const parse = require('csv-parse')
const fs = require('fs')
const file = (process.cwd() + '/data/anon_dataset.csv')

const getAllNormal = async (req, res) => {

  const array = []
  let year = 2017
  let course = 'Ohjelmoinnin perusteet'
  let grade = 'Kaikki'

  if (req.params.year !== null) {
    year = Number(req.params.year)
    course = req.params.course
    type = req.params.type
    grade = req.params.grade
  }


  const parser = parse({delimiter: ';'}, (err, data) => {
    if (!data) return 
    data.forEach(credit => {
      let newCourse = {
      studentId : credit[0],
      courseId: credit[1],
      course: credit[2],
      isModule: credit[3],
      date: new Date(credit[4]),
      grade: credit[5],  
      }
    array.push(newCourse)
    })
      res.send(studentPaths(array, year, course, grade))      
  })
  await fs.createReadStream(file).pipe(parser)
}

const getAllE2E = async (req, res) => {

  const array = []
  let year = 2017
  let course = "Ohjelmoinnin perusteet"
  let type = "normal"
  let grade = "Kaikki"

  if (req.params.year !== null) {
    year = Number(req.params.year)
    course = req.params.course
    type = req.params.type
    grade = req.params.grade
  }

  const parser = parse({delimiter: ';'}, (err, data) => {
    data.forEach(credit => {
      let newCourse = {
      studentId : credit[0],
      courseId: credit[1],
      course: credit[2],
      isModule: credit[3],
      date: new Date(credit[4]),
      grade: credit[5],  
      }
    array.push(newCourse)
    })

    res.send(studentPathsE2E(array, year, course, grade))
  })
  await fs.createReadStream(file).pipe(parser)
}


const getCourses = async (req, res) => {
  const array = []

  const parser = parse({delimiter: ';'}, (err, data) => {
    data.forEach(credit => {
      let newCourse = {
      studentId : credit[0],
      courseId: credit[1],
      course: credit[2],
      isModule: credit[3],
      date: new Date(credit[4]),
      grade: credit[5],  
      }
    array.push(newCourse)
    })
    res.send(listOfCourses(array))
  })

  await fs.createReadStream(file).pipe(parser)
}

const test = async (req, res) => {
  res.send(datahandler)
}

module.exports = {
  getAllNormal,
  getAllE2E,
  getCourses,
  test,
}