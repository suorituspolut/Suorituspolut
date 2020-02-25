
import React from 'react'
import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts'

require("highcharts/modules/export-data")(Highcharts)
require("highcharts/modules/exporting")(Highcharts)
require("highcharts/modules/boost")(Highcharts)

//"Stacked column chart" from "highcharts"-framework, representing bottleneck courses
const Stacked = ({ data }) => {

  const options = {
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
      categories: ['Tietorakenteet ja Algoritmit', 'Todennäköisyyslaskenta I', 'Laskennan mallit', 'Käyttöjärjestelmät', 'Tietoliikenteen perusteet']
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Kaikkiaan opiskelijoita(%)'
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
    //'Tietorakenteet ja Algoritmit', 'Todennäköisyyslaskenta I', 'Laskennan mallit', 'Käyttöjärjestelmät' , 'Tietoliikenteen perusteet'
    series: [{
      name: 'Viimeinen suorituskerta',
      data: [56, 39, 40, 57, 50]
    }, {
      name: 'Käyty uudelleen',
      data: [41, 15, 13, 12, 5]
    }
    ],
  }


  return (
    <div className="test">
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={'chart'}
        options={options}
      />
    </div>
  )
}

export default Stacked
