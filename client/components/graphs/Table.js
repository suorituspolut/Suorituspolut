import React from 'react'
import { Table } from 'semantic-ui-react'

const SimpleTable = ({ data, course, highlight, setHighlight }) => {
    
  if (data.length > 1) {
    let gradeNames = data.map((gradeArray) => {
      if (gradeArray.courses.length > 0) return gradeArray.name
      else return
    })
      const existingGrades = gradeNames.filter(grade => grade !== undefined)

      const courseData = data.map(gradeArray => gradeArray.courses)
      let allCourses = []
      courseData.forEach(courseArray => {
        courseArray.forEach(course => allCourses.push(course[0]))
      })
      allCourses = [...new Set(allCourses)]

      let table = []
      allCourses.forEach((course) => {
        table = [...table, {course: course}]
      })
      courseData.forEach((courseArray, index) => {
        courseArray.forEach((course) => {
          const courseObject = table.find(o => o.course === course[0])
          courseObject[data[index].name] = course[2]
          table[table.indexOf(courseObject)] = courseObject
        })
      })

      return (
        <>
        <h4>Ennen kurssia {course}, opiskelijat ovat käyneet:</h4>
        <Table className="ui table">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Aiempi kurssi</Table.HeaderCell>
              {existingGrades.map((grade) => {
                if (highlight === grade) return <Table.HeaderCell key={grade} className="highlighted-cell" onClick={() => setHighlight(grade)} key={grade}>{grade}</Table.HeaderCell>
                return <Table.HeaderCell onClick={() => setHighlight(grade)} key={grade}>{grade}</Table.HeaderCell>
              }
              )}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {table.map((course) => (
              <Table.Row key={course.course}>
                <Table.Cell>
                  <b>{course.course}</b>
                </Table.Cell>
                {existingGrades.map((name) => {
                  if (highlight === name) return <Table.Cell key={name} className="highlighted-cell"><b>{course[name]}%</b></Table.Cell> 
                  return <Table.Cell>{course[name]}%</Table.Cell>
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
