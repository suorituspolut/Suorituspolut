import React, { useState } from 'react'
import Datahandler from './Datahandler'

const ToggleGraph = () => {
  const [graphToShow, setGraphToShow] = useState(true)
  const [selectedCourse, setSelectedCourse] = useState("Ohjelmoinnin jatkokurssi")
  const [selectedYear, setSelectedYear] = useState(2018)
  return (
    <>
      {graphToShow ? 
        <Datahandler year={selectedYear} startCourse={selectedCourse} /> :
        <Datahandler year={2018} startCourse="Ohjelmoinnin perusteet" />
      }
      <div className="toggle-container">
        <div className="ui buttons">
          <button type="submit" onClick={() => setGraphToShow(true)} className="ui button">Kurssi kerrallaan</button>
          <button type="submit" onClick={() => setGraphToShow(false)} className="ui blue button">Polut kurssien välillä</button>
        </div>
      </div>
    </>
  )
}

export default ToggleGraph