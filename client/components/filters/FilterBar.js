import React from 'react'
import {
  createNumberOptions, createTextOptions, grades, terms,
} from '../../util/units'
import Filter from './Filter'


const FilterBar = ({
  courses,
  course,
  grade,
  year,
  levels,
  bubbles,
  maxYear,
  yearWithAll,
  schoolYear,
  studyYear,
  term,
  handleCourseChange,
  handleGradeChange,
  handleYearChange,
  handleLevelChange,
  handleBubblesChange,
  handleStudyYearChange,
  handleMaxYearChange,
  handleTermChange,
}) => (
  <table className="ui four very basic table filter-container">
    <tbody>
      <tr>
        {year ? (
          <Filter
            label="Suoritusvuosi"
            handleChange={handleYearChange}
            value={year}
            options={createNumberOptions(2013, 2020, yearWithAll).reverse()}
            placeholder="2017"
          />
        ) : null}
        {course ? (
          <Filter
            label="Kurssi"
            handleChange={handleCourseChange}
            value={course}
            options={createTextOptions(courses)}
            placeholder="Aloituskurssi"
          />
        ) : null}
        {grade ? (
          <Filter
            label="Arvosana"
            handleChange={handleGradeChange}
            value={grade}
            options={grades}
            placeholder="Läpäisseet"
          />
        ) : null}
        {levels ? (
          <Filter
            label="Näytettävien tasojen määrä"
            handleChange={handleLevelChange}
            value={levels}
            options={createNumberOptions(1, 10)}
            placeholder="5"
          />
        ) : null}
        {bubbles ? (
          <Filter
            label="Näytettävien kurssien määrä per periodi"
            handleChange={handleBubblesChange}
            value={bubbles}
            options={createNumberOptions(1, 50)}
            placeholder="10"
          />
        ) : null}
        {maxYear ? (
          <Filter
            label="Vuosien määrä"
            handleChange={handleMaxYearChange}
            value={maxYear}
            options={createNumberOptions(1, 11)}
            placeholder="5"
          />
        ) : null}
        {schoolYear ? (
          <Filter
            label="Lukuvuosi"
            handleChange={handleYearChange}
            value={schoolYear}
            options={createNumberOptions(1, 5)}
            placeholder="2"
          />
        ) : null}
        {term ? (
          <Filter
            label="Lukukausi"
            handleChange={handleTermChange}
            value={term}
            options={terms}
            placeholder="Syksy"
          />
        ) : null}
        {studyYear ? (
          <Filter
            label="Tavoiteaika"
            handleChange={handleStudyYearChange}
            value={studyYear}
            options={createNumberOptions(2, 5)}
            placeholder="3"
          />
        ) : null}
      </tr>
    </tbody>
  </table>
)


export default FilterBar
