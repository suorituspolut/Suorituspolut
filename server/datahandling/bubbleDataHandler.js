const { toPeriod } = require('@root/server/datahandling/periods')
const { creditArraysBubble, addWeightsBubble, separateOthersCategoryBubble } = require('@root/server/datahandling/weights')
const { checkGrade } = require('@root/server/datahandling/grades')
const { correctStudyTrack } = require('@root/server/datahandling/students')

// Returns the arrays for a highchart-graph
const bubbleObjects = (data, year, grade, bubbles, studytracks, wantedStudyTrack) => {
  data.shift()

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

  data.forEach((credit) => {
    if ((!year || credit.date.getFullYear() === year) && (!grade || checkGrade(grade, credit.grade)) && correctStudyTrack(credit.studentId, studytracks, wantedStudyTrack)) {
      const creditPeriod = toPeriod(credit.date).period
      chartData[creditPeriod - 1].data = [...chartData[creditPeriod - 1].data, credit]
    }
  })

  let returningData = []
  chartData.forEach((period) => {
    const arraysWithWeights = creditArraysBubble(period.data)
    const arraysWithSummedWeights = addWeightsBubble(arraysWithWeights)
    const withOthers = separateOthersCategoryBubble(arraysWithSummedWeights, bubbles)
    returningData = [...returningData, { name: period.name, data: withOthers }]
  })
  return returningData
}

module.exports = {
  bubbleObjects,
}
