/* eslint-disable prefer-destructuring */
const { courseData } = require('@root/server/datahandling/courses')
const { simpleSankeyObjects, multiSankeyObjects } = require('@root/server/datahandling/sankeyDataHandler')
const { histogramObjects } = require('@root/server/datahandling/histogramDataHandler')
const { bubbleObjects } = require('@root/server/datahandling/bubbleDataHandler')
const { recommendationGradeObjects } = require('@root/server/datahandling/recommendationGradeHandler')
const { recommendationTimeObjects } = require('@root/server/datahandling/recommendationTimeHandler')

const parse = require('csv-parse')
const fs = require('fs')

const file = (`${process.cwd()}/data/anon_dataset.csv`)
const file2 = (`${process.cwd()}/data/student_background.csv`)

const getCourseData = async (req, res) => {
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
    res.send(courseData(array))
  })

  await fs.createReadStream(file).pipe(parser)
}

const getSimpleSankeyData = async (req, res) => {
  const array = []
  let year = 2017
  let course = 'Ohjelmoinnin perusteet'
  let grade = 'Kaikki'
  let studytrack = 'all'

  if (req.params.year !== null) {
    year = Number(req.params.year)
    course = req.params.course
    grade = req.params.grade
    studytrack = req.params.studytrack
  }

  console.log(studytrack)
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
    res.send(simpleSankeyObjects(array, year, course, grade))
  })

  await fs.createReadStream(file).pipe(parser)
}

const getMultiSankeyData = async (req, res) => {
  const array = []
  const studyrights = []
  let year = 2017
  let levels = 4

  if (req.params.year !== null) {
    year = Number(req.params.year)
  }

  if (req.params.levels !== null) {
    levels = Number(req.params.levels)
  }

  const promise = new Promise((resolve) => {
    fs.createReadStream(file2)
      .pipe(parse({ delimiter: ';' }))
      .on('data', (data) => {
        const studyright = {
          id: data[0],
          trackcode: data[1],
          studytrack: data[2],
        }
        studyrights.push(studyright)
      })
      .on('end', () => {
        resolve()
      })
  })

  const promise2 = new Promise((resolve) => {
    fs.createReadStream(file)
      .pipe(parse({ delimiter: ';' }))
      .on('data', (credit) => {
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
      .on('end', () => {
        resolve()
      })
  })


  Promise.all([
    promise,
    promise2,
  ]).then(() => {
    res.send(multiSankeyObjects(array, studyrights, year, levels))
  })
    .catch((err) => {
      console.log(err)
    })
}

const getSimpleHistogramData = async (req, res) => {
  const array = []
  const studyrights = []
  let course = 'Ohjelmoinnin perusteet'
  let studytrack = 'all'


  if (req.params.course !== null) {
    course = req.params.course
    studytrack = req.params.studytrack
  }

  const promise = new Promise((resolve) => {
    fs.createReadStream(file2)
      .pipe(parse({ delimiter: ';' }))
      .on('data', (data) => {
        const studyright = {
          id: data[0],
          trackcode: data[1],
          studytrack: data[2],
        }
        studyrights.push(studyright)
      })
      .on('end', () => {
        resolve()
      })
  })

  const promise2 = new Promise((resolve) => {
    fs.createReadStream(file)
      .pipe(parse({ delimiter: ';' }))
      .on('data', (credit) => {
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
      .on('end', () => {
        resolve()
      })
  })


  Promise.all([
    promise,
    promise2,
  ]).then(() => {
    res.send(histogramObjects(array, course, null, null, studytrack, studyrights))
  })
    .catch((err) => {
      console.log(err)
    })
}

const getMultiHistogramData = async (req, res) => {
  const array = []
  const studyrights = []

  let sorting = 'startHeavy'
  let subset = 'mandatoryCourses'
  let studytrack = 'all'

  if (req.params.sorting !== null) {
    sorting = req.params.sorting
    subset = req.params.subset
    studytrack = req.params.studytrack
  }

  const promise = new Promise((resolve) => {
    fs.createReadStream(file2)
      .pipe(parse({ delimiter: ';' }))
      .on('data', (data) => {
        const studyright = {
          id: data[0],
          trackcode: data[1],
          studytrack: data[2],
        }
        studyrights.push(studyright)
      })
      .on('end', () => {
        resolve()
      })
  })

  const promise2 = new Promise((resolve) => {
    fs.createReadStream(file)
      .pipe(parse({ delimiter: ';' }))
      .on('data', (credit) => {
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
      .on('end', () => {
        resolve()
      })
  })

  Promise.all([
    promise,
    promise2,
  ]).then(() => {
    res.send(histogramObjects(array, null, subset, sorting, studytrack, studyrights))
  })
    .catch((err) => {
      console.log(err)
    })
}

const getBubbleData = async (req, res) => {
  const array = []
  let year = 2017
  let grade = null
  let bubbles = 10
  let wantedTrack = 'cs'
  const studyrights = []

  if (req.params.year !== null) {
    year = Number(req.params.year)
    grade = req.params.grade
  }

  if (req.params.bubbles !== null) {
    bubbles = Number(req.params.bubbles)
  }

  if (req.params.track !== null) {
    wantedTrack = req.params.track
  }

  const promise = new Promise((resolve) => {
    fs.createReadStream(file2)
      .pipe(parse({ delimiter: ';' }))
      .on('data', (data) => {
        const studyright = {
          id: data[0],
          trackcode: data[1],
          studytrack: data[2],
        }
        studyrights.push(studyright)
      })
      .on('end', () => {
        resolve()
      })
  })

  const promise2 = new Promise((resolve) => {
    fs.createReadStream(file)
      .pipe(parse({ delimiter: ';' }))
      .on('data', (credit) =>  {
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
      .on('end', () => {
        resolve()
      })
  })


  Promise.all([
    promise,
    promise2,
  ]).then(() => {
    res.send(bubbleObjects(array, year, grade, bubbles, studyrights, wantedTrack))
  })
    .catch((err) => {
      console.log(err)
    })
}

const getRecommendationGradeData = async (req, res) => {
  const array = []
  let course = 'Ohjelmoinnin perusteet'
  const studyrights = []
  let uniqueness = 'all'
  let year = 2017
  let studytrack = 'all'

  if (req.params.course !== null) {
    course = req.params.course
    uniqueness = req.params.uniqueness
    year = req.params.year
    studytrack = req.params.studytrack
  }

  const promise = new Promise((resolve) => {
    fs.createReadStream(file2)
      .pipe(parse({ delimiter: ';' }))
      .on('data', (data) => {
        const studyright = {
          id: data[0],
          trackcode: data[1],
          studytrack: data[2],
        }
        studyrights.push(studyright)
      })
      .on('end', () => {
        resolve()
      })
  })

  const promise2 = new Promise((resolve) => {
    fs.createReadStream(file)
      .pipe(parse({ delimiter: ';' }))
      .on('data', (credit) => {
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
      .on('end', () => {
        resolve()
      })
  })


  Promise.all([
    promise,
    promise2,
  ]).then(() => {
    res.send(recommendationGradeObjects(array, year, course, uniqueness, studytrack, studyrights))
  })
    .catch((err) => {
      console.log(err)
    })
}

const getRecommendationTimeData = async (req, res) => {
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
    res.send(recommendationTimeObjects(array, year, term, studentNumber, goalYears))
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
  })

  await fs.createReadStream(file2).pipe(parser)
}

module.exports = {
  getCourseData,
  getSimpleSankeyData,
  getMultiSankeyData,
  getSimpleHistogramData,
  getMultiHistogramData,
  getBubbleData,
  getRecommendationGradeData,
  getRecommendationTimeData,
  getStudyData,
}
