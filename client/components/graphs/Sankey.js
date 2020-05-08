import React, { useEffect, useState } from 'react'
import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts'
import { Loader } from 'semantic-ui-react'
import FilterBar from '../filters/FilterBar'
import Headline from '../Headline'
import { getSankeyData } from '../../util/redux/dataReducer'

require('highcharts/modules/sankey')(Highcharts)
require('highcharts/modules/exporting')(Highcharts)
require('highcharts/modules/boost')(Highcharts)

const Sankeys = ({ type, courses }) => {
  const [year, setYear] = useState(2016)
  const [course, setCourse] = useState('Ohjelmoinnin perusteet')
  const [grade, setGrade] = useState('Läpäisseet')
  const [levels, setLevels] = useState(5)
  const [firstsData, setFirstsData] = useState([])
  const [normalData, setNormalData] = useState([])

  useEffect(() => {
    setFirstsData(JSON.parse(getSankeyData('firsts', year, course, grade, levels)))
    setNormalData(JSON.parse(getSankeyData('normal', year, course, grade, levels)))
  }, [])

  const handleSearch = (year, course, grade, levels) => {
    if (type === 'firsts') setFirstsData(JSON.parse(getSankeyData('firsts', year, course, grade, levels)))
    else setNormalData(JSON.parse(getSankeyData('normal', year, course, grade, levels)))
  }

  const handleYearChange = (e, { value }) => {
    setYear(value)
    handleSearch(value, course, grade, levels)
  }

  const handleCourseChange = (e, { value }) => {
    setCourse(value)
    handleSearch(year, value, grade, levels)
  }

  const handleGradeChange = (e, { value }) => {
    setGrade(value)
    handleSearch(year, course, value, levels)
  }

  const handleLevelChange = (e, { value }) => {
    setLevels(value)
    handleSearch(year, course, grade, value)
  }


  return (
    <>

      {type === 'normal'
        ? (
          <>
            <Headline text="Mitä kursseja on suoritettu seuraavassa periodissa" />
            <FilterBar
              selectedCourse={course}
              selectedYear={year}
              selectedGrade={grade}
              courses={courses}
              handleCourseChange={handleCourseChange}
              handleGradeChange={handleGradeChange}
              handleYearChange={handleYearChange}
            />
            <Sankey type={type} data={normalData} year={year} />
          </>
        )
        : (
          <>
            <Headline text="Mitä kursseja on suoritettu seuraavissa periodeissa" />
            <FilterBar
              selectedYear={year}
              selectedGrade={grade}
              handleGradeChange={handleGradeChange}
              handleYearChange={handleYearChange}
              selectedLevels={levels}
              handleLevelChange={handleLevelChange}
            />
            <Sankey type={type} data={firstsData} year={year} />
          </>
        )
      }
    </>
  )
}

const Sankey = ({ data, type, year }) => {
  if (data.length > 0) {
    const options = {
      colors: ['#2980B9', '#3d979f', '#060045', '#E6F69D', '#1ABC9C', '#d8c09b', '#d8c09b', '#d8c09b', '#d8c09b'],
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
        text: 'Suorituspolut',
      },
      subtitle: {
        text: `Suoritusvuosi ${year}`,
      },
      series: [{
        keys: ['from', 'to', 'weight'],
        turboThreshold: 9000,
        data,
        type: 'sankey',
        name: type === 'firsts' ? '' : 'Suoritusten määrä',
      }],
      tooltip: {
        nodeFormat: type === 'firsts' ? '{point.name}' : '{point.name} {point.sum}',
      },
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
  }

  const [time, setTime] = useState(<Loader active inline="centered" />)
  setTimeout(() => { setTime('Ei tarpeeksi dataa tai sen hakuaika loppui (10 sekuntia)') }, 10000)
  return (<div className="graph-container">{time}</div>)
}

export default Sankeys
