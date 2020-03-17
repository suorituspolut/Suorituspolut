import React from 'react'
import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts'
import { blueColors } from '../util/units'

require('highcharts/modules/histogram-bellcurve')(Highcharts)
require('highcharts/modules/exporting')(Highcharts)
require('highcharts/modules/boost')(Highcharts)

const Hist = ({ data, course, maxYear }) => {
  let helper = []
  if (data.length > 1) {
    helper = JSON.parse(data)
  }

  const dataWithColors = helper.map((dataPoint, index) => {
    if (index < 5) return ({ y: dataPoint, color: blueColors[0] })
    if (index >= 5 && index < 10) return ({ y: dataPoint, color: blueColors[1] })
    if (index >= 10 && index < 15) return ({ y: dataPoint, color: blueColors[2] })
    if (index >= 15 && index < 20) return ({ y: dataPoint, color: blueColors[3] })
    if (index >= 20 && index < 25) return ({ y: dataPoint, color: blueColors[4] })
    if (index >= 25 && index < 30) return ({ y: dataPoint, color: blueColors[5] })
    if (index >= 30 && index < 35) return ({ y: dataPoint, color: blueColors[6] })
    if (index >= 35 && index < 40) return ({ y: dataPoint, color: blueColors[7] })
    if (index >= 40 && index < 45) return ({ y: dataPoint, color: blueColors[8] })
    if (index >= 45 && index < 50) return ({ y: dataPoint, color: blueColors[9] })
  })

  const array = []
  for (let i = 0; i < maxYear * 5; i++) {
    array[i] = dataWithColors[i]
  }
  const categories = []
  let currentYear = 1
  let currentPeriod = 1

  for (let i = 1; i < maxYear * 5 + 1; i++) {
    categories[i - 1] = `${currentYear} .vuosi /  ${currentPeriod} .periodi`
    currentPeriod++
    if (i % 5 === 0) {
      currentYear++
      currentPeriod = 1
    }
  }

  const options = {

    title: {
      text: course,
    },
    credits: {
      text: '',
    },
    xAxis: {
      categories,
      crosshair: true,
    },
    yAxis: {
      min: 0,
      title: {
        text: '',
      },
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>'
          + '<td style="padding:0"><b>{point.y:.0f} opiskelijaa</b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true,
    },
    plotOptions: {
      column: {
        pointPadding: 0,
        borderWidth: 0,
        groupPadding: 0,
        shadow: false,
      },
    },
    legend: {
      enabled: false,
    },
    series: [{
      colorKey: 'colorValue',
      type: 'column',
      name: 'Kurssisuoritukset',
      data: array,
    }],
  }


  return (
    <div className="graph-container">
      <HighchartsReact
        highcharts={Highcharts}
        constructorType="chart"
        options={options}
      />
    </div>
  )
}

export default Hist
