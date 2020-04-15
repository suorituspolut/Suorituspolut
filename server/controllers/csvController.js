const { listOfCourses } = require('@root/server/datahandling/courses')
const { studentPaths, firstCourses } = require('@root/server/datahandling/sankeyDataHandler')
const { histogramObjects } = require('@root/server/datahandling/histogramDataHandler')
const { bubbleData } = require('@root/server/datahandling/bubbleDataHandler')
const { roadToSuccessObjects } = require('@root/server/datahandling/roadToSuccess')
const { getRecommendations } = require('@root/server/datahandling/recommendationHandler')

const parse = require('csv-parse')
const fs = require('fs')


const file = (process.cwd() + '/data/anon_dataset.csv')

/* const Papa = require('papaparse')
const readCSV = async (filePath) => {
  const csvFile = fs.readFileSync(filePath)
  const csvData = csvFile.toString()
  return new Promise(resolve => {
    Papa.parse(csvData, {
      header: true,
      complete: results => {
        resolve(results.data);
      }
    });
  });
};
let parsedData;
const test = async () => {
  parsedData = await readCSV(file); 
}
test()
*/

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

  if (req.params.year !== null) {
    year = Number(req.params.year)
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

  if (req.params.course !== null) {
    course = req.params.course
    uniqueness = req.params.uniqueness
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
    res.send(roadToSuccessObjects(array, course, uniqueness))
  })
  await fs.createReadStream(file).pipe(parser)
}

const getRecommendationData = async (req, res) => {
  const array = []
  let year = 2017
  let term = 'Syksy'
  let studentNumber = null

  if (req.params.year !== null) {
    year = Number(req.params.year)
  }
  if (req.params.term !== null) {
    term = req.params.term
  }
  if (req.params.studentNumber !== 'null') {
    studentNumber = req.params.studentNumber
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
    res.send(getRecommendations(array, year, term, studentNumber))
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
}
