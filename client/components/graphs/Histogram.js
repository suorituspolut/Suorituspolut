import React, { useEffect, useState } from 'react'
import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts'
import {
  Form, Pagination, Radio, Loader,
} from 'semantic-ui-react'
import FilterBar from '../filters/FilterBar'
import Headline from '../Headline'
import { graphImages } from '../../util/highChartOptions'
import { blueColors } from '../../util/units'
import { getSimpleHistogramData, getMultiHistogramData } from '../../util/redux/dataReducer'


require('highcharts/modules/exporting')(Highcharts)


const countCategories = (maxYear) => {
  const categories = []
  let currentYear = 1
  let currentPeriod = 1

  for (let i = 1; i < maxYear * 5 + 1; i++) {
    categories[i - 1] = `${currentYear} .vuosi /  ${currentPeriod} .periodi`
    currentPeriod++
    if (i % 5 === 0) {
      currentYear++
      currentPeriod = 1
    }
  }

  return categories
}

const categories = countCategories(10)

const dataWithColors = (data, maxYear) => {
  const addingColors = data.map((dataPoint, index) => {
    if (index < 5) return ({ y: dataPoint, color: blueColors[0] })
    if (index >= 5 && index < 10) return ({ y: dataPoint, color: blueColors[1] })
    if (index >= 10 && index < 15) return ({ y: dataPoint, color: blueColors[2] })
    if (index >= 15 && index < 20) return ({ y: dataPoint, color: blueColors[3] })
    if (index >= 20 && index < 25) return ({ y: dataPoint, color: blueColors[0] })
    if (index >= 25 && index < 30) return ({ y: dataPoint, color: blueColors[1] })
    if (index >= 30 && index < 35) return ({ y: dataPoint, color: blueColors[2] })
    if (index >= 35 && index < 40) return ({ y: dataPoint, color: blueColors[3] })
    if (index >= 40 && index < 45) return ({ y: dataPoint, color: blueColors[0] })
    if (index >= 45 && index < 50) return ({ y: dataPoint, color: blueColors[1] })
  })
  const array = []
  for (let i = 0; i < maxYear * 5; i++) {
    array[i] = addingColors[i]
  }
  return array
}


const Histograms = ({ courses, howMany }) => {
  const [sorting, setSorting] = useState('startHeavy')
  const [subset, setSubset] = useState('mandatoryCourses')
  const [data, setData] = useState([])
  const [datamany, setDataMany] = useState([])
  const [course, setCourse] = useState('Ohjelmoinnin perusteet')
  const [maxYear, setMaxYear] = useState(5)
  const [startIndex, setStartIndex] = useState(0)
  const [activePage, setActivePage] = useState(1)
  const [studytrack, setStudytrack] = useState('cs')

  useEffect(() => {
    setData(dataWithColors(JSON.parse(getSimpleHistogramData(course, studytrack)).histogramArray, maxYear))
    setDataMany(JSON.parse(getMultiHistogramData(subset, sorting, studytrack)))
  }, [])

  const handleSearch = (course, maxYear, studytrack) => {
    try {
      setData(dataWithColors(JSON.parse(getSimpleHistogramData(course, studytrack)).histogramArray, maxYear))
    } catch (err) {
      console.log(err)
    }
  }

  const handleCourseChange = (e, { value }) => {
    setCourse(value)
    handleSearch(value, maxYear, studytrack)
  }

  const handleMaxYearChange = (e, { value }) => {
    e.preventDefault()
    setMaxYear(value)
    setData(dataWithColors(JSON.parse(getSimpleHistogramData(course, studytrack)).histogramArray, value))
  }

  const handleSortingChange = (e, { value }) => {
    setSorting(value)
    setDataMany(JSON.parse(getMultiHistogramData(subset, value, studytrack)))
    setActivePage(1)
    setStartIndex(0)
  }

  const handleSubsetChange = (e, { value }) => {
    setSubset(value)
    setDataMany(JSON.parse(getMultiHistogramData(value, sorting, studytrack)))
    setActivePage(1)
    setStartIndex(0)
  }

  const handlePageChange = (e, { activePage }) => {
    e.preventDefault()
    setActivePage(activePage)
    if (activePage !== 1) setStartIndex((activePage - 1) * 5)
    else setStartIndex(0)
  }

  const handleStudytrackChange = (e, { value }) => {
    e.preventDefault()
    setStudytrack(value)
    setData(dataWithColors(JSON.parse(getSimpleHistogramData(course, value)).histogramArray, maxYear))
    setDataMany(JSON.parse(getMultiHistogramData(subset, sorting, value)))
  }

  const printOutFiveHistograms = (index) => {
    let coursesOnAPage = []
    const biggestIndex = datamany.length - 1
    let indexValue = index

    if (courses.length > 0 && datamany.length > 0) {
      if (indexValue >= datamany.length) indexValue = 0

      for (let i = 0; i <= 4; i++) {
        if ((indexValue + i) <= biggestIndex) coursesOnAPage = [...coursesOnAPage, datamany[indexValue + i]]
      }

      return (
        <div>
          {coursesOnAPage.map(course => <Histogram key={course.course} data={dataWithColors(course.histogramArray, maxYear)} course={course.course} categories={categories} deviation={course.deviation} />)}
        </div>
      )
    }
    return <Loader active inline="centered" />
  }

  const printOutOneHistogram = () => {
    if (courses.length > 0 && datamany.length > 0) {
      return (
        <div>
          <Histogram maxYear={maxYear} data={data} course={course} categories={categories} />
        </div>
      )
    }
    return <Loader active inline="centered" />
  }

  return (
    <>
      {howMany !== 1
        ? (
          <>
            <Headline text="Kurssin suoritusajankohdat opintojen aikana" />
            <div className="radio-container">
              <Form>
                <h5 className="radio-container">Valitse tutkinto-ohjelman opiskelijat:</h5>
                <Radio className="radiobutton" label="TKT:n pääaineopiskelijat" checked={studytrack === 'cs'} value="cs" onChange={handleStudytrackChange} />
                <Radio className="radiobutton" label="Matematiikan pääaineopiskelijat" checked={studytrack === 'math'} value="math" onChange={handleStudytrackChange} />
                <Radio className="radiobutton" label="Kaikki tutkinto-ohjelmat" checked={studytrack === 'all'} value="all" onChange={handleStudytrackChange} />
              </Form>
            </div>
            <div className="radio-container">
              <Form>
                <h5 className="radio-container">Valitse näytettävät kurssit:</h5>
                <Radio className="radiobutton" label="Näytä pakolliset TKT-kurssit" checked={subset === 'mandatoryCourses'} value="mandatoryCourses" onChange={handleSubsetChange} />
                <Radio className="radiobutton" label="Näytä kaikki TKT-kurssit" checked={subset === 'csCourses'} value="csCourses" onChange={handleSubsetChange} />
                <Radio className="radiobutton" label="Näytä matematiikan kurssit" checked={subset === 'mathCourses'} value="mathCourses" onChange={handleSubsetChange} />
              </Form>
            </div>
            <div className="radio-container">
              <Form>
                <h5 className="radio-container">Järjestä kurssihistogrammit:</h5>
                <Radio className="radiobutton" label="Moodin mukaan alkupainotteisesti" checked={sorting === 'startHeavy'} value="startHeavy" onChange={handleSortingChange} />
                <Radio className="radiobutton" label="Moodin mukaan loppupainotteisesti" checked={sorting === 'endHeavy'} value="endHeavy" onChange={handleSortingChange} />
                <Radio className="radiobutton" label="Keskihajonnan mukaan, pienin hajonta ensin" checked={sorting === 'deviation'} value="deviation" onChange={handleSortingChange} />
                <Radio className="radiobutton" label="Keskihajonnan mukaan, suurin hajonta ensin" checked={sorting === 'deviationReverse'} value="deviationReverse" onChange={handleSortingChange} />
              </Form>
            </div>

            <FilterBar
              handleMaxYearChange={handleMaxYearChange}
              maxYear={maxYear}
            />
            <div>
              {printOutFiveHistograms(startIndex)}
            </div>
            <div className="pagination-container">
              <Pagination activePage={activePage} onPageChange={handlePageChange} totalPages={courses.length > 0 ? Math.ceil(datamany.length / 5) : 1} />
            </div>
          </>
        )
        : (
          <>
            <Headline text="Kurssin suoritusajankohdat opintojen aikana" />
            <div className="radio-container">
              <Radio className="radiobutton" label="TKT:n pääaineopiskelijat" checked={studytrack === 'cs'} value="cs" onChange={handleStudytrackChange} />
              <Radio className="radiobutton" label="Matematiikan pääaineopiskelijat" checked={studytrack === 'math'} value="math" onChange={handleStudytrackChange} />
              <Radio className="radiobutton" label="Kaikki tutkinto-ohjelmat" checked={studytrack === 'all'} value="all" onChange={handleStudytrackChange} />
            </div>
            <FilterBar
              courses={courses}
              handleCourseChange={handleCourseChange}
              course={course}
              handleMaxYearChange={handleMaxYearChange}
              maxYear={maxYear}
            />
            {printOutOneHistogram()}
          </>
        )
      }
    </>
  )
}

const Histogram = ({
  data, course, categories, deviation,
}) => {
  let deviationSubtitle = ''

  if (deviation !== undefined) {
    deviationSubtitle += `Keskihajonta: ${deviation.toFixed(2)}`
  }

  const options = {

    title: {
      text: course,
    },
    subtitle: {
      text: deviationSubtitle,
    },
    credits: {
      text: '',
    },
    xAxis: {
      categories,
      crosshair: true,
    },
    yAxis: {
      min: 0,
      title: {
        text: '',
      },
    },
    exporting: graphImages,
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>'
          + '<td style="padding:0"><b>{point.y:.0f} opiskelijaa</b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true,
    },
    plotOptions: {
      column: {
        pointPadding: 0,
        borderWidth: 0,
        groupPadding: 0,
        shadow: false,
      },
    },
    legend: {
      enabled: false,
    },
    series: [{
      colorKey: 'colorValue',
      type: 'column',
      name: 'Kurssisuoritukset',
      data: data || [{ y: 0, color: '#81d4fa' }],
    }],
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


export default Histograms
