import React, { useEffect, useState } from 'react'
import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts'

import { getGraphData } from '../../util/redux/dataReducer'
import FilterBar from '../filters/FilterBar'
import Headline from '../Headline'

require('highcharts/modules/sankey')(Highcharts)
require('highcharts/modules/exporting')(Highcharts)
require('highcharts/modules/boost')(Highcharts)

const Sankeys = ({ type, courses, headline }) => {
  const [year, setYear] = useState(2017)
  const [course, setCourse] = useState('Ohjelmoinnin perusteet')
  const [grade, setGrade] = useState('Läpäisseet')
  const [levels, setLevels] = useState(5)
  const [firstsData, setFirstsData] = useState([])
  const [normalData, setNormalData] = useState([])

  useEffect(() => {
    setFirstsData(JSON.parse(getGraphData('firsts', year, course, grade, levels, 5)))
    setNormalData(JSON.parse(getGraphData('normal', year, course, grade, levels, 5)))
  }, [])

  const handleSearch = () => {
    if (type === 'firsts') setFirstsData(JSON.parse(getGraphData('firsts', year, course, grade, levels, 5)))
    else setNormalData(JSON.parse(getGraphData('normal', year, course, grade, levels, 5)))
  }

  const handleYearChange = (e, { value }) => {
    setYear(value)
  }

  const handleCourseChange = (e, { value }) => {
    setCourse(value)
  }

  const handleGradeChange = (e, { value }) => {
    setGrade(value)
  }

  const handleLevelChange = (e, { value }) => {
    setLevels(value)
  }

  return (
    <>
     
      {type === 'normal'
        ?
        (
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
            handleSearch={handleSearch}
          />
          <Sankey type={type} data={normalData} />
        </>
        )
        :
        (
        <>
          <Headline text="Mitä kursseja on suoritettu seuraavissa periodeissa" />
          <FilterBar
            selectedYear={year}
            selectedGrade={grade}
            handleGradeChange={handleGradeChange}
            handleYearChange={handleYearChange}
            handleSearch={handleSearch}
            selectedLevels={levels}
            handleLevelChange={handleLevelChange}
          />
          <Sankey type={type} data={firstsData} />
        </>
        )
      }
    </>
  )
}

const Sankey = ({ data, type }) => {
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
    series: [{
      keys: ['from', 'to', 'weight'],
      turboThreshold: 4000,
      data: data,
      type: 'sankey',
      name: 'Suoritusten määrä',
    }],
    tooltip: {
      nodeFormat: type === 'firsts' ? '{point.name}' : '{point.name} {point.sum}',
      // nodeFormatter: function() {
      //   let result = this.linksFrom[0].from + ': '
      //   let sum = 0
      //   console.log(this.linksTo)
      //   Highcharts.each(this.linksFrom, function(el) {
      //       sum += el.weight
      //   });

      //   result += (sum/ this.linksFrom.length)

      //   return result;
      // },
    },
    plotOptions: {
      series: {
        cursor: 'pointer',
        point: {
          events: {
            click: function (event) {
              if (!event.point.name.includes("highcharts")) {
                onClick(event.point.name)
              }
            },
          },
        },
      },
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

export default Sankeys
