import React, { useState, useEffect } from 'react'
import { getCourseData, getGraphData, getHistogramData } from '../util/redux/dataReducer'
import Graph from './Graph'
import GraphTestVenn from './GraphTestVenn'
import NavGraph from './NavGraph'
import Stacked from './Stacked'
import Histogram from './Histogram'
import FilterBar from './FilterBar'


const GraphSelector = ({ graphToShow }) => { 
  const [selectedCourse, setSelectedCourse] = useState('Ohjelmoinnin perusteet')
  const [selectedYear, setSelectedYear] = useState(2017)
  const [selectedGrade, setSelectedGrade] = useState('Läpäisseet')
  const [normalPaths, setNormalPaths] = useState([])
  const [e2ePaths, setE2ePaths] = useState([])
  const [firstsPath, setFirstsPath] = useState([])
  const [selectedMaxYear, setSelectedMaxYear] = useState(5)

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

  const whichGraph = (graph) => {
    switch (graph) {
      case 1:
        return (
          <>
            <FilterBar 
              courses={courses}
              handleCourseChange={handleCourseChange} 
              handleGradeChange={handleGradeChange}
              handleSearch={handleSearch}
              handleYearChange={handleYearChange}
              selectedCourse={selectedCourse}
              selectedGrade={selectedGrade}
              selectedYear={selectedYear} />
            <NavGraph data={normalPaths} onClick={handleNavigation} />
          </>
        )
      case 2:
        return (
          <>
            <FilterBar 
              courses={courses}
              handleCourseChange={handleCourseChange} 
              handleGradeChange={handleGradeChange}
              handleSearch={handleSearch}
              handleYearChange={handleYearChange}
              selectedCourse={selectedCourse}
              selectedGrade={selectedGrade}
              selectedYear={selectedYear} />
            <Graph data={e2ePaths} />
          </>
        ) 
      case 3:
        return (
          <>
          <FilterBar 
          courses={courses}
          handleCourseChange={handleCourseChange} 
          handleSearch={handleSearch}
          selectedCourse={selectedCourse} />
          <Histogram maxYear={selectedMaxYear} course={selectedCourse} data={getHistogramData(selectedCourse)} onClick={handleNavigation} />
          </>
        )
        case 4:
        return <Stacked data={normalPaths} onClick={handleNavigation} />
      case 5:
        return <GraphTestVenn data={normalPaths} onClick={handleNavigation} />
      case 6:
        return <Graph data={firstsPath} />
      default:
        return (
          <>
            <FilterBar 
              courses={courses}
              handleCourseChange={handleCourseChange} 
              handleGradeChange={handleGradeChange}
              handleSearch={handleSearch}
              handleYearChange={handleYearChange}
              selectedCourse={selectedCourse}
              selectedGrade={selectedGrade}
              selectedYear={selectedYear} />
            <NavGraph data={normalPaths} onClick={handleNavigation} />
          </>
        )
    }
  }


  return (
    <div>
      {whichGraph(graphToShow)}
    </div>
  )
}

export default GraphSelector
