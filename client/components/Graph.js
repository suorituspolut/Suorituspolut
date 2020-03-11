
import React from 'react'
import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts'

require('highcharts/modules/sankey')(Highcharts)
require('highcharts/modules/exporting')(Highcharts)
require('highcharts/modules/boost')(Highcharts)

const Graph = ({ data }) => {

  const options = {
    colors: ['#2980B9', '#3d979f', '#060045', '#E6F69D', '#1ABC9C', '#d8c09b', '#d8c09b', '#d8c09b', '#d8c09b'],
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
      text: 'Suorituspolut',
    },
    series: [{
      keys: ['from', 'to', 'weight'],
      turboThreshold: 4000,
      data: data ? data : [
        ['Ohjelmoinnin perusteet', 'Ohjelmoinnin jatkokurssi', 70],
      ],
      type: 'sankey',
      name: 'Suoritusten määrä',
    }],
    tooltip: {
      nodeFormat: '{point.name}',
      // nodeFormatter: function() {
      //   let result = this.linksFrom[0].from + ': '
      //   let sum = 0
      //   console.log(this.linksTo)
      //   Highcharts.each(this.linksFrom, function(el) {
      //       sum += el.weight
      //   });

      //   result += (sum/ this.linksFrom.length)

      //   return result;
      // },
    },
    plotOptions: {
      series: {
        cursor: 'pointer',
        point: {
          events: {
            click: function (event) {
              if (!event.point.name.includes("highcharts")) {
                onClick(event.point.name)
              }
            },
          },
        },
      },
    },
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

export default Graph
