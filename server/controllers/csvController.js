//var dataset = require('@root/client/data/anon_dataset.csv')
//const { ApplicationError } = require('@util/customErrors')
const { studentPaths } = require('@root/server/datahandling/dataHandler')
const parse = require('csv-parse')
const fs = require('fs')

const getAll = async (req, res) => {

  // Getting the correct file from backend. 
  const file = (process.cwd() + '/server/data/anon_dataset.csv')
  const array = []

  // Parsing the data by semi-colon and creating an object of each line
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
    res.send(studentPaths(array, 2015, "Reflektointi II"))
  })

  // Creating a stream of data in the file, and piping it with the given parser
  await fs.createReadStream(file).pipe(parser)
}

const test = async (req, res) => {
  console.log(datahandler)
  res.send(datahandler)
}

module.exports = {
  getAll,
  test,
}
