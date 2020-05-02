const { toPeriod } = require('@root/server/datahandling/periods')
const { creditArraysBubble, addWeightsBubble, separateOthersCategoryBubble } = require('@root/server/datahandling/weights')
const { checkGrade } = require('@root/server/datahandling/grades')


const bubbleData = (data, year, grade, bubbles) => {
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
    if ((!year || credit.date.getFullYear() === year) && (!grade || checkGrade(grade, credit.grade))) {
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
  bubbleData,
}
