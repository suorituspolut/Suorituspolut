import React, { useEffect, useState } from 'react'
import FilterBar from '../filters/FilterBar'
import { getRecommendations } from '../../util/redux/dataReducer'

const Recommendation = () => {
  const [data, setData] = useState([])
  const [year, setYear] = useState(2017)
  const [term, setTerm] = useState('Syksy')

  useEffect(() => {
    setData(JSON.parse(getRecommendations(year)))
  }, [])

  const getData = (year) => {
    setData(JSON.parse(getRecommendations(year)))
  }

  const handleYearChange = (e, { value }) => {
    setYear(value)
    getData(value)
  }

  const listTenCourses = (data) => {
    if (data.length > 10) data = data.slice(0, 10)

    return (
      <ul>
        {data.map(course => <li>{course}</li>)}
      </ul>
    )
  }

  if (data && data.length > 0) {
    return (
      <div>
          <FilterBar year={year} handleYearChange={handleYearChange}/>
        <h2>Suositeltavat kurssit ajankohdalle {term}, {year}:</h2>
        {listTenCourses(data)}
      </div>
    )
  }

  return <p>Lataillaan</p>
}


export default Recommendation
