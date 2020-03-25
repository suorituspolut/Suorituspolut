
const { listOfCourses } = require('@root/server/datahandling/courses')
const { studentPaths, studentPathsE2E, firstCourses } = require('@root/server/datahandling/sankeyDataHandler')
const { histogramObjects } = require('@root/server/datahandling/histogramDataHandler')
const { bubbleData } = require('@root/server/datahandling/bubbleDataHandler')

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
    grade = req.params.grade
  }


  const parser = parse({ delimiter: ';' }, (err, data) => {
    if (!data) return 
    data.forEach((credit) => {
      const newCourse = {
        studentId: credit[0],
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
  let course = 'Ohjelmoinnin perusteet'
  let grade = 'Kaikki'

  if (req.params.year !== null) {
    year = Number(req.params.year)
    course = req.params.course
    grade = req.params.grade
  }

  const parser = parse({delimiter: ';'}, (err, data) => {
    data.forEach((credit) => {
      const newCourse = {
        studentId: credit[0],
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

const getAllFirsts = async (req, res) => {
  const array = []
  let year = 2017
  let levels = 4

  if (req.params.year !== null) {
    year = Number(req.params.year)
  }

  if (req.params.levels !== null && typeof(req.params.levels === String)) {
    levels = Number(req.params.levels)
  }
  const parser = parse({ delimiter: ';' }, (err, data) => {
    if (!data) return
    data.forEach((credit) => {
      const newCourse = {
        studentId: credit[0],
        courseId: credit[1],
        course: credit[2],
        isModule: credit[3],
        date: new Date(credit[4]),
        grade: credit[5],
      }
      array.push(newCourse)
    })
    res.send(firstCourses(array, year, levels))
  })
  await fs.createReadStream(file).pipe(parser)
}

const getCourses = async (req, res) => {
  const array = []

  const parser = parse({ delimiter: ';' }, (err, data) => {
    data.forEach((credit) => {
      const newCourse = {
        studentId: credit[0],
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

const getHistogramData = async (req, res) => {
  const array = []
  let course = 'Ohjelmoinnin perusteet'

  if (req.params.course !== null) {
    course = req.params.course
  }

  const parser = parse({ delimiter: ';' }, (err, data) => {
    if (!data) return
    data.forEach((credit) => {
      const newCourse = {
        studentId: credit[0],
        courseId: credit[1],
        course: credit[2],
        isModule: credit[3],
        date: new Date(credit[4]),
        grade: credit[5],
      }
      array.push(newCourse)
    })
    res.send(histogramObjects(array, course))
  })
  await fs.createReadStream(file).pipe(parser)
}

const getHistogramDataMany = async (req, res) => {
  const array = []


  const parser = parse({ delimiter: ';' }, (err, data) => {
    if (!data) return
    data.forEach((credit) => {
      const newCourse = {
        studentId: credit[0],
        courseId: credit[1],
        course: credit[2],
        isModule: credit[3],
        date: new Date(credit[4]),
        grade: credit[5],
      }
      array.push(newCourse)
    })
    res.send(histogramObjects(array))
  })
  await fs.createReadStream(file).pipe(parser)
}


const getBubbleData = async (req, res) => {
  const array = []
  let year = 2017
  let grade = null
  let bubbles = 10

  if (req.params.year !== null) {
    year = Number(req.params.year)
    grade = req.params.grade
  }

  if (req.params.bubbles !== null && typeof(req.params.bubbles === String)) {
    bubbles = Number(req.params.bubbles)
  }

  const parser = parse({ delimiter: ';' }, (err, data) => {
    if (!data) return
    data.forEach((credit) => {
      const newCourse = {
        studentId: credit[0],
        courseId: credit[1],
        course: credit[2],
        isModule: credit[3],
        date: new Date(credit[4]),
        grade: credit[5],
      }
      array.push(newCourse)
    })
    res.send(bubbleData(array, year, grade, bubbles))
  })
  await fs.createReadStream(file).pipe(parser)
}

module.exports = {
  getAllNormal,
  getAllE2E,
  getAllFirsts,
  getCourses,
  getHistogramData,
  getBubbleData,
  getHistogramDataMany,
}
