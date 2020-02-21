import React, { useState, useEffect } from 'react'
import Highcharts from 'highcharts'
import { Button } from 'semantic-ui-react'
import { createNumberOptions, createTextOptions, grades } from '../util/units'
import Graph from './Graph'
import NavGraph from './NavGraph'
import Filter from './Filter'

require("highcharts/modules/sankey")(Highcharts)
require("highcharts/modules/exporting")(Highcharts)

const getGraphData = (type, year, course, grade) => {

  let urlEnd = type

  if (type === 'normal' || type === 'E2E') {
    urlEnd = `${type}/${year}/${course}/${grade}`
  }

  const xmlHttp = new XMLHttpRequest()
  xmlHttp.open( "GET", `http://localhost:8000/api/data/${urlEnd}`, false ) 
  xmlHttp.send( null )
  return xmlHttp.responseText
}

const getCourseData = () => {
  const xmlHttp = new XMLHttpRequest()
  xmlHttp.open( "GET", `http://localhost:8000/api/courses`, false ) 
  xmlHttp.send( null )
  return xmlHttp.responseText
}

const Data = () => { 
  const [graphToShow, setGraphToShow] = useState(true)
  const [selectedCourse, setSelectedCourse] = useState("Ohjelmoinnin perusteet")
  const [selectedYear, setSelectedYear] = useState(2017)
  const [selectedGrade, setSelectedGrade] = useState("Läpäisseet")
  const [normalPaths, setNormalPaths] = useState([])
  const [e2ePaths, setE2ePaths] = useState([])

  useEffect(() => {
    setNormalPaths(JSON.parse(getGraphData("normal", selectedYear, selectedCourse, selectedGrade)))
    setE2ePaths(JSON.parse(getGraphData("E2E", selectedYear, selectedCourse, selectedGrade)))
  }, [])

  const courses = JSON.parse(getCourseData())

  const handleYearChange = (e, { value }) => {
    setSelectedYear(value)
  }

  const handleCourseChange = (e, { value }) => {
    setSelectedCourse(value)
  }

  const handleGradeChange = (e, { value }) => {
    setSelectedGrade(value)
  }

  const handleSearch = () => {
    setNormalPaths(JSON.parse(getGraphData("normal", selectedYear, selectedCourse, selectedGrade)))
    setE2ePaths(JSON.parse(getGraphData("E2E", selectedYear, selectedCourse, selectedGrade)))
  }

  const handleNavigation = () => {
    // this is still "one step behind" for some reason. Otherwise works
    setSelectedCourse(event.point.id)
    handleSearch()
  }


  return (
    <div>
      <table className="ui table">
        <tbody>
          <tr>
            <Filter
              label="Suoritusvuosi"
              handleChange={handleYearChange}
              value={selectedYear}
              options={createNumberOptions(2013, 2020).reverse()}
              placeholder="2019"
            />
            <Filter
              label="Aloituskurssi"
              handleChange={handleCourseChange}
              value={selectedCourse}
              options={createTextOptions(courses)}
              placeholder="Aloituskurssi"
            />
            <Filter
              label="Arvosana"
              handleChange={handleGradeChange}
              value={selectedGrade}
              options={grades}
              placeholder="Läpäisseet"
            />
            <td>
              <p>   </p>
              <Button type="submit" onClick={() => handleSearch()} className="blue">Päivitä</Button>
            </td>
          </tr>
        </tbody>
      </table>

      {!graphToShow ? 
        <Graph data={e2ePaths} /> :
        <NavGraph data={normalPaths} onClick={handleNavigation}/>
      }
      <div className="toggle-container">
        <div className="ui buttons">
          <button type="submit" onClick={() => setGraphToShow(true)} className="ui button">Kurssi kerrallaan</button>
          <button type="submit" onClick={() => setGraphToShow(false)} className="ui blue button">Polut kurssien välillä</button>
        </div>
      </div>
    </div>
  )
}

export default Data