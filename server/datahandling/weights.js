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

// What: creates the basic highchart-objects for the bubblechart
// Takes in: an array of credits of a period
const creditArraysBubble = (credits) => {
  const highChartArrays = credits.map(credit => [credit.course, 1])
  return highChartArrays
}


// What: returns an array of highchart-objects where the weights of same courses in the period have been counted together
// Takes in: an array of highchart-objects with a weight of 1
const addWeightsBubble = (credits) => {
  const courseSet = new Map()
  let weightedCredits = []

  credits.forEach((credit) => {
    const course = credit[0]
    let weight = credit[1]
    if (!courseSet.has(course)) {
      courseSet.set(course, weight)
    } else {
      weight = courseSet.get(course) + weight
      courseSet.set(course, weight)
    }
  })

  courseSet.forEach((weight, course) => {
    weightedCredits = [...weightedCredits, [course, weight]]
  })
  weightedCredits.sort((credit1, credit2) => credit2[1] - credit1[1])

  return weightedCredits
}

// What: returns an array of highchart-objects where the smaller courses have been mapped into a category "Others"
// Takes in: an array of highchart-objects of a course with a weight of 1, and amount of categories wanted in total
const separateOthersCategoryBubble = (weightedCredits, amount) => {
  let arrayWithOthers = weightedCredits.filter(array => weightedCredits.indexOf(array) < amount)
  const others = weightedCredits.filter(array => weightedCredits.indexOf(array) >= amount)

  if (weightedCredits.length >= amount) {
    const totalWeightsOfOthers = others.reduce((sum, course) => {
      return sum + course[1]
    }, 0)
    arrayWithOthers = [...arrayWithOthers, ['Muut', totalWeightsOfOthers]]
  }
  return arrayWithOthers
}


module.exports = {
  separateOthersCategory,
  addWeights,
  creditArraysBubble,
  addWeightsBubble,
  separateOthersCategoryBubble,
}
