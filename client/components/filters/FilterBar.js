import React from 'react'
import { createNumberOptions, createTextOptions, grades, terms } from '../../util/units'
import Filter from './Filter'


const FilterBar = ({ courses, handleCourseChange, handleGradeChange, handleYearChange, handleLevelChange, handleBubblesChange, selectedCourse, selectedGrade, selectedYear, selectedLevels, selectedBubbles, selectedMaxYear, year, term, handleMaxYearChange, handleTermChange }) => {

  return (
    <table className="ui four very basic table filter-container">
      <tbody>
        <tr>
          {selectedYear ? (
            <Filter
              label="Suoritusvuosi"
              handleChange={handleYearChange}
              value={selectedYear}
              options={createNumberOptions(2013, 2020).reverse()}
              placeholder="2019"
            />
          ) : null}
          {selectedCourse ? (
            <Filter
              label="Kurssi"
              handleChange={handleCourseChange}
              value={selectedCourse}
              options={createTextOptions(courses)}
              placeholder="Aloituskurssi"
            />
          ) : null}
          {selectedGrade ? (
            <Filter
              label="Arvosana"
              handleChange={handleGradeChange}
              value={selectedGrade}
              options={grades}
              placeholder="Läpäisseet"
            />
          ) : null}
          {selectedLevels ? (
            <Filter
              label="Näytettävien tasojen määrä"
              handleChange={handleLevelChange}
              value={selectedLevels}
              options={createNumberOptions(1, 10)}
              placeholder="5"
            />
          ) : null}
          {selectedBubbles ? (
            <Filter
              label="Näytettävien kurssien määrä per periodi"
              handleChange={handleBubblesChange}
              value={selectedBubbles}
              options={createNumberOptions(1, 50)}
              placeholder="10"
            />
          ) : null}
          {selectedMaxYear ? (
            <Filter
              label="Vuosien määrä"
              handleChange={handleMaxYearChange}
              value={selectedMaxYear}
              options={createNumberOptions(1, 11)}
              placeholder="5"
            />
          ) : null}
          {year ? (
            <Filter
              label="Vuosi"
              handleChange={handleYearChange}
              value={year}
              options={createNumberOptions(2013, 2020).reverse()}
              placeholder="5"
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
        </tr>

      </tbody>
    </table>
  )
}

export default FilterBar
