import React, { useState, useEffect } from 'react'
import { Pagination } from 'semantic-ui-react'
import { getCourseData, getGraphData, getHistogramData } from '../util/redux/dataReducer'
import Graph from './Graph'
import GraphTestVenn from './GraphTestVenn'
import Headline from './Headline'
import NavGraph from './NavGraph'
import Stacked from './Stacked'
import Histogram from './Histogram'
import FilterBar from './FilterBar'
import Bubbles from './Bubbles'


const GraphSelector = ({ graphToShow }) => { 
  const [selectedLevels, setSelectedLevels] = useState(5)
  const [selectedBubbles, setSelectedBubbles] = useState(10)
  const [selectedCourse, setSelectedCourse] = useState('Ohjelmoinnin perusteet')
  const [selectedYear, setSelectedYear] = useState(2017)
  const [selectedGrade, setSelectedGrade] = useState('Läpäisseet')
  const [selectedMaxYear, setSelectedMaxYear] = useState(5)
  const [pageToShow, setPageToShow] = useState(1)

  const [normalPaths, setNormalPaths] = useState([])
  const [e2ePaths, setE2ePaths] = useState([])
  const [firstsPath, setFirstsPath] = useState([])
  const [histogramData, setHistogramData] = useState([])
  const [bubbleData, setBubbleData] = useState([])

  useEffect(() => {
    setNormalPaths(JSON.parse(getGraphData('normal', selectedYear, selectedCourse, selectedGrade, selectedLevels, selectedBubbles)))
    setE2ePaths(JSON.parse(getGraphData('E2E', selectedYear, selectedCourse, selectedGrade, selectedLevels, selectedBubbles)))
    setFirstsPath(JSON.parse(getGraphData('firsts', selectedYear, selectedCourse, selectedGrade, selectedLevels, selectedBubbles)))
    setBubbleData(JSON.parse(getGraphData('bubble', selectedYear, selectedCourse, selectedGrade, selectedLevels, selectedBubbles)))
    setHistogramData(getHistogramData(selectedCourse))
  }, [])

  const courses = JSON.parse(getCourseData()).sort()

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

  const handleBubblesChange = (e, { value }) => {
    setSelectedBubbles(value)
  }

  const handleMaxYearChange = (e, { value }) => {
    setSelectedMaxYear(value)
  }

  const handleSearch = () => {
    setNormalPaths(JSON.parse(getGraphData('normal', selectedYear, selectedCourse, selectedGrade, selectedLevels, selectedBubbles)))
    setE2ePaths(JSON.parse(getGraphData('E2E', selectedYear, selectedCourse, selectedGrade, selectedLevels, selectedBubbles)))
    setFirstsPath(JSON.parse(getGraphData('firsts', selectedYear, selectedCourse, selectedGrade, selectedLevels, selectedBubbles)))
    setHistogramData(getHistogramData(selectedCourse))
    setBubbleData(JSON.parse(getGraphData('bubble', selectedYear, selectedCourse, selectedGrade, selectedLevels, selectedBubbles)))
  }

  const handleNavigationSearch = (course) => {
    setNormalPaths(JSON.parse(getGraphData('normal', selectedYear, course, selectedGrade, selectedLevels, selectedBubbles)))
    setE2ePaths(JSON.parse(getGraphData('E2E', selectedYear, course, selectedGrade, selectedLevels, selectedBubbles)))
    setFirstsPath(JSON.parse(getGraphData('firsts', selectedYear, course, selectedGrade, selectedLevels, selectedBubbles)))
    setBubbleData(JSON.parse(getGraphData('bubble', selectedYear, selectedCourse, selectedGrade, selectedLevels, selectedBubbles)))
  }

  const handleNavigation = () => {
    const course = event.point.id
    setSelectedCourse(course)
    handleNavigationSearch(course)
  }

  const printOutFiveHistograms = (index) => {
    const coursesOnAPage = [courses[index], courses[index + 1], courses[index + 2], courses[index + 3], courses[index + 4]]
    return (
      <div>
        {coursesOnAPage.map(course => <Histogram key={course} maxYear={selectedMaxYear} course={course} data={getHistogramData(course)} />)}
      </div>
    )
  }

  const handlePageChange = (e, { activePage }) => {
    e.preventDefault()
    if (activePage !== 1) setPageToShow((activePage - 1) * 5)
    else setPageToShow(0)
  }

  const whichGraph = (graph) => {
    switch (graph) {
      case 1:
        return (
          <>
            <Headline text="Seuraavassa periodissa suoritetut kurssit" />
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
      case 4:
        return (
          <>
            <Headline text="Kurssin suoritusajankohdat opintojen aikana" />
            <FilterBar
              courses={courses}
              handleCourseChange={handleCourseChange}
              handleSearch={handleSearch}
              selectedCourse={selectedCourse}
              handleMaxYearChange={handleMaxYearChange}
              selectedMaxYear={selectedMaxYear}
            />
            <Histogram maxYear={selectedMaxYear} course={selectedCourse} data={histogramData} onClick={handleNavigation} />
          </>
        )
      case 5:
        return (
          <>
            <div>
              <Headline text="Kurssien suoritusajankohdat" />
              <FilterBar
                handleSearch={handleSearch}
                handleMaxYearChange={handleMaxYearChange}
                selectedMaxYear={selectedMaxYear}
              />
              {printOutFiveHistograms(pageToShow)}
            </div>
            <div className="pagination-container">
              <Pagination defaultActivePage={1} onPageChange={handlePageChange} totalPages={Math.ceil(courses.length / 5)} />
            </div>
          </>
        )
      case 6:
        return (
          <>
            <FilterBar
              selectedYear={selectedYear}
              handleYearChange={handleYearChange}
              selectedGrade={selectedGrade}
              handleGradeChange={handleGradeChange}
              handleSearch={handleSearch}
              selectedBubbles={selectedBubbles}
              handleBubblesChange={handleBubblesChange}
            />
            <Bubbles data={bubbleData} />
          </>
        )
      case 7:
        return <Stacked data={normalPaths} onClick={handleNavigation} />
      case 8:
        return <GraphTestVenn data={normalPaths} onClick={handleNavigation} />
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
              selectedYear={selectedYear}
            />
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
