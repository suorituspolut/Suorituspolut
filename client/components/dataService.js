import React, { useState, useEffect } from 'react'
import Highcharts from 'highcharts'
import { Button } from 'semantic-ui-react'
import { createNumberOptions, createTextOptions } from '../util/units'
import Graph from './Graph'
import Filter from './Filter'

require("highcharts/modules/sankey")(Highcharts)
require("highcharts/modules/exporting")(Highcharts)

const getGraphData = (type, year, course) => {

  let urlEnd = type

  if(type === 'normal') {
    urlEnd = `${type}/${year}/${course}`
  }

  var xmlHttp = new XMLHttpRequest()
  xmlHttp.open( "GET", `http://localhost:8000/api/data/${urlEnd}`, false ) 
  xmlHttp.send( null )
  return xmlHttp.responseText
}

const getCourseData = () => {
  var xmlHttp = new XMLHttpRequest()
  xmlHttp.open( "GET", `http://localhost:8000/api/courses`, false ) 
  xmlHttp.send( null )
  return xmlHttp.responseText
}

const Data = () => { //Getting the data from backend
  const [graphToShow, setGraphToShow] = useState(true)
  const [selectedCourse, setSelectedCourse] = useState("Ohjelmoinnin perusteet")
  const [selectedYear, setSelectedYear] = useState(2017)
  const [normalPaths, setNormalPaths] = useState([])
  const [e2ePaths, setE2ePaths] = useState([])

  useEffect(() => {
    setNormalPaths(JSON.parse(getGraphData("E2E", selectedYear, selectedCourse)))
    setE2ePaths(JSON.parse(getGraphData("normal", selectedYear, selectedCourse)))
  }, [])
  
  const courses = JSON.parse(getCourseData())

  const handleYearChange = (e, { value }) => {
    setSelectedYear(value)
  }

  const handleCourseChange = (e, { value }) => {
    setSelectedCourse(value)
  }

  const handleSearch = () => {
    setE2ePaths(JSON.parse(getGraphData("normal", selectedYear, selectedCourse)))
    setNormalPaths(JSON.parse(getGraphData("E2E", selectedYear, selectedCourse)))
    console.log(selectedCourse)
    console.log(selectedYear)
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
            <td>
              <p>   </p>
              <Button type="submit" onClick={() => handleSearch()} className="blue">Päivitä</Button>
            </td>
          </tr>
        </tbody>
      </table>

      {graphToShow ? 
        <Graph data={e2ePaths} /> :
        <Graph data={normalPaths} />
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