import React, { useEffect, useState } from 'react'
import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts'
import HC_more from 'highcharts/highcharts-more'
import { Icon } from 'semantic-ui-react'
import FilterBar from '../filters/FilterBar'
import { getBubbleData } from '../../util/redux/dataReducer'


HC_more(Highcharts)

require('highcharts/modules/map')(Highcharts)
require('highcharts/modules/exporting')(Highcharts)
require('highcharts/modules/boost')(Highcharts)


const Bubbles = () => {
  const [year, setYear] = useState(2017)
  const [bubbleAmount, setBubbleAmount] = useState(5)
  const [grade, setGrade] = useState('Läpäisseet')
  const [data, setData] = useState([])

  useEffect(() => {
    setData(JSON.parse(getBubbleData(year, grade, bubbleAmount)))
  }, [])

  const handleSearch = (year, grade, bubbleAmount) => {
    setData(JSON.parse(getBubbleData(year, grade, bubbleAmount)))
  }

  const handleYearChange = (e, { value }) => {
    setYear(value)
    handleSearch(value, grade, bubbleAmount)
  }

  const handleGradeChange = (e, { value }) => {
    setGrade(value)
    handleSearch(year, value, bubbleAmount)
  }

  const handleBubblesChange = (e, { value }) => {
    setBubbleAmount(value)
    handleSearch(year, grade, value)
  }

  const printOutBubbles = () => {
    if (data.length > 0) {
      return (
        <div>
          <HighchartsReact
            highcharts={Highcharts}
            constructorType="chart"
            options={options}
          />
        </div>
      )
    }
    return <p><Icon loading name="spinner" size="big" /></p>
  }


  const options = {
    chart: {
      type: 'packedbubble',
      height: '60%',
    },
    colors: ['#ff6666', '#ff9966', '#ffcc66', '#ffff66', '#ccff33'],
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
      pointFormat: '<b>{point.name}:</b> {point.value} suoritusta',
    },
    plotOptions: {
      packedbubble: {
        minSize: '40%',
        maxSize: '140%',
        zMin: 0,
        zMax: 100,
        layoutAlgorithm: {
          splitSeries: false,
          gravitationalConstant: 0.02,
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
      <FilterBar
        selectedYear={year}
        selectedGrade={grade}
        selectedBubbles={bubbleAmount}
        handleGradeChange={handleGradeChange}
        handleYearChange={handleYearChange}
        handleBubblesChange={handleBubblesChange}
      />
      {printOutBubbles()}
    </div>
  )
}

export default Bubbles
