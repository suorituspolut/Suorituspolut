import React from 'react'
import { Table } from 'semantic-ui-react'
import { randomKey } from '../../util/units'

const SimpleTable = ({
  data, course, highlight, setHighlight,
}) => {
  if (data.length > 1) {
    const gradeNames = data.map((gradeArray) => {
      if (gradeArray.courses.length > 0) return gradeArray.name
    })

    const existingGrades = gradeNames.filter(grade => grade !== undefined)

    const courseData = data.map(gradeArray => gradeArray.courses)
    let allCourses = []
    courseData.forEach((courseArray) => {
      courseArray.forEach(course => allCourses.push(course[0]))
    })
    allCourses = [...new Set(allCourses)]

    let table = []
    allCourses.forEach((course) => {
      table = [...table, { course }]
    })
    courseData.forEach((courseArray, index) => {
      courseArray.forEach((course) => {
        const courseObject = table.find(o => o.course === course[0])
        const courseIndex = 2
        courseObject[data[index].name] = course[courseIndex]
        table[table.indexOf(courseObject)] = courseObject
      })
    })

    return (
      <>
        <h4>
          Ennen kurssia &quot;
          {course}
          &quot;, opiskelijat ovat käyneet:
        </h4>
        <Table className="ui table">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Aiempi kurssi</Table.HeaderCell>
              {existingGrades.map((grade) => {
                if (highlight === grade) return <Table.HeaderCell key={randomKey()} className="highlighted-cell" onClick={() => setHighlight(grade)}>{grade}</Table.HeaderCell>
                return <Table.HeaderCell onClick={() => setHighlight(grade)} key={randomKey()}>{grade}</Table.HeaderCell>
              })}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {table.map(course => (
              <Table.Row key={randomKey()}>
                <Table.Cell key={randomKey()}>
                  <b>{course.course}</b>
                </Table.Cell>
                {existingGrades.map((name) => {
                  if (highlight === name) {
                    return (
                      <Table.Cell key={randomKey()} className="highlighted-cell">
                        <b>
                          {course[name]}
                          %
                        </b>
                      </Table.Cell>
                    )
                  }
                  return (
                    <Table.Cell key={randomKey()}>
                      {course[name] ? course[name] : 0}
                      {' '}
                      %
                    </Table.Cell>
                  )
                })}
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </>
    )
  }

  return null
}

export default SimpleTable
