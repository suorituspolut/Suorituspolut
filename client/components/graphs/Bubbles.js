import React, { useEffect, useState } from 'react'
import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts'
// eslint-disable-next-line camelcase
import HC_more from 'highcharts/highcharts-more'
import { Loader } from 'semantic-ui-react'
import FilterBar from '../filters/FilterBar'
import Headline from '../Headline'
import { getBubbleData } from '../../util/redux/dataReducer'
import { graphImages } from '../../util/highChartOptions'


HC_more(Highcharts)

require('highcharts/modules/map')(Highcharts)
require('highcharts/modules/exporting')(Highcharts)
require('highcharts/modules/boost')(Highcharts)


const Bubbles = ({ studytracks }) => {
  const [year, setYear] = useState(2017)
  const [bubbleAmount, setBubbleAmount] = useState(5)
  const [grade, setGrade] = useState('Läpäisseet')
  const [data, setData] = useState([])
  const [studytrack, setStudytrack] = useState('Tietojenkäsittelytieteen koulutusohjelma')

  useEffect(() => {
    setData(JSON.parse(getBubbleData(year, grade, bubbleAmount, studytrack)))
  }, [])

  const handleSearch = (year, grade, bubbleAmount, studytrack) => {
    setData(JSON.parse(getBubbleData(year, grade, bubbleAmount, studytrack)))
  }

  const handleYearChange = (e, { value }) => {
    setYear(value)
    handleSearch(value, grade, bubbleAmount, studytrack)
  }

  const handleGradeChange = (e, { value }) => {
    setGrade(value)
    handleSearch(year, value, bubbleAmount, studytrack)
  }

  const handleBubblesChange = (e, { value }) => {
    setBubbleAmount(value)
    handleSearch(year, grade, value, studytrack)
  }

  const handleStudytrackChange = (e, { value }) => {
    setStudytrack(value)
    handleSearch(year, grade, bubbleAmount, value)
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
    exporting: graphImages,
    title: {
      text: 'Vuoden ' + year + ' suoritukset',
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
  if (data.length > 0) {
    return (
      <div>
        <Headline text="Kurssisuoritukset perioideittain" />
        <FilterBar
          year={year}
          grade={grade}
          bubbles={bubbleAmount}
          studytracks={studytracks}
          studytrack={studytrack}
          handleGradeChange={handleGradeChange}
          handleYearChange={handleYearChange}
          handleBubblesChange={handleBubblesChange}
          handleStudytrackChange={handleStudytrackChange}
        />
        <div className="graph-container">
          <HighchartsReact
            highcharts={Highcharts}
            constructorType="chart"
            options={options}
          />
        </div>
      </div>
    )
  }
  return <Loader active inline="centered" />
}

export default Bubbles
