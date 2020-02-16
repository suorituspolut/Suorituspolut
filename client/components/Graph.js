
import React from 'react'
import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts'
import ToggleGraph from './ToggleGraph'
require("highcharts/modules/sankey")(Highcharts)
require("highcharts/modules/exporting")(Highcharts)

const Graph = ({ data }) => {

  const options = {
    colors: ['#2980B9', '#3d979f', '#060045', '#E6F69D', '#1ABC9C', '#d8c09b', '#d8c09b', '#d8c09b', '#d8c09b'],
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
      text: 'Suorituspolut',
    },
    plotOptions: {
      series: {
          cursor: 'pointer',
          point: {
              events: {
                  click: function (event) {
                    if(!event.point.name.includes("highcharts")){
                      alert(event.point.name)
                      //TODO: this should update selectedCourse in ToggleGraph with event.point.name
                    }
                  }
              }
          }
      }
  },
    series: [{
      keys: ['from', 'to', 'weight'],
      data: data ? data : [
        ['Ohjelmoinnin perusteet', 'Ohjelmoinnin jatkokurssi', 70],
        ['Ohjelmoinnin jatkokurssi', 'Tietorakenteet ja algoritmit', 30],
        ['Ohjelmoinnin perusteet', 'Tietokoneen toiminta', 5],
        ['Ohjelmoinnin perusteet', 'Muut', 15],
        ['Ohjelmoinnin perusteet', 'Johdatus yliopistomatematiikkaan', 10],
        ['Ohjelmoinnin perusteet', 'Tietorakenteet ja algoritmit', 20],
      ],
      type: 'sankey',
      name: 'Suoritusten määrä',
    }],
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

export default Graph
