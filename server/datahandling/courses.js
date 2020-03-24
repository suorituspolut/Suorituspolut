const { histogramObjects } = require('@root/server/datahandling/histogramDataHandler')

const listOfCourses = (data) => {
  const allCourses = data.map(credit => credit.course)
  allCourses.shift()

  return [...new Set(allCourses)]
}

const countTheBiggestCourses = (array, amount) => {

  const courseSet = new Map()
  let biggestCourses = []

  array.forEach((course) => {
    const finishCourse = course[1]
    let weight = course[2]
    if (!courseSet.has(finishCourse)) {
      courseSet.set(finishCourse, weight)
    } else {
      weight = courseSet.get(finishCourse) + weight
      courseSet.set(finishCourse, weight)
    }
  })
  const sortedSecondPeriod = new Map([...courseSet.entries()].sort((a, b) => b[1] - a[1]))
  const mapIter = sortedSecondPeriod.keys()
  for (let i = 0; i < amount; i++) {
    biggestCourses = [...biggestCourses, mapIter.next().value]
  }
  return biggestCourses
}

// const orderedListOfCourses = (data) => {
//   const courses = listOfCourses(data)

  

//   return courses
// }

module.exports = {
  listOfCourses,
  countTheBiggestCourses,
}
