//const { ApplicationError } = require('@util/customErrors')
const { studentPathsE2E } = require('@root/server/datahandling/dataHandlerE2E')
const { studentPaths } = require('@root/server/datahandling/dataHandler')
const parse = require('csv-parse')
const fs = require('fs')

const getAll = async (req, res) => {

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

    // Finally sending the correct highchart-objects as a response.
    // Defining the year, start course and ending course could be eg. done as a parameters for a post- or a get-request 
    // res.send(studentPaths(array, 2018, "Ohjelmoinnin perusteet"))
    // Optional endToEnd-graph
    res.send(studentPathsE2E(array, 2018, "Ohjelmoinnin perusteet", "Tietorakenteet ja algoritmit"))
  })

  await fs.createReadStream(file).pipe(parser)
}

const test = async (req, res) => {
  res.send(datahandler)
}

module.exports = {
  getAll,
  test,
}
