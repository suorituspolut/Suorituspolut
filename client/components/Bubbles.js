
import React from 'react'
import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts'
import HC_more from 'highcharts/highcharts-more'
HC_more(Highcharts)

//require("highcharts/modules/packedbubble")(Highcharts)
require('highcharts/modules/exporting')(Highcharts)
require('highcharts/modules/boost')(Highcharts)


const Bubbles = ({ data }) => {
  const options = {
    chart: {
      type: 'packedbubble',
      height: '60%',
    },
    colors: [ '#ff6666', '#ff9966', '#ffcc66', '#ffff66', '#ccff33'],
    credits: {
      text: '',
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
      text: 'Suosituimmat kurssit periodin mukaan',
    },
    legend: {
      verticalAlign: 'top',
    },
    tooltip: {
      useHTML: true,
      pointFormat: '<b>{point.name}:</b> {point.value} suoritusta'
    },
    plotOptions: {
      packedbubble: {
        minSize: '40%',
        maxSize: '140%',
        zMin: 0,
        zMax: 100,
        layoutAlgorithm: {
          splitSeries: false,
          gravitationalConstant: 0.02
        },
        dataLabels: {
          enabled: true,
          format: '{point.name}',
          style: {
            color: 'black',
            textOutline: 'white',
            fontWeight: '600',
          },
        },
      },
    },
    series: data,
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

export default Bubbles
