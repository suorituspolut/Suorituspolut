import React, { useEffect, useState } from 'react'
import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts'
import { Button, Pagination } from 'semantic-ui-react'
import { blueColors } from '../../util/units'
import { getHistogramData, getHistoDataMany } from '../../util/redux/dataReducer'
import FilterBar from '../filters/FilterBar'
import Headline from '../Headline'
import Info from '../notifications/Info'


require('highcharts/modules/exporting')(Highcharts)



const countCategories = (maxYear) => {
  const categories = []
  let currentYear = 1
  let currentPeriod = 1
  maxYear = 9

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

const categories = countCategories(9)

const dataWithColors = (data, maxYear) => {

  //maxYear = 9

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
  const [data, setData] = useState([])
  const [datamany, setDataMany] = useState([])
  const [course, setCourse] = useState('Ohjelmoinnin perusteet')
  const [maxYear, setMaxYear] = useState(5)
  const [pageToShow, setPageToShow] = useState(1)
  //const [categories, setCategories] = useState([])

  useEffect(() => {
    setData(dataWithColors(JSON.parse(getHistogramData(course)).histogramArray, maxYear))
    setDataMany(JSON.parse(getHistoDataMany(sorting)))
    //setCategories(countCategories(maxYear))
  }, [])


  const handleCourseChange = (e, { value }) => {
    setCourse(value)
  }

  const handleMaxYearChange = (e, { value }) => {
    setMaxYear(value)
  }

  //this should be changed to include other sorting methods
  const handleSortingChange = (e, { value }) => {
    setSorting('mandatoryCourses')
    setDataMany(JSON.parse(getHistoDataMany('mandatoryCourses')))
  }

  const handleSearch = () => {
    try {
      setData(dataWithColors(JSON.parse(getHistogramData(course)).histogramArray, maxYear))
    } catch (err) {
      console.log(err)
    }
    //setCategories(countCategories(maxYear))
  }

  const handlePageChange = (e, { activePage }) => {
    e.preventDefault()
    if (activePage !== 1) setPageToShow((activePage - 1) * 5)
    else setPageToShow(0)
  }

  const printOutFiveHistograms = (index) => {

    if (courses.length > 0 && datamany.length > 0) {
      const coursesOnAPage = [datamany[index], datamany[index + 1], datamany[index + 2], datamany[index + 3], datamany[index + 4]]
      return (
        <div>
          {coursesOnAPage.map(course => <Histogram key={course.course} data={dataWithColors(course.histogramArray, maxYear)} course={course.course} categories={categories} />)}
        </div>
      )
    }
    return <></>
  }

  return (
    <>
      {howMany !== 1
      ? (
          <>
            <Info content="Tämä histogrammi näyttää valitun kurssin suoritusten jakautumisen opiskeluvuosien ja periodien mukaan. Näytettävien opiskeluvuosien määrää voi rajata."/>
            <Headline text="Kurssin suoritusajankohdat opintojen aikana" />
            <Button className="blue" onClick={handleSortingChange}>Näytä vain pakolliset kurssit</Button>

            <div className="pagination-container">
              <Pagination defaultActivePage={1} onPageChange={handlePageChange} totalPages={courses.length > 0 ? Math.ceil(30 / 5) : 1} />
            </div>

            <FilterBar
              handleSearch={handleSearch}
              handleMaxYearChange={handleMaxYearChange}
              selectedMaxYear={maxYear}
            />
            <div>
              {printOutFiveHistograms(pageToShow)}
            </div>
            <div className="pagination-container">
              <Pagination defaultActivePage={1} onPageChange={handlePageChange} totalPages={courses.length > 0 ? Math.ceil(30 / 5) : 1} />
            </div>
          </>
        )
        :
        (
          <>
            <Info content="Tässä on histogrammi jokaisen kurssin suoritusten jakautumiselle opiskeluvuosien ja periodien mukaan. Näytettävien opiskeluvuosien määrää voi rajata." />
            <Headline text="Kurssin suoritusajankohdat opintojen aikana" />
            <FilterBar
              courses={courses}
              handleCourseChange={handleCourseChange}
              handleSearch={handleSearch}
              selectedCourse={course}
              handleMaxYearChange={handleMaxYearChange}
              selectedMaxYear={maxYear}
            />
            <Histogram maxYear={maxYear} data={data} course={course} categories={categories} />
          </>
        )
      }
    </>
  )
}

const Histogram = ({ data, course, categories }) => {

  const options = {

    title: {
      text: course,
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
      data: data ? data: [{ y: 0, color: "#81d4fa"}]
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
