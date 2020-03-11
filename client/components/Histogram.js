import React from 'react'
import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts'

require("highcharts/modules/histogram-bellcurve")(Highcharts)
require("highcharts/modules/exporting")(Highcharts)
require("highcharts/modules/boost")(Highcharts)

const Hist = ({ course }) => {
  const options = {
    chart: {
        type: 'column'
      },
      title: {
        text: 'Missä vaiheessa opintoja kurssi on suoritettu'
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
        data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 124.1, 95.6, 54.4]
      }]
    }


  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={'chart'}
        options={options}
      />
    </div>
  )
}

export default Hist
