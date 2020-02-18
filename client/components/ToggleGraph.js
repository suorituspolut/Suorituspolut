import React, { useState } from 'react'
import Datahandler from './Datahandler'
import DataService from 'Components/dataService'

const ToggleGraph = () => {
  const [graphToShow, setGraphToShow] = useState(true)
  const [selectedCourse, setSelectedCourse] = useState("Ohjelmoinnin jatkokurssi")
  const [selectedYear, setSelectedYear] = useState(2018)
  return (
    <>
      {graphToShow ? 
        <DataService /> :
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