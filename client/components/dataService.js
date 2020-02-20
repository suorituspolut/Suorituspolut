import React, { useState } from 'react'
import Highcharts from 'highcharts'
import { createNumberOptions, createTextOptions } from '../util/units'
import Graph from './Graph'
import Filter from './Filter'

require("highcharts/modules/sankey")(Highcharts)
require("highcharts/modules/exporting")(Highcharts)

const getGraphData = (type) => {
  var xmlHttp = new XMLHttpRequest()
  xmlHttp.open( "GET", `http://localhost:8000/api/data/${type}`, false ) 
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
  
  const normalPaths = JSON.parse(getGraphData("E2E"))
  const e2ePaths = JSON.parse(getGraphData("normal"))
  const courses = JSON.parse(getCourseData())

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value)
  }

  const handleCourseChange = (event) => {
    setSelectedCourse(event.target.value)
  }


  return (
    <div>
      <table className="ui celled table">
        <tbody>
          <trow>
            <Filter label="Year" handleChange={handleYearChange} options={createNumberOptions(2013, 2020).reverse()} placeholder="2019" />
            <Filter label="Starting course" handleChange={handleCourseChange} options={createTextOptions(courses)} placeholder="Starting course"/>
          </trow>
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