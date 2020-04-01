import React, { useEffect, useState } from 'react'
import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts'
import HC_more from 'highcharts/highcharts-more'
import FilterBar from '../filters/FilterBar'
import { getBubbleData } from '../../util/redux/dataReducer'
import Info from '../notifications/Info'

HC_more(Highcharts)

require('highcharts/modules/map')(Highcharts)
require('highcharts/modules/exporting')(Highcharts)
require('highcharts/modules/boost')(Highcharts)


const Bubbles = () => {
  const [year, setYear] = useState(2017)
  const [bubbleAmount, setBubbleAmount] = useState(10)
  const [grade, setGrade] = useState('Läpäisseet')
  const [data, setData] = useState([])

  useEffect(() => {
    setData(JSON.parse(getBubbleData(year, grade, bubbleAmount)))
  }, [])


  const handleYearChange = (e, { value }) => {
    setYear(value)
  }

  const handleGradeChange = (e, { value }) => {
    setGrade(value)
  }

  const handleBubblesChange = (e, { value }) => {
    setBubbleAmount(value)
  }


  const handleSearch = () => {
    setData(JSON.parse(getBubbleData(year, grade, bubbleAmount)))
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
      <Info content="Tämä kuplakaavio näyttää jokaisen neljän periodin ja viidennen kesäperiodin suoritetuimmat kurssit. Periodin klikkaaminen piilottaa kyseisen periodin kurssisuoritukset. Suoritusvuoden ja periodeissa näytettävien kurssien määrän voi valita, ja suoritusten arvosanan perusteella voi rajata hakua."/>
      <FilterBar
        selectedYear={year}
        selectedGrade={grade}
        selectedBubbles={bubbleAmount}
        handleGradeChange={handleGradeChange}
        handleYearChange={handleYearChange}
        handleBubblesChange={handleBubblesChange}
        handleSearch={handleSearch}
      />
      <HighchartsReact
        highcharts={Highcharts}
        constructorType="chart"
        options={options}
      />
    </div>
  )
}

export default Bubbles
