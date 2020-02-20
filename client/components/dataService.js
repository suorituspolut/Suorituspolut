import React, { useState } from 'react'
import Highcharts from 'highcharts'
import Graph from './Graph'
require("highcharts/modules/sankey")(Highcharts)
require("highcharts/modules/exporting")(Highcharts)

const httpGet = (type) => {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "GET", `http://localhost:8000/api/data/${type}`, false ); 
  xmlHttp.send( null );
  console.log(type)
  return xmlHttp.responseText;
}

const Data = () => { //Getting the data from backend
  const [graphToShow, setGraphToShow] = useState(true)
  const [selectedCourse, setSelectedCourse] = useState("Ohjelmoinnin perusteet")
  const [selectedYear, setSelectedYear] = useState(2017)
  
  let normalPaths = JSON.parse(httpGet("E2E"))
  let e2ePaths = JSON.parse(httpGet("normal"))
  console.log(normalPaths)
  console.log(e2ePaths)

  return (
    <div>
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