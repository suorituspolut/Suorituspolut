import React from 'react'
import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts'
require("highcharts/modules/sankey")(Highcharts)
require("highcharts/modules/exporting")(Highcharts)


Highcharts.setOptions({
  colors: ['#2D87BB', '#64C2A6', '#AADEA7', '#E6F69D', '#FEAE65', '#64E572', '#FF9655', '#FFF263', '#6AF9C4']
})


const options = {
  credits: {
    text: ''
  },
  title: {
    text: 'Suorituspolut'
  },
  description: {
    text: 'Näyttää polun kurssista Ohjelmoinnin perusteet kurssiin Tietorakenteet ja algoritmit'
  },
  series: [{
    keys: ['from', 'to', 'weight'],
    data: [
      ['Ohjelmoinnin perusteet', 'Ohjelmoinnin jatkokurssi', 70],
      ['Ohjelmoinnin jatkokurssi', 'Tietorakenteet ja algoritmit', 30],
      ['Ohjelmoinnin perusteet', 'Tietokoneen toiminta', 5],
      ['Ohjelmoinnin perusteet', 'Muut', 15],
      ['Ohjelmoinnin perusteet', 'Johdatus yliopistomatematiikkaan', 10],
      ['Ohjelmoinnin perusteet', 'Tietorakenteet ja algoritmit', 20],
    ],
    type: 'sankey',
    name: 'Polku kurssiin: Tietorakenteet ja algoritmit',
  }]
}

const Graph = () => {

  return(
    <HighchartsReact
      highcharts={Highcharts}
      constructorType={'chart'}
      options={options}
    />
  )
}

export default Graph