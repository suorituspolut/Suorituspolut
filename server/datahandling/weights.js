/* eslint-disable no-param-reassign */
const byWeights = (credit1, credit2) => credit2[2] - credit1[2]

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

const findBiggestCourses = (mapOfWeights, amount) => {
  let array = []

  mapOfWeights.forEach((weight, course) => {
    array = [...array, { course, weight }]
  })

  array.sort((a, b) => b.weight - a.weight)
  array = array.slice(0, amount)
  array = array.map(c => c.course)

  return array
}

const othersCategoryFirsts = (weightedCredits, levels) => {
  const others = 7
  const separatedByLevel = new Map()
  let keepList = []

  weightedCredits.forEach((credit) => {
    const thisLevel = Number(credit[0][0])
    let array = []
    if (separatedByLevel.has(thisLevel)) {
      array = separatedByLevel.get(thisLevel)
    }
    array = [...array, credit]
    separatedByLevel.set(thisLevel, array)
  })

  let toWeight = new Map()

  // level 1
  if (separatedByLevel.has(1)) {
    let array = separatedByLevel.get(1)
    const fromWeight = new Map()
    for (let i = 0; i < array.length; i++) {
      if (fromWeight.has(array[i][0])) {
        let weight = fromWeight.get(array[i][0])
        weight += array[i][2]
        fromWeight.set(array[i][0], weight)
      } else {
        fromWeight.set(array[i][0], array[i][2])
      }

      if (toWeight.has(array[i][1])) {
        let weight = toWeight.get(array[i][1])
        weight += array[i][2]
        toWeight.set(array[i][1], weight)
      } else {
        toWeight.set(array[i][1], array[i][2])
      }
    }

    keepList = findBiggestCourses(fromWeight, others)
    array.forEach((highChartObject) => {
      if (!keepList.includes(highChartObject[0])) {
        highChartObject[0] = '1: Muut'
      }
    })
    array = addWeights(array)
  }

  // rest of the levels
  separatedByLevel.forEach((array, level) => {
    let previousLevel = separatedByLevel.get(level - 1)
    if (level !== 1) {
      keepList = findBiggestCourses(toWeight, others)
      toWeight = new Map()
      array.forEach((highChartObject) => {
        if (!keepList.includes(highChartObject[0])) {
          highChartObject[0] = `${level}: Muut`
        }
        for (let i = 0; i < array.length; i++) {
          if (toWeight.has(array[i][1])) {
            let weight = toWeight.get(array[i][1])
            weight += array[i][2]
            toWeight.set(array[i][1], weight)
          } else {
            toWeight.set(array[i][1], array[i][2])
          }
        }
      })
      previousLevel.forEach((highChartObject) => {
        if (!keepList.includes(highChartObject[1])) {
          highChartObject[1] = `${level}: Muut`
        }
      })
      // array = addWeights(array)
      previousLevel = addWeights(previousLevel)
    }

    if (level === levels - 1) {
      keepList = findBiggestCourses(toWeight, others)

      array.forEach((highChartObject) => {
        if (!keepList.includes(highChartObject[1])) {
          highChartObject[1] = `${levels}: Muut`
        }
      })
      array = addWeights(array)
    }
  })


  return addWeights(weightedCredits)
}

// What: returns an array of highchart-objects where the smaller courses have been mapped into a category "Others"
// Takes in: an array of highchart-objects of a single period-level, the orig. starting course, and amount of categories wanted in total
const separateOthersCategory = (weightedCredits, startingCourse, amount) => {
  let arrayWithOthers = weightedCredits.filter(array => weightedCredits.indexOf(array) < amount)
  const others = weightedCredits.filter(array => weightedCredits.indexOf(array) >= amount)

  if (weightedCredits.length >= 7) {
    const totalWeightsOfOthers = others.reduce((sum, course) => sum + course[2], 0)
    arrayWithOthers = [...arrayWithOthers, [startingCourse, 'Muut', totalWeightsOfOthers]]
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
    const totalWeightsOfOthers = others.reduce((sum, course) => sum + course[1], 0)
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
  othersCategoryFirsts,
}
