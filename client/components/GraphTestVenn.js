import React from 'react'
import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts'

require("highcharts/modules/venn")(Highcharts)
require("highcharts/modules/sankey")(Highcharts)
require("highcharts/modules/exporting")(Highcharts)
require("highcharts/modules/boost")(Highcharts)

const GraphTestVenn = () => {

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
    title: {
      text: 'Kurssivertailu',
    },
    series: [{
      type: 'venn',
      name: 'Kurssivertailu',
      // Series data
      data: [{
        name: 'Ohjelmoinnin perusteet',
        sets: ['A'],
        value: 2033
      }, {
        name: 'Tietorakenteet ja algoritmit',
        sets: ['B'],
        value: 1502
      }, {
        name: ' ',
        sets: ['A', 'B'],
        value: 1277
      }],
    }],
  }


  return (
    <div className="test">
      <HighchartsReact
        highcharts={Highcharts}
        constructorType="chart"
        options={options}
      />
    </div>
  )
}

export default GraphTestVenn
