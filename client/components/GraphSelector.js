import React, { useState, useEffect } from 'react'
import { getCourseData, getGraphData } from '../util/redux/dataReducer'
import Graph from './Graph'
import GraphTestVenn from './GraphTestVenn'
import NavGraph from './NavGraph'
import Stacked from './Stacked'
import Histogram from './Histogram'
import FilterBar from './FilterBar'
import Bubbles from './Bubbles'


const GraphSelector = ({ graphToShow }) => { 
  const [selectedCourse, setSelectedCourse] = useState('Ohjelmoinnin perusteet')
  const [selectedYear, setSelectedYear] = useState(2017)
  const [selectedGrade, setSelectedGrade] = useState('Läpäisseet')
  const [selectedLevels, setSelectedLevels] = useState(5)
  const [normalPaths, setNormalPaths] = useState([])
  const [e2ePaths, setE2ePaths] = useState([])
  const [firstsPath, setFirstsPath] = useState([])
  const [bubbleData, setBubbleData] = useState([])

  useEffect(() => {
    setNormalPaths(JSON.parse(getGraphData('normal', selectedYear, selectedCourse, selectedGrade, selectedLevels)))
    setE2ePaths(JSON.parse(getGraphData('E2E', selectedYear, selectedCourse, selectedGrade, selectedLevels)))
    setFirstsPath(JSON.parse(getGraphData('firsts', selectedYear, selectedCourse, selectedGrade, selectedLevels)))
    setBubbleData(JSON.parse(getGraphData('bubble', selectedYear, selectedCourse, selectedGrade, selectedLevels)))

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

  const handleLevelChange = (e, { value }) => {
    setSelectedLevels(value)
  }

  const handleSearch = () => {
    setNormalPaths(JSON.parse(getGraphData('normal', selectedYear, selectedCourse, selectedGrade, selectedLevels)))
    setE2ePaths(JSON.parse(getGraphData('E2E', selectedYear, selectedCourse, selectedGrade, selectedLevels)))
    setFirstsPath(JSON.parse(getGraphData('firsts', selectedYear, selectedCourse, selectedGrade, selectedLevels)))
    setBubbleData(JSON.parse(getGraphData('bubble', selectedYear, selectedCourse, selectedGrade, selectedLevels)))
  }

  const handleNavigationSearch = (course) => {
    setNormalPaths(JSON.parse(getGraphData('normal', selectedYear, course, selectedGrade, selectedLevels)))
    setE2ePaths(JSON.parse(getGraphData('E2E', selectedYear, course, selectedGrade, selectedLevels)))
    setFirstsPath(JSON.parse(getGraphData('firsts', selectedYear, course, selectedGrade, selectedLevels)))
    setBubbleData(JSON.parse(getGraphData('bubble', selectedYear, selectedCourse, selectedGrade, selectedLevels)))
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
              selectedYear={selectedYear} 
            />
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
              selectedCourse={selectedCourse}
            />
            <Graph data={e2ePaths} />
          </>
        ) 
      case 3:
        return <Histogram course="Tietorakenteet ja algoritmit" data={normalPaths} onClick={handleNavigation} />
      case 4:
        return <Stacked data={normalPaths} onClick={handleNavigation} />
      case 5:
        return <GraphTestVenn data={normalPaths} onClick={handleNavigation} />
      case 6:
        return (
          <>
            <FilterBar
              handleSearch={handleSearch}
              handleYearChange={handleYearChange}
              selectedYear={selectedYear}
              selectedLevels={selectedLevels}
              handleLevelChange={handleLevelChange}
            />
            <Graph data={firstsPath} />
          </>
        )
      case 7:
        return (
          <>
            <FilterBar 
              selectedYear={selectedYear}
              handleYearChange={handleYearChange}
              selectedGrade={selectedGrade}
              handleGradeChange={handleGradeChange}
              handleSearch={handleSearch}
            />
            <Bubbles data={bubbleData} />
          </>
        )
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
    <div className="graph-container">
      {whichGraph(graphToShow)}
    </div>
  )
}

export default GraphSelector
