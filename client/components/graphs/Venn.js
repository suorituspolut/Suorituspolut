import React from 'react'
import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts'
import Info from '../notifications/Info'


require("highcharts/modules/venn")(Highcharts)
require("highcharts/modules/sankey")(Highcharts)
require("highcharts/modules/exporting")(Highcharts)
require("highcharts/modules/boost")(Highcharts)

const GraphTestVenn = () => {

  const options = {
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
      text: 'Kurssivertailu',
    },
    series: [{
      type: 'venn',
      name: 'Kurssivertailu',
      // Series data
      data: [{
        name: 'Ohjelmoinnin perusteet',
        sets: ['A'],
        value: 2033,
      }, {
        name: 'Tietorakenteet ja algoritmit',
        sets: ['B'],
        value: 1502,
      }, {
        name: ' ',
        sets: ['A', 'B'],
        value: 1277,
      }],
    }],
  }


  return (
    <>
    <Info content="Tämän graafin on tarkoitus näyttää kaksi kurssia, ja vertailla niiden suoritusten määrää, ja tarkistaa kuinka moni suorittaa molemmat kurssit."/>
    <div className="graph-container">
      <HighchartsReact
        highcharts={Highcharts}
        constructorType="chart"
        options={options}
      />
    </div>
    </>
  )
}

export default GraphTestVenn
