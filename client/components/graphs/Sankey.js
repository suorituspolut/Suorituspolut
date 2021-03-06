import React, { useEffect, useState } from 'react'
import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts'
import { Radio, Loader } from 'semantic-ui-react'
import ReactGA from 'react-ga'
import FilterBar from '../filters/FilterBar'
import Headline from '../Headline'
import { getSimpleSankeyData, getMultiSankeyData } from '../../util/redux/dataReducer'
import { graphImages } from '../../util/highChartOptions'


require('highcharts/modules/sankey')(Highcharts)
require('highcharts/modules/exporting')(Highcharts)
require('highcharts/modules/boost')(Highcharts)

const Sankeys = ({ type, courses }) => {
  const [year, setYear] = useState(2016)
  const [course, setCourse] = useState('Ohjelmoinnin perusteet')
  const [grade, setGrade] = useState('Läpäisseet')
  const [levels, setLevels] = useState(5)
  const [multiData, setMultiData] = useState([])
  const [simpleData, setSimpleData] = useState([])
  const [studytrack, setStudytrack] = useState('cs')

  useEffect(() => {
    setSimpleData(JSON.parse(getSimpleSankeyData(year, course, grade, studytrack)))
    setMultiData(JSON.parse(getMultiSankeyData(year, levels, studytrack)))
    if (type === 'multi') {
      ReactGA.event({
        category: 'SankeyMulti-graph',
        action: `year: ${year} course: ${course} studytrack: ${studytrack}`,
      })
    } else {
      ReactGA.event({
        category: 'SankeySimple-graph',
        action: `year: ${year} course: ${course} studytrack: ${studytrack}`,
      })
    }
  }, [])

  const handleSearch = (year, course, grade, levels) => {
    if (type === 'multi') setMultiData(JSON.parse(getMultiSankeyData(year, levels, studytrack)))
    else setSimpleData(JSON.parse(getSimpleSankeyData(year, course, grade, studytrack)))

    if (type === 'multi') {
      ReactGA.event({
        category: 'SankeyMulti-graph',
        action: `year: ${year} course: ${course} studytrack: ${studytrack}`,
      })
    } else {
      ReactGA.event({
        category: 'SankeySimple-graph',
        action: `year: ${year} course: ${course} studytrack: ${studytrack}`,
      })
    }
  }

  const handleYearChange = (e, { value }) => {
    setYear(value)
    handleSearch(value, course, grade, levels, studytrack)
  }

  const handleCourseChange = (e, { value }) => {
    setCourse(value)
    handleSearch(year, value, grade, levels, studytrack)
  }

  const handleGradeChange = (e, { value }) => {
    setGrade(value)
    handleSearch(year, course, value, levels, studytrack)
  }

  const handleLevelChange = (e, { value }) => {
    setLevels(value)
    handleSearch(year, course, grade, value, studytrack)
  }

  const handleStudytrackChange = (e, { value }) => {
    setStudytrack(value)
    handleSearch(year, course, grade, levels, value)
    setSimpleData(JSON.parse(getSimpleSankeyData(year, course, grade, value)))
    setMultiData(JSON.parse(getMultiSankeyData(year, levels, value)))
  }

  return (
    <>
      {type === 'simple'
        ? (
          <>
            <Headline text="Mitä kursseja on suoritettu seuraavassa periodissa" />
            <div className="rts-radio-container">
              <Radio className="radiobutton" label="TKT:n pääaineopiskelijat" checked={studytrack === 'cs'} value="cs" onChange={handleStudytrackChange} />
              <Radio className="radiobutton" label="Matematiikan pääaineopiskelijat" checked={studytrack === 'math'} value="math" onChange={handleStudytrackChange} />
              <Radio className="radiobutton" label="Kaikki tutkinto-ohjelmat" checked={studytrack === 'all'} value="all" onChange={handleStudytrackChange} />
            </div>
            <FilterBar
              course={course}
              year={year}
              grade={grade}
              courses={courses}
              handleCourseChange={handleCourseChange}
              handleGradeChange={handleGradeChange}
              handleYearChange={handleYearChange}
            />
            <Sankey type={type} data={simpleData} year={year} />
          </>
        )
        : (
          <>
            <Headline text="Mitä kursseja on suoritettu seuraavissa periodeissa" />
            <div className="rts-radio-container">
              <Radio className="radiobutton" label="TKT:n pääaineopiskelijat" checked={studytrack === 'cs'} value="cs" onChange={handleStudytrackChange} />
              <Radio className="radiobutton" label="Matematiikan pääaineopiskelijat" checked={studytrack === 'math'} value="math" onChange={handleStudytrackChange} />
            </div>
            <FilterBar
              year={year}
              levels={levels}
              handleYearChange={handleYearChange}
              handleLevelChange={handleLevelChange}
            />
            <Sankey type={type} data={multiData} year={year} />
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
      exporting: graphImages,
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
        name: type === 'multi' ? '' : 'Suoritusten määrä',
      }],
      tooltip: {
        nodeFormat: type === 'multi' ? '{point.name}' : '{point.name} {point.sum}',
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
