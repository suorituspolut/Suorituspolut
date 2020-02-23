
import React from 'react'
import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts'

require("highcharts/modules/export-data")(Highcharts)
require("highcharts/modules/exporting")(Highcharts)
require("highcharts/modules/boost")(Highcharts)

//stacked column chart from highcharts representing bottleneck courses
const Stacked = ({ data }) => {

  const options = {
    //colors: ['#2980B9', '#3d979f', '#060045', '#E6F69D', '#1ABC9C', '#d8c09b', '#d8c09b', '#d8c09b', '#d8c09b'],
    credits: {
      text: ''
    },
    exporting: {
      menuItemDefinitions: {
        viewFullscreen: {
          text: 'Koko näyttö',
        },
        downloadPNG: {
          text: 'Lataa PNG-kuvana',
        },
        downloadSVG: {
          text: 'Lataa SVG-kuvana',
        },
        downloadPDF: {
          text: 'Lataa PDF:nä',
        },
      },
      buttons: {
        contextButton: {
          menuItems: ['viewFullscreen', 'downloadPNG', 'downloadSVG', 'downloadPDF'],
        },
      },
    },
    chart: {
        type: 'column'
    },
    title: {
        text: 'Pullonkaulakurssit'
    },
    xAxis: {
        categories: ['Tietorakenteet ja Algoritmit', 'Todennäköisyyslaskenta I', 'Laskennan mallit']
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Kaikkiaan opiskelijoita'
        }
    },
    tooltip: {
        pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
        shared: true
    },
    plotOptions: {
        column: {
            stacking: 'percent'
        }
    },
    //'Tietorakenteet ja Algoritmit', 'Todennäköisyyslaskenta I', 'Laskennan mallit'
    series: [{
        name: 'Läpi',
        data: [5, 3, 4]
    }, {
        name: 'Hylätty',
        data: [4, 2, 3]
    }, {
        name: 'Vitonen',
        data: [1, 1, 2]
    }],
  }


  return (
    <div className="test">
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={'chart'}
        options={options}
      />
      <div><p><center> Tavoitteena on löytää kurssit, joita suoritetaan uudelleen useimmiten </center></p></div>
    </div>
  )
}

export default Stacked
