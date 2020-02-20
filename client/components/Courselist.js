import React, { Component, useState } from 'react'

const Button = ({ handleClick, text }) => {
  return (
    <button type="submit" onClick={handleClick} className="ui button">
      {text}
    </button>
  )
}

const showMenu = () => {
  console.log('show courselist')
  return () => {
  }
}
const selectCourseButton = () => {
  console.log('täällä')
  return (
      <Button handleClick={showMenu} text="Select starting course"/>
  )
}

const Courselist = () => {
  const [content, setContent] = useState(selectCourseButton)


  return (
    <div className="toggle-container">
      <div className="ui buttons">
        {content}
      </div>
    </div>
  )
}

export default Courselist