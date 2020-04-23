import React from 'react'
import { Label, Dropdown } from 'semantic-ui-react'

const Filter = ({
  label, placeholder, options, handleChange, value,
}) => (
  <td className="filter-cell">
    <Label>{label}</Label>
    <Dropdown className="dropdown" fluid search selection onChange={handleChange} value={value} placeholder={placeholder} options={options} />
  </td>
)


export default Filter
