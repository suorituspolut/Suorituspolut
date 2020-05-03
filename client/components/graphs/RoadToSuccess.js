import React, { useEffect, useState } from 'react'
import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts'
import { Icon, Radio } from 'semantic-ui-react'
import FilterBar from '../filters/FilterBar'
import Headline from '../Headline'
import Table from './Table'
import { getRoadToSuccess } from '../../util/redux/dataReducer'


require('highcharts/modules/exporting')(Highcharts)

const RTS = ({ courses }) => {
  const [course, setCourse] = useState('Ohjelmoinnin perusteet')
  const [year, setYear] = useState(2017)
  const [data, setData] = useState([])
  const [uniqueness, setUniqueness] = useState('unique')

  useEffect(() => {
    setData(JSON.parse(getRoadToSuccess(year, course, uniqueness)))
  }, [])

  const handleSearch = (course, year, uniqueness) => {
    console.log(uniqueness)
    try {
      setData(JSON.parse(getRoadToSuccess(year, course, uniqueness)))
    } catch (err) {
      console.log(err)
    }
  }
  const handleCourseChange = (e, { value }) => {
    setCourse(value)
    handleSearch(value, year, uniqueness)
  }

  const handleYearChange = (e, { value }) => {
    setYear(value)
    handleSearch(course, value, uniqueness)
  }

  const handleUniquenessChange = (e, { value }) => {
    setUniqueness(value)
    handleSearch(course, year, value)
  }

  return (
    <div>
      <Headline text="Arvosanajakauma kursseittain - Mitä kursseja opiskelijat ovat käyneet ennen tiettyä arvosanaa?" />
      <div className="rts-radio-container">
        <Radio className="radiobutton" label="Opiskelijan paras suoritus" checked={uniqueness === 'unique'} value="unique" onChange={handleUniquenessChange} />
        <Radio className="radiobutton" label="Kaikki suoritukset" checked={uniqueness === 'all'} value="all" onChange={handleUniquenessChange} />
      </div>
      <FilterBar
        selectedCourse={course}
        courses={courses}
        handleCourseChange={handleCourseChange}
        selectedYear={year}
        yearWithAll
        handleYearChange={handleYearChange}
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
            format: '<b>{point.name}</b>: <br>{point.percentage:.1f} %</br><br>{point.totalAmount} opiskelijaa</br>',
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
        {grades[0] ? (
          <h5 className="pie-legend">
            Yhteensä&nbsp;
            {grades[0].totalAmount}
            &nbsp;opiskelijaa
          </h5>
        ) : null }
        <Table data={grades} highlight={highlight} setHighlight={setHighlight} course={course} />
      </div>
    )
  }
  return <p><Icon loading name="spinner" size="big" /></p>
}

export default RTS
