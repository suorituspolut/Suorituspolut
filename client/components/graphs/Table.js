import React from 'react'
import { Table } from 'semantic-ui-react'

const SimpleTable = ({ data, grade }) => {

  if (data.length > 1) {

    const dataOfTheGrade = data.filter(item => item.grade === grade)

    return (
      <Table className="ui table">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Arvosanan {grade} ovat käyneet myös</Table.HeaderCell>
            <Table.HeaderCell>Käyneet %</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {dataOfTheGrade ? (dataOfTheGrade[0].courses.map((course) => (
            <Table.Row key={course[0]}>
              <Table.Cell>{course[0]}</Table.Cell>
              <Table.Cell>{course[2]}%</Table.Cell>
            </Table.Row>)
          )) : null}
        </Table.Body>
      </Table>
      )
    }
    return null
}

export default SimpleTable
