import React, { useState, useEffect } from 'react'
import * as d3 from 'd3'
import dataset from '../data/dataset.csv'
import Graph from './Graph'


const toPeriod = (date) => {
  let period = 0
  const day = date.getDate()
  const month = date.getMonth() + 1
  let year = date.getFullYear()

  if ((month > 9 && month < 11) || (month === 9 && day >= 23) || (month === 11 && day <= 17)) {
    period = 1
  } else if ((month === 12 || month === 1) || (month === 11 && day >= 18) || (month === 2 && day <= 9)) {
    period = 2
  } else if ((month > 2 && month < 4) || (month === 2 && day >= 2) || (month === 4 && day <= 5)) {
    period = 3
  } else if ((month === 4 && day >= 6) || month === 5) {
    period = 4
  } else {
    period = 5
  }

  if (period === 2 && month <= 2) {
    year -= 1
  }

  return { period, year }
}

const nextPeriodOf = (period) => {
  const nextPeriod = { period: period.period, year: period.year }

  if (period.period === 5) {
    nextPeriod.period = 1
  } else if (period.period === 2) {
    nextPeriod.period = 3
    nextPeriod.year += 1
  } else {
    nextPeriod.period += 1
  }

  return nextPeriod
}

const dataByYear = (data, firstYear) => {
  return data.filter(credit => credit.date.getFullYear() === firstYear)
}

const highChartsObjects = (data, startingCourse) => {

  let highChartsArrays = []

  for (let i = 0; i < data.length; i++) {
    let isStartingCourse = false
    let periodOfStartingCourse = 0

    for (let j = 0; j < data[i].courses.length; j++) {
      if (data[i].courses[j].course === startingCourse) {
        isStartingCourse = true
        periodOfStartingCourse = data[i].courses[j].period
      }
    }

    if (isStartingCourse) {
      const nextCourses = data[i].courses.filter(credit => credit.period === (periodOfStartingCourse + 1))
      nextCourses.forEach(credit => highChartsArrays = [...highChartsArrays, [startingCourse, credit.course, 1]])
    }
    isStartingCourse = false
  }

  return highChartsArrays
}

const studentPaths = (data, year, startCourse) => {
  const stNumbers = [...new Set(data.map(x => x.studentId))]
  const students = []
  let courses = []
  let helper = stNumbers[0]
  let student = { studentNumber: stNumbers[0], courses: [] }

  const dataOfYear = dataByYear(data, year)

  for (let i = 0; i < dataOfYear.length; i++) {

    if (dataOfYear[i].studentId !== helper) {
      courses.sort()
      student.courses = courses
      students.push(student)

      courses = []

      courses.push({
        courseId: dataOfYear[i].courseId,
        date: dataOfYear[i].date,
        period: toPeriod(dataOfYear[i].date),
        course: dataOfYear[i].course,
        grade: dataOfYear[i].grade,
      })
      helper = dataOfYear[i].studentId

      student = { studentNumber: dataOfYear[i].studentId, courses: [] }
    } else {
      courses.push({
        courseId: dataOfYear[i].courseId,
        date: dataOfYear[i].date,
        period: toPeriod(dataOfYear[i].date),
        course: dataOfYear[i].course,
        grade: dataOfYear[i].grade,
      })
    }

    if (i === dataOfYear.length - 1) {
      courses.sort()

      student.courses = courses
      students.push(student)
    }
  }
  return highChartsObjects(students, startCourse)
}

const Datahandler = ({ year, startCourse }) => {

  const [data, setData] = useState([])

  useEffect(() => {
    d3.dsv(';', dataset).then((data) => {
      setData(data.map(credit => ({ 
        studentId: credit.studentId,
        courseId: credit.coursecode,
        date: new Date(credit.date),
        period: toPeriod(new Date(credit.date)),
        course: credit.course,
        grade: credit.grade,
      })
      ))
    })
  }, [])

  const paths = studentPaths(data, year, startCourse)

  return (
    <div>
      <Graph data={paths} />
    </div>
  )
}

export default Datahandler