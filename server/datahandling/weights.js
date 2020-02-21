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
// Takes in: an array of highchart-objects of a single period-level
const separateOthersCategory = (weightedCredits, startingCourse) => {
  let arrayWithOthers = weightedCredits.filter(array => weightedCredits.indexOf(array) < 9)
  const others = weightedCredits.filter(array => weightedCredits.indexOf(array) >= 9)

  if (weightedCredits.length >= 7) {
    const totalWeightsOfOthers = others.reduce((sum, course) => {
      return sum + course[2]
    }, 0)
    arrayWithOthers = [...arrayWithOthers, [startingCourse, "Muut", totalWeightsOfOthers]] 
  }
  return arrayWithOthers
}

module.exports = {
  separateOthersCategory,
  addWeights,
}
