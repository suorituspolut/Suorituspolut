import React, { useState } from 'react'
import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts'
import dataService from 'Components/dataService'
import Graph from './Graph'
require("highcharts/modules/sankey")(Highcharts)
require("highcharts/modules/exporting")(Highcharts)

function httpGet() {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "GET", "http://localhost:8000/api/data", false );
  xmlHttp.send( null );
  return xmlHttp.responseText;
}

const Data = () => {
  let paths = httpGet();
  console.log(paths)
  console.log(paths.length)
  return (
    <div>
      <Graph/>
      
      </div>
  )
}


export default () => (
  <>
  <Data />
  </>
)