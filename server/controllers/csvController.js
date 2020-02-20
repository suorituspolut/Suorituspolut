//const { ApplicationError } = require('@util/customErrors')
const { listOfCourses } = require('@root/server/datahandling/courses')
const { studentPathsE2E } = require('@root/server/datahandling/dataHandlerE2E')
const { studentPaths } = require('@root/server/datahandling/dataHandler')
const parse = require('csv-parse')
const fs = require('fs')

const getAllNormal = async (req, res) => {

  const file = (process.cwd() + '/server/data/anon_dataset.csv')
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

    res.send(studentPaths(array, 2016, "Ohjelmoinnin perusteet"))
  })

  await fs.createReadStream(file).pipe(parser)
}

const getAllE2E = async (req, res) => {
  const file = (process.cwd() + '/server/data/anon_dataset.csv')
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

    res.send(studentPathsE2E(array, 2016, "Ohjelmoinnin perusteet", "Tietokantojen perusteet"))
  })
  await fs.createReadStream(file).pipe(parser)
}


const getCourses = async (req, res) => {
  const file = (process.cwd() + '/server/data/anon_dataset.csv')
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
