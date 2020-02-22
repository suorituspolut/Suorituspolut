// What: returns an array of highchart-objects where the weights of similar paths have been counted together
// Takes in: an array of highchart-objects with a weight of 1
const addWeights = (credits) => {
  const courseSet = new Map()
  let weightedCredits = []

  credits.forEach((credit) => {
    const startCourse = credit[0]
    const finishCourse = credit[1]
    let weight = credit[2]
    const coursepair = `${startCourse}>${finishCourse}`
    if (!courseSet.has(coursepair)) {
      courseSet.set(coursepair, weight)
    } else {
      weight = courseSet.get(coursepair) + weight
      courseSet.set(coursepair, weight)
    }
  })

  courseSet.forEach((weight, courses) => {
    const coursepair = courses.split('>')
    weightedCredits = [...weightedCredits, [coursepair[0], coursepair[1], weight]]
  })

  weightedCredits.sort(byWeights)
  return weightedCredits
}

const byWeights = (credit1, credit2) => credit2[2]-credit1[2]

// What: returns an array of highchart-objects where the smaller courses have been mapped into a category "Others"
// Takes in: an array of highchart-objects of a single period-level, the orig. starting course, and amount of categories wanted in total
const separateOthersCategory = (weightedCredits, startingCourse, amount) => {
  let arrayWithOthers = weightedCredits.filter(array => weightedCredits.indexOf(array) < amount)
  const others = weightedCredits.filter(array => weightedCredits.indexOf(array) >= amount)

  if (weightedCredits.length >= 7) {
    const totalWeightsOfOthers = others.reduce((sum, course) => {
      return sum + course[2]
    }, 0)
    arrayWithOthers = [...arrayWithOthers, [startingCourse, "Muut", totalWeightsOfOthers]] 
  }
  return arrayWithOthers
}

// What: creates the "Other"-category for a second level courses
// Takes in: an array of highcharts-objects of the second period, with the weights already summed up and an array of biggest courses for that level
const separateOthersCategorySecond = (array, biggestCourses) => {
  const highChartsArrays = []

  array.forEach((credit) => {
    if (biggestCourses.includes(credit[1])) {
      highChartsArrays.push(credit)
    } else {
      highChartsArrays.push([credit[0], " Muut", credit[2]])
    }
  })

  return highChartsArrays
}


module.exports = {
  separateOthersCategory,
  separateOthersCategorySecond,
  addWeights,
}
