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
        setData(JSON.parse(getRoadToSuccess(course, 'all')))
    },[])

    const handleSearch = () => {
        try {
            setData(JSON.parse(getRoadToSuccess(course, 'all')))
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
    handleSearch={handleSearch} />
    <PieChart grades={data} />
    <Table data={data} grade={grade}/>
    </div>
  )
}

const PieChart = ({grades}) => {
    if (grades.length > 1) {
        const totalAmount = grades[0].totalAmount + grades[6].totalAmount
    const options = {
  
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie',
            events: {
                click: {
                    function(e) {
                        console.log(e)
                    }
                }
            },
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
                valueSuffix: '%'
            }
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: <br>{point.percentage:.1f} %</br>',
                }
            }
        },
        series: [{
            name: 'Kaikista arvosanoista',
            colorByPoint: true,
            data: [{
                name: 'Arvosana: 5',
                y: grades[5].totalAmount / totalAmount
            }, {
                name: 'Arvosana: 0',
                y: grades[0].totalAmount / totalAmount
            }, {
                name: 'Arvosana: 1',
                y: grades[1].totalAmount / totalAmount
            }, {
                name: 'Arvosana: 2',
                y: grades[2].totalAmount / totalAmount
            }, {
                name: 'Arvosana: 3',
                y: grades[3].totalAmount / totalAmount
            }, {
                name: 'Arvosana: 4',
                y: grades[4].totalAmount / totalAmount
            }]
        }]
    ,
    }
    return (
        <div className="graph-container">
          <HighchartsReact
            highcharts={Highcharts}
            constructorType="chart"
            options={options}
          />
        </div>
      )
    } else {
        return null
    }
}

export default RTS
