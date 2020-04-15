import React, { useEffect, useState } from 'react'
import { Table, Radio } from 'semantic-ui-react'
import FilterBar from '../filters/FilterBar'
import { getRecommendations } from '../../util/redux/dataReducer'


const Recommendation = () => {
  const [data, setData] = useState([])
  const [year, setYear] = useState(2017)
  const [term, setTerm] = useState('Syksy')
  const [signedIn, setSignedIn] = useState(false)

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

  const handleToggleChange = () => {
    setSignedIn(!signedIn)
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
        <div className='mockStudentToggle'>
          <h4 className='mockStudentToggleTitle'>Käytä sisäänkirjautuneena testikäyttäjänä</h4>
          <p>(ei näytä jo käytyjä kursseja suosituksissa)</p>
          <Radio toggle onChange={handleToggleChange}/>
        </div>
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
