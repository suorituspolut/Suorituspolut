
import React from 'react'
import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts'
import HC_more from 'highcharts/highcharts-more'
HC_more(Highcharts)

//require("highcharts/modules/packedbubble")(Highcharts)
require("highcharts/modules/exporting")(Highcharts)
require("highcharts/modules/boost")(Highcharts)


const Bubbles = ({ data }) => {

  const options = {
    chart: {
      type: 'packedbubble',
  },
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
      text: 'Suosituimmat kurssit periodin mukaan',
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
        zMax: 1000,
        layoutAlgorithm: {
            splitSeries: false,
            gravitationalConstant: 0.02
        },
        dataLabels: {
            enabled: true,
            format: '{point.name}',
            style: {
                color: 'black',
                textOutline: 'none',
                fontWeight: 'normal'
            }
        }
    }
},
series: [{
  name: '1. periodi',
  data: [{
      name: 'Ohjelmoinnin perusteet',
      value: 900
  }, {
      name: 'Johdatus yliopistomatematiikkaan',
      value: 700
  },
  {
      name: "Tietorakenteet ja algoritmit",
      value: 500
  },
  {
      name: "Raja-arvot",
      value: 200
  },
  {
    name: "Johdatus logiikkaan",
    value: 160
},
  {
      name: "Tietokantasovellus",
      value: 50
  }]
}, {
  name: '2. periodi',
  data: [{
      name: "Ohjelmoinnin jatkokurssi",
      value: 700
  },
  {
    name: "Lineaarialgebra 1",
    value: 120
},
{
  name: "Johdatus tekoälyyn",
  value: 300
},
{
  name: "Tietoturvan perusteet",
  value: 200
},
{
  name: "Tietokoneen toiminta",
  value: 400
},
  {
      name: "Tietokantasovellus",
      value: 40
  }]
},
{
  name: '3. periodi',
  data: [{
      name: "Full stack",
      value: 500
  },
  {
    name: "Tietokantojen perusteet",
    value: 600
},
{
  name: "Todennäköisyyslaskenta 1",
  value: 200
},
{
  name: "Käyttöjärjestelmät",
  value: 400
},
{
  name: "Ohjelmistotuotanto",
  value: 180
},
{
  name: "Tietorakenteet ja algoritmit",
  value: 300
},
  {
      name: "Tietokantasovellus",
      value: 25
  }]
},
{
  name: '4. periodi',
  data: [{
      name: "Tietoliikenteen perusteet",
      value: 400
  },
  {
    name: "Tietoliikenteen perusteet: harjoitustyö",
    value: 120
},
  {
      name: "Tietokantasovellus",
      value: 30
  }]
}],
  }


  return (
    <div className="bubble">
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={'chart'}
        options={options}
      />
    </div>
  )
}

export default Bubbles
