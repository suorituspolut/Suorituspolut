import React from 'react'
import { Table } from 'semantic-ui-react'

const SimpleTable = ({ data, course, highlight, setHighlight }) => {
    
  if (data.length > 1) {
 
      const courseData = data.map(gradeArray => gradeArray.courses)
      let table = []
      
      courseData[1].forEach((course) => {
        table = [...table, [course[0]]]
      })
      courseData.forEach((gradeArray) => {
        gradeArray.forEach((course, index) => {
          table[index] = [...table[index], course[2]]
        })
      })

    return (
      <Table className="ui table">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Kurssin "{course}" kävijät ovat käyneet myös:</Table.HeaderCell>
            {data.map((gradeArray, index) => (
              gradeArray.courses.length > 0 ? 
              <Table.HeaderCell className="ascending" onClick={() => setHighlight(index+1)} key={gradeArray.name}>
                {gradeArray.name}
              </Table.HeaderCell>
              :null
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data[1].courses.map((course, index) => (
            <Table.Row key={course[0]}>
              {table[index].map((credit, index2) => (
                <Table.Cell key={index2}>
                  {index2 === highlight ? <b>{credit}</b> : credit}
                  {index2 !== 0 ? <>%</> : null}
                </Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
         </Table>
      )
    }
    return null
}

export default SimpleTable
