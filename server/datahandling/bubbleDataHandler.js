const { toPeriod, dataByYear } = require('@root/server/datahandling/periods')


const bubbleData = (data, year) => {
  const dataOfYear = dataByYear(data, year)

  const chartData = [
    {
      name: '1. periodi',
      data: [],
    },
    {
      name: '2. periodi',
      data: [],
    },
    {
      name: '3. periodi',
      data: [],
    },
    {
      name: '4. periodi',
      data: [],
    },
    {
      name: '5. periodi',
      data: [],
    },
  ]

  dataOfYear.forEach((credit) => {
    switch (toPeriod(credit.date).period) {
      case 1:
        chartData[0].data = [...chartData[0].data, credit]
        break
      case 2:
        chartData[1].data = [...chartData[1].data, credit]
        break
      case 3:
        chartData[2].data = [...chartData[2].data, credit]
        break
      case 4:
        chartData[3].data = [...chartData[3].data, credit]
        break
      case 5:
        chartData[4].data = [...chartData[4].data, credit]
        break
      default:
        break
    }
  })

  let returningData = []
  chartData.forEach((period) => {
    const arraysWithWeights = creditArrays(period.data)
    const arraysWithSummedWeights = addWeights(arraysWithWeights)
    const withOthers = separateOthersCategory(arraysWithSummedWeights, 7)
    returningData = [...returningData, { name: period.name, data: withOthers }]
  })
  return returningData
}

const separateOthersCategory = (weightedCredits, amount) => {
  let arrayWithOthers = weightedCredits.filter(array => weightedCredits.indexOf(array) < amount)
  const others = weightedCredits.filter(array => weightedCredits.indexOf(array) >= amount)

  if (weightedCredits.length >= 7) {
    const totalWeightsOfOthers = others.reduce((sum, course) => {
      return sum + course[1]
    }, 0)
    arrayWithOthers = [...arrayWithOthers, ["Muut", totalWeightsOfOthers]] 
  }
  return arrayWithOthers
}


const creditArrays = (credits) => {
  let highChartArrays = credits.map(credit => [credit.course, 1])
  return highChartArrays
}

const addWeights = (credits) => {
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

module.exports = {
  bubbleData,
}
