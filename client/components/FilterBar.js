import React from 'react'
import { Button } from 'semantic-ui-react'
import { createNumberOptions, createTextOptions, grades } from '../util/units'
import Filter from './Filter'


const FilterBar = ({ courses, handleCourseChange, handleGradeChange, handleSearch, handleYearChange, selectedCourse, selectedGrade, selectedYear }) => {

  return (
    <table className="ui table">
      <tbody>
        <tr>
          <Filter
            label="Suoritusvuosi"
            handleChange={handleYearChange}
            value={selectedYear}
            options={createNumberOptions(2013, 2020).reverse()}
            placeholder="2019"
          />
          <Filter
            label="Aloituskurssi"
            handleChange={handleCourseChange}
            value={selectedCourse}
            options={createTextOptions(courses)}
            placeholder="Aloituskurssi"
          />
          <Filter
            label="Arvosana"
            handleChange={handleGradeChange}
            value={selectedGrade}
            options={grades}
            placeholder="Läpäisseet"
          />
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
