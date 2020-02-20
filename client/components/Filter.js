import React from 'react'
import { Label, Select } from 'semantic-ui-react'

const Filter = ({ label, placeholder, options, handleChange }) => (
  <td>
    <Label>{label}</Label>
    <Select onChange={handleChange} placeholder={placeholder} options={options} />
  </td>
)


export default Filter