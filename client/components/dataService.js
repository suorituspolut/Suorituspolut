import React, { useState, useEffect } from 'react'
import Highcharts from 'highcharts'
import { Button } from 'semantic-ui-react'
import { createNumberOptions, createTextOptions, grades } from '../util/units'
import Graph from './Graph'
import GraphTestVenn from './GraphTestVenn'
import NavGraph from './NavGraph'
import Filter from './Filter'
import Stacked from './Stacked'
import Histogram from './Histogram'

require("highcharts/modules/sankey")(Highcharts)
require("highcharts/modules/exporting")(Highcharts)

const getGraphData = (type, year, course, grade) => {

  let urlEnd = type

  if (type === 'normal' || type === 'E2E' || type === 'firsts') {
    urlEnd = `${type}/${year}/${course}/${grade}`
  }
  if (process.env.NODE_ENV !== 'production') {
    var xmlHttp = new XMLHttpRequest()
    xmlHttp.open( "GET", `http://localhost:8000/api/data/${urlEnd}`, false ) 
    xmlHttp.send( null )
    return xmlHttp.responseText
  }
  var xmlHttp = new XMLHttpRequest()
  xmlHttp.open( "GET", `https://toska.cs.helsinki.fi/suorituspolut/api/data/${urlEnd}`, false ) 
  xmlHttp.send( null )
  return xmlHttp.responseText
}

const getCourseData = () => {
  if (process.env.NODE_ENV !== 'production') {
    var xmlHttp = new XMLHttpRequest()
    xmlHttp.open( "GET", `http://localhost:8000/api/courses`, false ) 
    xmlHttp.send( null )
    return xmlHttp.responseText
  }
  var xmlHttp = new XMLHttpRequest()
  xmlHttp.open( "GET", `https://toska.cs.helsinki.fi/suorituspolut/api/courses`, false ) 
  xmlHttp.send( null )
  return xmlHttp.responseText
}

const Data = () => { 
  const [graphToShow, setGraphToShow] = useState(5)
  const [selectedCourse, setSelectedCourse] = useState("Ohjelmoinnin perusteet")
  const [selectedYear, setSelectedYear] = useState(2018)
  const [selectedGrade, setSelectedGrade] = useState("Läpäisseet")
  const [normalPaths, setNormalPaths] = useState([])
  const [e2ePaths, setE2ePaths] = useState([])
  const [firstsPath, setFirstsPath] = useState([])

  useEffect(() => {
    setNormalPaths(JSON.parse(getGraphData('normal', selectedYear, selectedCourse, selectedGrade)))
    setE2ePaths(JSON.parse(getGraphData('E2E', selectedYear, selectedCourse, selectedGrade)))
    setFirstsPath(JSON.parse(getGraphData('firsts', selectedYear, selectedCourse, selectedGrade)))
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
    setNormalPaths(JSON.parse(getGraphData('normal', selectedYear, selectedCourse, selectedGrade)))
    setE2ePaths(JSON.parse(getGraphData('E2E', selectedYear, selectedCourse, selectedGrade)))
    setFirstsPath(JSON.parse(getGraphData('firsts', selectedYear, selectedCourse, selectedGrade)))
  }

  const handleNavigationSearch = (course) => {
    setNormalPaths(JSON.parse(getGraphData('normal', selectedYear, course, selectedGrade)))
    setE2ePaths(JSON.parse(getGraphData('E2E', selectedYear, course, selectedGrade)))
    setFirstsPath(JSON.parse(getGraphData('firsts', selectedYear, course, selectedGrade)))
  }

  const handleNavigation = () => {
    const course = event.point.id
    setSelectedCourse(course)
    handleNavigationSearch(course)
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

      {graphToShow === 0
        ? <Graph data={e2ePaths} />
        : <br />
      }
      {graphToShow === 1
        ? <NavGraph data={normalPaths} onClick={handleNavigation} /> :
        <br />
      }
      {graphToShow === 2
        ? <GraphTestVenn data={normalPaths} onClick={handleNavigation} /> :
        <br />
      }
      {graphToShow === 3
        ? <Stacked data={normalPaths} onClick={handleNavigation} /> :
        <br />
      }
      {graphToShow === 4
        ? <Histogram course="Tietorakenteet ja algoritmit" data={normalPaths} onClick={handleNavigation} />
        : <br />
      }
      {graphToShow === 5
        ? <Graph data={firstsPath} />
        : <br />
      }
      <div className="toggle-container">
        <div className="ui buttons">
          <button type="submit" onClick={() => setGraphToShow(1)} className="ui button">Kurssi kerrallaan</button>
          <button type="submit" onClick={() => setGraphToShow(0)} className="ui blue button">Polut kurssien välillä</button>
          <button type="submit" onClick={() => setGraphToShow(2)} className="ui brown button">Kurssivertailu</button>
          <button type="submit" onClick={() => setGraphToShow(3)} className="ui red button">Pullonkaulakurssit</button>
          <button type="submit" onClick={() => setGraphToShow(4)} className="ui green button">Histogrammi</button>
          <button type="submit" onClick={() => setGraphToShow(5)} className="ui button">Kaikki ekat kurssit mukana</button>
        </div>
      </div>
    </div>
  )
}

export default Data