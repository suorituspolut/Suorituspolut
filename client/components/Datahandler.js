import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import * as d3 from 'd3'
import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts'
// import CSVReader from 'react-csv-reader'
// import { connect } from 'react-redux'
import dataset from '../data/dataset.csv'
require("highcharts/modules/sankey")(Highcharts)
require("highcharts/modules/exporting")(Highcharts)

//headers for dataset.csv
//studentId;coursecode;course;isModule;date;grade

const toPeriod = (month) => {
  let period = 0
  if (month >= 11 && month <= 12) {
    period = 1
  } else if (month >= 1 && month <= 3) {
    period = 2
  } else if (month >= 4 && month <= 4) {
    period = 3
  } else {
    period = 4
  }

  return period
}

const Datahandler = () => {
  const [data, setData] = useState([])


  useEffect(() => {
    d3.dsv(';', dataset).then((data) => {
      setData(data)
    })
  }, [])


  const Ohpesuorittajat = () => {


    var suor = []

    if(data.length > 0) {
      for(let i = 0; i < data.length; i++) {
        if(data[i].course === 'Ohjelmoinnin perusteet') {
          const date = new Date(data[i].date)
          let year = date.getFullYear()
          const period = toPeriod(date.getMonth() + 1)
          if(period === 2) {
            year = year - 1
          }
          suor = [...suor , {'id': Number(data[i].studentId), 'vuosi': year, 'period': period}]
        }
      }
    }
    console.log(suor)
    return (
        <div></div>
    )
  }

  return (
    <div>
      <Ohpesuorittajat />   
    </div>
  )
}


export default Datahandler
