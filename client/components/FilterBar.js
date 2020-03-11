import React from 'react'
import { Button } from 'semantic-ui-react'
import { createNumberOptions, createTextOptions, grades } from '../util/units'
import Filter from './Filter'


const FilterBar = ({ courses, handleCourseChange, handleGradeChange, handleSearch, handleYearChange, handleLevelChange, selectedCourse, selectedGrade, selectedYear, selectedLevels }) => {

  return (
    <table className="ui table">
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
              label="Aloituskurssi"
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
          <td>
            <p>   </p>
            <Button type="submit" onClick={() => handleSearch()} className="blue">Päivitä</Button>
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default FilterBar
