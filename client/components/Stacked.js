
import React from 'react'
import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts'
import { Icon, Message, Popup , Button} from 'semantic-ui-react'
import Info from "Components/Info"


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
        text: 'Opiskelijoita(%)'
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
      name: 'Viimeinen tai ensimmäinen suorituskerta',
      data: [56, 39, 40, 57, 50]
    }, {
      name: 'Käyty uudelleen',
      data: [41, 15, 13, 12, 5]
    }
    ],
  }


  return (
    <>
    <Info content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."/>
      <div>     

      <HighchartsReact
        highcharts={Highcharts}
        constructorType={'chart'}
        options={options}
      />
    </div>
    </>
  )
}

export default Stacked
