import React, { useEffect, useState } from 'react'
import { Table, Radio } from 'semantic-ui-react'
import FilterBar from '../filters/FilterBar'
import { getRecommendations } from '../../util/redux/dataReducer'


const Recommendation = () => {
  const [data, setData] = useState([])
  const [year, setYear] = useState(2)
  const [goalYears, setGoalYears] = useState(3)
  const [term, setTerm] = useState('Syksy')
  const [signedIn, setSignedIn] = useState(false)

  const [studentNumber, setStudentNumber] = useState(null)

  useEffect(() => {
    setData(JSON.parse(getRecommendations(year, term, studentNumber, goalYears)))
  }, [])

  const getData = (year, term, studentNumber, goalYears) => {
    setData(JSON.parse(getRecommendations(year, term, studentNumber, goalYears)))
  }

  const handleYearChange = (e, { value }) => {
    setYear(value)
    getData(value, term)
  }

  const handleTermChange = (e, { value }) => {
    setTerm(value)
    getData(year, value)
  }

  const handleStudyYearChange = (e, { value }) => {
    setGoalYears(value)
    getData(year, term, studentNumber, value)
  }

  const handleToggleChange = () => {
    const signed = !signedIn
    let studentNumber = null
    setSignedIn(signed)
    if (signed) studentNumber = '9888000'
    setStudentNumber(studentNumber)
    getData(year, term, studentNumber, goalYears)
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
        <div>
          <h5 className="timelyGraduated">Vertaa suositeltaessa opiskelijoihin, jotka ovat valmistuneet vuodessa:</h5>
          <FilterBar studyYear={goalYears} handleStudyYearChange={handleStudyYearChange} />
        </div>
        <div className='mockStudentToggle'>
          <h4 className='mockStudentToggleTitle'>Käytä sisäänkirjautuneena testikäyttäjänä</h4>
          <p>(ei näytä jo käytyjä kursseja suosituksissa)</p>
          <Radio toggle onChange={handleToggleChange}/>
        </div>
        <Table singleLine>
          <Table.Header>
            <Table.HeaderCell>Suositeltavat kurssit ajankohdalle {term}, {year}. lukuvuosi:</Table.HeaderCell>
            { signedIn ? (
                <Table.HeaderCell textAlign='right'>Matti Malli, opiskelijanumero: {studentNumber}</Table.HeaderCell>
            ) : null}
          </Table.Header>
          {listTenCourses(data)}
        </Table>
      </div>
    )
  }

  return <p>Lataillaan</p>
}


export default Recommendation
