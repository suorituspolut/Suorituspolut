import React from 'react'
import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts'

require("highcharts/modules/histogram-bellcurve")(Highcharts)
require("highcharts/modules/exporting")(Highcharts)
require("highcharts/modules/boost")(Highcharts)

const Hist = ({ data, course }) => {
  let array = new Array()
  array = JSON.parse(data)
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
        categories: [
          '1. periodi / 1.vuosi',
          '2. periodi / 1.vuosi',
          '3. periodi / 1.vuosi',
          '4. periodi / 1.vuosi',
          '5. periodi / 1.vuosi',
          '1. periodi / 2.vuosi',
          '2. periodi / 2.vuosi',
          '3. periodi / 2.vuosi',
          '4. periodi / 2.vuosi',
          '5. periodi / 2.vuosi',
          '1. periodi / 3.vuosi',
          '2. periodi / 3.vuosi',
          '3. periodi / 3.vuosi',
          '4. periodi / 3.vuosi',
          '5. periodi / 3.vuosi',
          '1. periodi / 4.vuosi',
          '2. periodi / 4.vuosi',
          '3. periodi / 4.vuosi',
          '4. periodi / 4.vuosi',
          '5. periodi / 4.vuosi',
          '1. periodi / 5.vuosi',
          '2. periodi / 5.vuosi',
          '3. periodi / 5.vuosi',
          '4. periodi / 5.vuosi',
          '5. periodi / 5.vuosi',
          '1. periodi / 6.vuosi',
          '2. periodi / 6.vuosi',
          '3. periodi / 6.vuosi',
          '4. periodi / 6.vuosi',
          '5. periodi / 6.vuosi',
          '1. periodi / 7.vuosi',
          '2. periodi / 7.vuosi',
          '3. periodi / 7.vuosi',
          '4. periodi / 7.vuosi',
          '5. periodi / 7.vuosi',
          '1. periodi / 8.vuosi',
          '2. periodi / 8.vuosi',
          '3. periodi / 8.vuosi',
          '4. periodi / 8.vuosi',
          '5. periodi / 8.vuosi',
          '1. periodi / 9.vuosi',
          '2. periodi / 9.vuosi',
          '3. periodi / 9.vuosi',
          '4. periodi / 9.vuosi',
          '5. periodi / 9.vuosi',
          '1. periodi / 10.vuosi',
          '2. periodi / 10.vuosi',
          '3. periodi / 10.vuosi',
          '4. periodi / 10.vuosi',
          '5. periodi / 10.vuosi',
          '1. periodi / 11.vuosi',
          '2. periodi / 11.vuosi',
          '3. periodi / 11.vuosi',
          '4. periodi / 11.vuosi',
          '5. periodi / 11.vuosi'
        ],
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
