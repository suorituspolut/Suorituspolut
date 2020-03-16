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


const GraphSelector = ({ graphToShow }) => { 
  const [selectedCourse, setSelectedCourse] = useState('Ohjelmoinnin perusteet')
  const [selectedYear, setSelectedYear] = useState(2017)
  const [selectedGrade, setSelectedGrade] = useState('Läpäisseet')
  const [selectedMaxYear, setSelectedMaxYear] = useState(5)
  const [pageToShow, setPageToShow] = useState(1)

  const [normalPaths, setNormalPaths] = useState([])
  const [e2ePaths, setE2ePaths] = useState([])
  const [firstsPath, setFirstsPath] = useState([])
  const [histogramData, setHistogramData] = useState([])


  useEffect(() => {
    setHistogramData(getHistogramData(selectedCourse))
    setNormalPaths(JSON.parse(getGraphData('normal', selectedYear, selectedCourse, selectedGrade)))
    setE2ePaths(JSON.parse(getGraphData('E2E', selectedYear, selectedCourse, selectedGrade)))
    setFirstsPath(JSON.parse(getGraphData('firsts', selectedYear, selectedCourse, selectedGrade)))
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

  const handleMaxYearChange = (e, { value }) => {
    setSelectedMaxYear(value)
  }

  const handleSearch = () => {
    setNormalPaths(JSON.parse(getGraphData('normal', selectedYear, selectedCourse, selectedGrade)))
    setE2ePaths(JSON.parse(getGraphData('E2E', selectedYear, selectedCourse, selectedGrade)))
    setHistogramData(getHistogramData(selectedCourse))
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
      case 4:
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
      case 5:
        return <Stacked data={normalPaths} onClick={handleNavigation} />
      case 6:
        return <GraphTestVenn data={normalPaths} onClick={handleNavigation} />
      case 7:
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
              selectedYear={selectedYear}
            />
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
