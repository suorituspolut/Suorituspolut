const { listOfCourses } = require('@root/server/datahandling/courses')
const { studentPaths, firstCourses } = require('@root/server/datahandling/sankeyDataHandler')
const { histogramObjects } = require('@root/server/datahandling/histogramDataHandler')
const { bubbleData } = require('@root/server/datahandling/bubbleDataHandler')
const { roadToSuccessObjects } = require('@root/server/datahandling/roadToSuccess')
const { getRecommendations } = require('@root/server/datahandling/recommendationHandler')

const parse = require('csv-parse')
const fs = require('fs')


const file = (`${process.cwd()}/data/anon_dataset.csv`)
const file2 = (`${process.cwd()}/data/student_background.csv`)

const getSankeyNormal = async (req, res) => {
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

const getSankeyFirsts = async (req, res) => {
  const array = []
  let year = 2017
  let levels = 4
  let grade = 'Kaikki'
  if (req.params.year !== null) {
    year = Number(req.params.year)
  }

  if (req.params.grade !== null) {
    grade = req.params.grade
  }

  if (req.params.levels !== null) {
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
    res.send(firstCourses(array, year, levels, grade))
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

const getStudyData = async (req, res) => {
  const array = []

  const parser = parse({ delimiter: ';' }, (err, data) => {
    data.forEach((credit) => {
      const newStudy = {
        studentId: credit[0],
        studyCode: credit[1],
        studyName: credit[2],
      }
      array.push(newStudy)
    })

    const allStudies = array.map(credit => credit.studyName)
    allStudies.shift()
    const studies = [...new Set(allStudies)]
    res.send(studies)
    //res.send(array)
  })

  await fs.createReadStream(file2).pipe(parser)
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

  let sorting = 'startHeavy'
  let subset = 'mandatoryCourses'

  if (req.params.sorting !== null) {
    sorting = req.params.sorting
    subset = req.params.subset
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
    res.send(histogramObjects(array, null, subset, sorting))
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

  if (req.params.bubbles !== null) {
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

const getRoadToSuccessData = async (req, res) => {
  const array = []
  let course = 'Ohjelmoinnin perusteet'
  let uniqueness = 'all'
  let year = 2017

  if (req.params.course !== null) {
    course = req.params.course
    uniqueness = req.params.uniqueness
    year = req.params.year
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
    res.send(roadToSuccessObjects(array, year, course, uniqueness))
  })
  await fs.createReadStream(file).pipe(parser)
}

const getRecommendationData = async (req, res) => {
  const array = []
  let year = 2017
  let term = 'Syksy'
  let studentNumber = null
  let goalYears = 3

  if (req.params.year !== null) {
    year = Number(req.params.year)
  }
  if (req.params.term !== null) {
    term = req.params.term
  }
  if (req.params.studentNumber !== null) {
    studentNumber = req.params.studentNumber
  }
  if (req.params.goalYears !== null) {
    goalYears = req.params.goalYears
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
    res.send(getRecommendations(array, year, term, studentNumber, goalYears))
  })
  await fs.createReadStream(file).pipe(parser)
}

module.exports = {
  getSankeyNormal,
  getSankeyFirsts,
  getCourses,
  getHistogramData,
  getBubbleData,
  getHistogramDataMany,
  getRoadToSuccessData,
  getRecommendationData,
  getStudyData,
}
