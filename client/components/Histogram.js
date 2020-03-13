import React from 'react'
import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts'

require("highcharts/modules/histogram-bellcurve")(Highcharts)
require("highcharts/modules/exporting")(Highcharts)
require("highcharts/modules/boost")(Highcharts)

const Hist = ({ data, course, maxYear }) => {
  let helper = new Array()
  helper = JSON.parse(data)
  let array = new Array()
  for (let i = 0; i < maxYear * 5; i++) {
    array[i] = helper[i]
  }
  let categories = []
  let currentYear = 1
  let currentPeriod = 1
  
  for (let i = 1; i < maxYear * 5 + 1; i++) {
    categories[i-1] = currentPeriod + '.periodi / ' + currentYear + '.vuosi'
    currentPeriod++
    if (i % 5 === 0) {
      currentYear++
      currentPeriod = 1
    }
  }

  const options = {
    chart: {
        type: 'column'
      },
      title: {
        text: 'Missä vaiheessa opintoja kurssi on suoritettu'
      },
      credits: {
        text: ""
      },
      subtitle: {
        text: course
      },
      credits: {
        text: '' 
      },
      xAxis: {
        categories: categories,
        crosshair: true
      },
      yAxis: {
        min: 0,
        title: {
          text: ''
        }
      },
      tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y:.1f} opiskelijaa</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
      },
      plotOptions: {
        column: {
          pointPadding: 0,
          borderWidth: 0,
          groupPadding: 0,
          shadow: false
        }
      },
      series: [{
        name: 'Data',
        data: array
      }]
    }


  return (
    <div className="sankey-container">
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={'chart'}
        options={options}
      />
    </div>
  )
}

export default Hist
