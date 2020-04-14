import React, { useEffect, useState } from 'react'
import { Table } from 'semantic-ui-react'
import FilterBar from '../filters/FilterBar'
import { getRecommendations } from '../../util/redux/dataReducer'


const Recommendation = () => {
  const [data, setData] = useState([])
  const [year, setYear] = useState(2017)
  const [term, setTerm] = useState('Syksy')

  useEffect(() => {
    setData(JSON.parse(getRecommendations(year, term)))
  }, [])

  const getData = (year, term) => {
    setData(JSON.parse(getRecommendations(year, term)))
  }

  const handleYearChange = (e, { value }) => {
    setYear(value)
    getData(value, term)
  }

  const handleTermChange = (e, { value }) => {
    setTerm(value)
    getData(year, value)
  }

  const listTenCourses = (data) => {
    if (data.length > 10) data = data.slice(0, 10)

    return (
      <Table.Body>
        {data.map(course => <Table.Row key={course}><Table.Cell>{course}</Table.Cell></Table.Row>)}
      </Table.Body>
    )
  }

  if (data && data.length > 0) {
    return (
      <div>
        <FilterBar year={year} handleYearChange={handleYearChange} term={term} handleTermChange={handleTermChange}/>
        <Table singleLine>
          <Table.Header>
            <Table.HeaderCell>Suositeltavat kurssit ajankohdalle {term}, {year}:</Table.HeaderCell>
          </Table.Header>
          {listTenCourses(data)}
        </Table>
      </div>
    )
  }

  return <p>Lataillaan</p>
}


export default Recommendation
