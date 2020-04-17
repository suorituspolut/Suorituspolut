import React, { useEffect, useState } from 'react'
import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts'
import { Icon } from 'semantic-ui-react'
import FilterBar from '../filters/FilterBar'
import Table from './Table'
import { getRoadToSuccess } from '../../util/redux/dataReducer'


require('highcharts/modules/exporting')(Highcharts)

const RTS = ({ courses }) => {
  const [course, setCourse] = useState('Ohjelmoinnin perusteet')
  const [data, setData] = useState([])

  useEffect(() => {
    setData(JSON.parse(getRoadToSuccess(course, 'unique')))
  }, [])

  const handleSearch = (course) => {
    try {
      setData(JSON.parse(getRoadToSuccess(course, 'unique')))
    } catch (err) {
      console.log(err)
    }
  }
  const handleCourseChange = (e, { value }) => {
    setCourse(value)
    handleSearch(value)
  }


  return (
    <div>
      
      <FilterBar
        selectedCourse={course}
        courses={courses}
        handleCourseChange={handleCourseChange}
      />
      {data ? <PieChart grades={data} course={course} /> : null}
    </div>
  )
}

const PieChart = ({ grades, course }) => {
  const [highlight, setHighlight] = useState('Kaikki')
  if (grades.length > 0) {
    const options = {

      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
      },
      credits: {
        text: '',
      },
      title: {
        text: '',
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
      },
      accessibility: {
        point: {
          valueSuffix: '%',
        },
      },
      plotOptions: {
        series: {
          allowPointSelect: true,
          cursor: 'pointer',
          events: {
            click(e) {
              setHighlight(e.point.name)
            },
          },
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: <br>{point.percentage:.1f} %</br>',
          },
        },
      },
      series: [{
        name: 'Kaikista arvosanoista',
        colorByPoint: true,
        data: grades.slice(1, grades.length),
      }],
    }
    return (
      <div className="graph-container">
        <HighchartsReact
          highcharts={Highcharts}
          constructorType="chart"
          options={options}
        />
        <Table data={grades} highlight={highlight} setHighlight={setHighlight} course={course} />
      </div>
    )
  }
  return <p><Icon loading name="spinner" size="big" /></p>
}

export default RTS
