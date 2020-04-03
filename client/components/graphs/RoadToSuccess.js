import React, { useEffect, useState } from 'react'
import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts'
import FilterBar from '../filters/FilterBar'
import Table from './Table'
import { getRoadToSuccess } from '../../util/redux/dataReducer'

// example for getting the data for RTS
// const rts = JSON.parse(getRoadToSuccess('Tietoliikenteen perusteet', 'unique'))
// const rts = JSON.parse(getRoadToSuccess('Tietoliikenteen perusteet', 'all'))
// console.log(rts)
// each separate array of an grade contains: name of the course, the total amount of people done that course, and the percentage
// eg. if you search with "Tietorakenteet and algoritmit",
// you get:
// grade of tira: [name of a popular course, number of people who have done that course, percentage of people who have done that course]


require('highcharts/modules/exporting')(Highcharts)

const RTS = ({courses}) => {
  const [course, setCourse] = useState('Ohjelmoinnin perusteet')
  const [data, setData] = useState([])
  const [grade, setGrade] = useState(5)

  useEffect(() => {
    setData(JSON.parse(getRoadToSuccess(course, 'unique')))
  }, [])
  const handleSearch = () => {
    try {
      setData(JSON.parse(getRoadToSuccess(course, 'unique')))
    } catch (err) {
      console.log(err)
    }
  }

  const handleCourseChange = (e, { value }) => {
    setCourse(value)
  }

  return (
    <div>
      <FilterBar
        selectedCourse={course}
        courses={courses}
        handleCourseChange={handleCourseChange}
        handleSearch={handleSearch} 
      />
      <PieChart grades={data} props={grade} />
    </div>
  )
}

const PieChart = ({ grades, props }) => {
  const [grade, setGrade] = useState(props)

  if (grades.length > 0) {

    const totalAmount = grades.reduce((sum, value) => {
      return sum + value.totalAmount
    }, 0)

    const totalAccepted = totalAmount - grades[0].totalAmount

    const dataWithCorrectGradeRange = () => {
      if (grades[1].totalAmount > 0) {
        return [
          {
            name: 'Arvosana: 5',
            y: grades[5].totalAmount / totalAmount,
            value: 5,
          }, {
            name: 'Hylätty',
            y: grades[0].totalAmount / totalAmount,
            value: 0,
          }, {
            name: 'Arvosana: 1',
            y: grades[1].totalAmount / totalAmount,
            value: 1,
          }, {
            name: 'Arvosana: 2',
            y: grades[2].totalAmount / totalAmount,
            value: 2,
          }, {
            name: 'Arvosana: 3',
            y: grades[3].totalAmount / totalAmount,
            value: 3,
          }, {
            name: 'Arvosana: 4',
            y: grades[4].totalAmount / totalAmount,
            value: 4,
          },
          {
            name: 'Hyväksilukeneet',
            y: grades[8].totalAmount / totalAmount,
            value: 6,
          },
        ]
      }
      if (grades[7].totalAmount > 0) {
        return [
          {
            name: 'Tyydyttävät taidot',
            y: grades[6].totalAmount / totalAmount,
            value: 1,
          },
          {
            name: 'Hyvät taidot',
            y: grades[7].totalAmount / totalAmount,
            value: 2,
          },
          {
            name: 'Hylätty',
            y: grades[0].totalAmount / totalAmount,
            value: 0,
          },
          {
            name: 'Hyväksilukeneet',
            y: grades[8].totalAmount / totalAmount,
            value: 3,
          },
        ]
      }
      return [
        {
          name: 'Hyväksytty',
          y: totalAccepted / totalAmount,
          value: 1,
        },
        {   
          name: 'Hylätty',
          y: grades[0].totalAmount / totalAmount,
          value: 0,
        },
      ]
    }

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
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
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
            click: function(e) {
              setGrade(e.point.value)
            }
          },
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: <br>{point.percentage:.1f} %</br>',
          }
        }
      },
      series: [{
        name: 'Kaikista arvosanoista',
        colorByPoint: true,
        data: dataWithCorrectGradeRange(),
      }],
    }
    return (
      <div className="graph-container">
        <HighchartsReact
          highcharts={Highcharts}
          constructorType="chart"
          options={options}
        />
        <Table data={grades} grade={grade} />
      </div>
    )
  } else {
    return <p>Ei aiempia kursseja!</p>
  }
}

export default RTS
